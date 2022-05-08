package com.carmen.magazin_de_bijuterii.validators;

import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;
@Component
public class NameValidator implements ConstraintValidator<NameConstraint, String> {
    //^[A-Za-z]+(?:[\s'-]+[A-Za-z]+)*(?=\s+[A-Z]{2}\s+\d+-\d+)$
    private static final String NAME_PATTERN = "^(?i)[a-z]([- ',.a-z]{1,40}[a-z ])?$";

    @Override
    public void initialize(NameConstraint name) {
    }
    @Override
    public boolean isValid(String name, ConstraintValidatorContext constraintValidatorContext) {
        Pattern pattern = Pattern.compile(NAME_PATTERN );
        return name!=null && pattern.matcher(name).matches();
    }
}
