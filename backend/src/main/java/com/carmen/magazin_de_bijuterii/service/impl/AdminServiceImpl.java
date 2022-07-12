package com.carmen.magazin_de_bijuterii.service.impl;

import com.carmen.magazin_de_bijuterii.config.EmailConfig;
import com.carmen.magazin_de_bijuterii.constant.Feedback;
import com.carmen.magazin_de_bijuterii.constant.FileWriter;
import com.carmen.magazin_de_bijuterii.dto.AdminDto;
import com.carmen.magazin_de_bijuterii.dto.AuthDTO;
import com.carmen.magazin_de_bijuterii.exception.ResourceNotFoundException;
import com.carmen.magazin_de_bijuterii.model.user.Admin;
import com.carmen.magazin_de_bijuterii.repository.AdminRepository;
import com.carmen.magazin_de_bijuterii.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Observable;
import java.util.Observer;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import javax.validation.ConstraintViolationException;


@Service
public class AdminServiceImpl implements AdminService, Observer {
    private final AdminRepository adminRepository;
    private static int orderNumber = 0;
    private final EmailConfig emailCfg;
    private final PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
    public AdminServiceImpl(AdminRepository adminRepository, EmailConfig emailCfg){
        this.adminRepository=adminRepository;
        this.emailCfg=emailCfg;
    }
    @Override
    public Admin saveAdmin(AdminDto adminDto) throws ConstraintViolationException {
        Admin admin=new Admin();
        String encodedPassword=this.passwordEncoder.encode(adminDto.getPassword());
        admin.setFirstName(adminDto.getFirstName());
        admin.setLastName(adminDto.getLastName());
        admin.setUserName(adminDto.getUserName());
        admin.setEmail(adminDto.getEmail());
        admin.setPassword(encodedPassword);
        return adminRepository.save(admin);
    }

    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public Admin getAdminById(Long id) {
        return adminRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Admin","Id",id,HttpStatus.NOT_FOUND));
    }

    @Override
    public Admin updateAdmin(AdminDto adminDto) {

        Admin existingAdmin=adminRepository.findById(adminDto.getId()).orElseThrow(()->new ResourceNotFoundException("Admin","Id",adminDto.getId(),HttpStatus.NOT_FOUND));
        if(adminDto.getFirstName()!=null) {
            existingAdmin.setFirstName(adminDto.getFirstName());
        }
        if(adminDto.getLastName()!=null){
            existingAdmin.setLastName(adminDto.getLastName());
        }
        if(adminDto.getPassword()!=null){
            existingAdmin.setPassword(adminDto.getPassword());
        }
        if(adminDto.getEmail()!=null){
            existingAdmin.setEmail(adminDto.getEmail());
        }
        if(adminDto.getUserName()!=null){
            existingAdmin.setUserName(adminDto.getUserName());
        }
        adminRepository.save(existingAdmin);
        return existingAdmin;
    }

    @Override
    public void deleteAdmin(Long id) {
        adminRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Admin","Id",id,HttpStatus.NOT_FOUND));
        adminRepository.deleteById(id);
    }

    @Override
    public Admin findByUserName(AuthDTO authDTO) {
        Admin admin=adminRepository.findByUserName(authDTO.getUsername());
        if(admin==null){
            throw new ResourceNotFoundException("Admin","Username",authDTO.getUsername(), HttpStatus.NOT_FOUND);
        }else{
            if(this.passwordEncoder.matches(authDTO.getPassword(),admin.getPassword())){

            }
            else{
                throw new ResourceNotFoundException("Customer","Username",authDTO.getUsername(), HttpStatus.NOT_FOUND);
            }
        }
        return admin;
    }

    @Override
    public void sendFeedBack(Feedback feedback, String email) {
        // Create a mail sender
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(this.emailCfg.getHost());
        mailSender.setPort(this.emailCfg.getPort());
        mailSender.setUsername(this.emailCfg.getUsername());
        mailSender.setPassword(this.emailCfg.getPassword());

        // Create an email instance
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(feedback.getEmail());
        mailMessage.setTo(email);
        mailMessage.setSubject("Notification from " + feedback.getName());
        mailMessage.setText(feedback.getFeedback());

        // Send mail
        mailSender.send(mailMessage);
    }


    @Override
    public void update(Observable o, Object arg) {
       orderNumber++;
       String nameFile="chitanta"+orderNumber;
       FileWriter file=new FileWriter();
       String[] string=(String[])arg;
       String[] parts = string[1].split("/");
       System.out.println(parts[0]);
       System.out.println(parts[1]);
       String message="Dear, "+parts[0]+"\n"+"Good news!\n" + "Your order is ready for delivery! Thank you for buying from us.";
       Feedback feedback=new Feedback("Euphoria Store","euphoriaStore@gmail.com",message);
       sendFeedBack(feedback,parts[1]);
       file.writeInFile(nameFile,string[0]);
    }
}
