package soldimet.repository.extendedRepository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.Aplicacion;
import soldimet.domain.Articulo;
import soldimet.domain.Cilindrada;
import soldimet.domain.CostoRepuestoProveedor;
import soldimet.domain.TipoRepuesto;
import soldimet.repository.CostoRepuestoProveedorRepository;

/**
 * Spring Data  repository for the CostoRepuestoProveedor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedCostoRepuestoProveedorRepository extends CostoRepuestoProveedorRepository {
    List<CostoRepuestoProveedor> findByAplicacionAndCilindradaAndTipoRepuestoIn(
        Aplicacion aplicacion,
        Cilindrada cilindrada,
        List<TipoRepuesto> tipos
    );
    List<CostoRepuestoProveedor> findByArticulo(Articulo articulo);

    List<CostoRepuestoProveedor> findByAplicacionAndCilindradaAndTipoRepuestoAndArticulo(
        Aplicacion aplicacion,
        Cilindrada cilindrada,
        TipoRepuesto tipo,
        Articulo articulo
    );

    @EntityGraph(
        attributePaths = {
            "tipoRepuesto",
            "tipoRepuesto.tipoParteMotor",
            "aplicacion",
            "aplicacion.motor",
            "cilindrada",
            "articulo",
            "articulo.estado",
            "articulo.marca",
            "articulo.tipoRepuesto",
            "articulo.tipoRepuesto.tipoParteMotor",
        }
    )
    Page<CostoRepuestoProveedor> findByAplicacionNombreAplicacionContainsOrAplicacionMotorMarcaMotorContainsOrTipoRepuestoNombreTipoRepuestoContainsOrArticuloCodigoArticuloProveedorContainsOrderByIdDesc(
        String filtro,
        String filtro2,
        String filtro3,
        String filtro4,
        Pageable page
    );

    @EntityGraph(
        attributePaths = {
            "tipoRepuesto",
            "tipoRepuesto.tipoParteMotor",
            "aplicacion",
            "aplicacion.motor",
            "cilindrada",
            "articulo",
            "articulo.estado",
            "articulo.marca",
            "articulo.tipoRepuesto",
            "articulo.tipoRepuesto.tipoParteMotor",
        }
    )
    List<CostoRepuestoProveedor> findByAplicacionNombreAplicacionContainsOrAplicacionMotorMarcaMotorContainsOrTipoRepuestoNombreTipoRepuestoContainsOrArticuloCodigoArticuloProveedorContainsOrderByIdDesc(
        String filtro,
        String filtro2,
        String filtro3,
        String filtro4
    );
}
