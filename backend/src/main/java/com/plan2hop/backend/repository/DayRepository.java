package com.plan2hop.backend.repository;

import com.plan2hop.backend.model.Day;
import com.plan2hop.backend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DayRepository extends JpaRepository<Day, Long> {
    // Find all days that belong to a specific event
    @Query("SELECT d FROM Day d WHERE d.event.id = :eventId")
    List<Day> findByEventId(@Param("eventId") Long eventId);
}
