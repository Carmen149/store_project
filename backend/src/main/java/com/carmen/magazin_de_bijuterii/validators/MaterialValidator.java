package com.carmen.magazin_de_bijuterii.validators;

import com.carmen.magazin_de_bijuterii.constant.Constant;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
@Component
public class MaterialValidator implements ConstraintValidator <MaterialConstraint, String>{
    @Override
    public void initialize(MaterialConstraint material) {
    }

    @Override
    public boolean isValid(String material, ConstraintValidatorContext context) {
        boolean ok=false;
        material.toLowerCase();
        for(String m: Constant.material){
            if(material.equals(m)){
                ok= true;
            }
        }
        return ok && material!=null;
    }
}