package com.plan2hop.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="title")
    private String title;
    @Column(name="description")
    private String description;
    @Column(name="location")
    private String location;
    @Column(name="budget_limit")
    private Double budgetLimit;
    @Column(name="image_path")
    private String imagePath;

    @ManyToOne
    @JoinColumn(name = "master_user_id", nullable = false)
    @JsonBackReference
    private User user;

    @ElementCollection
    @CollectionTable(
            name = "event_participants",
            joinColumns = @JoinColumn(name = "event_id")
    )
    @Column(name = "user_id")
    private Set<Long> participantIds = new HashSet<>();


    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Day> days = new ArrayList<>();

    @Transient
    public int getDaysCount() {
        return days != null ? days.size() : 0;
    }



}
