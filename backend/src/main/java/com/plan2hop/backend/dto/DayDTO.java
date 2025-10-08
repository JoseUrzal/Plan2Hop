package com.plan2hop.backend.dto;

import com.plan2hop.backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data                   // generates getters, setters, toString, equals, hashCode
@NoArgsConstructor      // generates a no-args constructor
@AllArgsConstructor     // generates a full constructor
@Builder
public class DayDTO {
    public Long id;
    public String date;
    private String title;
    private Long eventId;
}
