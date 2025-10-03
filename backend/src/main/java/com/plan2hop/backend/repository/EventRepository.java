// EventRepository.java
package com.plan2hop.backend.repository;

import com.plan2hop.backend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    // Find events where a given userId is in the participantIds collection
    @Query("SELECT DISTINCT e FROM Event e JOIN e.participantIds p WHERE p = :userId")
    List<Event> findByParticipantId(@Param("userId") Long userId);

}
