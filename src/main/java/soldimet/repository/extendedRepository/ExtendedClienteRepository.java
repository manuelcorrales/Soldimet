package soldimet.repository.extendedRepository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.Cliente;
import soldimet.domain.Persona;
import soldimet.repository.ClienteRepository;

/**
 * Spring Data  repository for the Cliente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedClienteRepository extends ClienteRepository {
    @EntityGraph(attributePaths = { "persona", "persona.direccion", "persona.direccion.localidad", "persona.estadoPersona" })
    List<Cliente> findClienteByPersonaIn(List<Persona> persona);

    @EntityGraph(attributePaths = { "persona", "persona.direccion", "persona.direccion.localidad", "persona.estadoPersona" })
    Page<Cliente> findClienteByPersonaNombreContainsOrPersonaApellidoContainsOrPersonaDireccionCalleContainsOrderByIdDesc(
        String nombre,
        String apellido,
        String calle,
        Pageable paging
    );
}
