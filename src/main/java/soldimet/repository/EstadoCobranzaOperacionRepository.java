package soldimet.repository;

import soldimet.domain.EstadoCobranzaOperacion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EstadoCobranzaOperacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoCobranzaOperacionRepository extends JpaRepository<EstadoCobranzaOperacion, Long> {

    EstadoCobranzaOperacion findByNombreEstado(String nombreEstado);
}
