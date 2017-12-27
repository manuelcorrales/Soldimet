package soldimet.repository;

import soldimet.domain.TipoParteMotor;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TipoParteMotor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoParteMotorRepository extends JpaRepository<TipoParteMotor, Long> {

}
