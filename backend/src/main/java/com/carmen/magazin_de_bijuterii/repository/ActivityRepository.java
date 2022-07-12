package com.carmen.magazin_de_bijuterii.repository;

import com.carmen.magazin_de_bijuterii.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity,Long> {
    Activity findByIdClientAndLogInIs(Long id,String logIn);
    List<Activity> findByIdClientOrderByIdDesc(Long id);
    List<Activity> findActivityByIdClient(Long id);

}
