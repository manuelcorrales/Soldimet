package soldimet.repository;
import soldimet.domain.Articulo;
import soldimet.domain.EstadoArticulo;
import soldimet.domain.TipoRepuesto;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Articulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArticuloRepository extends JpaRepository<Articulo, Long>, JpaSpecificationExecutor<Articulo> {

    List<Articulo> findDistinctByEstadoAndTipoRepuestoIn(EstadoArticulo estado, List<TipoRepuesto> tipos);

	boolean existsByCodigoArticuloProveedor(String codigoArticuloProveedor);

}
