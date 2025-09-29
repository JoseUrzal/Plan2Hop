package com.plan2hop.backend.controller;

import com.plan2hop.backend.model.Day;
import com.plan2hop.backend.model.Activity;
import com.plan2hop.backend.repository.DayRepository;
import com.plan2hop.backend.repository.ActivityRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/days")
public class DayController {

    private final DayRepository dayRepository;
    private final ActivityRepository activityRepository;

    public DayController(DayRepository dayRepository, ActivityRepository activityRepository) {
        this.dayRepository = dayRepository;
        this.activityRepository = activityRepository;
    }

    // CREATE
    @PostMapping
    public Day createDay(@RequestBody Day day) {
        return dayRepository.save(day);
    }

    // READ ALL
    @GetMapping
    public List<Day> getAllDays() {
        return dayRepository.findAll();
    }

    // READ ONE
    @GetMapping("/{id}")
    public Day getDayById(@PathVariable Long id) {
        return dayRepository.findById(id).orElseThrow();
    }

    // UPDATE
    @PutMapping("/{id}")
    public Day updateDay(@PathVariable Long id, @RequestBody Day updatedDay) {
        Day day = dayRepository.findById(id).orElseThrow();
        day.setTitle(updatedDay.getTitle());
        return dayRepository.save(day);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteDay(@PathVariable Long id) {
        dayRepository.deleteById(id);
    }

    // EXTRA: get activities of day
    @GetMapping("/{dayId}/activities")
    public List<Activity> getDayActivities(@PathVariable Long dayId) {
        Day day = dayRepository.findById(dayId).orElseThrow();
        return day.getActivities();
    }

    // EXTRA: create activity for day
    @PostMapping("/{dayId}/activities")
    public Activity createActivityForDay(@PathVariable Long dayId, @RequestBody Activity activity) {
        Day day = dayRepository.findById(dayId).orElseThrow();
        activity.setDay(day);
        return activityRepository.save(activity);
    }
}
