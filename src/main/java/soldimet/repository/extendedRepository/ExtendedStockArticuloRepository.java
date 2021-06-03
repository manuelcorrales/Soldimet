package soldimet.repository.extendedRepository;
import soldimet.domain.Articulo;
import soldimet.domain.EstadoArticulo;
import soldimet.domain.StockArticulo;
import soldimet.domain.Sucursal;
import soldimet.repository.StockArticuloRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the StockArticulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedStockArticuloRepository extends StockArticuloRepository {

    @EntityGraph(attributePaths = {
        "medida",
        "sucursal",
        "articulo",
        "articulo.estado",
        "articulo.marca",
        "articulo.tipoRepuesto",
        "articulo.tipoRepuesto.tipoParteMotor",
    })
	Page<StockArticulo> findBySucursalAndArticuloEstadoNombreEstadoAndArticuloCodigoArticuloProveedorContainsOrArticuloInOrderByArticuloCodigoArticuloProveedorAsc(
            Sucursal sucursal, String estadoArticulo, String filtro, List<Articulo> articulos, Pageable pageable);

    @EntityGraph(attributePaths = { "medida", "sucursal", "articulo", "articulo.estado", "articulo.marca",
            "articulo.tipoRepuesto", "articulo.tipoRepuesto.tipoParteMotor", })
    StockArticulo findBySucursalAndArticuloIdAndMedidaId(Sucursal sucursal, Long articuloId, Long medidaId);

}
