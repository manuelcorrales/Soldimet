package soldimet.repository.extendedRepository;

import java.util.List;

import soldimet.domain.Movimiento;
import soldimet.domain.MovimientoArticulo;
import soldimet.repository.MovimientoArticuloRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MovimientoArticulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedMovimientoArticuloRepository extends MovimientoArticuloRepository {

    public List<MovimientoArticulo> findByMovimiento(Movimiento movimiento);

}
