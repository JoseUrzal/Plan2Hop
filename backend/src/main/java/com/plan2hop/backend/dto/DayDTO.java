package com.plan2hop.backend.dto;

import com.plan2hop.backend.model.Event;

import java.util.List;

public class DayDTO {
    public Long id;
    private String title;
    public String date;
    private Event event;// could be LocalDate or String
    public List<ActivityDTO> activities; // nested activities
}
