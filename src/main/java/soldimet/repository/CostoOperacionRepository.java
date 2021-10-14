package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.CostoOperacion;

/**
 * Spring Data SQL repository for the CostoOperacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CostoOperacionRepository extends JpaRepository<CostoOperacion, Long> {}
