package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.Banco;

/**
 * Spring Data SQL repository for the Banco entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BancoRepository extends JpaRepository<Banco, Long> {}
