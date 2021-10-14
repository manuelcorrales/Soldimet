package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.PagoTarjeta;

/**
 * Spring Data SQL repository for the PagoTarjeta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PagoTarjetaRepository extends JpaRepository<PagoTarjeta, Long> {}
