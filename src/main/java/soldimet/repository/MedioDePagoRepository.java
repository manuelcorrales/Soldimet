package soldimet.repository;

import soldimet.domain.MedioDePago;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MedioDePago entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedioDePagoRepository extends JpaRepository<MedioDePago, Long> {

}
