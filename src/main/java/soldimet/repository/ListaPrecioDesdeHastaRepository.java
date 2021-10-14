package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.ListaPrecioDesdeHasta;

/**
 * Spring Data SQL repository for the ListaPrecioDesdeHasta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ListaPrecioDesdeHastaRepository extends JpaRepository<ListaPrecioDesdeHasta, Long> {}
