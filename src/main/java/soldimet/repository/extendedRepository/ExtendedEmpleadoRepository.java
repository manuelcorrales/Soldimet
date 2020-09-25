package soldimet.repository.extendedRepository;

import soldimet.domain.Empleado;
import soldimet.domain.Persona;
import soldimet.repository.EmpleadoRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Empleado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedEmpleadoRepository extends EmpleadoRepository {

    Empleado findByPersona(Persona persona);

}
