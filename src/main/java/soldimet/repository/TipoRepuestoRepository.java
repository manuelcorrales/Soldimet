package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.TipoRepuesto;

/**
 * Spring Data SQL repository for the TipoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoRepuestoRepository extends JpaRepository<TipoRepuesto, Long> {}
