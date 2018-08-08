package soldimet.repository;

import soldimet.domain.CategoriaPago;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CategoriaPago entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoriaPagoRepository extends JpaRepository<CategoriaPago, Long> {

}
