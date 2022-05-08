package com.carmen.magazin_de_bijuterii.dto;



import lombok.*;


@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String userName;
    private String password;
    private String email;
}
