package com.plan2hop.backend.dto;

import java.util.List;
import java.util.Set;

public class EventDTO {
    public Long id; // optional for POST, filled for GET
    public String title;
    public String description;
    public Double budgetLimit;
    public String location;
    public String imagePath;

    public Long masterUserId;            // frontend sends ID instead of full User
    public Set<Long> participantIds;     // IDs of users
    public List<DayDTO> days;            // optional nested Days
}
