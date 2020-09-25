package soldimet.repository.extendedRepository;

import soldimet.domain.Movimiento;
import soldimet.domain.MovimientoPresupuesto;
import soldimet.repository.MovimientoPresupuestoRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MovimientoPresupuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedMovimientoPresupuestoRepository extends MovimientoPresupuestoRepository {

    public MovimientoPresupuesto findByMovimiento(Movimiento movimiento);

}
