package soldimet.repository;

import soldimet.domain.Cilindrada;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Cilindrada entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CilindradaRepository extends JpaRepository<Cilindrada, Long> {

}
