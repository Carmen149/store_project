package com.carmen.magazin_de_bijuterii.validators;

import com.carmen.magazin_de_bijuterii.model.products.Type;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Component
public class TypeValidator implements ConstraintValidator<TypeConstraint, Type> {
    @Override
    public void initialize(TypeConstraint type) {
    }

    @Override
    public boolean isValid(Type type, ConstraintValidatorContext constraintValidatorContext) {
        if (type == null) {
            return false;
        }else{
            if (type.equals(Type.BRACELET) || type.equals(Type.RING) || type.equals(Type.CHARM) || type.equals(Type.EARRINGS) || type.equals(Type.NECKLACE)) {
                return true;
            } else {
                return false;
            }
        }

    }
}
