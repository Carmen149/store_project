package com.carmen.magazin_de_bijuterii.service.impl;

import com.carmen.magazin_de_bijuterii.constant.CsvReport;
import com.carmen.magazin_de_bijuterii.exception.ResourceNotFoundException;
import com.carmen.magazin_de_bijuterii.model.Command;
import com.carmen.magazin_de_bijuterii.model.OrderItem;
import com.carmen.magazin_de_bijuterii.model.OrderItemKey;
import com.carmen.magazin_de_bijuterii.model.products.Item;
import com.carmen.magazin_de_bijuterii.model.user.Customer;
import com.carmen.magazin_de_bijuterii.repository.CommandRepository;
import com.carmen.magazin_de_bijuterii.repository.CustomerRepository;
import com.carmen.magazin_de_bijuterii.repository.ItemRepository;
import com.carmen.magazin_de_bijuterii.repository.OrderItemRepository;
import com.carmen.magazin_de_bijuterii.service.CommandService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.*;

@Service
public class CommandServiceImpl extends Observable implements CommandService {
    private final CommandRepository commandRepository;
    private final CustomerRepository customerRepository;
    private final ItemRepository itemRepository;
    private final OrderItemRepository orderItemRepository;
    private final AdminServiceImpl adminServiceImpl;


    public CommandServiceImpl(CommandRepository commandRepository, CustomerRepository customerRepository, ItemRepository itemRepository, OrderItemRepository orderItemRepository,AdminServiceImpl adminServiceImpl) {

        this.commandRepository = commandRepository;
        this.customerRepository = customerRepository;
        this.itemRepository = itemRepository;
        this.orderItemRepository = orderItemRepository;
        this.adminServiceImpl=adminServiceImpl;

    }

    @Override
    public Command saveCommand(Long idItem, Long idCustomer) {
        //obtin item-ul si customer-ul pentru a le salva pentru comanda
        Optional<Item> item = itemRepository.findById(idItem);
        Optional<Customer> customer = customerRepository.findById(idCustomer);
        Command command;
        OrderItemKey key;
        OrderItem item_1;
        boolean ok = true;
        //caut ultima comanda ca sa verfic daca a fost deja creata comanda pentru clientul cu idCustomer si doar adaug produse la comanda
        command = commandRepository.findFirstByOrderByIdDesc();
        if (command != null) {
            //daca exista comanda gasita verific daca data comenzii este aceeasi cu data de azi si daca id-ul clientului este acelasi cu id-clientului curent
            if(!command.getStatus().equals("processed")){
                if (customer.get().getId().equals(command.getClient().getId()) && command.getDate().isEqual(LocalDate.now())) {
                    List<OrderItem> myList = orderItemRepository.findByIdOrderId(command.getId());
                    //verific daca exista deja produsul in comanda si cresc cantitatea
                    for (OrderItem itemOrder : myList) {
                        if (itemOrder.getItem().getIdItem().equals(idItem)) {
                            ok = false;
                            itemOrder.setCantity(itemOrder.getCantity() + 1);
                            orderItemRepository.save(itemOrder);
                        }
                    }
                    //daca nu exista il crez si il adaug la comanda
                    if (ok) {
                        key = new OrderItemKey(command.getId(), idItem);
                        item_1 = new OrderItem(key, command, item.get(), 1);
                        orderItemRepository.saveAndFlush(item_1);
                    }
                } else {
                    command = null;
                }
            }else{
                command=null;
            }

        }
        //daca nu exista comanda pentru client adaug comanda noua
        if (command == null) {
            command = new Command();
            command.setDate(LocalDate.now());
            command.setClient(customer.get());
            command.setStatus("new");
            commandRepository.save(command);
            command = commandRepository.findFirstByOrderByIdDesc();
            key = new OrderItemKey(command.getId(), idItem);
            item_1 = new OrderItem(key, command, item.get(), 1);
            orderItemRepository.saveAndFlush(item_1);
        }
        return command;

    }

    @Override
    public List<Command> getAllCommands() {
        return commandRepository.findAll();
    }

    @Override
    public Command getCommandById(Long id) {
        return commandRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Command", "Id", id, HttpStatus.NOT_FOUND));
    }

    @Override
    public Command updateCommand(Command command) {
        Command existingCommand = commandRepository.findById(command.getId()).orElseThrow(() -> new ResourceNotFoundException("Command", "Id", command.getId(), HttpStatus.NOT_FOUND));
        if (command.getClient() != null) {
            existingCommand.setClient(command.getClient());
        }
        if (command.getStatus() != null) {
            existingCommand.setStatus(command.getStatus());
        }
        if (command.getDate() != null) {
            existingCommand.setDate(command.getDate());
        }
        commandRepository.save(existingCommand);
        return existingCommand;
    }

