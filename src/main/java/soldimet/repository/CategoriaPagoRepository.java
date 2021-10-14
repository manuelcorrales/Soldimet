package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.CategoriaPago;

/**
 * Spring Data SQL repository for the CategoriaPago entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoriaPagoRepository extends JpaRepository<CategoriaPago, Long> {}
