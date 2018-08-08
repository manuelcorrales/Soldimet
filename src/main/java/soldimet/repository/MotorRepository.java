package soldimet.repository;

import soldimet.domain.Motor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Motor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MotorRepository extends JpaRepository<Motor, Long> {

}
