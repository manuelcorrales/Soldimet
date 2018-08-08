package soldimet.repository;

import soldimet.domain.PrecioRepuesto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PrecioRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrecioRepuestoRepository extends JpaRepository<PrecioRepuesto, Long> {

}
