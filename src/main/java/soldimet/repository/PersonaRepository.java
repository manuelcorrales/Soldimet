package soldimet.repository;
import soldimet.domain.EstadoPersona;
import soldimet.domain.Persona;
import soldimet.domain.User;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Persona entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonaRepository extends JpaRepository<Persona, Long>, JpaSpecificationExecutor<Persona> {

    @Query("select persona from Persona persona where persona.user.login = ?#{principal.username}")
    Persona findByUserIsCurrentUser();

    Persona findByUser(User usuario);

    List<Persona> findByEstadoPersona(EstadoPersona estadoPersona);

}
