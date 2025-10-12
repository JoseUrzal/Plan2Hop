// ActivityRepository.java
package com.plan2hop.backend.repository;

import com.plan2hop.backend.model.Activity;
import com.plan2hop.backend.model.Day;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    // Find all days that belong to a specific day
    @Query("SELECT a FROM Activity a WHERE a.day.id = :dayId")
    List<Activity> findByDayId(@Param("dayId") Long dayId);
}
