// DayRepository.java
package com.plan2hop.backend.repository;

import com.plan2hop.backend.model.Day;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DayRepository extends JpaRepository<Day, Long> {
}
