package soldimet.repository.extendedRepository;
import soldimet.domain.ListaPrecioRectificacionCRAM;
import soldimet.repository.ListaPrecioRectificacionCRAMRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ListaPrecioRectificacionCRAM entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedListaPrecioRectificacionCRAMRepository extends ListaPrecioRectificacionCRAMRepository {

    ListaPrecioRectificacionCRAM findByNumeroGrupo(Integer numeroGrupo);

}
