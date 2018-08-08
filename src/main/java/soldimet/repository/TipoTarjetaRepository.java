package soldimet.repository;

import soldimet.domain.TipoTarjeta;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoTarjeta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoTarjetaRepository extends JpaRepository<TipoTarjeta, Long> {

}
