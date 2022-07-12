package com.carmen.magazin_de_bijuterii.dto;

import com.carmen.magazin_de_bijuterii.model.products.Type;

import com.carmen.magazin_de_bijuterii.validators.ItemNameConstraint;
import com.carmen.magazin_de_bijuterii.validators.MaterialConstraint;
import com.carmen.magazin_de_bijuterii.validators.NameConstraint;
import com.carmen.magazin_de_bijuterii.validators.TypeConstraint;
import lombok.*;
import org.springframework.format.annotation.NumberFormat;

import javax.persistence.Column;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ItemDto {
    private Long idItem;
    @Column(unique = true, length = 100)
    @ItemNameConstraint(message = "Name is mandatory. It should start with a capital letter and contain at least 3 characters.")
    private String name;
    @NotNull(message = "Price is mandatory.")
    @NumberFormat
    @Min(value = 1)
    private Double price;
    @NotNull(message = "Description is mandatory.")
    private String description;
    @MaterialConstraint(message ="Material is mandatory.")
    private String material;
    @NotNull(message = "Availability is mandatory.")
    private Boolean availability;
    private Integer size;
    @TypeConstraint(message = "Type is mandatory.")
    private Type type;

}
