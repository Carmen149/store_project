package com.carmen.magazin_de_bijuterii.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Order(Ordered.HIGHEST_PRECEDENCE+1)
@ControllerAdvice
@RestController
@Slf4j
public class ControllerExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(value={ResourceNotFoundException.class})
    protected ResponseEntity<Object> handleApiExceptionResponse(ResourceNotFoundException ex) {
        HttpStatus status = ex.getStatus() != null ? ex.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        return responseEntityBuilder(ResourceNotFoundException.builder().fieldName(ex.getFieldName()).fieldValue(ex.getFieldValue()).status(status).resourceName(ex.getResourceName()).build());
    }
    private ResponseEntity<Object> responseEntityBuilder(ResourceNotFoundException ex){
        return new ResponseEntity<>(ex,ex.getStatus());
    }
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        String errorMessage = ex.getBindingResult().getFieldErrors().stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .findFirst()
                .orElse(ex.getMessage());
        return response(ex, request, HttpStatus.BAD_REQUEST, errorMessage);
    }

    private ResponseEntity<Object> response(Exception ex, WebRequest request, HttpStatus status, String message) {
        return handleExceptionInternal(ex, message, new HttpHeaders(), status, request);
    }
    @ExceptionHandler(ConstraintViolationException.class)

    ResponseEntity<Set<String>> handleConstraintViolation(ConstraintViolationException e) {
        Set<ConstraintViolation<?>> constraintViolations = e.getConstraintViolations();

        Set<String> messages = new HashSet<>(constraintViolations.size());
        messages.addAll(constraintViolations.stream()
                .map(constraintViolation -> String.format("%s value '%s' %s", constraintViolation.getPropertyPath(),
                        constraintViolation.getInvalidValue(), constraintViolation.getMessage()))
                .collect(Collectors.toList()));

        return new ResponseEntity<>(messages, HttpStatus.BAD_REQUEST);

    }
//    @ExceptionHandler({MethodArgumentNotValidException.class})
//    protected ResponseEntity<Object>handleValidationExceptions(MethodArgumentNotValidException ex)  {
//        HttpStatus status =  HttpStatus.INTERNAL_SERVER_ERROR;
//        String fieldName = ex.getFieldError().getField();
//        String errorMessage = ex.getMessage();
//        return responseEntityBuilder(ResourceNotFoundException.builder().fieldName(fieldName).fieldValue(status).resourceName(errorMessage).build());
//    }

    //    @ExceptionHandler(value={MethodArgumentNotValidException.class})
//    protected Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
//        Map<String, String> errors = new HashMap<>();
//        ex.getBindingResult().getAllErrors().forEach((error) -> {
//            String fieldName = ((FieldError) error).getField();
//            String errorMessage = error.getDefaultMessage();
//            errors.put(fieldName, errorMessage);
//        });
//        return errors;
//    }
//

//protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
//    List<String> errorList = ex
//            .getBindingResult()
//            .getFieldErrors()
//            .stream()
//            .map(fieldError -> fieldError.getDefaultMessage())
//            .collect(Collectors.toList());
//    ErrorDetails errorDetails = new ErrorDetails(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), errorList);
//    return handleExceptionInternal(ex, errorDetails, headers, errorDetails.getStatus(), request);
//}

}
