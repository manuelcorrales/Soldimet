package soldimet.repository.extendedRepository;

import soldimet.domain.TipoParteMotor;
import soldimet.repository.TipoParteMotorRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the TipoParteMotor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedTipoParteMotorRepository extends TipoParteMotorRepository {

    public List<TipoParteMotor> findByIdIn(List<Long> ids);

}
