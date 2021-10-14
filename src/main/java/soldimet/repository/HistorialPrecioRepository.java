package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.HistorialPrecio;

/**
 * Spring Data SQL repository for the HistorialPrecio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HistorialPrecioRepository extends JpaRepository<HistorialPrecio, Long> {}
