package com.manecoffee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manecoffee.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {}
// CategoryRepository.java, UserRepository.java, OrderRepository.java, OrderItemRepository.java
