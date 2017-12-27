package soldimet.repository;

import soldimet.domain.CostoOperacion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CostoOperacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CostoOperacionRepository extends JpaRepository<CostoOperacion, Long> {

}
