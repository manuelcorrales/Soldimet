package soldimet.repository.extendedRepository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.Caja;
import soldimet.domain.Sucursal;
import soldimet.repository.CajaRepository;

/**
 * Spring Data  repository for the Caja entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedCajaRepository extends CajaRepository {
    public List<Caja> findByFechaGreaterThanEqual(LocalDate fecha);

    public Caja findByFecha(LocalDate fechaInicio);

    public Caja findByFechaAndSucursal(LocalDate date, Sucursal sucursal);

    public Caja findTopByOrderByIdDesc();

    public Caja findFirstByFechaGreaterThanEqualAndSucursal(LocalDate fecha, Sucursal sucursal);

    public List<Caja> findByFechaGreaterThanEqualAndFechaLessThanEqualAndSucursalOrderByFechaAsc(
        LocalDate fechaInicio,
        LocalDate fechaFin,
        Sucursal sucursal
    );
}
