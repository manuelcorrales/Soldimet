package soldimet.repository;

import soldimet.domain.PagoEfectivo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PagoEfectivo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PagoEfectivoRepository extends JpaRepository<PagoEfectivo, Long> {

}
