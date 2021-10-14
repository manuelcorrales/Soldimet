package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.Localidad;

/**
 * Spring Data SQL repository for the Localidad entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocalidadRepository extends JpaRepository<Localidad, Long> {}
