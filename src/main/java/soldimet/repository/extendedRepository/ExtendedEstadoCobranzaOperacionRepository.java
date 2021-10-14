package soldimet.repository.extendedRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.EstadoCobranzaOperacion;
import soldimet.repository.EstadoCobranzaOperacionRepository;

/**
 * Spring Data  repository for the EstadoCobranzaOperacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedEstadoCobranzaOperacionRepository extends EstadoCobranzaOperacionRepository {
    EstadoCobranzaOperacion findByNombreEstado(String nombreEstado);
}
