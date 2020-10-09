package soldimet.repository.extendedRepository;

import soldimet.domain.CostoRepuesto;
import soldimet.domain.DetallePedido;
import soldimet.domain.EstadoDetallePedido;
import soldimet.repository.DetallePedidoRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DetallePedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedDetallePedidoRepository extends DetallePedidoRepository {

    public Long countByEstadoDetallePedido(EstadoDetallePedido estado);

    public DetallePedido findByCostoRepuestosIn(CostoRepuesto costoRepuesto);

}
