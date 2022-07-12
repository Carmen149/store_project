package com.carmen.magazin_de_bijuterii.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class CityValidator implements ConstraintValidator<CityConstraint, String> {
    private static final String CITY_PATTERN = "([a-zA-Z]{2,}[ '-]?([a-zA-Z][ -])?)*";

    public void initialize(CityConstraint city) {
    }
    @Override
    public boolean isValid(String city, ConstraintValidatorContext constraintValidatorContext) {
        Pattern pattern = Pattern.compile(CITY_PATTERN);
        return city != null && pattern.matcher(city).matches();
    }
}
