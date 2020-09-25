package soldimet.repository.extendedRepository;
import soldimet.domain.CostoRepuesto;
import soldimet.domain.EstadoCostoRepuesto;
import soldimet.repository.CostoRepuestoRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CostoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedCostoRepuestoRepository extends CostoRepuestoRepository {

    Long countByEstado(EstadoCostoRepuesto estado);
}
