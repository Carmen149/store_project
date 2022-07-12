package com.carmen.magazin_de_bijuterii;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;


@SpringBootApplication(exclude= SecurityAutoConfiguration.class)
@OpenAPIDefinition
public class MagazinDeBijuteriiApplication{

	public static void main(String[] args) {
		SpringApplication.run(MagazinDeBijuteriiApplication.class, args);
//		SpringApplicationBuilder builder = new SpringApplicationBuilder(MagazinDeBijuteriiApplication.class);
//		builder.headless(false);
//		builder.run(args);

	}

}
