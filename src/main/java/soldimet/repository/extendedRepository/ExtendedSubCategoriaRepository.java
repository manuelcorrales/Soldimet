package soldimet.repository.extendedRepository;

import soldimet.domain.SubCategoria;
import soldimet.repository.SubCategoriaRepository;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SubCategoria entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedSubCategoriaRepository extends SubCategoriaRepository {

	List<SubCategoria> findByNombreSubCategoria(String string);

}
