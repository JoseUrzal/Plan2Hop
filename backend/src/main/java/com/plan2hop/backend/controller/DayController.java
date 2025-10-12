package com.plan2hop.backend.controller;

import com.plan2hop.backend.dto.DayDTO;
import com.plan2hop.backend.model.Day;
import com.plan2hop.backend.model.Activity;
import com.plan2hop.backend.model.Event;
import com.plan2hop.backend.repository.DayRepository;
import com.plan2hop.backend.repository.ActivityRepository;
import com.plan2hop.backend.repository.EventRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/days")
public class DayController {

    private final DayRepository dayRepository;
    private final ActivityRepository activityRepository;
    private final EventRepository eventRepository;

    public DayController(DayRepository dayRepository, ActivityRepository activityRepository, EventRepository eventRepository) {
        this.dayRepository = dayRepository;
        this.activityRepository = activityRepository;
        this.eventRepository = eventRepository;
    }

    // CREATE
    @PostMapping
    public Day createDay(@RequestBody DayDTO dayDTO) {
        Event event = eventRepository.findById(dayDTO.getEventId()).orElseThrow(() -> new RuntimeException("Event not found"));

        Day day = Day.builder()
                .date(dayDTO.getDate())
                .title(dayDTO.getTitle())
                .event(event)
                .build();

        return dayRepository.save(day);
    }

    // READ ALL FROM EVENT
    @GetMapping("/by-event")
    public List<DayDTO> getDaysByEventId(@RequestParam Long eventId) {
        List<Day> days = dayRepository.findByEventId(eventId);

        return days.stream()
                .map(day -> DayDTO.builder()
                        .id(day.getId())
                        .date(day.getDate())
                        .title(day.getTitle())
                        .eventId(day.getEvent().getId())
                        .build()
                )
                .toList();
    }

    @GetMapping("/by-id/{id}")
    public DayDTO getDayById(@PathVariable Long id) {
        Day day = dayRepository.findById(id).orElseThrow(() -> new RuntimeException("Day not found"));

        return DayDTO.builder()
                        .id(day.getId())
                        .date(day.getDate())
                        .title(day.getTitle())
                        .eventId(day.getEvent().getId())
                        .build();
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


//    EXTRA: create activity for day
//    @PostMapping("/{dayId}/activities")
//    public Activity createActivityForDay(@PathVariable Long dayId, @RequestBody Activity activity) {
//        Day day = dayRepository.findById(dayId).orElseThrow();
//        activity.setDay(day);
//        return activityRepository.save(activity);
//    }
}
