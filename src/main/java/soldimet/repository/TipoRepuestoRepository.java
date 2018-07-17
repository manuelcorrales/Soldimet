package soldimet.repository;

import soldimet.domain.TipoParteMotor;
import soldimet.domain.TipoRepuesto;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TipoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoRepuestoRepository extends JpaRepository<TipoRepuesto, Long> {

    List<TipoRepuesto> findByTipoParteMotor(TipoParteMotor tipoParteMotor);
}
