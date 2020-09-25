package soldimet.repository.extendedRepository;

import soldimet.domain.EstadoArticulo;
import soldimet.repository.EstadoArticuloRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EstadoArticulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedEstadoArticuloRepository extends EstadoArticuloRepository {

    EstadoArticulo findByNombreEstado(String nombreEstado);
}
