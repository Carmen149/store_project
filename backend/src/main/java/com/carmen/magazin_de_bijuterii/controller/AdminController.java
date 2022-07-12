package com.carmen.magazin_de_bijuterii.controller;

import com.carmen.magazin_de_bijuterii.constant.Feedback;
import com.carmen.magazin_de_bijuterii.dto.AdminDto;
import com.carmen.magazin_de_bijuterii.dto.AuthDTO;
import com.carmen.magazin_de_bijuterii.model.user.Admin;
import com.carmen.magazin_de_bijuterii.service.AdminService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.SneakyThrows;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/admin")
public class AdminController {
    private final AdminService adminService;
    public AdminController(AdminService adminService){
        super();
        this.adminService=adminService;
    }

    //build create admin REST API
    @SneakyThrows
    @ApiOperation(value = "This method saves an admin.",
                  notes = "Admin who will be added.")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message =  """
                                                "id": value generated for id,
                                                "firstName": value entered for firstName,
                                                "lastName": value entered for lastName,
                                                "userName": value entered for userName,
                                                "email": value entered for email,
                                                """),
            @ApiResponse(code = 400, message =  """
                                                Username is already used.
                            
                                                First name is mandatory. It should start with a capital letter and contain at least 3 characters.
                            
                                                Last name is mandatory. It should start with a capital letter and contain at least 3 characters.
                            
                                                User name is mandatory. It should  contain at least 3 characters.
                            
                                                Password is mandatory. It should contains at least 8 characters,one digit,one upper case alphabet,one lower case alphabet,one special character which includes "!@#$%&*()-+=^" and at most 20 characters.  It doesn’t contain any white space.
                            
                                                Email name is mandatory.
                                                """) })
    @PostMapping()
    public ResponseEntity<?> saveAdmin( @ApiParam(name =  "Admin") @RequestBody @Valid AdminDto adminDto){
        try{return new ResponseEntity<>(adminService.saveAdmin(adminDto), HttpStatus.CREATED);}
        catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>("Username is already used.", HttpStatus.BAD_REQUEST);
        }
    }


    //build get all customers REST API
    @ApiOperation(value = "List all admins.",
                  notes = "This method returns a list of admins.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved.")
    })
    @GetMapping
    public List<Admin> getAllAdmins(){
        return adminService.getAllAdmins();
    }


    //build get admin by id REST API
    @ApiOperation(value = "Get admin.",
                  notes = "This method return an admin by id.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message =  """
                                                "id": value,
                                                "firstName": value,
                                                "lastName": value,
                                                "userName": value,
                                                "email": value,
                                                """),
            @ApiResponse(code = 404, message =  """
                                                "resourceName": "Admin",
                                                "fieldName": "Id",
                                                "fieldValue": id,
                                                "status": "NOT_FOUND",
                                                "message": "Admin not found with Id : id\"""")})
    @GetMapping("{id}")
    public ResponseEntity<Admin> getAdminById( @ApiParam(value="Id of the admin to be obtained. Cannot be empty.", required = true,example = "1",type="Long")@PathVariable("id") Long adminId){
        return new ResponseEntity<>(adminService.getAdminById(adminId), HttpStatus.OK);
    }


    //build update admin REST API
    @ApiOperation(value = "Update admin.",
                  notes = "This method edits informations about an admin.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message =  """
                                                "id": value,
                                                "firstName": value,
                                                "lastName": value,
                                                "userName": value,
                                                "email": value,
                                                """),
            @ApiResponse(code = 500, message =  """
                                                "timestamp": "2022-04-27T13:55:34.275+00:00",
                                                "status": 500,
                                                "error": "Internal Server Error",
                                                "path": "/api/admin"
                                                """)})

    @PutMapping()
    public ResponseEntity<Admin> updateAdmin(@ApiParam(name = "Admin", value="Set only the fields you want to change, otherwise add null.")@RequestBody AdminDto adminDto){
        return new ResponseEntity<>(adminService.updateAdmin(adminDto), HttpStatus.OK);
    }


    //build delete customer REST API
    @ApiOperation(value = "Delete admin.",
                  notes = "This method delete an admin.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Admin deleted successfully."),
            @ApiResponse(code = 404, message =  """
                                                "resourceName": "Admin",
                                                "fieldName": "Id",
                                                "fieldValue": id,
                                                "status": "NOT_FOUND",
                                                "message": "Admin not found with Id : id\"""")
    })
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteAdmin( @ApiParam( type="Long", example = "1", value = "Id of the admin to be delete. Cannot be empty.")@PathVariable("id") Long id){
        //delete admin from database
        adminService.deleteAdmin(id);
        return new ResponseEntity<>("Admin deteted successfully.", HttpStatus.OK);
    }


    @PostMapping("/email")
    ResponseEntity<?> sendEmail(@RequestBody Feedback feedback,BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return new ResponseEntity("Feedback is not valid",HttpStatus.OK);
        }
        else{

            adminService.sendFeedBack(feedback,"bontea@yahoo.com");
            return new ResponseEntity<>("Email sent successfully.", HttpStatus.OK);
        }
    }
    @PutMapping("/login")
    ResponseEntity<Admin> logIn(@RequestBody AuthDTO authDTO){
        return new ResponseEntity<>(adminService.findByUserName(authDTO),HttpStatus.OK);
    }



}
