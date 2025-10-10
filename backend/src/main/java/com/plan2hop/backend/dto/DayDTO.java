package com.plan2hop.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data                   // generates getters, setters, toString, equals, hashCode
@NoArgsConstructor      // generates a no-args constructor
@AllArgsConstructor     // generates a full constructor
@Builder
public class DayDTO {

    public Long id;
    @JsonFormat(pattern = "yyyy-MM-dd")
    public LocalDate date;
    private String title;
    private Long eventId;
}
