package soldimet.repository.extendedRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.Empleado;
import soldimet.domain.Persona;
import soldimet.repository.EmpleadoRepository;

/**
 * Spring Data  repository for the Empleado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedEmpleadoRepository extends EmpleadoRepository {
    Empleado findByPersona(Persona persona);
}
