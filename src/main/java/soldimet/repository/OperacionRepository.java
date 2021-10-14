package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.Operacion;

/**
 * Spring Data SQL repository for the Operacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OperacionRepository extends JpaRepository<Operacion, Long> {}
