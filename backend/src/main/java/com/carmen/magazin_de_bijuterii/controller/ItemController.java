package com.carmen.magazin_de_bijuterii.controller;

import com.carmen.magazin_de_bijuterii.dto.ItemDto;
import com.carmen.magazin_de_bijuterii.model.Comentariu;
import com.carmen.magazin_de_bijuterii.model.products.Item;
import com.carmen.magazin_de_bijuterii.model.products.Type;
import com.carmen.magazin_de_bijuterii.service.ItemService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.Set;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/items")
public class ItemController {

    private final ItemService itemService;
    public ItemController(ItemService itemService){
        super();
        this.itemService=itemService;
    }


    //build create item REST API
    @ApiOperation(value = "This method saves an item.",
                  notes = "Item who will be added.")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message =  """
                                                "id": value generated for id,
                                                "price": value entered for price,
                                                "description": value entered for description,
                                                "material": value entered for material,
                                                "availability": value entered for availability,
                                                "size": value entered for size,
                                                "type": value entered for type.
                                                """),
            @ApiResponse(code = 400, message =  """
                                                Name is already used.
                            
                                                Name is mandatory. It should start with a capital letter and contain at least 3 characters.
                            
                                                Price is mandatory.
                                                
                                                Description is mandatory.
                            
                                                Material is mandatory.
                                                
                                                Material should be: argint, aur, aur roz, argint placat cu rodiu, argint placat cu aur roz, otel inoxidabil, platina.
                                                
                                                Availability is mandatory.
                            
                                                Type is mandatory.
                            
                                                """) })
    @PostMapping
    public ResponseEntity<?> saveItem(@ApiParam(name = "Item")@RequestBody @Valid ItemDto itemDto){
        try{
            return new ResponseEntity<>(itemService.saveItem(itemDto), HttpStatus.CREATED);}
        catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>("Name is already used", HttpStatus.BAD_REQUEST);
        }

    }


    //build get all items REST API
    @ApiOperation(value = "List all items.",
                  notes = "This method returns a list of items.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved.")
    })
    @GetMapping
    public List<Item> getAllItems()
    {
        return itemService.getAllItems();
    }


    //build get customer by id REST API
    @ApiOperation(value = "Get item.",
                  notes = "This method return an item by id.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message =  """
                                                "id": value,
                                                "name": value,
                                                "price": value,
                                                "description": value,
                                                "material": value,
                                                "availability": value,
                                                "size": value,
                                                "type": value,
                                                """),
            @ApiResponse(code = 404, message =  """
                                                "resourceName": "Item",
                                                "fieldName": "Id",
                                                "fieldValue": id,
                                                "status": "NOT_FOUND",
                                                "message": "Item not found with Id : id\"""")
    })
    @GetMapping("{id}")
    public ResponseEntity<Item> getItemById(@ApiParam(example = "1", value = "Id of the item to be obtained. Cannot be empty.",type = "Long")@PathVariable("id") Long itemId){
        return new ResponseEntity<>(itemService.getItemById(itemId), HttpStatus.OK);
    }

    //build update customer REST API
    @ApiOperation(value = "Update item.",
                  notes = "This method edits informations about an item.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message =  """
                                                "id": value,
                                                "name": value,
                                                "price": value,
                                                "description": value,
                                                "material": value,
                                                "availability": value,
                                                "size": value,
                                                "type": value,
                                                """),
            @ApiResponse(code = 404, message =  """
                                                "resourceName": "Item",
                                                "fieldName": "Id",
                                                "fieldValue": id,
                                                "status": "NOT_FOUND",
                                                "message": "Item not found with Id : id\"""")
    })
    @PutMapping()
    public ResponseEntity<Item> updateItem(@ApiParam( name = "Item", value="Set only the fields you want to change, otherwise add null.")@RequestBody ItemDto itemDto){
        return new ResponseEntity<>(itemService.updateItem(itemDto), HttpStatus.OK);
    }


    //build delete customer REST API
    @ApiOperation(value = "Delete item.",
                  notes = "This method delete an item.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Item deleted successfully."),
            @ApiResponse(code = 404, message =  """
                                                "resourceName": "Item",
                                                "fieldName": "Id",
                                                "fieldValue": id,
                                                "status": "NOT_FOUND",
                                                "message": "Item not found with Id : id\"""")
    })
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteItem(@ApiParam(example = "1", value = "Id of the item to be delete. Cannot be empty.",type = "Long")@PathVariable("id") Long id){
        //delete item from database
        itemService.deleteItem(id);
        return new ResponseEntity<>("Item deleted successfully.", HttpStatus.OK);
    }

    @GetMapping("price/{type}/{priceMin}/{priceMax}")
    public List<Item>filterPrice(@PathVariable("type") Type type, @PathVariable("priceMin") Double priceMin, @PathVariable("priceMax")Double priceMax){
        List<Item> items= itemService.getAllItems();
        return itemService.filterPrice(type,priceMin,priceMax,items);
    }
    @GetMapping("av/{type}/{availability}")
    public List<Item>filterAvailability(@PathVariable("type")Type type,@PathVariable("availability") int availability){
        List<Item> items= itemService.getAllItems();
        if(availability==1){
            return itemService.filterAvailability(type,true,items);
        }else{
            return itemService.filterAvailability(type,false,items);
        }

    }
    @GetMapping("size/{type}/{size}")
    public List<Item>filterSize(@PathVariable("type") Type type, @PathVariable("size") Integer size){
        List<Item> items= itemService.getAllItems();
        return itemService.filterSize(type,size,items);
    }
    @GetMapping("material/{type}/{material}")
    public List<Item>filterMaterial(@PathVariable("type") Type type, @PathVariable("material") String material){
        List<Item> items= itemService.getAllItems();
        return itemService.filterMaterial(type,material,items);
    }
    @GetMapping("{type}/{priceMin}/{priceMax}/{availability}/{size}/{material}/{ordonare}/{list}")
    public List<Item>filterList(@PathVariable("type") Type type, @PathVariable("priceMin") Double priceMin, @PathVariable("priceMax")Double priceMax,@PathVariable("availability") int availability,@PathVariable("size") Integer size, @PathVariable("material") String material,@PathVariable("ordonare") int ordonare, @PathVariable("list") List<String>list){
        List<Item> items= itemService.getAllItems();
        if(availability==1){
            if(ordonare==1)
            {
                return itemService.filterList(type,priceMin,priceMax,true,size,material,true,list,items);
            }else{
                return itemService.filterList(type,priceMin,priceMax,true,size,material,false,list,items);
            }

        }else{
            if(ordonare==1)
            {
                return itemService.filterList(type,priceMin,priceMax,false,size,material,true,list,items);
            }else{
                return itemService.filterList(type,priceMin,priceMax,false,size,material,false,list,items);
            }
        }
    }


    @GetMapping("/orderAsc/{type}")
    public ResponseEntity<List<Item>> orderAsc(@PathVariable("type") Type type) {
       return new ResponseEntity<>(itemService.orderAsc(type),HttpStatus.OK);
    }


    @GetMapping("/orderDesc/{type}")
    public ResponseEntity<List<Item>> orderDesc(@PathVariable("type") Type type) {
        return new ResponseEntity<>(itemService.orderDesc(type),HttpStatus.OK);
    }
    @GetMapping("export/{priceMin}/{priceMax}/{type}")
    public ResponseEntity<?>exportItems(@PathVariable("priceMin") Double priceMin,@PathVariable("priceMax") Double priceMax, @PathVariable("type") Type type){
        return  new ResponseEntity(itemService.exportItems(priceMin,priceMax,type),HttpStatus.OK);
    }
    @GetMapping("/exportType/{type}")
        public ResponseEntity<Item>exportMaxItem(@PathVariable("type") String type){
        return new ResponseEntity<>(itemService.exportMaxItem(type),HttpStatus.OK);
        }
    @GetMapping("/createReport")
    public ResponseEntity<String> createReport(){
        itemService.createReport();
        return new ResponseEntity<>("Report created succsesfuly",HttpStatus.OK);
    }
    @GetMapping("/get/{type}")
    public ResponseEntity<List<Item>>getItemsType(@PathVariable String type){
        return new ResponseEntity<>(itemService.getItemsByType(type),HttpStatus.OK);
    }
    @GetMapping("/getCom/{id}")
    public ResponseEntity<Set<Comentariu>>getCom(@PathVariable Long id) {
        return new ResponseEntity<Set<Comentariu>>(itemService.getComentariu(id),HttpStatus.OK);
    }
}
