package soldimet.repository;

import soldimet.domain.EstadoMovimiento;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EstadoMovimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoMovimientoRepository extends JpaRepository<EstadoMovimiento, Long> {

    EstadoMovimiento findByNombreEstado(String nombreEstado);
}
