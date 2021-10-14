package soldimet.repository.extendedRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.Rubro;
import soldimet.repository.RubroRepository;

/**
 * Spring Data  repository for the Rubro entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedRubroRepository extends RubroRepository {
    public Rubro findByNombreRubro(String nombreRubro);
}
