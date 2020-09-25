package soldimet.repository;

import soldimet.domain.Caja;
import soldimet.domain.EstadoMovimiento;
import soldimet.domain.Movimiento;
import soldimet.domain.SubCategoria;
import soldimet.domain.Sucursal;
import soldimet.domain.TipoMovimiento;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Movimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovimientoRepository extends JpaRepository<Movimiento, Long> {

}
