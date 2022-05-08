package com.carmen.magazin_de_bijuterii.dto;

import com.carmen.magazin_de_bijuterii.model.products.Type;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ItemDto {
    private Long idItem;
    private String name;
    private Double price;
    private String description;
    private String material;
    private Boolean availability;
    private Integer size;
    private Type type;

}
