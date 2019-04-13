package soldimet.repository;

import soldimet.domain.Caja;
import soldimet.domain.Movimiento;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Movimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovimientoRepository extends JpaRepository<Movimiento, Long> {

        List<Movimiento> findByCaja(Caja caja);
}
