package com.plan2hop.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "activities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    public String description;

    public String location;

    public Double cost;

    @ManyToOne
    @JoinColumn(name = "day_id", nullable = false)
    private Day day;
}
