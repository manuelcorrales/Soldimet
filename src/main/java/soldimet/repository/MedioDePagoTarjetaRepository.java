package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.MedioDePagoTarjeta;

/**
 * Spring Data SQL repository for the MedioDePagoTarjeta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedioDePagoTarjetaRepository extends JpaRepository<MedioDePagoTarjeta, Long> {}
