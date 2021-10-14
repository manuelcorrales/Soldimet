package soldimet.repository.extendedRepository;

import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.Aplicacion;
import soldimet.domain.Cilindrada;
import soldimet.domain.DetallePresupuesto;
import soldimet.domain.TipoParteMotor;
import soldimet.repository.DetallePresupuestoRepository;

/**
 * Spring Data  repository for the DetallePresupuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedDetallePresupuestoRepository extends DetallePresupuestoRepository {
    public Optional<DetallePresupuesto> findFirstByAplicacionAndCilindradaOrderByIdDesc(Aplicacion aplicacion, Cilindrada cilindrada);
}
