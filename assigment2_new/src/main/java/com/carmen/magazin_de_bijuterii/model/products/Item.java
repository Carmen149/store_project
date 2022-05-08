package com.carmen.magazin_de_bijuterii.model.products;


import com.carmen.magazin_de_bijuterii.validators.MaterialConstraint;
import com.carmen.magazin_de_bijuterii.validators.NameConstraint;
import com.carmen.magazin_de_bijuterii.validators.TypeConstraint;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.format.annotation.NumberFormat;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;


@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Item implements Comparable<Item> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idItem;
//    @Column(unique = true, length = 100)
//    @NameConstraint(message = "Name is mandatory. It should start with a capital letter and contain at least 3 characters.")
      private String name;
//    @NotNull(message = "Price is mandatory.")
//    @NumberFormat
//    @Min(value = 1)
    private Double price;
//    @NotNull(message = "Description is mandatory.")
    private String description;
//    @MaterialConstraint(message = "Material should be: argint, aur, aur roz, argint placat cu rodiu, argint placat cu aur roz, otel inoxidabil, platina.")
//    @NotNull(message = "Material is mandatory.")
    private String material;
//    @NotNull(message = "Availability is mandatory.")
    private Boolean availability;
    private Integer size;
//    @TypeConstraint(message = "Type is mandatory.")
    private Type type;


    public Item(String name, Double price, String description, String material, Boolean availability, Integer size, Type type) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.material = material;
        this.availability = availability;
        this.size = size;
        this.type = type;

    }

    public int compareTo(Item item) {
        // TODO Auto-generated method stub
        return (int) (this.price - item.getPrice());

    }

}
