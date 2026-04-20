package com.manecoffee.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import com.manecoffee.entity.CartItem;
import com.manecoffee.entity.Product;
import com.manecoffee.entity.User;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
    Optional<CartItem> findByUserAndProduct(User user, Product product);
    
    @Modifying
    @Transactional
    void deleteByUser(User user);
    
    @Modifying
    @Transactional
    void deleteByProduct(Product product);
}



