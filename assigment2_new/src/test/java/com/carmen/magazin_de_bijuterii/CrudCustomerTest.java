package com.carmen.magazin_de_bijuterii;

import com.carmen.magazin_de_bijuterii.dto.CustomerDto;
import com.carmen.magazin_de_bijuterii.exception.ResourceNotFoundException;
import com.carmen.magazin_de_bijuterii.model.user.Customer;
import com.carmen.magazin_de_bijuterii.repository.CustomerRepository;
import com.carmen.magazin_de_bijuterii.service.impl.CustomerServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Optional;


import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


//@RunWith(MockitoJUnitRunner.class)
//public class CrudCustomerTest {
//    @Mock
//    private CustomerRepository customerRepository;
//    @InjectMocks
//    private CustomerServiceImpl customerService;
//    @Test
//    public void whenSaveCustomer_shouldReturnCustomer() {
//        CustomerDto customer=new CustomerDto("Amalia","Pop","ama_12","ciocolata","amalia_2001@gmail.com","Spania","Madrid","Sagrada Familia",23,"0755865290");
//        when(customerRepository.save(ArgumentMatchers.any(Customer.class))).thenReturn(customer);
//        Customer created=customerService.saveCustomer(customer);
//        assertThat(created.getFirstName()).isSameAs(customer.getFirstName());
//        assertThat(created.getLastName()).isSameAs(customer.getLastName());
//        assertThat(created.getCity()).isSameAs(customer.getCity());
//        assertThat(created.getCountry()).isSameAs(customer.getCountry());
//        assertThat(created.getNumber()).isSameAs(customer.getNumber());
//        assertThat(created.getEmail()).isSameAs(customer.getEmail());
//        assertThat(created.getPassword()).isSameAs(customer.getPassword());
//        assertThat(created.getStreet()).isSameAs(customer.getStreet());
//        assertThat(created.getPhone()).isSameAs(customer.getPhone());
//        assertThat(created.getId()).isSameAs(customer.getId());
//        assertThat(created.getUserName()).isSameAs(customer.getUserName());
//        assertThat(created.getMyFavoriteList()).isSameAs(customer.getMyFavoriteList());
//        verify(customerRepository).save(customer);
//    }
//    @Test
//    public void whenGivenId_shouldDeleteCustomer_ifFound(){
//        Customer customer=new Customer();
//        customer.setId(11L);
//        when(customerRepository.findById(customer.getId())).thenReturn(Optional.of(customer));
//        Customer customerDeleted=customerService.deleteCustomer(customer.getId());
//        assertThat(customerDeleted.getFirstName()).isSameAs(customer.getFirstName());
//        assertThat(customerDeleted.getLastName()).isSameAs(customer.getLastName());
//        assertThat(customerDeleted.getCity()).isSameAs(customer.getCity());
//        assertThat(customerDeleted.getCountry()).isSameAs(customer.getCountry());
//        assertThat(customerDeleted.getNumber()).isSameAs(customer.getNumber());
//        assertThat(customerDeleted.getEmail()).isSameAs(customer.getEmail());
//        assertThat(customerDeleted.getPassword()).isSameAs(customer.getPassword());
//        assertThat(customerDeleted.getStreet()).isSameAs(customer.getStreet());
//        assertThat(customerDeleted.getPhone()).isSameAs(customer.getPhone());
//        assertThat(customerDeleted.getId()).isSameAs(customer.getId());
//        assertThat(customerDeleted.getUserName()).isSameAs(customer.getUserName());
//        assertThat(customerDeleted.getMyFavoriteList()).isSameAs(customer.getMyFavoriteList());
//        verify(customerRepository).deleteById(customer.getId());
//    }
//    @Test(expected = ResourceNotFoundException.class)
//    public void should_throw_exception_when_customer_doesnt_exist_delete(){
//        Customer customer=new Customer();
//        customer.setId(90L);
//        customer.setUserName("anonim");
//        given(customerRepository.findById(anyLong())).willReturn(Optional.ofNullable(null));
//        customerService.deleteCustomer(customer.getId());
//
//    }
//    @Test
//    public void whenGivenId_shouldUpdateCustomer_ifFound(){
//        Customer customer=new Customer();
//        Customer newCustomer=new Customer();
//        newCustomer.setId(1L);
//        newCustomer.setStreet("Galaxiei");
//        given(customerRepository.findById(newCustomer.getId())).willReturn(Optional.of(customer));
//        Customer updatedCustomer=customerService.updateCustomer(newCustomer);
//        verify(customerRepository).save(updatedCustomer);
//        assertThat(updatedCustomer.getFirstName()).isSameAs(customer.getFirstName());
//        assertThat(updatedCustomer.getLastName()).isSameAs(customer.getLastName());
//        assertThat(updatedCustomer.getCity()).isSameAs(customer.getCity());
//        assertThat(updatedCustomer.getCountry()).isSameAs(customer.getCountry());
//        assertThat(updatedCustomer.getNumber()).isSameAs(customer.getNumber());
//        assertThat(updatedCustomer.getEmail()).isSameAs(customer.getEmail());
//        assertThat(updatedCustomer.getPassword()).isSameAs(customer.getPassword());
//        assertThat(updatedCustomer.getStreet()).isSameAs(customer.getStreet());
//        assertThat(updatedCustomer.getPhone()).isSameAs(customer.getPhone());
//        assertThat(updatedCustomer.getId()).isSameAs(customer.getId());
//        assertThat(updatedCustomer.getUserName()).isSameAs(customer.getUserName());
//    }
//    @Test(expected = ResourceNotFoundException.class)
//    public void should_throw_exception_when_customer_doesnt_exist_update(){
//        Customer customer=new Customer();
//        customer.setId(90L);
//        customer.setUserName("anonim");
//        given(customerRepository.findById(anyLong())).willReturn(Optional.ofNullable(null));
//        customerService.updateCustomer(customer);
//
//    }
//}
