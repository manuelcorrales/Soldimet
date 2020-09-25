package soldimet.repository;
import soldimet.domain.CostoRepuesto;
import soldimet.domain.EstadoCostoRepuesto;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CostoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CostoRepuestoRepository extends JpaRepository<CostoRepuesto, Long> {}
