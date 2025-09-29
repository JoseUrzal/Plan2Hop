// EventRepository.java
package com.plan2hop.backend.repository;

import com.plan2hop.backend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
