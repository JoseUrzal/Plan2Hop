package com.plan2hop.backend.dto;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data                   // generates getters, setters, toString, equals, hashCode
@NoArgsConstructor      // generates a no-args constructor
@AllArgsConstructor     // generates a full constructor
@Builder                // allows you to build DTOs easily
public class EventDTO {

    private Long id;
    private String title;
    private String description;
    private String location;
    private Double budgetLimit;
    private String imagePath;
    private Long userId;          // frontend sends ID instead of full User
    private Set<Long> participantIds;   // IDs of users
}
