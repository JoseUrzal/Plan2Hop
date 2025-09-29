package com.plan2hop.backend.controller;

import com.plan2hop.backend.model.Activity;
import com.plan2hop.backend.repository.ActivityRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    private final ActivityRepository activityRepository;

    public ActivityController(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    // CREATE
    @PostMapping
    public Activity createActivity(@RequestBody Activity activity) {
        return activityRepository.save(activity);
    }

    // READ ALL
    @GetMapping
    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    // READ ONE
    @GetMapping("/{id}")
    public Activity getActivityById(@PathVariable Long id) {
        return activityRepository.findById(id).orElseThrow();
    }

    // UPDATE
    @PutMapping("/{id}")
    public Activity updateActivity(@PathVariable Long id, @RequestBody Activity updatedActivity) {
        Activity activity = activityRepository.findById(id).orElseThrow();
        activity.setTitle(updatedActivity.getTitle());
        return activityRepository.save(activity);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteActivity(@PathVariable Long id) {
        activityRepository.deleteById(id);
    }
}
