package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.EstadoCobranzaOperacion;

/**
 * Spring Data SQL repository for the EstadoCobranzaOperacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoCobranzaOperacionRepository extends JpaRepository<EstadoCobranzaOperacion, Long> {}
