package com.manecoffee.repository;

import com.manecoffee.entity.ReturnRequest;
import com.manecoffee.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReturnRequestRepository extends JpaRepository<ReturnRequest, Long> {
    List<ReturnRequest> findByUserOrderByCreatedAtDesc(User user);

    List<ReturnRequest> findByOrderByCreatedAtDesc();
}

