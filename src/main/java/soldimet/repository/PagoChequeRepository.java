package soldimet.repository;
import soldimet.domain.PagoCheque;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PagoCheque entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PagoChequeRepository extends JpaRepository<PagoCheque, Long> {

}
