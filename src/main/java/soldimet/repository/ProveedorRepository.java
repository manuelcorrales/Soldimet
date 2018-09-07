package soldimet.repository;

import soldimet.domain.Persona;
import soldimet.domain.Proveedor;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Proveedor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {

    public Proveedor findByPersona( Persona persona);

    public List<Proveedor> findByPersonaIn(List<Persona> personas);
}
