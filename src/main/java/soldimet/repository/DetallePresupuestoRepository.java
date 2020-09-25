package soldimet.repository;

import soldimet.domain.Aplicacion;
import soldimet.domain.Cilindrada;
import soldimet.domain.DetallePresupuesto;
import soldimet.domain.TipoParteMotor;

import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DetallePresupuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DetallePresupuestoRepository extends JpaRepository<DetallePresupuesto, Long> {

}
