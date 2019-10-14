package soldimet.repository;
import soldimet.domain.ListaPrecioRectificacionCRAM;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ListaPrecioRectificacionCRAM entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ListaPrecioRectificacionCRAMRepository extends JpaRepository<ListaPrecioRectificacionCRAM, Long> {

    ListaPrecioRectificacionCRAM findByNumeroGrupo(Integer numeroGrupo);

}
