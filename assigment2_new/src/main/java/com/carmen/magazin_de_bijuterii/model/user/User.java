package com.carmen.magazin_de_bijuterii.model.user;

import com.carmen.magazin_de_bijuterii.validators.EmailConstraint;
import com.carmen.magazin_de_bijuterii.validators.NameConstraint;
import com.carmen.magazin_de_bijuterii.validators.PasswordConstraint;
import com.carmen.magazin_de_bijuterii.validators.UserNameConstraint;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Data
@Inheritance(strategy=InheritanceType.TABLE_PER_CLASS)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NameConstraint(message = "First name is mandatory. It should start with a capital letter and contain at least 3 characters.")
    private String firstName;
    @NameConstraint(message = "Last name is mandatory. It should start with a capital letter and contain at least 3 characters.")
    private String lastName;
    @Column(unique = true, length=32)
    @UserNameConstraint( message = "User name is mandatory. It should  contain at least 3 characters.")
    private String userName;
    @PasswordConstraint(message = "Password is mandatory. It should contains at least 8 characters,one digit,one upper case alphabet,one lower case alphabet,one special character which includes \"!@#$%&*()-+=^\" and at most 20 characters. It doesn’t contain any white space.")
    private String password;
    @EmailConstraint(message ="Email is mandatory." )
    private String email;
    public User(String firstName, String lastName, String userName, String password, String email){
        this.firstName=firstName;
        this.lastName=lastName;
        this.userName=userName;
        this.password=password;
        this.email=email;
    }



}
