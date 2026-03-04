package com.eduprajna.service;

import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.Image;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.lowagie.text.pdf.draw.LineSeparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.internet.MimeMessage;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.awt.Color;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Service for sending emails and generating PDF invoices.
 */
@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Value("${mail.from.email}")
    private String fromEmail;

    private static final String LOGO_PATH = "static/images/logo.png";

    /**
     * Send password reset email
     */
    public boolean sendPasswordResetEmail(String recipientEmail, String username, String resetLink) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(recipientEmail);
            message.setSubject("Sanatana Parampara - Password Reset Request");
            message.setText(buildPasswordResetEmailBody(username, resetLink, recipientEmail));

            mailSender.send(message);
            logger.info("Password reset email sent to: {}", recipientEmail);
            return true;
        } catch (Exception e) {
            logger.error("Failed to send password reset email", e);
            return false;
        }
    }

    private String buildPasswordResetEmailBody(String username, String resetLink, String email) {
        return "Hello " + username + ",\n\n" +
                "We received a request to reset your password. Click the link below to reset your password:\n\n" +
                resetLink + "\n\n" +
                "This link will expire in 24 hours.\n\n" +
                "Best regards,\n" +
                "Sanatana Parampara Support Team";
    }

    /**
     * Send account credentials via email
     */
    public boolean sendCredentialsEmail(String recipientEmail, String username, String password) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(recipientEmail);
            message.setSubject("Sanatana Parampara - Your Account Credentials");
            message.setText("Hello " + username + ",\n\nYour account credentials:\nEmail: " + recipientEmail
                    + "\nUsername: " + username + "\nPassword: " + password);

            mailSender.send(message);
            logger.info("Credentials email sent to: {}", recipientEmail);
            return true;
        } catch (Exception e) {
            logger.error("Failed to send credentials email", e);
            return false;
        }
    }

    public boolean sendContactThankYou(String name, String email) throws Exception {
        logger.info("Starting sendContactThankYou for: {}", email);
        try {
            if (mailSender == null)
                throw new RuntimeException("JavaMailSender is NOT injected!");
            if (templateEngine == null)
                throw new RuntimeException("TemplateEngine is NOT injected!");

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            Context context = new Context();
            context.setVariable("name", name);

            boolean logoExists = checkLogoExists();
            logger.info("Logo exists: {}, Path: {}", logoExists, LOGO_PATH);
            context.setVariable("logoExists", logoExists);

            logger.info("Processing template: email/contact-thankyou");
            String htmlContent = templateEngine.process("email/contact-thankyou", context);
            logger.info("Template processed successfully. Length: {}", htmlContentLength(htmlContent));

            helper.setFrom(fromEmail);
            helper.setTo(email);
            helper.setSubject("Thank you for reaching us!");
            helper.setText(htmlContent, true);

            if (logoExists) {
                helper.addInline("logo", new ClassPathResource(LOGO_PATH));
            }

            logger.info("Sending email to: {}", email);
            mailSender.send(mimeMessage);
            logger.info("Contact thank you email sent successfully to: {}", email);
            return true;
        } catch (Exception e) {
            logger.error("CRITICAL ERROR in sendContactThankYou: {}", e.getMessage(), e);
            throw e;
        }
    }

    public boolean sendSubscriptionConfirmation(String email) throws Exception {
        logger.info("Starting sendSubscriptionConfirmation for: {}", email);
        try {
            if (mailSender == null)
                throw new RuntimeException("JavaMailSender is NOT injected!");
            if (templateEngine == null)
                throw new RuntimeException("TemplateEngine is NOT injected!");

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            Context context = new Context();
            boolean logoExists = checkLogoExists();
            logger.info("Logo exists: {}, Path: {}", logoExists, LOGO_PATH);
            context.setVariable("logoExists", logoExists);

            logger.info("Processing template: email/subscription-confirmation");
            String htmlContent = templateEngine.process("email/subscription-confirmation", context);
            logger.info("Template processed successfully. Length: {}", htmlContentLength(htmlContent));

            helper.setFrom(fromEmail);
            helper.setTo(email);
            helper.setSubject("Thank you for subscribing!");
            helper.setText(htmlContent, true);

            if (logoExists) {
                helper.addInline("logo", new ClassPathResource(LOGO_PATH));
            }

            logger.info("Sending email to: {}", email);
            mailSender.send(mimeMessage);
            logger.info("Subscription confirmation email sent successfully to: {}", email);
            return true;
        } catch (Exception e) {
            logger.error("CRITICAL ERROR in sendSubscriptionConfirmation: {}", e.getMessage(), e);
            throw e;
        }
    }

    private int htmlContentLength(String html) {
        return html != null ? html.length() : 0;
    }

    /**
     * Send order confirmation email with PDF invoice
     */
    public boolean sendOrderConfirmation(Map<String, Object> orderData) throws Exception {
        String email = (String) orderData.get("email");
        String orderIdStr = String.valueOf(orderData.getOrDefault("orderId", orderData.getOrDefault("id", "N/A")));
        logger.info("Starting sendOrderConfirmation for Order: {}, Email: {}", orderIdStr, email);

        try {
            if (mailSender == null)
                throw new RuntimeException("JavaMailSender is NOT injected!");
            if (templateEngine == null)
                throw new RuntimeException("TemplateEngine is NOT injected!");

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            // Prepare Thymeleaf context
            Context context = new Context();
            context.setVariables(orderData);
            context.setVariable("orderId", orderIdStr);
            boolean logoExists = checkLogoExists();
            logger.info("Logo exists: {}, Path: {}", logoExists, LOGO_PATH);
            context.setVariable("logoExists", logoExists);

            logger.info("Processing template: email/order-confirmation");
            String htmlContent = templateEngine.process("email/order-confirmation", context);
            logger.info("Template processed successfully. Length: {}", htmlContentLength(htmlContent));

            helper.setFrom(fromEmail);
            helper.setTo(email);
            helper.setSubject("Order Confirmation #" + orderIdStr + " - Sanatana Parampare");
            helper.setText(htmlContent, true);

            if (logoExists) {
                helper.addInline("logo", new ClassPathResource(LOGO_PATH));
            }

            // Generate PDF attachment
            logger.info("Generating invoice PDF for Order: {}", orderIdStr);
            byte[] pdfBytes = generateInvoicePDF(orderData);
            logger.info("PDF generated successfully. Size: {} bytes", pdfBytes.length);
            helper.addAttachment("invoice_" + orderIdStr + ".pdf", new ByteArrayResource(pdfBytes));

            logger.info("Sending email to: {}", email);
            mailSender.send(mimeMessage);
            logger.info("Order confirmation email with PDF sent successfully to: {}", email);
            return true;
        } catch (Exception e) {
            logger.error("CRITICAL ERROR in sendOrderConfirmation for Order {}: {}", orderIdStr, e.getMessage(), e);
            throw e;
        }
    }

    /**
     * Generate Invoice PDF using OpenPDF
     */
    private byte[] generateInvoicePDF(Map<String, Object> orderData) throws Exception {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, outputStream);
        document.open();

        // 1. Header with Logo and Company Info
        PdfPTable headerTable = new PdfPTable(2);
        headerTable.setWidthPercentage(100);
        headerTable.setWidths(new float[] { 1, 2 });

        // Logo
        if (checkLogoExists()) {
            InputStream is = new ClassPathResource(LOGO_PATH).getInputStream();
            Image logo = Image.getInstance(is.readAllBytes());
            logo.scaleToFit(50, 50);
            PdfPCell logoCell = new PdfPCell(logo);
            logoCell.setBorder(Rectangle.NO_BORDER);
            headerTable.addCell(logoCell);
        } else {
            headerTable.addCell(new PdfPCell(new Phrase("")));
        }

        // Company Details
        PdfPCell detailsCell = new PdfPCell();
        detailsCell.setBorder(Rectangle.NO_BORDER);
        detailsCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        detailsCell
                .addElement(new Paragraph("Sanatana Parampare", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16)));
        detailsCell.addElement(new Paragraph("123, Traditional Street, Heritage City",
                FontFactory.getFont(FontFactory.HELVETICA, 10)));
        detailsCell
                .addElement(new Paragraph("Karnataka, India - 560001", FontFactory.getFont(FontFactory.HELVETICA, 10)));
        headerTable.addCell(detailsCell);
        document.add(headerTable);

        document.add(new Paragraph("\n"));
        document.add(new LineSeparator());
        document.add(new Paragraph("\n"));

        // 2. Invoice Meta data
        document.add(new Paragraph("INVOICE", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18)));
        String orderId = String.valueOf(orderData.getOrDefault("orderId", orderData.getOrDefault("id", "N/A")));
        document.add(new Paragraph("Invoice Number: INV-" + orderId));
        document.add(new Paragraph("Invoice Date: " + new SimpleDateFormat("dd/MM/yyyy").format(new Date())));
        document.add(new Paragraph("Customer Email: " + orderData.get("email")));
        document.add(new Paragraph("\n"));

        // 3. Items Table
        PdfPTable table = new PdfPTable(5);
        table.setWidthPercentage(100);
        table.setWidths(new float[] { 3, 2, 1, 2, 2 });

        // Header
        addTableHeader(table, "Item");
        addTableHeader(table, "Weight");
        addTableHeader(table, "Qty");
        addTableHeader(table, "Price");
        addTableHeader(table, "Total");

        // Items
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> items = (List<Map<String, Object>>) orderData.get("items");
        if (items != null) {
            for (Map<String, Object> item : items) {
                table.addCell(String.valueOf(item.get("name")));
                String weight = item.getOrDefault("weightValue", "-") + " " + item.getOrDefault("weightUnit", "");
                table.addCell(weight);
                table.addCell(String.valueOf(item.get("quantity")));
                double price = parseDouble(item.get("price"));
                int qty = parseInt(item.get("quantity"));
                table.addCell("Rs. " + String.format("%.2f", price));
                table.addCell("Rs. " + String.format("%.2f", price * qty));
            }
        }
        document.add(table);
        document.add(new Paragraph("\n"));

        // 4. Totals
        PdfPTable totalsTable = new PdfPTable(2);
        totalsTable.setWidthPercentage(40);
        totalsTable.setHorizontalAlignment(Element.ALIGN_RIGHT);

        addTotalRow(totalsTable, "Subtotal:", "Rs. " + String.format("%.2f", parseDouble(orderData.get("subtotal"))));
        addTotalRow(totalsTable, "Shipping:",
                "Rs. " + String.format("%.2f", parseDouble(orderData.get("shippingCost"))));

        double discount = parseDouble(orderData.get("discountAmount"));
        if (discount > 0) {
            addTotalRow(totalsTable, "Discount:", "-Rs. " + String.format("%.2f", discount));
        }

        addTotalRow(totalsTable, "Grand Total:", "Rs. " + String.format("%.2f", parseDouble(orderData.get("total"))),
                true);

        document.add(totalsTable);

        document.close();
        return outputStream.toByteArray();
    }

    private void addTableHeader(PdfPTable table, String headerTitle) {
        PdfPCell header = new PdfPCell();
        header.setBackgroundColor(new Color(248, 248, 248));
        header.setPhrase(new Phrase(headerTitle, FontFactory.getFont(FontFactory.HELVETICA_BOLD)));
        header.setPadding(5);
        table.addCell(header);
    }

    private void addTotalRow(PdfPTable table, String label, String value) {
        addTotalRow(table, label, value, false);
    }

    private void addTotalRow(PdfPTable table, String label, String value, boolean bold) {
        Font font = bold ? FontFactory.getFont(FontFactory.HELVETICA_BOLD) : FontFactory.getFont(FontFactory.HELVETICA);
        PdfPCell labelCell = new PdfPCell(new Phrase(label, font));
        labelCell.setBorder(Rectangle.NO_BORDER);
        labelCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        table.addCell(labelCell);

        PdfPCell valueCell = new PdfPCell(new Phrase(value, font));
        valueCell.setBorder(Rectangle.NO_BORDER);
        valueCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        table.addCell(valueCell);
    }

    private boolean checkLogoExists() {
        return new ClassPathResource(LOGO_PATH).exists();
    }

    private Double parseDouble(Object value) {
        if (value == null)
            return 0.0;
        if (value instanceof Number)
            return ((Number) value).doubleValue();
        try {
            return Double.parseDouble(value.toString());
        } catch (NumberFormatException e) {
            return 0.0;
        }
    }

    private int parseInt(Object value) {
        if (value == null)
            return 0;
        if (value instanceof Number)
            return ((Number) value).intValue();
        try {
            return Integer.parseInt(value.toString());
        } catch (NumberFormatException e) {
            return 0;
        }
    }
}
