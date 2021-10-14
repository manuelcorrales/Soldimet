package soldimet.repository.extendedRepository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.TipoParteMotor;
import soldimet.domain.TipoRepuesto;
import soldimet.repository.TipoRepuestoRepository;

/**
 * Spring Data  repository for the TipoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedTipoRepuestoRepository extends TipoRepuestoRepository {
    List<TipoRepuesto> findByTipoParteMotorIn(List<TipoParteMotor> tiposParteMotor);
}
