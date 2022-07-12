package com.carmen.magazin_de_bijuterii.service.impl;

import com.carmen.magazin_de_bijuterii.constant.JSONReport;
import com.carmen.magazin_de_bijuterii.dto.ItemDto;
import com.carmen.magazin_de_bijuterii.exception.ResourceNotFoundException;
import com.carmen.magazin_de_bijuterii.model.Comentariu;
import com.carmen.magazin_de_bijuterii.model.OrderItem;
import com.carmen.magazin_de_bijuterii.model.OrderItemKey;
import com.carmen.magazin_de_bijuterii.model.products.Item;
import com.carmen.magazin_de_bijuterii.model.products.Type;
import com.carmen.magazin_de_bijuterii.repository.CommandRepository;
import com.carmen.magazin_de_bijuterii.repository.ItemRepository;
import com.carmen.magazin_de_bijuterii.repository.OrderItemRepository;
import com.carmen.magazin_de_bijuterii.service.ItemService;
import com.carmen.magazin_de_bijuterii.utils.export.ExcelExporter;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.swing.*;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;


@Service
public class ItemServiceImpl implements ItemService {
    private final ItemRepository itemRepository;
    private final CommandRepository commandRepository;
    private final OrderItemRepository orderItemRepository;
    public ItemServiceImpl(ItemRepository itemRepository, CommandRepository commandRepository, OrderItemRepository orderItemRepository) {
        this.itemRepository=itemRepository;
        this.commandRepository=commandRepository;
        this.orderItemRepository=orderItemRepository;
    }


    @Override
    public Item saveItem(ItemDto itemDto) throws ConstraintViolationException {
        Item item=new Item();
        item.setType(itemDto.getType());
        item.setMaterial(itemDto.getMaterial());
        item.setPrice(itemDto.getPrice());
        item.setDescription(itemDto.getDescription());
        if(itemDto.getSize()==null || itemDto.getSize()==0 ) {item.setSize(null);}
        item.setName(itemDto.getName());
        item.setAvailability(itemDto.getAvailability());
        return itemRepository.save(item);
    }


