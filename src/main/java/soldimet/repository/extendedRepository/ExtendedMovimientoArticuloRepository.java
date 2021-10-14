package soldimet.repository.extendedRepository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.Movimiento;
import soldimet.domain.MovimientoArticulo;
import soldimet.repository.MovimientoArticuloRepository;

/**
 * Spring Data repository for the MovimientoArticulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedMovimientoArticuloRepository extends MovimientoArticuloRepository {
    public List<MovimientoArticulo> findByMovimiento(Movimiento movimiento);
}
