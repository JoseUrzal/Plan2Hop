package com.plan2hop.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password; // TODO: hash before storing

    // Events created by
    @OneToMany(mappedBy = "masterUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Event> createdEvents = new ArrayList<>();

    // All events
    @ManyToMany(mappedBy = "participants")
    private List<Event> events = new ArrayList<>();


}
