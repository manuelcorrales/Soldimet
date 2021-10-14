package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.TipoParteMotor;

/**
 * Spring Data SQL repository for the TipoParteMotor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoParteMotorRepository extends JpaRepository<TipoParteMotor, Long> {}
