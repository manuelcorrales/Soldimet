package soldimet.repository.extendedRepository;

import soldimet.domain.Aplicacion;
import soldimet.domain.Motor;
import soldimet.repository.AplicacionRepository;

import java.util.List;

import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Aplicacion entity.
 */
@Repository
public interface ExtendedAplicacionRepository extends AplicacionRepository {

    List<Aplicacion> findByMotorOrderByNombreAplicacionAsc(Motor motor);

}
