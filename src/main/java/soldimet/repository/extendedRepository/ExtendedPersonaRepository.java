package soldimet.repository.extendedRepository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.EstadoPersona;
import soldimet.domain.Persona;
import soldimet.domain.User;
import soldimet.repository.PersonaRepository;

/**
 * Spring Data  repository for the Persona entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedPersonaRepository extends PersonaRepository {
    @Query("select persona from Persona persona where persona.user.login = ?#{principal.username}")
    Persona findByUserIsCurrentUser();

    Persona findByUser(User usuario);

    List<Persona> findByEstadoPersona(EstadoPersona estadoPersona);
}
