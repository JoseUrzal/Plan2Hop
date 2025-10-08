package com.plan2hop.backend.controller;

import com.plan2hop.backend.dto.EventDTO;
import com.plan2hop.backend.model.Event;
import com.plan2hop.backend.model.Day;
import com.plan2hop.backend.model.User;
import com.plan2hop.backend.repository.EventRepository;
import com.plan2hop.backend.repository.DayRepository;
import com.plan2hop.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventRepository eventRepository;
    private final DayRepository dayRepository;
    private final UserRepository userRepository;

    public EventController(EventRepository eventRepository, DayRepository dayRepository, UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.dayRepository = dayRepository;
        this.userRepository = userRepository;
    }

    // CREATE
    @PostMapping
    public Event createEvent(@RequestBody EventDTO eventDTO) {
        User user = userRepository.findById(eventDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));

        Event event = Event.builder()
                .title(eventDTO.getTitle())
                .description(eventDTO.getDescription())
                .location(eventDTO.getLocation())
                .budgetLimit(eventDTO.getBudgetLimit())
                .imagePath(eventDTO.getImagePath())
                .user(user)
                .participantIds(eventDTO.getParticipantIds())
                .build();
        return eventRepository.save(event);
    }

    // READ ALL FROM USER
    @GetMapping("/my-events")
    public List<Event> getMyEvents(@RequestParam Long userId) {
        return eventRepository.findByParticipantId(userId);
    }


    // READ ONE
    @GetMapping("/{id}")
    public Event getEventById(@PathVariable Long id) {
        return eventRepository.findById(id).orElseThrow();
    }

    // UPDATE
    @PutMapping("/{id}")
    public Event updateEvent(@RequestBody EventDTO updatedEventDTO) {
        Event event = eventRepository.findById(updatedEventDTO.getId()).orElseThrow(() -> new RuntimeException("Event not found"));
        event.setTitle(updatedEventDTO.getTitle());
        event.setDescription(updatedEventDTO.getDescription());
        event.setLocation(updatedEventDTO.getLocation());
        event.setBudgetLimit(updatedEventDTO.getBudgetLimit());
        event.setImagePath(updatedEventDTO.getImagePath());
        return eventRepository.save(event);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventRepository.deleteById(id);
    }

    // EXTRA: get days of event
    @GetMapping("/{eventId}/days")
    public List<Day> getEventDays(@PathVariable Long eventId) {
        Event event = eventRepository.findById(eventId).orElseThrow();
        return event.getDays();
    }

    // EXTRA: create day for event
    @PostMapping("/{eventId}/days")
    public Day createDayForEvent(@PathVariable Long eventId, @RequestBody Day day) {
        Event event = eventRepository.findById(eventId).orElseThrow();
        day.setEvent(event);
        return dayRepository.save(day);
    }
}
