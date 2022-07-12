package com.carmen.magazin_de_bijuterii.repository;

import com.carmen.magazin_de_bijuterii.model.Comentariu;
import com.carmen.magazin_de_bijuterii.model.products.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item,Long> {

}
