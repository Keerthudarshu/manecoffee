package com.manecoffee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manecoffee.entity.ProductVariant;

public interface ProductVariantRepository extends JpaRepository<ProductVariant, Long> {

}

