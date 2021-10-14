package soldimet.repository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.Persona;

/**
 * Spring Data SQL repository for the Persona entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonaRepository extends JpaRepository<Persona, Long>, JpaSpecificationExecutor<Persona> {
    @Query("select persona from Persona persona where persona.user.login = ?#{principal.username}")
    List<Persona> findByUserIsCurrentUser();
}
