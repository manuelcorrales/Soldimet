package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.Rubro;

/**
 * Spring Data SQL repository for the Rubro entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RubroRepository extends JpaRepository<Rubro, Long> {}
