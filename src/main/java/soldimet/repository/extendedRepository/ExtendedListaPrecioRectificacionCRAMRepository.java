package soldimet.repository.extendedRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.ListaPrecioRectificacionCRAM;
import soldimet.repository.ListaPrecioRectificacionCRAMRepository;

/**
 * Spring Data  repository for the ListaPrecioRectificacionCRAM entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedListaPrecioRectificacionCRAMRepository extends ListaPrecioRectificacionCRAMRepository {
    ListaPrecioRectificacionCRAM findByNumeroGrupo(Integer numeroGrupo);
}
