package soldimet.repository.extendedRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.EstadoCostoRepuesto;
import soldimet.repository.EstadoCostoRepuestoRepository;

/**
 * Spring Data  repository for the EstadoCostoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedEstadoCostoRepuestoRepository extends EstadoCostoRepuestoRepository {
    EstadoCostoRepuesto findByNombreEstado(String nombreEstado);
}
