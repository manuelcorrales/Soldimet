package soldimet.repository;

import soldimet.domain.PagoTarjeta;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PagoTarjeta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PagoTarjetaRepository extends JpaRepository<PagoTarjeta, Long> {

}
