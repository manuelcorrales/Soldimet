package soldimet.repository.extendedRepository;

import soldimet.domain.Aplicacion;
import soldimet.domain.Motor;
import soldimet.repository.AplicacionRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import java.util.List;

import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Aplicacion entity.
 */
@Repository
public interface ExtendedAplicacionRepository extends AplicacionRepository {

    List<Aplicacion> findByMotorOrderByNombreAplicacionAsc(Motor motor);

    @EntityGraph(attributePaths = { "motor" })
    public Page<Aplicacion> findByNombreAplicacionContainsOrMotorMarcaMotorContainsOrderByIdDesc(
            String aplicacion, String motor, Pageable pageable);

}
