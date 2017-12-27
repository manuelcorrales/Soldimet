package soldimet.repository;

import soldimet.domain.ListaPrecioRectificacionCRAM;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ListaPrecioRectificacionCRAM entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ListaPrecioRectificacionCRAMRepository extends JpaRepository<ListaPrecioRectificacionCRAM, Long> {

}
