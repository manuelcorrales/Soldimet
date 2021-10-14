package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.CostoRepuestoProveedor;

/**
 * Spring Data SQL repository for the CostoRepuestoProveedor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CostoRepuestoProveedorRepository extends JpaRepository<CostoRepuestoProveedor, Long> {}
