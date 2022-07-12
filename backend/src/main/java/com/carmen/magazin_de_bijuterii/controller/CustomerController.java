package com.carmen.magazin_de_bijuterii.controller;

import com.carmen.magazin_de_bijuterii.dto.AuthDTO;
import com.carmen.magazin_de_bijuterii.dto.CustomerDto;
import com.carmen.magazin_de_bijuterii.exception.ResourceNotFoundException;
import com.carmen.magazin_de_bijuterii.model.Comentariu;
import com.carmen.magazin_de_bijuterii.model.Command;
import com.carmen.magazin_de_bijuterii.model.user.Customer;
import com.carmen.magazin_de_bijuterii.service.CommandService;
import com.carmen.magazin_de_bijuterii.service.CustomerService;
import io.swagger.annotations.*;
import lombok.SneakyThrows;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.Set;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/customers")
public class CustomerController {
    private final CustomerService customerService;
    private final CommandService commandService;

    public CustomerController(CustomerService customerService,CommandService commandService){
        super();
        this.customerService=customerService;
        this.commandService=commandService;
    }


    //build create customer REST API
    //@SneakyThrows
    @SneakyThrows
    @ApiOperation(value = "This method saves a customer.",
                  notes = "Customer who will be added.")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message =  """
                                                "id": value generated for id,
                                                "firstName": value entered for firstName,
                                                "lastName": value entered for lastName,
                                                "userName": value entered for userName,
                                                "email": value entered for email,
                                                "country": value entered for country,
                                                "city": value entered for city,
                                                "street": value entered for street,
                                                "number": value entered for number,
                                                "phone": value entered for phone,
                                                "myFavoriteList":  value entered for myFavoriteList,
                                                """),
            @ApiResponse(code = 400, message = """
                                                Username is already used.
                            
                                                First name is mandatory. It should start with a capital letter and contain at least 3 characters.
                            
                                                Last name is mandatory. It should start with a capital letter and contain at least 3 characters.
                            
                                                User name is mandatory. It should  contain at least 3 characters.
                            
                                                Password is mandatory. It should contains at least 8 characters,one digit,one upper case alphabet,one lower case alphabet,one special character which includes "!@#$%&*()-+=^" and at most 20 characters.  It doesn’t contain any white space.
                            
                                                Email is mandatory.
                            
                                                Country name is mandatory. It should start with a capital letter and contain at least 3 characters.
                            
                                                City name is mandatory. It should start with a capital letter and contain at least 3 characters.
                            
                                                Street name is mandatory. It should start with a capital letter and contain at least 3 characters.
                            
                                                Phone is mandatory. It should contain 10 digits.
                            
                                                """) })
    @PostMapping()
    public ResponseEntity<?> saveCustomer(@ApiParam(name = "Customer") @RequestBody @Valid CustomerDto customerDto) {
        try {
            return new ResponseEntity<>(customerService.saveCustomer(customerDto), HttpStatus.CREATED);


        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>("Username is already used.", HttpStatus.BAD_REQUEST);
       }
    }


    //build get all customers Rest Api
    @ApiOperation(value = "List all customers.",
                  notes = "This method returns a list of customers.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved.")
    })
    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return new ResponseEntity<>(customerService.getAllCustomers(),HttpStatus.OK);
    }


    // build get customer by id REST API
    @ApiOperation(value = "Get customer.",
                  notes = "This method return a customer by id.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message =  """
                                                "id": value,
                                                "firstName": value,
                                                "lastName": value,
                                                "userName": value,
                                                "email": value,
                                                "country": value,
                                                "city": value,
                                                "street": value,
                                                "number": value,
                                                "phone": value,
                                                "myFavoriteList": value,
                                                """),
            @ApiResponse(code = 404, message =  """
                                                "resourceName": "Customer",
                                                "fieldName": "Id",
                                                "fieldValue": id,
                                                "status": "NOT_FOUND",
                                                "message": "Customer not found with Id : id\"""")
    })
    @GetMapping("{id}")
    public ResponseEntity<Customer> getCustomerById(@ApiParam(value="Id of the customer to be obtained. Cannot be empty.", required = true,example = "1",type = "Long") @PathVariable("id")   Long customerId){
        return new ResponseEntity<>(customerService.getCustomerById(customerId), HttpStatus.OK);
    }


    // build update customer REST API
    @ApiOperation(value = "Update customer.",
                  notes = "This method edits informations about a customer.")
    @ApiResponses(value = {
                    @ApiResponse(code = 200, message =  """
                                                        "id": value,
                                                        "firstName": value,
                                                        "lastName": value,
                                                        "userName": value,
                                                        "email": value,
                                                        "country": value,
                                                        "city": value,
                                                        "street": value,
                                                        "number": value,
                                                        "phone": value,
                                                        "myFavoriteList": value,
                                                        """),
                    @ApiResponse(code = 404, message =  """
                                                        "resourceName": "Customer",
                                                        "fieldName": "Id",
                                                        "fieldValue": id,
                                                        "status": "NOT_FOUND",
                                                        "message": "Customer not found with Id : id\"""")})
    @PutMapping()
    public ResponseEntity<Customer> updateCustomer(@ApiParam(name = "CustomerDto", value="Set only the fields you want to change, otherwise add null.")@RequestBody CustomerDto customerDto){
        return new ResponseEntity<>(customerService.updateCustomer(customerDto), HttpStatus.OK);
    }


    // build delete customer REST API
    @ApiOperation(value = "Delete customer.",
                  notes = "This method delete a customer.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Customer deleted successfully."),
            @ApiResponse(code = 404, message =  """
                                                "resourceName": "Customer",
                                                "fieldName": "Id",
                                                "fieldValue": id,
                                                "status": "NOT_FOUND",
                                                "message": "Customer not found with Id : id\"""")
                                })
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCustomer( @ApiParam(example = "1", value = "Id of the customer to be delete. Cannot be empty.",type = "Long")@PathVariable("id") Long id){
        //delete customer from database
        List<Command>commands=commandService.getAllCommands();
        for(Command command:commands){
            if(command.getClient().getId().equals(id)){
                commandService.deleteCommand(command.getId());
            }
        }
        customerService.deleteCustomer(id);
        return new ResponseEntity<>("Customer deleted successfully.", HttpStatus.OK);
    }


    //build add item to myFavoriteList REST API
    @ApiOperation(value = "Add item to myFavoriteList.",
                  notes = "This method adds a new item to the customer's favorites list.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Item added successfully."),
            @ApiResponse(code = 500, message =  """
                                                "timestamp": "2022-04-26T21:02:36.394+00:00",
                                                "status": 500,
                                                "error": "Internal Server Error",
                                                "path": "/api/customers/add/idCustomer/idItem\"""")})
    @ApiImplicitParams({
            @ApiImplicitParam(name = "idCustomer", value = "Customers's id. Cannot be empty.", required = true,example = "1",type = "Long"),
            @ApiImplicitParam(name = "idItem", value = "Item's id. Cannot be empty.", required = true, example = "1",type = "Long")})
    @PostMapping("add/{idCustomer}/{idItem}")
    public ResponseEntity<String> addToMyFavoriteList(@PathVariable Long idCustomer, @PathVariable Long idItem ) {
        customerService.addMyFavoriteList(idCustomer,idItem);
        return new ResponseEntity<>("Item added successfully", HttpStatus.OK);
    }


    //build remove item to myFavoriteList REST API
    @ApiOperation(value = "Remove item to myFavoriteList.",
                  notes = "This method deletes an existing  item from the customer's favorites list.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Item removed successfully"),
            @ApiResponse(code = 500, message =  """
                                                "timestamp": "2022-04-26T21:02:36.394+00:00",
                                                "status": 500,
                                                "error": "Internal Server Error",
                                                "path": "/api/customers/del/idCustomer/idItem\"""")})
    @ApiImplicitParams({
            @ApiImplicitParam(name = "idCustomer", value = "Customers's id. Cannot be empty.", required = true, type = "Long",example = "1"),
            @ApiImplicitParam(name = "idItem", value = "Item's id. Cannot be empty.", required = true, type = "Long",example = "1")})

    @DeleteMapping("del/{idCustomer}/{idItem}")
    public ResponseEntity<String> removeToMyFavoriteList(@PathVariable Long idCustomer, @PathVariable Long idItem ) {
        customerService.removeMyFavoriteList(idCustomer,idItem);
        return new ResponseEntity<>("Item removed successfully.", HttpStatus.OK);
    }
    @GetMapping("myFv/{idCustomer}")
    public ResponseEntity<Set> listMyFavoriteList(@PathVariable("idCustomer") Long idCustomer) {
        return new ResponseEntity<>( customerService.listMyFavoriteList(idCustomer),HttpStatus.OK);
    }
    @GetMapping("report/{id}")
    public ResponseEntity<String> createReportFav(@PathVariable("id") Long id) {
        customerService.createReportFav(id);
        return new ResponseEntity<>("Report created",HttpStatus.OK);
    }
    @GetMapping("reportDate/{id}/{day1}/{month1}/{year1}/{day2}/{month2}/{year2}")
    public ResponseEntity<Double>startsWithUntil(@PathVariable("id")Long id,@PathVariable("day1")int day1,@PathVariable("month1")int month1,@PathVariable("year1")int year1,@PathVariable("day2")int day2,@PathVariable("month2") int month2, @PathVariable("year2")int year2){
        return new ResponseEntity<>(customerService.startsWithUntil(id,day1,month1,year1,day2,month2,year2),HttpStatus.OK);
    }
    @GetMapping("reportCustomers/{day1}/{month1}/{year1}/{day2}/{month2}/{year2}")
    public ResponseEntity<String>createReportStartsWithUntil(@PathVariable("day1")int day1,@PathVariable("month1")int month1,@PathVariable("year1")int year1,@PathVariable("day2")int day2,@PathVariable("month2") int month2, @PathVariable("year2")int year2){
        customerService.createReportStartsWithUntil(day1,month1,year1,day2,month2,year2);
        return new ResponseEntity<>("Report created.",HttpStatus.OK);
    }
    @GetMapping("/export/{id}/{fileType}")
    public ResponseEntity<?>exportCustomerDetails(@PathVariable("id") Long id,@PathVariable("fileType") String fileType)
    {
        return new ResponseEntity(customerService.exportCustomerDetails(id,fileType),HttpStatus.OK);
    }
    @PutMapping("/logIn")
    public ResponseEntity<?>logIn(@RequestBody AuthDTO authDTO){
        try{
            return new ResponseEntity<Customer>(customerService.logIn(authDTO),HttpStatus.OK);
        }
        catch (ResourceNotFoundException ex){
            return new ResponseEntity<String>(ex.getStatus().toString(),HttpStatus.BAD_REQUEST);

        }

    }
    @PutMapping("/logOut/{id}")
    public ResponseEntity<String>logOut(@PathVariable("id") Long id){
        customerService.logOut(id);
        return new ResponseEntity<>("Log out",HttpStatus.OK);
    }
    @PutMapping("addCom/{id}/{com}")
    public ResponseEntity<?>addCom(@PathVariable("id") Long id, @PathVariable("com") String com){
        return new ResponseEntity<Comentariu>(customerService.addComm(id,com),HttpStatus.OK);
    }
    @PutMapping("addComItem/{idCustomer}/{idItem}/{com}")
    public ResponseEntity<?>addComItem(@PathVariable("idCustomer") Long idCustomer, @PathVariable("idItem") Long idItem, @PathVariable("com") String com){
        customerService.addComItem(idCustomer,idItem,com);
        return new ResponseEntity<String>("Comentariu added succesfuly",HttpStatus.OK);
    }
    @GetMapping("checkedUserName/{userName}")
    public ResponseEntity<String>checkedUserName(@PathVariable("userName") String userName){
        if(customerService.checkedUserName(userName)){
            return new ResponseEntity<>("UserName already use",HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("",HttpStatus.OK);
        }
    }
}
