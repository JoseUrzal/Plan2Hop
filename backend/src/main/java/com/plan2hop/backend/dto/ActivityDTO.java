package com.plan2hop.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data                   // generates getters, setters, toString, equals, hashCode
@NoArgsConstructor      // generates a no-args constructor
@AllArgsConstructor     // generates a full constructor
@Builder
public class ActivityDTO {
    public Long id;
    public Double cost;
    public String description;
    public String location;
    public String title;
    public Long dayId; // optional reference to parent day
}
