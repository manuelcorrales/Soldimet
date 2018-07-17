package soldimet.repository;

import soldimet.domain.CostoRepuesto;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CostoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CostoRepuestoRepository extends JpaRepository<CostoRepuesto, Long> {

}
