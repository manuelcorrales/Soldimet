package soldimet.repository;

import soldimet.domain.PagoCheque;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PagoCheque entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PagoChequeRepository extends JpaRepository<PagoCheque, Long> {

}
