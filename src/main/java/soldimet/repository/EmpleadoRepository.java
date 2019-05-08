package soldimet.repository;

import soldimet.domain.Empleado;
import soldimet.domain.Persona;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Empleado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {

    Empleado findByPersona(Persona persona);

}
