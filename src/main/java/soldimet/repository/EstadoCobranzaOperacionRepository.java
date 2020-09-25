package soldimet.repository;

import soldimet.domain.EstadoCobranzaOperacion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EstadoCobranzaOperacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoCobranzaOperacionRepository extends JpaRepository<EstadoCobranzaOperacion, Long> {

}
