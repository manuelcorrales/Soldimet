package soldimet.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import soldimet.domain.EstadoPersona;
import soldimet.domain.Persona;

/**
 * Spring Data JPA repository for the Persona entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonaRepository extends JpaRepository<Persona, Long>,
    JpaSpecificationExecutor<Persona> {

    public Persona findPersonaByNombre(String nombrePersona);

    public List<Persona> findPersonasByNombreIgnoreCaseContaining(String nombrePersona);

    public List<Persona> findByEstadoPersona(EstadoPersona estadoPersona);

    @Query("select persona from Persona persona where persona.user.login = ?#{principal.username}")
    List<Persona> findByUserIsCurrentUser();

}
