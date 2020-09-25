package soldimet.repository;

import java.time.LocalDate;
import java.util.List;
import soldimet.domain.Caja;
import soldimet.domain.Sucursal;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Caja entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CajaRepository extends JpaRepository<Caja, Long>, JpaSpecificationExecutor<Caja> {}
