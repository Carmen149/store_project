package com.carmen.magazin_de_bijuterii.controller;

import com.carmen.magazin_de_bijuterii.model.Command;
import com.carmen.magazin_de_bijuterii.model.products.Item;
import com.carmen.magazin_de_bijuterii.service.CommandService;
import io.swagger.annotations.*;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/command")
public class CommandController {
    private final CommandService commandService;
    public CommandController(CommandService commandService){
        super();
        this.commandService=commandService;
    }

    //build create admin REST API
    @SneakyThrows
    @ApiOperation(value = "Save command.",
                  notes = "This method creates a command with the id of a customer and the id of the product to be added to the cart.")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "It returns the customer with his information, command total, date and status."),
            @ApiResponse(code = 500, message =  """
                                                "timestamp": "Date & time",
                                                "status": 500,
                                                "error": "Internal Server Error",
                                                "path": "/api/command/idItem/idCustomer\"""")
    })
    @ApiImplicitParams({
            @ApiImplicitParam(name = "idItem", value = "Item's id. Cannot be empty.", required = true, example = "1",type = "Long"),
            @ApiImplicitParam(name = "idCustomer", value = "Customer's id. Cannot be empty.", required = true, example = "1",type = "Long")})

    @PutMapping("/{idItem}/{idCustomer}")
    public ResponseEntity<Command> saveCommand(@PathVariable Long idItem, @PathVariable Long idCustomer){
        return new ResponseEntity<>(commandService.saveCommand(idItem,idCustomer), HttpStatus.CREATED);
    }


    //build get all customers REST API
    @ApiOperation(value = "List all commands.",
                  notes = "This method returns a list of commands.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved.")
    })
    @GetMapping
    public List<Command> getAllCommand(){
        return commandService.getAllCommands();
    }


    //build get admin by Iid REST API
    @ApiOperation(value = "Get command.",
                  notes = "This method return a command by id.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "It returns the customer with his information, command total, date and status."),
            @ApiResponse(code = 404, message =  """
                                                "resourceName": "Command",
                                                "fieldName": "Id",
                                                "fieldValue": id,
                                                "status": "NOT_FOUND",
                                                "message": "Command not found with Id : id\"""")
    })
    @GetMapping("{id}")
    public ResponseEntity<Command> getComandById(@ApiParam(value="Id of the command to be obtained. Cannot be empty.", required = true,example = "1",type = "Long")@PathVariable("id") Long commandId){
        return new ResponseEntity<>(commandService.getCommandById(commandId), HttpStatus.OK);
    }


    //build update admin REST API
    @ApiOperation(value = "Update command.",
                  notes = "This method edits informations about a command.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message =  """
                                                "id": value,
                                                "client": his details,
                                                "status": value,
                                                "date": value,
                                                "total": value,
                                                """)})
    @PutMapping()
    public ResponseEntity<Command> updateCommand(@ApiParam(name = "Command", value="Set only the fields you want to change, otherwise add null.")@RequestBody Command command){
        return new ResponseEntity<>(commandService.updateCommand(command), HttpStatus.OK);
    }


    //build delete customer REST API
    @ApiOperation(value = "Delete command.",
                  notes = "This method delete a command.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Command deleted successfully."),
            @ApiResponse(code = 404, message =  """
                                                "resourceName": "Command",
                                                "fieldName": "Id",
                                                "fieldValue": id,
                                                "status": "NOT_FOUND",
                                                "message": "Command not found with Id : id\"""")
    })
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCommand(@ApiParam(example = "1", value = "Id of the command to be delete. Cannot be empty.",type = "Long")@PathVariable("id") Long id){
        //delete admin from database
        commandService.deleteCommand(id);
        return new ResponseEntity<>("Command deleted successfully.", HttpStatus.OK);
    }


    //build decrease cantity for an item REST API
    @ApiOperation(value = "Remove item from command.",
                  notes = "This method remove an existing item from the customer's command.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Item deleted successfully from command."),
            @ApiResponse(code = 500, message =  """
                                                "timestamp": "Date & time",
                                                "status": 500,
                                                "error": "Internal Server Error",
                                                "path": "/api/command/del/idCommand/idItem\"""")})
    @ApiImplicitParams({
            @ApiImplicitParam(name = "idCommand", value = "Command's id. Cannot be empty.", required = true,example = "1",type = "Long"),
            @ApiImplicitParam(name = "idItem", value = "Item's id. Cannot be empty.", required = true, example = "1",type = "Long")})

    @PutMapping("del/{idCommand}/{idItem}")
    public ResponseEntity<String> decreaseCantity(@PathVariable Long idCommand, @PathVariable Long idItem){
        commandService.decreaseCantity(idCommand,idItem);
        return new ResponseEntity<>("Item deleted successfully from command.", HttpStatus.OK);
    }


    //build calculate price for command REST API
    @ApiOperation(value = "Calculate price.",
                  notes = "This method calculate the total for the customer's command.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "The price from command id is price."),
            @ApiResponse(code = 500, message =  """
                                                "timestamp": "Date & time",
                                                "status": 500,
                                                "error": "Internal Server Error",
                                                "path": "/api/customers/calcul/id\"""")})
    @PutMapping("calcul/{id}")
    public ResponseEntity<Double> calculatePrice(@ApiParam(example = "1", value = "The command id for which the total is calculated. Cannot be empty.",type = "Long")@PathVariable Long id){
        double price=commandService.calculatePrice(id);
        return new ResponseEntity<>(price, HttpStatus.OK);
    }

    @GetMapping("command/{id}")
    public ResponseEntity<String> finishCommand(@PathVariable("id") Long id) {
        return new ResponseEntity<>(commandService.finishCommand(id),HttpStatus.OK);
    }

    @GetMapping("items/{id}")
    public ResponseEntity<List<Item>> getItemsCommand(@PathVariable("id") Long id){
        List<Integer>cantity=new ArrayList<>();
        return new ResponseEntity<>(commandService.getItemsCommand(id,cantity),HttpStatus.OK);
    }
    @GetMapping("itemsCommand/{id}")
    public ResponseEntity<List<Item>> getCommandItems(@PathVariable("id") Long id){
        return new ResponseEntity<>(commandService.getCommandItems(id),HttpStatus.OK);
    }

    @GetMapping("change/{id}")
    public ResponseEntity<String>changed(@PathVariable("id") Long id){
        commandService.changed(id);
        return new ResponseEntity<>("Chitanta tiparita.",HttpStatus.OK);
    }
    @GetMapping("item/{id}")
    public ResponseEntity<String>numberOfAppearances(@PathVariable("id") Long id){
        int n=commandService.numberOfAppearances(id);
        return new ResponseEntity<>("Number of appearances is "+n+".",HttpStatus.OK);
    }
    @GetMapping("{day}/{month}/{year}")
    public ResponseEntity<?>itemsInADay(@PathVariable("day")int day, @PathVariable("month")int month, @PathVariable("year")int year){
        List<String>result=commandService.itemsInADay(month,day,year);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
    @GetMapping("report/{day}/{month}/{year}")
    public ResponseEntity<?>createReportItem(@PathVariable("day")int day, @PathVariable("month")int month, @PathVariable("year")int year){
        commandService.createReportItem(month,day,year);
        return new ResponseEntity<>("Report created",HttpStatus.OK);
    }
    @GetMapping("getCantity/{id}")
    public ResponseEntity<List<Integer>> getCantity(@PathVariable Long id){
        return new ResponseEntity<>(commandService.getCantity(id),HttpStatus.OK);
    }


}
