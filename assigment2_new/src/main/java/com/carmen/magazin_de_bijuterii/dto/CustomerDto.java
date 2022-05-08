package com.carmen.magazin_de_bijuterii.dto;


import com.carmen.magazin_de_bijuterii.validators.NameConstraint;
import com.carmen.magazin_de_bijuterii.validators.PhoneNumberConstraint;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDto extends UserDto {
    private String country;
    private String city;
    private String street;
    private Integer number;
    private String phone;

}
