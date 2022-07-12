package com.carmen.magazin_de_bijuterii.service.impl;

import com.carmen.magazin_de_bijuterii.constant.CsvReport;
import com.carmen.magazin_de_bijuterii.constant.FileType;
import com.carmen.magazin_de_bijuterii.constant.NotificationEndpoints;
import com.carmen.magazin_de_bijuterii.dto.AuthDTO;
import com.carmen.magazin_de_bijuterii.dto.CustomerDto;
import com.carmen.magazin_de_bijuterii.exception.ResourceNotFoundException;
import com.carmen.magazin_de_bijuterii.model.*;
import com.carmen.magazin_de_bijuterii.model.products.Item;
import com.carmen.magazin_de_bijuterii.model.user.Customer;
import com.carmen.magazin_de_bijuterii.repository.*;
import com.carmen.magazin_de_bijuterii.service.CustomerService;
import com.carmen.magazin_de_bijuterii.utils.export.FileExporter;
import com.carmen.magazin_de_bijuterii.utils.export.TXTFileExporter;
import com.carmen.magazin_de_bijuterii.utils.export.XMLFileExporter;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolationException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Service
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;
    private final ComentariuRepository comentariuRepository;
    private final ItemRepository itemRepository;
    private final CommandRepository commandRepository;
    private final ActivityRepository activityRepository;
    private final OrderItemRepository orderItemRepository;
    private final SimpMessagingTemplate template;
    private final PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
    public CustomerServiceImpl(CustomerRepository customerRepository, ComentariuRepository comentariuRepository, ItemRepository itemRepository, CommandRepository commandRepository, ActivityRepository activityRepository, OrderItemRepository orderItemRepository, SimpMessagingTemplate template)
    {

        this.customerRepository=customerRepository;
        this.comentariuRepository = comentariuRepository;
        this.itemRepository=itemRepository;
        this.commandRepository=commandRepository;
        this.activityRepository=activityRepository;
        this.orderItemRepository = orderItemRepository;
        this.template = template;

    }

    @Override
    public Customer saveCustomer(CustomerDto customerDto) throws ConstraintViolationException {
        Customer customer=new Customer();
        String encodedPassword=this.passwordEncoder.encode(customerDto.getPassword());
        customer.setFirstName(customerDto.getFirstName());
        customer.setLastName(customerDto.getLastName());
        customer.setUserName(customerDto.getUserName());
        customer.setStreet(customerDto.getStreet());
        customer.setCity(customerDto.getCity());
        customer.setCountry(customerDto.getCountry());
        customer.setPassword(encodedPassword);
        customer.setPhone(customerDto.getPhone());
        customer.setEmail(customerDto.getEmail());
        customer.setNumber(customerDto.getNumber());
        Customer newCustomer=customerRepository.save(customer);
        if(newCustomer!=null){
            this.template.convertAndSend(NotificationEndpoints.USER_ADDITION,
                    "User with username "+newCustomer.getUserName()+" has been added succesfuly");

        }else{
            this.template.convertAndSend(NotificationEndpoints.USER_ADDITION,
                    "Something wont wrong, Try again");

        }
         return newCustomer;
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Customer","Id",id,HttpStatus.NOT_FOUND));
    }

    @Override
    public Customer updateCustomer(CustomerDto customerDto) {
        // we need to check whether employee with given id exist in database
        Customer customer=new Customer();
        customer.setId(customerDto.getId());
        customer.setFirstName(customerDto.getFirstName());
        customer.setLastName(customerDto.getLastName());
        customer.setUserName(customerDto.getUserName());
        customer.setStreet(customerDto.getStreet());
        customer.setCity(customerDto.getCity());
        customer.setCountry(customerDto.getCountry());
        customer.setNumber(customerDto.getNumber());
        customer.setPhone(customerDto.getPhone());
        customer.setEmail(customerDto.getEmail());
        customer.setNumber(customerDto.getNumber());
        Customer existingCustomer=customerRepository.findById(customer.getId()).orElseThrow(()->new ResourceNotFoundException("Customer","Id",customer.getId(),HttpStatus.NOT_FOUND));
        if(customer.getFirstName()!=null){
            existingCustomer.setFirstName(customer.getFirstName());
        }
        if(customer.getLastName()!=null){
            existingCustomer.setLastName(customer.getLastName());
        }
        if(customer.getEmail()!=null){
            existingCustomer.setEmail(customer.getEmail());
        }
        if(customer.getCity()!=null){
            existingCustomer.setCity(customer.getCity());
        }
        if(customer.getCountry()!=null){
            existingCustomer.setCountry(customer.getCountry());
        }

        if(customer.getPhone()!=null){
            existingCustomer.setPhone(customer.getPhone());
        }
        if(customer.getNumber()!=null){
            existingCustomer.setNumber(customer.getNumber());
        }
        if(customer.getMyFavoriteList()!=null){
            existingCustomer.setMyFavoriteList(customer.getMyFavoriteList());
        }
        if(customer.getStreet()!=null){
            existingCustomer.setStreet(customer.getStreet());
        }
        if(customer.getPassword()!=null){
            existingCustomer.setPassword(customer.getPassword());
        }
        // save existing customer to database
        customerRepository.save(existingCustomer);
        return existingCustomer;
    }

    @Override
    public Customer deleteCustomer(Long id) {
        // check whether a customer exist in database
        Customer customerDeleted=customerRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Customer","Id",id,HttpStatus.NOT_FOUND));
        List<Activity> activity=activityRepository.findActivityByIdClient(id);
        for(Activity a: activity){
            activityRepository.delete(a);
        }
        List<Comentariu> comentariu=comentariuRepository.findComentariuByCustomer_Id(id);
        List<Item>items=itemRepository.findAll();
        for(Comentariu c: comentariu){
            for(Item item:items){
                if(item.getComList()!=null && item.getComList().size()!=0){
                    for(Comentariu com: item.getComList())
                    {
                        if(c.equals(com)){
                            item.getComList().remove(c);
                            itemRepository.save(item);
                            break;
                        }
                    }

                }

            }
            comentariuRepository.deleteById(c.getIdComentariu());
        }
        List<Command>commands=commandRepository.findCommandByClient_Id(id);
        for(Command command:commands){
            List<OrderItem> orderItemList = orderItemRepository.findByIdOrderId(id);

            for (OrderItem o : orderItemList) {
                OrderItemKey key = new OrderItemKey(id, o.getId().getItemId());
                System.out.println(o.getId().getItemId());
                System.out.println(key.getItemId());
                System.out.println(key.getOrderId());
                orderItemRepository.deleteById(key);
            }
            commandRepository.deleteById(command.getId());
        }
        customerRepository.deleteById(id);
        return customerDeleted;
    }

    @Override
    public Customer findByUserName(AuthDTO authDTO) {
        Customer customer=customerRepository.findByUserName(authDTO.getUsername());

        if(customer==null){
            throw new ResourceNotFoundException("Customer","Username",authDTO.getUsername(), HttpStatus.NOT_FOUND);
        }
        else{
            if(this.passwordEncoder.matches(authDTO.getPassword(), customer.getPassword())){

            }else{
                throw new ResourceNotFoundException("Customer","Username",authDTO.getUsername(), HttpStatus.NOT_FOUND);
            }
        }
        return customer;
    }

    @Override
    public void addMyFavoriteList(Long idCustomer,Long idItem) {
        Customer customer=customerRepository.findById(idCustomer).get();
        Item item=itemRepository.findById(idItem).get();
        customer.getMyFavoriteList().add(item);
        customerRepository.save(customer);

    }
    public void removeMyFavoriteList(Long idCustomer,Long idItem)
    {
        Customer customer=customerRepository.findById(idCustomer).get();
        Item item=itemRepository.findById(idItem).get();
        customer.getMyFavoriteList().remove(item);
        customerRepository.save(customer);
    }

    @Override
    public Set<Item> listMyFavoriteList(Long idCustomer) {
        Customer customer=customerRepository.findById(idCustomer).get();
        return customer.getMyFavoriteList();
    }

    public void createReportFav(Long id){
        Set items=listMyFavoriteList(id);
        Customer customer=customerRepository.findById(id).get();
        String name="./"+customer.getFirstName()+"_"+customer.getLastName()+".csv";
        CsvReport.createReportFavList(items,name);
    }
    @Override
    public double startsWithUntil(Long id, int day1,int month1,int year1,int day2,int month2,int year2) {
        LocalDate date1=LocalDate.of(year1,month1,day1);
        LocalDate date2=LocalDate.of(year2,month2,day2);
        double sum=0;
        for(Command command:getComands(id)){
            if(command.getDate().compareTo(date1)>=0 && command.getDate().compareTo(date2)<=0){
                sum=sum+command.getTotal();
            }
        }
        return sum;
    }
    public void createReportStartsWithUntil(int day1,int month1,int year1,int day2,int month2,int year2){
        LocalDate date1=LocalDate.of(year1,month1,day1);
        LocalDate date2=LocalDate.of(year2,month2,day2);
        List<Customer> customers=customerRepository.findAll();
        Collections.sort(customers);
        List<Double> sum=new ArrayList<>();
        for(Customer customer:customers) {
            sum.add(startsWithUntil(customer.getId(),day1,month1,year1,day2,month2,year2));
        }
        System.out.println(customers.size());
        String name="./"+date1.toString()+"-"+date2.toString()+".csv";
        CsvReport.createReportCustomer(customers,sum,name);
    }

    @Override
    public String exportCustomerDetails(Long id, String fileType) {
       Customer customer=customerRepository.findById(id).get();
       String nameFile="./"+customer.getUserName()+" details.xml";
       String data;
       FileExporter fileExporter;
        if(fileType.equals(FileType.XML)){
            fileExporter=new XMLFileExporter();
            data=fileExporter.exportData(customer,nameFile);
            return data;
        }
        else if(fileType.equals(FileType.TXT)){
            fileExporter=new TXTFileExporter();
            data=fileExporter.exportData(customer,nameFile);
            return data;
        }

        return null;
    }

    @Override
    @Transactional
    public Customer logIn(AuthDTO authDTO) {
        Customer customer=null;
        try{
          customer=findByUserName(authDTO);
          List<Command>commands=commandRepository.findCommandByClient_Id(customer.getId());
            if(commands.size()!=0){
                for(Command command:commands){
                    if(command.getStatus().equals("new")){
                        List<OrderItem> orderItemList = orderItemRepository.findByIdOrderId(command.getId());

                        for (OrderItem o : orderItemList) {
                            OrderItemKey key = new OrderItemKey(command.getId(), o.getId().getItemId());
                            System.out.println(o.getId().getItemId());
                            System.out.println(key.getItemId());
                            System.out.println(key.getOrderId());
                            orderItemRepository.deleteById(key);
                        }
                        commandRepository.deleteById(command.getId());
                    }

                }

            }
              List<Activity> activity= activityRepository.findByIdClientOrderByIdDesc(customer.getId());
              Activity recent=null;
              for(Activity a:activity){
                  if(!(a.getDate().equals(LocalDate.now())) && a.getLogIn().equals("logIn")){
                      a.setLogIn("logOut");
                  }
                  if(a.getDate().equals(LocalDate.now())){
                      recent=a;
                      break;
                  }
              }

              if(recent!=null && recent.getLogIn().equals("logIn")) {

              }else{
                  activityRepository.save(new Activity(customer.getId(),customer.getUserName(),LocalDate.now(), LocalTime.now(),"logIn"));
              }
        }
        catch(ResourceNotFoundException ex){
            throw ex;
        }

        return customer;
    }

    @Override
    @Transactional
    public void logOut(Long id) {

        List<Command>commands=commandRepository.findCommandByClient_Id(id);
        if(commands.size()!=0) {
            Collections.sort(commands, Collections.reverseOrder());
             if(!commands.get(0).getStatus().equals("processed")) {
                 Command command = commands.get(0);
                 List<OrderItem> orderItemList = orderItemRepository.findByIdOrderId(command.getId());
                for (OrderItem o : orderItemList) {
                    OrderItemKey key = new OrderItemKey(command.getId(), o.getId().getItemId());
                    System.out.println(o.getId().getItemId());
                    System.out.println(key.getItemId());
                    System.out.println(key.getOrderId());
                    orderItemRepository.deleteById(key);
                }
                commandRepository.deleteById(command.getId());
            }
        }

        Activity activity= activityRepository.findByIdClientAndLogInIs(id,"logIn");
        if(activity!=null){
            activity.setLogOutTime(LocalTime.now());
            activity.setLogIn("logOut");
            activityRepository.save(activity);
        }


    }

    @Override
    public Comentariu addComm(Long id, String com) {
        Customer customer=customerRepository.findById(id).get();
        Comentariu comentariu=new Comentariu(customer,com);
        return comentariuRepository.save(comentariu);


    }

    @Override
    public Comentariu addComItem(Long idCustomer, Long idItem, String com) {
        Comentariu comentariu=addComm(idCustomer,com);
        Item item=itemRepository.findById(idItem).get();
        item.getComList().add(comentariu);
        itemRepository.save(item);
        return comentariu;

    }

    @Override
    public boolean checkedUserName(String userName) {
        List<Customer> customers=customerRepository.findAll();
        for(Customer c : customers){
            if(c.getUserName().equals(userName))
                return true;
        }
        return false;
    }

    @Override
    public List<Command> getComands(Long id) {
        Customer customer=customerRepository.findById(id).get();
        List<Command>commands=new ArrayList<>();
        for(Command command:commandRepository.findAll()){
            if(command.getClient().equals(customer)){
                commands.add(command);
            }
        }
        return commands;
    }


}
