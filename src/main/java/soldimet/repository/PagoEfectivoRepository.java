package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.PagoEfectivo;

/**
 * Spring Data SQL repository for the PagoEfectivo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PagoEfectivoRepository extends JpaRepository<PagoEfectivo, Long> {}
