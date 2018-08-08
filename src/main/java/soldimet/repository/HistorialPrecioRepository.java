package soldimet.repository;

import soldimet.domain.HistorialPrecio;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HistorialPrecio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HistorialPrecioRepository extends JpaRepository<HistorialPrecio, Long> {

}
