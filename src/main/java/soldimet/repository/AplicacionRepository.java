package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.Aplicacion;

/**
 * Spring Data SQL repository for the Aplicacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AplicacionRepository extends JpaRepository<Aplicacion, Long> {}
