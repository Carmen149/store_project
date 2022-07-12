package com.carmen.magazin_de_bijuterii.model;

import com.carmen.magazin_de_bijuterii.model.products.Item;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
public class OrderItem {
    @EmbeddedId
    OrderItemKey id;

    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    Command command;

    @ManyToOne
    @MapsId("itemId")
    @JoinColumn(name="item_id")
    Item item;
    int cantity;

}
