package soldimet.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import soldimet.domain.Cliente;
import soldimet.domain.Persona;


/**
 * Spring Data  repository for the Cliente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    List<Cliente> findClienteByApellido(String apellido);

    List<Cliente> findClienteByPersonaIn(List<Persona> personas);
}
