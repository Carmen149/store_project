package com.carmen.magazin_de_bijuterii.repository;

import com.carmen.magazin_de_bijuterii.model.Command;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommandRepository extends JpaRepository<Command,Long> {
    Command findFirstByOrderByIdDesc();
    List<Command> findCommandByClient_Id(Long id);


}
