package com.carmen.magazin_de_bijuterii.utils.initialization;


import com.carmen.magazin_de_bijuterii.repository.OrderItemRepository;
import com.carmen.magazin_de_bijuterii.service.AdminService;
import com.carmen.magazin_de_bijuterii.service.CommandService;
import com.carmen.magazin_de_bijuterii.service.CustomerService;
import com.carmen.magazin_de_bijuterii.service.ItemService;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@Service
public class InitializationService {
    private final AdminService adminService;
    private final CommandService commandService;
    private final CustomerService customerService;
    private final ItemService itemService;
    private final OrderItemRepository orderItemRepository;

    public InitializationService(AdminService adminService, CommandService commandService, ItemService itemService, CustomerService customerService,OrderItemRepository orderItemRepository){
        this.adminService=adminService;
        this.customerService=customerService;
        this.commandService=commandService;
        this.itemService=itemService;
        this.orderItemRepository=orderItemRepository;
    }
    @Bean
    public void initializeData(){



    }

}
