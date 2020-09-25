package soldimet.repository.extendedRepository;

import soldimet.domain.Aplicacion;
import soldimet.domain.Cilindrada;
import soldimet.domain.DetallePresupuesto;
import soldimet.domain.TipoParteMotor;
import soldimet.repository.DetallePresupuestoRepository;

import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DetallePresupuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedDetallePresupuestoRepository extends DetallePresupuestoRepository {

    public Optional<DetallePresupuesto> findFirstByAplicacionAndCilindradaOrderByIdDesc(Aplicacion aplicacion, Cilindrada cilindrada);

}