    @Override
    @Transactional
    public void deleteCommand(Long id) {
        commandRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Command", "Id", id, HttpStatus.NOT_FOUND));
        List<OrderItem> orderItemList = orderItemRepository.findByIdOrderId(id);
        System.out.println(id);
        for (OrderItem o : orderItemList) {
            OrderItemKey key = new OrderItemKey(id, o.getId().getItemId());
            System.out.println(o.getId().getItemId());
            System.out.println(key.getItemId());
            System.out.println(key.getOrderId());
            orderItemRepository.deleteById(key);
        }
        commandRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void decreaseCantity(Long idCommand, Long idItem) {
        Command command = commandRepository.findById(idCommand).get();
        List<OrderItem> myList = orderItemRepository.findByIdOrderId(command.getId());
        int size = myList.size();
        for (OrderItem itemOrder : myList) {
            if (itemOrder.getItem().getIdItem().equals(idItem)) {
                if (itemOrder.getCantity() > 1) {
                    itemOrder.setCantity(itemOrder.getCantity() - 1);
                    orderItemRepository.save(itemOrder);
                } else {
                    OrderItemKey key = new OrderItemKey(idCommand, idItem);
                    orderItemRepository.deleteById(key);
                    if (size == 1) {
                        commandRepository.deleteById(idCommand);
                    }
                }
            }
        }
    }

    @Override
    public double calculatePrice(Long id) {
        Command command = commandRepository.findById(id).get();
        double price = 0.0;
        Item item;
        List<OrderItem> myList = orderItemRepository.findByIdOrderId(command.getId());
        for (OrderItem itemOrder : myList) {
            item=itemRepository.findById(itemOrder.getItem().getIdItem()).get();
            price+=item.getPrice()*itemOrder.getCantity();
        }
        command.setTotal(price);
        commandRepository.save(command);
        return price;
    }

    @Override
    public List<Item> getItemsCommand(Long id,List<Integer>cantity) {
        List<Item> items=new ArrayList<>();
        Long idItem;
        List<OrderItem> orderItemList = orderItemRepository.findByIdOrderId(id);
        for (OrderItem o : orderItemList) {
            idItem=(o.getId().getItemId());
            items.add(itemRepository.findById(idItem).get());
            cantity.add(o.getCantity());
        }
        return  items;
    }

    @Override
    public List<Item> getCommandItems(Long id) {
        List<Item> items=new ArrayList<>();
        Long idItem;
        List<OrderItem> orderItemList = orderItemRepository.findByIdOrderId(id);
        for (OrderItem o : orderItemList) {
            idItem=(o.getId().getItemId());
            items.add(itemRepository.findById(idItem).get());
        }
        Collections.sort(items);
        return  items;
    }
    @Override
    public int numberOfAppearances(Long id) {
        List<OrderItem>orderItemList=orderItemRepository.findOrderItemByItem(itemRepository.findById(id).get());
        return orderItemList.size();
    }

    @Override
    public String finishCommand(Long id) {
        Command command=commandRepository.findById(id).get();
        calculatePrice(id);
        List<Integer>cantity=new ArrayList<>();
        List<Item>items=getItemsCommand(id,cantity);
        String s="";
        Customer customer=command.getClient();
        s=s+"Comanda "+ command.getId()+", Data: "+command.getDate()+"\n";
        s=s+"Nume client: "+ customer.getFirstName()+" "+customer.getLastName()+"\n";
        s=s+"Telefon: "+customer.getPhone()+"\n";
        s=s+"Adresa:\n";
        s=s+"         Tara: "+customer.getCountry()+"\n";
        s=s+"         Oras: "+customer.getCity()+"\n";
        s=s+"         Strada: "+customer.getStreet()+" "+customer.getNumber()+"\n";
        s=s+"         Total comanda: "+command.getTotal()+"\n";
        s=s+"Lista produse:\n";
        for(int i=0;i<items.size();i++){
            s=s+"         "+items.get(i).getName()+" x"+cantity.get(i)+"\n";

        }
        String s1="";
        s1=s1+customer.getFirstName()+" "+customer.getLastName()+ "/"+customer.getEmail();
        String[] string= {s,s1};
        command.setStatus("processed");
        commandRepository.save(command);
        setChanged();
        notifyObservers(string);
        return s;
    }



    public void changed(Long id){
       this.addObserver(adminServiceImpl);
       String s=finishCommand(id);

    }

    @Override
    public List<Integer> getCantity(Long id) {
        List<Integer>cantity =new ArrayList<>();
        List<OrderItem> orderItemList = orderItemRepository.findByIdOrderId(id);
        List<Item>items=getCommandItems(id);
        for (int i=0;i<items.size();i++) {
            for(int j=0;j<orderItemList.size();j++){
                if(orderItemList.get(j).getId().getItemId()==items.get(i).getIdItem()){
                    cantity.add(orderItemList.get(j).getCantity());
                }
            }



        }

        return cantity;
    }

    @Override
    public List<String> itemsInADay(int month, int day, int year) {
        LocalDate ld=LocalDate.of(year,month,day);
        List<Command>commands=new ArrayList<>();
        Set<Item>items=new HashSet<>();
        List<String>result=new ArrayList<>();
        for(Command command:commandRepository.findAll()){
            if(command.getDate().equals(ld)){
                commands.add(command);
            }
        }
        System.out.println(commands.size());
        for(Command command:commands) {
            for(Item item:getCommandItems(command.getId())){
                items.add(item);
            }
        }
        for(Item item:items){
            String s=item.getName()+"/"+numberOfAppearances(item.getIdItem());
            result.add(s);
        }
            return result;
    }

    @Override
    public void createReportItem(int month, int day, int year) {
        List<String>items=itemsInADay(month,day,year);
        String nameFile="./"+LocalDate.of(year,month,day).toString()+".csv";
        CsvReport.createReportItem(items,nameFile);
    }


}

