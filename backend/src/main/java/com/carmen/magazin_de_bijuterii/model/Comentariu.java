package com.carmen.magazin_de_bijuterii.model;

import com.carmen.magazin_de_bijuterii.model.user.Customer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Comentariu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long idComentariu;
    @ManyToOne(fetch = FetchType.LAZY)
    private Customer customer;
    private String com;
    public Comentariu(Customer customer,String com){
        this.customer=customer;
        this.com=com;
    }

}
