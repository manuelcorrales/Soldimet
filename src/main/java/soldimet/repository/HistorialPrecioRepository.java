package soldimet.repository;

import soldimet.domain.HistorialPrecio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the HistorialPrecio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HistorialPrecioRepository extends JpaRepository<HistorialPrecio, Long> {

}
