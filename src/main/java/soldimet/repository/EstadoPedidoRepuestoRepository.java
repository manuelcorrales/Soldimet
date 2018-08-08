package soldimet.repository;

import soldimet.domain.EstadoPedidoRepuesto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EstadoPedidoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoPedidoRepuestoRepository extends JpaRepository<EstadoPedidoRepuesto, Long> {

    EstadoPedidoRepuesto findByNombreEstado(String nombreEstado);
}
