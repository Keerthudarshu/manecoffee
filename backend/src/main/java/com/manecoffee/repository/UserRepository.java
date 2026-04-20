package com.manecoffee.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manecoffee.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
