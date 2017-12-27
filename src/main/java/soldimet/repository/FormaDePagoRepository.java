package soldimet.repository;

import soldimet.domain.FormaDePago;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FormaDePago entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FormaDePagoRepository extends JpaRepository<FormaDePago, Long> {

}
