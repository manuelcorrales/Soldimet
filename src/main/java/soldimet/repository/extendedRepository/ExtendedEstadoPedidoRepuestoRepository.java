package soldimet.repository.extendedRepository;

import soldimet.domain.EstadoPedidoRepuesto;
import soldimet.repository.EstadoPedidoRepuestoRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EstadoPedidoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedEstadoPedidoRepuestoRepository extends EstadoPedidoRepuestoRepository {

    EstadoPedidoRepuesto findByNombreEstado(String nombreEstado);
}
