package com.carmen.magazin_de_bijuterii.dto;


import com.carmen.magazin_de_bijuterii.model.products.Item;
import com.carmen.magazin_de_bijuterii.validators.*;
import lombok.*;

import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import java.util.Set;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDto extends UserDto {
    @CountryConstraint(message = "Country name is mandatory. It should start with a capital letter and contain at least 3 characters.")
    private String country;
    @CityConstraint(message = "City name is mandatory. It should start with a capital letter and contain at least 3 characters.")
    private String city;
    @StreetConstraint(message = "Street name is mandatory. It should start with a capital letter and contain at least 3 characters.")
    private String street;
    private Integer number;
    @PhoneNumberConstraint(message = "Phone is mandatory. It should contain 10 digits.")
    private String phone;


}
