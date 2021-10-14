package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.StockArticulo;

/**
 * Spring Data SQL repository for the StockArticulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StockArticuloRepository extends JpaRepository<StockArticulo, Long> {}
