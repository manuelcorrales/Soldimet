package soldimet.repository.extendedRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.Marca;
import soldimet.repository.MarcaRepository;

/**
 * Spring Data  repository for the Marca entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedMarcaRepository extends MarcaRepository {
    public Marca findByNombreMarca(String nombreMarca);
}
