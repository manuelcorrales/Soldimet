package soldimet.repository;

import soldimet.domain.Rubro;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Rubro entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RubroRepository extends JpaRepository<Rubro, Long> {

    public Rubro findByNombreRubro(String nombreRubro);
}
