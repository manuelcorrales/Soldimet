package soldimet.repository;
import soldimet.domain.DetalleMovimiento;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DetalleMovimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DetalleMovimientoRepository extends JpaRepository<DetalleMovimiento, Long> {

}
