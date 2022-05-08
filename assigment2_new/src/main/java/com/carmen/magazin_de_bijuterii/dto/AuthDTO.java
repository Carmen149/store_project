package com.carmen.magazin_de_bijuterii.dto;

import com.carmen.magazin_de_bijuterii.model.user.Role;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
public class AuthDTO {
    private String username;
    private String password;

}
