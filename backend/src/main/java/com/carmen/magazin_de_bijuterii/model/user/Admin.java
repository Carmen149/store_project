package com.carmen.magazin_de_bijuterii.model.user;

import lombok.*;

import javax.persistence.Entity;

@Setter
@Getter
@Entity
@Data
public class Admin extends User {
    public Admin(String firstName, String lastName, String userName, String password, String email) {
        super(firstName,lastName,userName,password,email);
    }

    public Admin() {

    }

}
