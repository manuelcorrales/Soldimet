package soldimet.repository;

import soldimet.domain.Articulo;
import soldimet.domain.TipoRepuesto;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data  repository for the Articulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArticuloRepository extends JpaRepository<Articulo, Long>, JpaSpecificationExecutor<Articulo> {

    List<Articulo> findArticuloByTipoRepuesto(TipoRepuesto tipo);
}
