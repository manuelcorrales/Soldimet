package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.MedioDePago;

/**
 * Spring Data SQL repository for the MedioDePago entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedioDePagoRepository extends JpaRepository<MedioDePago, Long> {}
