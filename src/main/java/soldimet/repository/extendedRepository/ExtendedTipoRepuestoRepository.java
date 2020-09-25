package soldimet.repository.extendedRepository;

import soldimet.domain.TipoParteMotor;
import soldimet.domain.TipoRepuesto;
import soldimet.repository.TipoRepuestoRepository;

import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.*;


/**
 * Spring Data  repository for the TipoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedTipoRepuestoRepository extends TipoRepuestoRepository {

    List<TipoRepuesto> findByTipoParteMotorIn(List<TipoParteMotor> tiposParteMotor);
}
