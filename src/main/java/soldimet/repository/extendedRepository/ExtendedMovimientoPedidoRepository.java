package soldimet.repository.extendedRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.Movimiento;
import soldimet.domain.MovimientoPedido;
import soldimet.repository.MovimientoPedidoRepository;

/**
 * Spring Data  repository for the MovimientoPedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedMovimientoPedidoRepository extends MovimientoPedidoRepository {
    public MovimientoPedido findByMovimiento(Movimiento movimiento);
}
