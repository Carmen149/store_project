package com.carmen.magazin_de_bijuterii.model.user;

import com.carmen.magazin_de_bijuterii.model.products.Item;
import com.carmen.magazin_de_bijuterii.validators.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@Entity
@Data
@XmlRootElement
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Customer extends User implements Comparable<Customer>{
    @CountryConstraint(message = "Country name is mandatory. It should start with a capital letter and contain at least 3 characters.")
    private String country;
    @CityConstraint(message = "City name is mandatory. It should start with a capital letter and contain at least 3 characters.")
    private String city;
    @StreetConstraint(message = "Street name is mandatory. It should start with a capital letter and contain at least 3 characters.")
    private String street;
    private Integer number;
    @PhoneNumberConstraint(message = "Phone is mandatory. It should contain 10 digits.")
    private String phone;
    @ManyToMany(cascade = {CascadeType.PERSIST})
    @JoinTable(
            name = "item_like",
            joinColumns = @JoinColumn(name = "id"),
            inverseJoinColumns = @JoinColumn(name = "idItem"))
    private Set<Item> myFavoriteList;
    public Customer() {

    }
    public Customer(String firstName,String lastName,String userName,String password,String email,String country,String city,String street, Integer number, String phone)
    {
        super(firstName,lastName,userName,password,email);
        this.country=country;
        this.city=city;
        this.street=street;
        this.phone=phone;
        this.number=number;
        this.myFavoriteList=new HashSet<>();
    }

    @Override
    public int compareTo(Customer customer) {
        String name1=this.getLastName()+" "+this.getFirstName();
        String name2=customer.getLastName()+" "+customer.getFirstName();
        return name1.compareTo(name2);
    }
}
