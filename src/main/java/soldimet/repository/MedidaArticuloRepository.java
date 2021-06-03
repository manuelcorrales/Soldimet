package soldimet.repository;
import soldimet.domain.MedidaArticulo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MedidaArticulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedidaArticuloRepository extends JpaRepository<MedidaArticulo, Long> {

}
