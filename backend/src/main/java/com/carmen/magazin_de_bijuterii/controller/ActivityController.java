package com.carmen.magazin_de_bijuterii.controller;

import com.carmen.magazin_de_bijuterii.model.Activity;
import com.carmen.magazin_de_bijuterii.service.ActivityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/activity")
public class ActivityController {
    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }
    @GetMapping()
    public ResponseEntity<List<Activity>>getActivityList(){
        return new ResponseEntity<>(activityService.getActivityList(), HttpStatus.OK);
    }
    @GetMapping("/{idClient}")
    public ResponseEntity<List<Activity>>getActivityForClient(@PathVariable("idClient") Long id){
        return  new ResponseEntity<>(activityService.getActivityForClient(id),HttpStatus.OK);
    }
}
