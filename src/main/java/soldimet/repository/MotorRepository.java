package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.Motor;

/**
 * Spring Data SQL repository for the Motor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MotorRepository extends JpaRepository<Motor, Long> {}
