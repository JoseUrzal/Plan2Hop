package com.plan2hop.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.plan2hop.backend.dto.ActivityDTO;
import com.plan2hop.backend.model.Activity;
import com.plan2hop.backend.repository.ActivityRepository;

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

    // READ ALL FROM DAY
    @GetMapping("/by-day")
    public List<ActivityDTO> getActivitiesByDayId(@RequestParam Long dayId) {
        List<Activity> activities = activityRepository.findByDayId(dayId);

        return activities.stream()
                .map(activity -> ActivityDTO.builder()
                        .id(activity.getId())
                        .title(activity.getTitle())
                        .cost(activity.getCost())
                        .description(activity.getDescription())
                        .location(activity.getLocation())
                        .dayId(activity.getDay().getId())
                        .build()
                )
                .toList();
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
