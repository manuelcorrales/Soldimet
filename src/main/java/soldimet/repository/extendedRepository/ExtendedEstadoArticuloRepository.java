package soldimet.repository.extendedRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.EstadoArticulo;
import soldimet.repository.EstadoArticuloRepository;

/**
 * Spring Data  repository for the EstadoArticulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedEstadoArticuloRepository extends EstadoArticuloRepository {
    EstadoArticulo findByNombreEstado(String nombreEstado);
}