    @Override
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }


    @Override
    public Item getItemById(Long id) {
        return itemRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Item","Id",id, HttpStatus.NOT_FOUND));
    }


    @Override
    public Item updateItem(ItemDto itemDto) {
        Item item=new Item();
        item.setIdItem(itemDto.getIdItem());
        item.setType(itemDto.getType());
        item.setMaterial(itemDto.getMaterial());
        item.setPrice(itemDto.getPrice());
        item.setDescription(itemDto.getDescription());
        item.setSize(itemDto.getSize());
        item.setName(itemDto.getName());
        Item existingItem=itemRepository.findById(item.getIdItem()).orElseThrow(()->new ResourceNotFoundException("Item","Id",item.getIdItem(),HttpStatus.NOT_FOUND));
        if (item.getAvailability() != null) {
            existingItem.setAvailability(item.getAvailability());
        }
        if(item.getDescription()!=null){
            existingItem.setDescription(item.getDescription());
        }
        if(item.getMaterial()!=null){
            existingItem.setMaterial(item.getMaterial());
        }
        if(item.getPrice()!=null){
            existingItem.setPrice(item.getPrice());
        }
        if(item.getSize()!=null){
            existingItem.setSize(item.getSize());
        }
        if(item.getType()!=null){
            existingItem.setType(item.getType());
        }
        if(item.getName()!=null){
            existingItem.setName(item.getName());
        }
        itemRepository.save(existingItem);
        return existingItem;
    }
    @Override
    @Transactional
    public void deleteItem(Long id) {
        itemRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Item","Id",id,HttpStatus.NOT_FOUND));
        Long idCommand=0L;
        List<Long>idCommands=new ArrayList<>();
        List<OrderItem> myItemsOrder=orderItemRepository.findAll();
        for(OrderItem i:myItemsOrder) {
            if(i.getId().getItemId().equals(id)) {
                idCommand=i.getId().getOrderId();
                OrderItemKey key=new OrderItemKey(idCommand,id);
                orderItemRepository.deleteById(key);
                idCommands.add(idCommand);

            }
        }
        if(idCommands.size()!=0) {
            for (Long commandId : idCommands) {
                commandRepository.deleteById(commandId);
            }
        }
        itemRepository.deleteById(id);
    }

    @Override
    public List<Item> filterPrice(Type type, Double priceMin, Double priceMax, List<Item> items) {
        List<Item>resultFilter=new ArrayList<>();
        for(Item item:items) {
            if(item.getType().equals(type)){
                if(item.getPrice()>=priceMin && item.getPrice()<=priceMax){
                    resultFilter.add(item);
                }
            }
        }
        return  resultFilter;
    }


    @Override
    public List<Item> filterAvailability(Type type, Boolean availability,List<Item> items) {
        List<Item>resultFilter=new ArrayList<>();
        for(Item item:items) {
            if(item.getType().equals(type)){
                if(item.getAvailability().equals(availability)){
                    resultFilter.add(item);
                }
            }
        }
        return  resultFilter;
    }


    @Override
    public List<Item> filterSize(Type type, Integer size,List<Item> items) {
        List<Item>resultFilter=new ArrayList<>();
        for(Item item:items) {
            if(item.getType().equals(type)){
                if(item.getSize()!=null && item.getSize().equals(size)){
                    resultFilter.add(item);
                }
            }
        }
        return  resultFilter;
    }


    @Override
    public List<Item> filterMaterial(Type type, String material,List<Item> items) {
        List<Item>resultFilter=new ArrayList<>();
        for(Item item:items) {
            if(item.getType().equals(type)){
                if(item.getMaterial().equals(material)){
                    resultFilter.add(item);
                }
            }
        }
        return  resultFilter;
    }


    @Override
    public List<Item> filterList(Type type, Double priceMin, Double priceMax, Boolean availability, Integer size, String material, Boolean ordonare,List<String> filters,List<Item> items) {
        System.out.println(filters);
        List<Item>resultFilter=items;
        if(filters.size()==1 && filters.get(0).equals("null")){
            resultFilter=getItemsByType(type.toString());
        }else{
            for(String filter:filters) {
                if(filter.contains("price")){
                    resultFilter=filterPrice(type,priceMin,priceMax,resultFilter);
                }
                if(filter.contains("availability")){
                    resultFilter=filterAvailability(type,availability,resultFilter);
                }
                if(filter.contains("size")){
                    resultFilter=filterSize(type,size,resultFilter);
                }
                if(filter.contains("material")){
                    resultFilter=filterMaterial(type,material,resultFilter);
                }
                if(filter.contains("ordonare")){
                    if(ordonare){
                        resultFilter=orderAsc(type);
                    }
                    else{
                        resultFilter=orderDesc(type);
                    }

                }
            }
        }

        return  resultFilter;
    }

    @Override
    public List<Item> orderAsc(Type type) {
        List<Item> items=itemRepository.findAll();
        List<Item>result=new ArrayList<>();
        for(Item item:items){
            if(item.getType().equals(type)){
                result.add(item);
            }
        }
        Collections.sort(result);
        return  result;
    }

    @Override
    public List<Item> orderDesc(Type type) {
        List<Item> items=itemRepository.findAll();
        List<Item>result=new ArrayList<>();
        Collections.sort(items);
        for(int i=items.size()-1;i >=0;i--){
            if(items.get(i).getType().equals(type)){
                result.add(items.get(i));
            }
        }
        return  result;
    }

    @Override
    public String exportItems(Double minPrice, Double maxPrice, Type type) {
        List<Item>items=getAllItems();
        items=filterPrice(type,minPrice,maxPrice,items);
        String nameFile="./"+type.toString()+".xls";
        String[] tableColumn = {"Item's name", "Price", "Type"};
        String[][] tableData = new String[items.size()][tableColumn.length];
        Item item;

            for(int i=0;i<items.size();i++){
              item=items.get(i);
              tableData[i][0]=item.getName();
              tableData[i][1]=item.getPrice().toString();
              tableData[i][2]=item.getType().toString();

            }
        JTable jTable = new JTable(tableData, tableColumn);
        ExcelExporter.fillData(jTable,nameFile);


        return null;
    }

    @Override
    public Item exportMaxItem(String type) {
        int max=0;
        //System.out.println(type.toLowerCase());
        Type newType=Type.parseType(type.toLowerCase());
        //System.out.println(newType);
        Item res=new Item();
        List<Item> items=new ArrayList<>();
        for(Item item : itemRepository.findAll()){
            if(item.getType().equals(newType)){
                items.add(item);
            }
        }
        for(Item item:items){
            List<OrderItem>orderItemList=orderItemRepository.findOrderItemByItem(itemRepository.findById(item.getIdItem()).get());
            if(orderItemList.size()>max) {
                max=orderItemList.size();
                res=item;
            }
        }
        return res;

    }

    @Override
    public List<Item> getItemsByType(String type) {
        Type newType=Type.parseType(type.toLowerCase());
        List<Item> items=new ArrayList<>();
        for(Item item:itemRepository.findAll()){
            if(item.getType().equals(newType)){
                items.add(item);
            }
        }
        return items;
    }

    @Override
    public void createReport() {
        List<Item>items=new ArrayList<>();
        List<Integer>ap=new ArrayList<>();
        List<OrderItem>orderItemList;
        Item item;
        String nameFile="./ItemMax.json";
        System.out.println(Type.RING.toString());
        item=exportMaxItem(Type.RING.toString());
        if(item.getIdItem()!=null){
            items.add(item);
            orderItemList=orderItemRepository.findOrderItemByItem(itemRepository.findById(item.getIdItem()).get());
            ap.add(orderItemList.size());

        }


        item=exportMaxItem(Type.BRACELET.toString());
        if(item.getIdItem()!=null){
            items.add(item);
            orderItemList=orderItemRepository.findOrderItemByItem(itemRepository.findById(item.getIdItem()).get());
            ap.add(orderItemList.size());

        }



        item=exportMaxItem(Type.EARRINGS.toString());
        if(item.getIdItem()!=null){
            items.add(item);
            orderItemList=orderItemRepository.findOrderItemByItem(itemRepository.findById(item.getIdItem()).get());
            ap.add(orderItemList.size());
        }



        item=exportMaxItem(Type.NECKLACE.toString());
        if (item.getIdItem()!=null) {
            items.add(item);
            orderItemList=orderItemRepository.findOrderItemByItem(itemRepository.findById(item.getIdItem()).get());
            ap.add(orderItemList.size());
        }



        item=exportMaxItem(Type.CHARM.toString());
        if(item.getIdItem()!=null){
            items.add(item);
            orderItemList=orderItemRepository.findOrderItemByItem(itemRepository.findById(item.getIdItem()).get());
            ap.add(orderItemList.size());
        }


        JSONReport.createJSONReport(items,ap,nameFile);
    }

    @Override
    public Set<Comentariu> getComentariu(Long id) {
        return itemRepository.findById(id).get().getComList();

    }
}
