package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.FormaDePago;

/**
 * Spring Data SQL repository for the FormaDePago entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FormaDePagoRepository extends JpaRepository<FormaDePago, Long> {}
