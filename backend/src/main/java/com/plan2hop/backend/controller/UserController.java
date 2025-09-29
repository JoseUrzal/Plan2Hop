package com.plan2hop.backend.controller;

import com.plan2hop.backend.model.User;
import com.plan2hop.backend.model.Event;
import com.plan2hop.backend.repository.UserRepository;
import com.plan2hop.backend.repository.EventRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public UserController(UserRepository userRepository, EventRepository eventRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    // CREATE
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // READ ALL
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // READ ONE
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    // UPDATE
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userRepository.findById(id).orElseThrow();
        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());
        return userRepository.save(user);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }

    // EXTRA: get all events of a user
    @GetMapping("/{userId}/events")
    public List<Event> getUserEvents(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return user.getEvents();
    }

    // EXTRA: create event for a user
    @PostMapping("/{userId}/events")
    public Event createEventForUser(@PathVariable Long userId, @RequestBody Event event) {
        User user = userRepository.findById(userId).orElseThrow();
        event.setMasterUser(user);
        return eventRepository.save(event);
    }
}
