package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.MovimientoArticulo;

/**
 * Spring Data SQL repository for the MovimientoArticulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovimientoArticuloRepository extends JpaRepository<MovimientoArticulo, Long> {}
