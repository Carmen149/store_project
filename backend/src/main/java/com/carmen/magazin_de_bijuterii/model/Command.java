package com.carmen.magazin_de_bijuterii.model;

import com.carmen.magazin_de_bijuterii.model.user.Customer;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Command implements Comparable<Command>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    private Customer client;
    private String status;
    private LocalDate date;
    private Double total;


    @Override
    public int compareTo(Command o) {
        return (int) (this.getId()-o.getId());
    }
}
