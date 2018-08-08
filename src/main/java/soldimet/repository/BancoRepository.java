package soldimet.repository;

import soldimet.domain.Banco;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Banco entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BancoRepository extends JpaRepository<Banco, Long> {

}
