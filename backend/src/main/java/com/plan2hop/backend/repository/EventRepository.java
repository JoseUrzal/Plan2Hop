// EventRepository.java
package com.plan2hop.backend.repository;

import com.plan2hop.backend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByParticipants_Id(Long userId); // userId in participants
}
