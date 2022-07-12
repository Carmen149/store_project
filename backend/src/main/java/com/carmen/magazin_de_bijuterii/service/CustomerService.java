package com.carmen.magazin_de_bijuterii.service;


import com.carmen.magazin_de_bijuterii.dto.AuthDTO;
import com.carmen.magazin_de_bijuterii.dto.CustomerDto;
import com.carmen.magazin_de_bijuterii.model.Comentariu;
import com.carmen.magazin_de_bijuterii.model.Command;
import com.carmen.magazin_de_bijuterii.model.products.Item;
import com.carmen.magazin_de_bijuterii.model.user.Customer;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.List;
import java.util.Set;

@Service
public interface CustomerService {
    Customer saveCustomer(CustomerDto customerDto) throws DataIntegrityViolationException, MethodArgumentNotValidException, Exception, Throwable;
    List<Customer> getAllCustomers();
    Customer getCustomerById(Long id);
    Customer updateCustomer(CustomerDto customerDto);
    Customer deleteCustomer(Long id);
    Customer findByUserName(AuthDTO authDTO);
    void addMyFavoriteList(Long idCustomer, Long idItem);
    void removeMyFavoriteList(Long idCustomer, Long idItem);
    Set<Item> listMyFavoriteList(Long idCustomer);
    List<Command> getComands(Long id);
    void createReportFav(Long id);
    double startsWithUntil(Long id, int day1,int month1,int year1,int day2,int month2,int year2);
    void createReportStartsWithUntil(int day1,int month1,int year1,int day2,int month2,int year2);
    String exportCustomerDetails(Long id,String fileType);
    Customer logIn(AuthDTO authDTO);
    void logOut(Long id);
    Comentariu addComm(Long id, String com);
    Comentariu addComItem(Long idCustomer,Long idItem,String com);
    boolean checkedUserName(String userName);
}
