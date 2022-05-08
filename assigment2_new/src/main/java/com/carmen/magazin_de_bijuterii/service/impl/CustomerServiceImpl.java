package com.carmen.magazin_de_bijuterii.service.impl;

import com.carmen.magazin_de_bijuterii.Constant.CsvReport;
import com.carmen.magazin_de_bijuterii.Constant.FileType;
import com.carmen.magazin_de_bijuterii.dto.AuthDTO;
import com.carmen.magazin_de_bijuterii.dto.CustomerDto;
import com.carmen.magazin_de_bijuterii.exception.ResourceNotFoundException;
import com.carmen.magazin_de_bijuterii.model.Command;
import com.carmen.magazin_de_bijuterii.model.products.Item;
import com.carmen.magazin_de_bijuterii.model.user.Customer;
import com.carmen.magazin_de_bijuterii.repository.CommandRepository;
import com.carmen.magazin_de_bijuterii.repository.CustomerRepository;
import com.carmen.magazin_de_bijuterii.repository.ItemRepository;
import com.carmen.magazin_de_bijuterii.service.CustomerService;
import com.carmen.magazin_de_bijuterii.utils.export.FileExporter;
import com.carmen.magazin_de_bijuterii.utils.export.TXTFileExporter;
import com.carmen.magazin_de_bijuterii.utils.export.XMLFileExporter;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolationException;
import javax.xml.bind.SchemaOutputResolver;
import java.time.LocalDate;
import java.util.*;

@Service
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;
    private final ItemRepository itemRepository;
    private final CommandRepository commandRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository,ItemRepository itemRepository,CommandRepository commandRepository){

        this.customerRepository=customerRepository;
        this.itemRepository=itemRepository;
        this.commandRepository=commandRepository;
    }
    @Override
    public Customer saveCustomer(CustomerDto customerDto) throws ConstraintViolationException {
        Customer customer=new Customer();
        customer.setFirstName(customerDto.getFirstName());
        customer.setLastName(customerDto.getLastName());
        customer.setUserName(customerDto.getUserName());
        customer.setStreet(customerDto.getStreet());
        customer.setCity(customerDto.getCity());
        customer.setCountry(customerDto.getCountry());
        customer.setPassword(customerDto.getPassword());
        customer.setPhone(customerDto.getPhone());
        customer.setEmail(customerDto.getEmail());
        customer.setNumber(customerDto.getNumber());
        return customerRepository.save(customer);
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Customer getCustomerById(Long id) {
//        Optional<Customer> customer= customerRepository.findById(id);
//        if(customer.isPresent()){
//            return customer.get();
//        }else{
//            throw new ResourceNotFoundException("Customer","Id",id);
//        }
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
        customerRepository.deleteById(id);
        return customerDeleted;
    }

    @Override
    public Customer findByUserName(AuthDTO authDTO) {
        Customer customer=customerRepository.findByUserNameAndPassword(authDTO.getUsername(),authDTO.getPassword());
        if(customer==null){
            throw new ResourceNotFoundException("Customer","Username",authDTO.getUsername(), HttpStatus.NOT_FOUND);
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
