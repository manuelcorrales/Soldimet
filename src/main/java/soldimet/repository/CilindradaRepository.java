package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.Cilindrada;

/**
 * Spring Data SQL repository for the Cilindrada entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CilindradaRepository extends JpaRepository<Cilindrada, Long> {}
