package com.carmen.magazin_de_bijuterii.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class StreetValidator implements ConstraintValidator<StreetConstraint, String> {
    private static final String STREET_PATTERN = "([A-Z][a-z]{2,}[ '-]?([a-z][ -])?)*";

    public void initialize(StreetConstraint street) {
    }
    @Override
    public boolean isValid(String street, ConstraintValidatorContext constraintValidatorContext) {
        Pattern pattern = Pattern.compile(STREET_PATTERN);
        return street != null && pattern.matcher(street).matches();
    }
}
