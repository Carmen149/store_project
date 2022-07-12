package com.carmen.magazin_de_bijuterii.repository;

import com.carmen.magazin_de_bijuterii.model.Comentariu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComentariuRepository extends JpaRepository<Comentariu,Long> {
    List<Comentariu> findComentariuByCustomer_Id(Long id);
}
