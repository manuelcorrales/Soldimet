package soldimet.repository.extendedRepository;
import soldimet.domain.Persona;
import soldimet.domain.Proveedor;
import soldimet.repository.ProveedorRepository;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Proveedor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedProveedorRepository extends ProveedorRepository {

    List<Proveedor> findByPersonaIn(List<Persona> personas);

}
