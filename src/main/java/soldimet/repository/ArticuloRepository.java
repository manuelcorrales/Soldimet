package soldimet.repository;

import java.util.List;
import soldimet.domain.Articulo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import soldimet.domain.EstadoArticulo;
import soldimet.domain.Proveedor;


/**
 * Spring Data JPA repository for the Articulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArticuloRepository extends JpaRepository<Articulo, Long>, JpaSpecificationExecutor<Articulo> {

    public List<Articulo> findByEstado(EstadoArticulo estadoArticulo);

    public Articulo findByCodigoArticuloProveedor(String codigoArticuloProveedor);

    public List<Articulo> findByProveedor( Proveedor proveedor);
}
