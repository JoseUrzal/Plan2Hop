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
    public List<EventDTO> getMyEvents(@RequestParam Long userId) {
        List<Event> events = eventRepository.findByParticipantId(userId);

        return events.stream()
                .map(event -> EventDTO.builder()
                        .id(event.getId())
                        .title(event.getTitle())
                        .description(event.getDescription())
                        .location(event.getLocation())
                        .budgetLimit(event.getBudgetLimit())
                        .imagePath(event.getImagePath())
                        .userId(event.getUser().getId())
                        .participantIds(event.getParticipantIds())
                        .build()
                )
                .toList();
    }


    // READ ONE
    @GetMapping("/{id}")
    public Event getEventById(@PathVariable Long id) {
        return eventRepository.findById(id).orElseThrow();
    }

    // UPDATE
    @PutMapping("/{id}")
    public EventDTO updateEvent(@PathVariable Long id, @RequestBody EventDTO updatedEventDTO) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        event.setTitle(updatedEventDTO.getTitle());
        event.setDescription(updatedEventDTO.getDescription());
        event.setLocation(updatedEventDTO.getLocation());
        event.setBudgetLimit(updatedEventDTO.getBudgetLimit());
        event.setImagePath(updatedEventDTO.getImagePath());
        Event saved = eventRepository.save(event);

        // Build and return a clean DTO instead of the full entity
        return EventDTO.builder()
                .id(saved.getId())
                .title(saved.getTitle())
                .description(saved.getDescription())
                .location(saved.getLocation())
                .budgetLimit(saved.getBudgetLimit())
                .imagePath(saved.getImagePath())
                .userId(saved.getUser() != null ? saved.getUser().getId() : null)
                .participantIds(saved.getParticipantIds())
                .build();
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventRepository.deleteById(id);
    }

    // EXTRA: get days of event
//    @GetMapping("/{eventId}/days")
//    public List<Day> getEventDays(@PathVariable Long eventId) {
//        Event event = eventRepository.findById(eventId).orElseThrow();
//        return event.getDays();
//    }

    // EXTRA: create day for event
    @PostMapping("/{eventId}/days")
    public Day createDayForEvent(@PathVariable Long eventId, @RequestBody Day day) {
        Event event = eventRepository.findById(eventId).orElseThrow();
        day.setEvent(event);
        return dayRepository.save(day);
    }
}
