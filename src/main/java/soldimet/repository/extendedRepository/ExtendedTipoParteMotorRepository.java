package soldimet.repository.extendedRepository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.TipoParteMotor;
import soldimet.repository.TipoParteMotorRepository;

/**
 * Spring Data  repository for the TipoParteMotor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedTipoParteMotorRepository extends TipoParteMotorRepository {
    public List<TipoParteMotor> findByIdIn(List<Long> ids);
}
