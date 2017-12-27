package soldimet.repository;

import soldimet.domain.ListaPrecioDesdeHasta;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ListaPrecioDesdeHasta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ListaPrecioDesdeHastaRepository extends JpaRepository<ListaPrecioDesdeHasta, Long> {

}
