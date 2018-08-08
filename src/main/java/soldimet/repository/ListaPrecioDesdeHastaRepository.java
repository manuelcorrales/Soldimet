package soldimet.repository;

import soldimet.domain.ListaPrecioDesdeHasta;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ListaPrecioDesdeHasta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ListaPrecioDesdeHastaRepository extends JpaRepository<ListaPrecioDesdeHasta, Long> {

}
