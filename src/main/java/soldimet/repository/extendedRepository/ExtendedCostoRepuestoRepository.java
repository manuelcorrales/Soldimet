package soldimet.repository.extendedRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.CostoRepuesto;
import soldimet.domain.EstadoCostoRepuesto;
import soldimet.repository.CostoRepuestoRepository;

/**
 * Spring Data  repository for the CostoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedCostoRepuestoRepository extends CostoRepuestoRepository {
    Long countByEstado(EstadoCostoRepuesto estado);
}
