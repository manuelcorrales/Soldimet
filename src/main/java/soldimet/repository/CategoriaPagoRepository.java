package soldimet.repository;

import soldimet.domain.CategoriaPago;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CategoriaPago entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoriaPagoRepository extends JpaRepository<CategoriaPago, Long> {

}
