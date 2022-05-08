package com.carmen.magazin_de_bijuterii.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Embeddable
public class OrderItemKey implements Serializable {
    @Column(name = "command_id")
    Long orderId;

    @Column(name = "item_id")
    Long itemId;

}
