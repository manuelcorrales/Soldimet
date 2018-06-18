package soldimet.repository;

import soldimet.domain.TipoRepuesto;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TipoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoRepuestoRepository extends JpaRepository<TipoRepuesto, Long> {

        TipoRepuesto findByNombreTipoRepuesto(String nombre);
}
