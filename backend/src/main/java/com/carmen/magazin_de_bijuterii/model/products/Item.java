package com.carmen.magazin_de_bijuterii.model.products;


import com.carmen.magazin_de_bijuterii.model.Comentariu;
import com.carmen.magazin_de_bijuterii.validators.ItemNameConstraint;
import com.carmen.magazin_de_bijuterii.validators.MaterialConstraint;
import com.carmen.magazin_de_bijuterii.validators.NameConstraint;
import com.carmen.magazin_de_bijuterii.validators.TypeConstraint;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.format.annotation.NumberFormat;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;


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
    @Column(unique = true, length = 100)
    @ItemNameConstraint(message ="Name is mandatory. It should start with a capital letter and contain at least 3 characters.")
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
    private String nameImg;
    @ManyToMany(cascade = {CascadeType.PERSIST})
    @JoinTable(
            name = "item_com",
            joinColumns = @JoinColumn(name = "idItem"),
            inverseJoinColumns = @JoinColumn(name = "id"))
    private Set<Comentariu> comList;


    public Item(String name, Double price, String description, String material, Boolean availability, Integer size, Type type) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.material = material;
        this.availability = availability;
        this.size = size;
        this.type = type;
        this.comList=new HashSet<Comentariu>();

    }

    public int compareTo(Item item) {
        // TODO Auto-generated method stub
        return (int) (this.price - item.getPrice());

    }

}
