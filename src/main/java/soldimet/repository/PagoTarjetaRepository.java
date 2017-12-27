package soldimet.repository;

import soldimet.domain.PagoTarjeta;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PagoTarjeta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PagoTarjetaRepository extends JpaRepository<PagoTarjeta, Long> {

}
