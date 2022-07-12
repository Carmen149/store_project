package com.carmen.magazin_de_bijuterii.service;

import com.carmen.magazin_de_bijuterii.constant.Feedback;
import com.carmen.magazin_de_bijuterii.dto.AdminDto;
import com.carmen.magazin_de_bijuterii.dto.AuthDTO;
import com.carmen.magazin_de_bijuterii.model.user.Admin;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface AdminService {
    Admin saveAdmin(AdminDto adminDto);
    List<Admin> getAllAdmins();
    Admin getAdminById(Long id);
    Admin updateAdmin(AdminDto adminDto);
    void deleteAdmin(Long id);
    Admin findByUserName(AuthDTO authDTO);
    void sendFeedBack(Feedback feedback,String email);
}
