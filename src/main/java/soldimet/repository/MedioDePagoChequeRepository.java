package soldimet.repository;

import soldimet.domain.MedioDePagoCheque;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MedioDePagoCheque entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedioDePagoChequeRepository extends JpaRepository<MedioDePagoCheque, Long> {

}
