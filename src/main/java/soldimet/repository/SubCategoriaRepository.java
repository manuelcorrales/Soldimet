package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.SubCategoria;

/**
 * Spring Data SQL repository for the SubCategoria entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubCategoriaRepository extends JpaRepository<SubCategoria, Long> {}
