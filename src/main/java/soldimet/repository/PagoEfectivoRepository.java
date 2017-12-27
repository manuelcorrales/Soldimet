package soldimet.repository;

import soldimet.domain.PagoEfectivo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PagoEfectivo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PagoEfectivoRepository extends JpaRepository<PagoEfectivo, Long> {

}
