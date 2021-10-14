package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.ListaPrecioRectificacionCRAM;

/**
 * Spring Data SQL repository for the ListaPrecioRectificacionCRAM entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ListaPrecioRectificacionCRAMRepository extends JpaRepository<ListaPrecioRectificacionCRAM, Long> {}
