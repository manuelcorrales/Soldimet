package soldimet.repository;

import soldimet.domain.TipoTarjeta;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TipoTarjeta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoTarjetaRepository extends JpaRepository<TipoTarjeta, Long> {

}
