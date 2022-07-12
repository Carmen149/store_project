package com.carmen.magazin_de_bijuterii.validators;

import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

@Component
public class ItemNameValidator implements ConstraintValidator<ItemNameConstraint, String> {
    private static final String NAME_PATTERN = "([a-zA-Z]{3,}[ '-]?([a-zA-Z][ -])?)*";
    public void initialize(ItemNameConstraint name ) {
    }
    @Override
    public boolean isValid(String name, ConstraintValidatorContext constraintValidatorContext) {
        Pattern pattern = Pattern.compile(NAME_PATTERN);
        return name != null && pattern.matcher(name).matches();
    }
}