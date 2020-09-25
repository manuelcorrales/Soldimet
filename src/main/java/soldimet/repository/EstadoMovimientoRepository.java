package soldimet.repository;

import soldimet.domain.EstadoMovimiento;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EstadoMovimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoMovimientoRepository extends JpaRepository<EstadoMovimiento, Long> {

}
