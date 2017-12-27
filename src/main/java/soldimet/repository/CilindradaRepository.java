package soldimet.repository;

import soldimet.domain.Cilindrada;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Cilindrada entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CilindradaRepository extends JpaRepository<Cilindrada, Long> {

}
