package soldimet.repository;

import soldimet.domain.EstadoCostoRepuesto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EstadoCostoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoCostoRepuestoRepository extends JpaRepository<EstadoCostoRepuesto, Long> {


}
