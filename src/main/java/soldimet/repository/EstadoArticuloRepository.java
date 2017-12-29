package soldimet.repository;

import soldimet.domain.EstadoArticulo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EstadoArticulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoArticuloRepository extends JpaRepository<EstadoArticulo, Long> {

    EstadoArticulo findByNombreEstado(String nombreEstado);
}
