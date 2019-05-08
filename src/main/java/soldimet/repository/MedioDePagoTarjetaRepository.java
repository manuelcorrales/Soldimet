package soldimet.repository;

import soldimet.domain.MedioDePagoTarjeta;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MedioDePagoTarjeta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedioDePagoTarjetaRepository extends JpaRepository<MedioDePagoTarjeta, Long> {

}
