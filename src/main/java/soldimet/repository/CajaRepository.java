package soldimet.repository;

import java.time.LocalDate;
import java.util.List;
import soldimet.domain.Caja;
import soldimet.domain.Sucursal;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Caja entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CajaRepository extends JpaRepository<Caja, Long>, JpaSpecificationExecutor<Caja> {

    public List<Caja> findByFechaGreaterThanEqual(LocalDate fecha);

    public Caja findByFecha(LocalDate fechaInicio);

    public Caja findByFechaAndSucursal(LocalDate date, Sucursal sucursal);

    public Caja findTopByOrderByIdDesc();

    public Caja findFirstByFechaGreaterThanEqualAndSucursal(LocalDate fecha, Sucursal sucursal);

    public List<Caja> findByFechaGreaterThanEqualAndFechaLessThanAndSucursal(
        LocalDate fechaInicio,
        LocalDate fechaFin,
        Sucursal sucursal
    );
}
