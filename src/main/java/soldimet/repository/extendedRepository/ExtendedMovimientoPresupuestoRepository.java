package soldimet.repository.extendedRepository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.Movimiento;
import soldimet.domain.MovimientoPresupuesto;
import soldimet.repository.MovimientoPresupuestoRepository;

/**
 * Spring Data  repository for the MovimientoPresupuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedMovimientoPresupuestoRepository extends MovimientoPresupuestoRepository {
    public MovimientoPresupuesto findByMovimiento(Movimiento movimiento);

    @EntityGraph(
        attributePaths = {
            "movimiento",
            "movimiento.estado",
            "movimiento.tipoMovimiento",
            "movimiento.empleado",
            "movimiento.empleado.persona",
            "movimiento.empleado.sucursal",
            "movimiento.subCategoria",
            "movimiento.medioDePago",
            "movimiento.medioDePago.formaDePago",
            "movimiento.medioDePago.medioDePagoCheque",
            "movimiento.medioDePago.medioDePagoCheque.banco",
        }
    )
    public List<MovimientoPresupuesto> findByPresupuestoId(Long presupuestoId);
}
