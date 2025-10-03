// UserRepository.java
package com.plan2hop.backend.repository;

import com.plan2hop.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // You can later add custom queries like: Optional<User> findByEmail(String email);
}
