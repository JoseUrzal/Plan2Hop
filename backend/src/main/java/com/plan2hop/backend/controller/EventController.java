package com.plan2hop.backend.controller;

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
    public Event createEvent(@RequestParam Long userId, @RequestBody Event event) {
        User user = userRepository.findById(userId).orElseThrow();
        event.getParticipants().add(user);
        return eventRepository.save(event);
    }

    // READ ALL FROM USER
    @GetMapping("/my-events")
    public List<Event> getMyEvents(@RequestParam Long userId) {
        return eventRepository.findByParticipants_Id(userId);
    }


    // READ ONE
    @GetMapping("/{id}")
    public Event getEventById(@PathVariable Long id) {
        return eventRepository.findById(id).orElseThrow();
    }

    // UPDATE
    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        Event event = eventRepository.findById(id).orElseThrow();
        event.setTitle(updatedEvent.getTitle());
        event.setDescription(updatedEvent.getDescription());
        event.setLocation(updatedEvent.getLocation());
        event.setBudgetLimit(updatedEvent.getBudgetLimit());
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
