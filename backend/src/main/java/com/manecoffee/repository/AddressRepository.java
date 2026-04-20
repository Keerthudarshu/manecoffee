package com.manecoffee.repository;

import com.manecoffee.entity.Address;
import com.manecoffee.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUser(User user);
}



