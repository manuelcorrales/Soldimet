package soldimet.repository;

import soldimet.domain.MovimientoArticulo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MovimientoArticulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovimientoArticuloRepository extends JpaRepository<MovimientoArticulo, Long> {

}
