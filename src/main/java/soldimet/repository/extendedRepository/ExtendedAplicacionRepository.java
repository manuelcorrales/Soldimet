package soldimet.repository.extendedRepository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Repository;
import soldimet.domain.Aplicacion;
import soldimet.domain.Motor;
import soldimet.repository.AplicacionRepository;

/**
 * Spring Data  repository for the Aplicacion entity.
 */
@Repository
public interface ExtendedAplicacionRepository extends AplicacionRepository {
    List<Aplicacion> findByMotorOrderByNombreAplicacionAsc(Motor motor);

    @EntityGraph(attributePaths = { "motor" })
    public Page<Aplicacion> findByNombreAplicacionContainsOrMotorMarcaMotorContainsOrderByIdDesc(
        String aplicacion,
        String motor,
        Pageable pageable
    );
}
