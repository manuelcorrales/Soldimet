package soldimet.repository.extendedRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.CostoRepuesto;
import soldimet.domain.DetallePedido;
import soldimet.domain.EstadoDetallePedido;
import soldimet.repository.DetallePedidoRepository;

/**
 * Spring Data  repository for the DetallePedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedDetallePedidoRepository extends DetallePedidoRepository {
    public Long countByEstadoDetallePedido(EstadoDetallePedido estado);

    public DetallePedido findByCostoRepuestos(CostoRepuesto costoRepuesto);
}
