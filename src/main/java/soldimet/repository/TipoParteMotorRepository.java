package soldimet.repository;

import soldimet.domain.TipoParteMotor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoParteMotor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoParteMotorRepository extends JpaRepository<TipoParteMotor, Long> {

}
