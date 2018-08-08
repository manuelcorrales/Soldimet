package soldimet.repository;

import soldimet.domain.CostoOperacion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CostoOperacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CostoOperacionRepository extends JpaRepository<CostoOperacion, Long> {

}
