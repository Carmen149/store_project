package com.carmen.magazin_de_bijuterii.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;
import java.time.LocalTime;
@Setter
@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long idClient;
    private String userName;
    private LocalDate date;
    private LocalTime logInTime;
    private LocalTime logOutTime;
    private String logIn;
    public Activity(Long idClient,String userName,LocalDate date,LocalTime logInTime,String logIn){
        this.idClient=idClient;
        this.userName=userName;
        this.logInTime=logInTime;
        this.date=date;
        this.logIn=logIn;
        this.logOutTime=LocalTime.of(0,0);


    }
}
