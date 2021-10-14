package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.EstadoArticulo;

/**
 * Spring Data SQL repository for the EstadoArticulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoArticuloRepository extends JpaRepository<EstadoArticulo, Long> {}
