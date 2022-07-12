package com.carmen.magazin_de_bijuterii.repository;

import com.carmen.magazin_de_bijuterii.model.user.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {
   Customer findByUserNameAndPassword(String userName,String password);

    Customer findByUserName(String userName);
}
