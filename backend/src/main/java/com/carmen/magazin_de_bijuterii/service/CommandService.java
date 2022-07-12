package com.carmen.magazin_de_bijuterii.service;

import com.carmen.magazin_de_bijuterii.model.Command;
import com.carmen.magazin_de_bijuterii.model.products.Item;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface CommandService {
    Command saveCommand(Long idItem, Long idCustomer);
    List<Command> getAllCommands();
    Command getCommandById(Long id);
    Command updateCommand(Command command);
    void deleteCommand(Long id);
    void decreaseCantity(Long idCommand,Long idItem);
    double calculatePrice(Long id);
    List<Item>getItemsCommand(Long id,List<Integer>cantity);
    List<Item>getCommandItems(Long id);
    int numberOfAppearances(Long id);
    String finishCommand(Long id);
    void changed(Long id);
    List<Integer> getCantity(Long id);
    List<String> itemsInADay(int month, int day, int year );
    void createReportItem(int month, int day, int year);
}