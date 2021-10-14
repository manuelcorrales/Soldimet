package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.PagoCheque;

/**
 * Spring Data SQL repository for the PagoCheque entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PagoChequeRepository extends JpaRepository<PagoCheque, Long> {}
