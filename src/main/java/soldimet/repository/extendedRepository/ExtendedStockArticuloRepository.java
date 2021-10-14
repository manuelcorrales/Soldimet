package soldimet.repository.extendedRepository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.Articulo;
import soldimet.domain.EstadoArticulo;
import soldimet.domain.StockArticulo;
import soldimet.domain.Sucursal;
import soldimet.repository.StockArticuloRepository;

/**
 * Spring Data  repository for the StockArticulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedStockArticuloRepository extends StockArticuloRepository {
    @EntityGraph(
        attributePaths = {
            "medida",
            "sucursal",
            "articulo",
            "articulo.estado",
            "articulo.marca",
            "articulo.tipoRepuesto",
            "articulo.tipoRepuesto.tipoParteMotor",
        }
    )
    Page<StockArticulo> findBySucursalAndArticuloEstadoNombreEstadoAndArticuloCodigoArticuloProveedorContainsOrArticuloInAndSucursalOrderByArticuloCodigoArticuloProveedorAsc(
        Sucursal sucursal,
        String estadoArticulo,
        String filtro,
        List<Articulo> articulos,
        Sucursal sucursal2,
        Pageable pageable
    );

    @EntityGraph(
        attributePaths = {
            "medida",
            "sucursal",
            "articulo",
            "articulo.estado",
            "articulo.marca",
            "articulo.tipoRepuesto",
            "articulo.tipoRepuesto.tipoParteMotor",
        }
    )
    StockArticulo findBySucursalAndArticuloIdAndMedidaId(Sucursal sucursal, Long articuloId, Long medidaId);
}
