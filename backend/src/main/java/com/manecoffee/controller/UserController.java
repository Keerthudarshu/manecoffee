package com.manecoffee.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.manecoffee.dto.UserSummaryDTO;
import com.manecoffee.entity.User;
import com.manecoffee.repository.OrderRepository;
import com.manecoffee.repository.UserRepository;
import com.manecoffee.repository.WishlistItemRepository;

@RestController
@RequestMapping("/api/admin/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private WishlistItemRepository wishlistItemRepository;

    @GetMapping("")
    @ResponseBody
    public List<UserSummaryDTO> getAllUsers() {
        // Fetch only users whose role is not 'admin'
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == null || !user.getRole().equalsIgnoreCase("admin"))
                .map(this::convertToUserSummaryDTO)
                .collect(Collectors.toList());
    }

    private UserSummaryDTO convertToUserSummaryDTO(User user) {
        long orderCount = orderRepository.findByUserOrderByCreatedAtDesc(user).size();
        long wishlistCount = wishlistItemRepository.countByUser(user);

        return new UserSummaryDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole(),
                user.getCreatedAt(),
                user.getMemberSince(),
                user.getIsActive(),
                orderCount,
                wishlistCount,
                user.getLoyaltyPoints());
    }
}
