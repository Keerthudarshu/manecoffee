package com.eduprajna.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Service for sending emails
 */
@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private RestTemplate restTemplate;

    private final String NODE_MAIL_SERVER_URL = "http://localhost:5001/api";

    @Autowired
    private JavaMailSender mailSender;

    /**
     * Send password reset email with reset link
     * 
     * @param recipientEmail User's email address
     * @param username       User's username
     * @param resetLink      Link containing reset token
     * @return true if email sent successfully, false otherwise
     */
    public boolean sendPasswordResetEmail(String recipientEmail, String username, String resetLink) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("noreply@sanathanaparampara.com");
            message.setTo(recipientEmail);
            message.setSubject("Sanatana Parampara - Password Reset Request");

            String emailBody = buildPasswordResetEmailBody(username, resetLink, recipientEmail);
            message.setText(emailBody);

            mailSender.send(message);
            logger.info("Password reset email sent successfully to: {}", recipientEmail);
            return true;

        } catch (Exception e) {
            logger.error("Failed to send password reset email to: {}", recipientEmail, e);
            return false;
        }
    }

    /**
     * Build the email body for password reset
     */
    private String buildPasswordResetEmailBody(String username, String resetLink, String email) {
        return "Hello " + username + ",\n\n" +
                "We received a request to reset your password. Click the link below to reset your password:\n\n" +
                resetLink + "\n\n" +
                "This link will expire in 24 hours.\n\n" +
                "Your Account Details:\n" +
                "- Username: " + username + "\n" +
                "- Email: " + email + "\n\n" +
                "If you did not request a password reset, please ignore this email.\n\n" +
                "Best regards,\n" +
                "Sanatana Parampara Support Team";
    }

    /**
     * Send account credentials via email
     * 
     * @param recipientEmail User's email
     * @param username       User's username
     * @param password       User's password
     * @return true if email sent successfully
     */
    public boolean sendCredentialsEmail(String recipientEmail, String username, String password) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("noreply@sanathanaparampara.com");
            message.setTo(recipientEmail);
            message.setSubject("Sanatana Parampara - Your Account Credentials");

            String emailBody = "Hello " + username + ",\n\n" +
                    "Here are your account credentials:\n\n" +
                    "Email: " + recipientEmail + "\n" +
                    "Username: " + username + "\n" +
                    "Password: " + password + "\n\n" +
                    "Please keep these credentials secure and change your password after first login.\n\n" +
                    "Best regards,\n" +
                    "Sanatana Parampara Support Team";

            message.setText(emailBody);
            mailSender.send(message);
            logger.info("Credentials email sent successfully to: {}", recipientEmail);
            return true;

        } catch (Exception e) {
            logger.error("Failed to send credentials email to: {}", recipientEmail, e);
            return false;
        }
    }

    /**
     * Send contact thank you email via Node.js Mail Server
     */
    public boolean sendContactThankYou(String name, String email) {
        try {
            java.util.Map<String, String> payload = new java.util.HashMap<>();
            payload.put("name", name);
            payload.put("email", email);

            logger.info("Forwarding contact thank you email request to Node.js server for: {}", email);
            ResponseEntity<String> response = restTemplate.postForEntity(
                    NODE_MAIL_SERVER_URL + "/send-contact-thankyou",
                    payload,
                    String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                logger.info("Node.js server successfully handled contact thank you email for: {}", email);
                return true;
            } else {
                logger.error("Node.js server failed to send contact thank you email. Status: {}",
                        response.getStatusCode());
                return false;
            }
        } catch (Exception e) {
            logger.error("Error forwarding contact thank you email to Node.js server", e);
            return false;
        }
    }

    /**
     * Send subscription confirmation email via Node.js Mail Server
     */
    public boolean sendSubscriptionConfirmation(String email) {
        try {
            java.util.Map<String, String> payload = new java.util.HashMap<>();
            payload.put("email", email);

            logger.info("Forwarding subscription confirmation request to Node.js server for: {}", email);
            ResponseEntity<String> response = restTemplate.postForEntity(
                    NODE_MAIL_SERVER_URL + "/send-subscription-confirmation",
                    payload,
                    String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                logger.info("Node.js server successfully handled subscription for: {}", email);
                return true;
            } else {
                logger.error("Node.js server failed to send subscription confirmation. Status: {}",
                        response.getStatusCode());
                return false;
            }
        } catch (Exception e) {
            logger.error("Error forwarding subscription confirmation to Node.js server", e);
            return false;
        }
    }

    /**
     * Send order confirmation email via Node.js Mail Server
     */
    public boolean sendOrderConfirmation(java.util.Map<String, Object> orderData) {
        try {
            String email = (String) orderData.get("email");
            logger.info("Forwarding order confirmation request to Node.js server for: {}", email);

            ResponseEntity<String> response = restTemplate.postForEntity(
                    NODE_MAIL_SERVER_URL + "/send-confirmation",
                    orderData,
                    String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                logger.info("Node.js server successfully handled order confirmation for: {}", email);
                return true;
            } else {
                logger.error("Node.js server failed to send order confirmation. Status: {}", response.getStatusCode());
                return false;
            }
        } catch (Exception e) {
            logger.error("Error forwarding order confirmation to Node.js server", e);
            return false;
        }
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
