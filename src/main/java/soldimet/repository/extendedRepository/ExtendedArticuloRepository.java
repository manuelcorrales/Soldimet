package soldimet.repository.extendedRepository;

import soldimet.domain.Articulo;
import soldimet.domain.EstadoArticulo;
import soldimet.domain.TipoRepuesto;
import soldimet.repository.ArticuloRepository;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Articulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedArticuloRepository extends ArticuloRepository {

    List<Articulo> findDistinctByEstadoAndTipoRepuestoIn(EstadoArticulo estado, List<TipoRepuesto> tipos);

	boolean existsByCodigoArticuloProveedor(String codigoArticuloProveedor);

}
