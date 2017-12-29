package soldimet.repository;

import soldimet.domain.Persona;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Persona entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonaRepository extends JpaRepository<Persona, Long>, JpaSpecificationExecutor<Persona> {

    @Query("select persona from Persona persona where persona.user.login = ?#{principal.username}")
    List<Persona> findByUserIsCurrentUser();

}
