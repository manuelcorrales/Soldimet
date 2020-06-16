package soldimet.repository;
import soldimet.domain.Aplicacion;
import soldimet.domain.Articulo;
import soldimet.domain.Cilindrada;
import soldimet.domain.CostoRepuestoProveedor;
import soldimet.domain.TipoRepuesto;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CostoRepuestoProveedor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CostoRepuestoProveedorRepository extends JpaRepository<CostoRepuestoProveedor, Long> {

    List<CostoRepuestoProveedor> findByAplicacionAndCilindradaAndTipoRepuestoIn(
        Aplicacion aplicacion, Cilindrada cilindrada, List<TipoRepuesto> tipos
    );

    List<CostoRepuestoProveedor> findByAplicacionAndCilindradaAndTipoRepuestoAndArticulo(
        Aplicacion aplicacion, Cilindrada cilindrada, TipoRepuesto tipo, Articulo articulo
    );

}
