package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.MedioDePagoCheque;

/**
 * Spring Data SQL repository for the MedioDePagoCheque entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedioDePagoChequeRepository extends JpaRepository<MedioDePagoCheque, Long> {}
