package com.carmen.magazin_de_bijuterii.service;

import com.carmen.magazin_de_bijuterii.dto.ItemDto;
import com.carmen.magazin_de_bijuterii.model.Comentariu;
import com.carmen.magazin_de_bijuterii.model.products.Item;
import com.carmen.magazin_de_bijuterii.model.products.Type;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Set;

@Service
public interface ItemService {
    Item saveItem(ItemDto itemDto);
    List<Item> getAllItems();
    Item getItemById(Long id);
    Item updateItem(ItemDto itemDto);
    void deleteItem(Long id);
    List<Item>filterPrice(Type type,Double priceMin, Double priceMax,List<Item> items);
    List<Item>filterAvailability(Type type, Boolean availability,List<Item> items);
    List<Item>filterSize(Type type,Integer size,List<Item> items);
    List<Item>filterMaterial(Type type,String material,List<Item> items);
    List<Item>filterList(Type type,Double priceMin, Double priceMax,Boolean availability,Integer size,String material,Boolean ordonare,List<String>filters,List<Item> items);
    List<Item>orderAsc(Type type);
    List<Item>orderDesc(Type type);
    String exportItems(Double minPrice, Double maxPrice,Type type);
    Item exportMaxItem(String type);
    List<Item> getItemsByType(String type);
    void createReport();
    Set<Comentariu> getComentariu(Long id);
    }
