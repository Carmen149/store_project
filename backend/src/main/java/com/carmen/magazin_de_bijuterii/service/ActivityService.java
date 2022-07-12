package com.carmen.magazin_de_bijuterii.service;

import com.carmen.magazin_de_bijuterii.model.Activity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ActivityService {
    List<Activity>getActivityList();
    List<Activity>getActivityForClient(Long id);
}
