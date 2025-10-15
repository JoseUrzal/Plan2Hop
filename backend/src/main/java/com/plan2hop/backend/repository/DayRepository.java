package com.plan2hop.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.plan2hop.backend.model.Day;

@Repository
public interface DayRepository extends JpaRepository<Day, Long> {
    // Find all days that belong to a specific event
    @Query("SELECT d FROM Day d WHERE d.event.id = :eventId")
    List<Day> findByEventId(@Param("eventId") Long eventId);
}
