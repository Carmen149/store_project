package com.carmen.magazin_de_bijuterii.repository;

import com.carmen.magazin_de_bijuterii.model.Command;
import com.carmen.magazin_de_bijuterii.model.OrderItem;
import com.carmen.magazin_de_bijuterii.model.OrderItemKey;
import com.carmen.magazin_de_bijuterii.model.products.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface OrderItemRepository  extends JpaRepository<OrderItem,Long> {
    List<OrderItem> findByIdOrderId(Long id);
    List<OrderItem> findOrderItemByItem(Item item);

    void deleteById(OrderItemKey id);
}
