package soldimet.repository;

import soldimet.domain.PrecioRepuesto;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PrecioRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrecioRepuestoRepository extends JpaRepository<PrecioRepuesto, Long> {

}
