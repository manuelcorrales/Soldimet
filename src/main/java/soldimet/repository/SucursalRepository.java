package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.Sucursal;

/**
 * Spring Data SQL repository for the Sucursal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SucursalRepository extends JpaRepository<Sucursal, Long> {}
