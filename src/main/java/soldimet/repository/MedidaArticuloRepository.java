package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.MedidaArticulo;

/**
 * Spring Data SQL repository for the MedidaArticulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedidaArticuloRepository extends JpaRepository<MedidaArticulo, Long> {}
