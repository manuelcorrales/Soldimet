package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.EstadoCostoRepuesto;

/**
 * Spring Data SQL repository for the EstadoCostoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoCostoRepuestoRepository extends JpaRepository<EstadoCostoRepuesto, Long> {}
