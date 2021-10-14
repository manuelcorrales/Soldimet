package soldimet.repository.extendedRepository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.SubCategoria;
import soldimet.repository.SubCategoriaRepository;

/**
 * Spring Data  repository for the SubCategoria entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedSubCategoriaRepository extends SubCategoriaRepository {
    List<SubCategoria> findByNombreSubCategoria(String string);
}
