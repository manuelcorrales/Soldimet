package soldimet.repository;
import soldimet.domain.StockArticulo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StockArticulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StockArticuloRepository extends JpaRepository<StockArticulo, Long> {

}
