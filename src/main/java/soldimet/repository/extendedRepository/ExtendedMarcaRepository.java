package soldimet.repository.extendedRepository;

import soldimet.domain.Marca;
import soldimet.repository.MarcaRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Marca entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedMarcaRepository extends MarcaRepository {

    public Marca findByNombreMarca( String nombreMarca);
}
