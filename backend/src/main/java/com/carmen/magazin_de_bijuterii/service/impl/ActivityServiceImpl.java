package com.carmen.magazin_de_bijuterii.service.impl;

import com.carmen.magazin_de_bijuterii.model.Activity;
import com.carmen.magazin_de_bijuterii.repository.ActivityRepository;
import com.carmen.magazin_de_bijuterii.service.ActivityService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityServiceImpl implements ActivityService {
    private final ActivityRepository activityRepository;

    public ActivityServiceImpl(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @Override
    public List<Activity> getActivityList() {
        return activityRepository.findAll();
    }

    @Override
    public List<Activity> getActivityForClient(Long id) {
        return activityRepository.findActivityByIdClient(id);
    }
}
