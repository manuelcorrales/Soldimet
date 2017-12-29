package soldimet.repository;

import java.time.LocalDate;
import java.util.List;
import soldimet.domain.Caja;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Caja entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CajaRepository extends JpaRepository<Caja, Long>, JpaSpecificationExecutor<Caja> {

    public List<Caja> findByFechaGreatherThan(LocalDate fecha);

    public Caja findByFecha(LocalDate fechaInicio);
}
