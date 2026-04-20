package com.manecoffee.repository;

import com.manecoffee.entity.Order;
import com.manecoffee.entity.OrderStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderStatusHistoryRepository extends JpaRepository<OrderStatusHistory, Long> {
    List<OrderStatusHistory> findByOrderOrderByChangedAtAsc(Order order);
    List<OrderStatusHistory> findByOrderIdOrderByChangedAtAsc(Long orderId);
}

