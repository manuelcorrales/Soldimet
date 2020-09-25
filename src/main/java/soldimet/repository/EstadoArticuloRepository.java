package soldimet.repository;

import soldimet.domain.EstadoArticulo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EstadoArticulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoArticuloRepository extends JpaRepository<EstadoArticulo, Long> {
}
