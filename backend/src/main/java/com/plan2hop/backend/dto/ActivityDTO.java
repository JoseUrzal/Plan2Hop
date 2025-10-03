package com.plan2hop.backend.dto;

public class ActivityDTO {
    public Long id;
    public String name;
    public String description;
    public String location;
    public Double cost;
    public Long dayId; // optional reference to parent day
}
