package com.plan2hop.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "days")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Day {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private String title;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    @JsonManagedReference
    private Event event;

    @OneToMany(mappedBy = "day", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Activity> activities = new ArrayList<>();
}
