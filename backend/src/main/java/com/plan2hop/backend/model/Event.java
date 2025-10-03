package com.plan2hop.backend.model;

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

    private String title;
    private String description;
    private String location;
    private Double budgetLimit;
    private Double usedBudget;
    private String imagePath;

    @ManyToOne
    @JoinColumn(name = "master_user_id", nullable = false)
    private User masterUser;

    @ElementCollection
    @CollectionTable(
            name = "event_participants",
            joinColumns = @JoinColumn(name = "event_id")
    )
    @Column(name = "user_id")
    private Set<Long> participantIds = new HashSet<>();


    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Day> days = new ArrayList<>();

    @Transient
    public int getDaysCount() {
        return days != null ? days.size() : 0;
    }



}
