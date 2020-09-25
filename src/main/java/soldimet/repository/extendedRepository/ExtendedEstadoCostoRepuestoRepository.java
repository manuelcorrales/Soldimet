package soldimet.repository.extendedRepository;

import soldimet.domain.EstadoCostoRepuesto;
import soldimet.repository.EstadoCostoRepuestoRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EstadoCostoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedEstadoCostoRepuestoRepository extends EstadoCostoRepuestoRepository {

	EstadoCostoRepuesto findByNombreEstado(String nombreEstado);

}
