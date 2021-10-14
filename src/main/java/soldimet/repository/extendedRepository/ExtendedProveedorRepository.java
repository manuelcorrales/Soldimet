package soldimet.repository.extendedRepository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.Persona;
import soldimet.domain.Proveedor;
import soldimet.repository.ProveedorRepository;

/**
 * Spring Data  repository for the Proveedor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedProveedorRepository extends ProveedorRepository {
    List<Proveedor> findByPersonaIn(List<Persona> personas);
}
