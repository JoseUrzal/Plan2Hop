// ActivityRepository.java
package com.plan2hop.backend.repository;

import com.plan2hop.backend.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
}
