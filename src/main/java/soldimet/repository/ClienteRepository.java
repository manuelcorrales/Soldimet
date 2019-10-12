package soldimet.repository;
import soldimet.domain.Cliente;
import soldimet.domain.Persona;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Cliente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    List<Cliente> findClienteByPersonaIn(List<Persona> persona);

}
