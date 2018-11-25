package soldimet.repository;

import soldimet.domain.DocumentationType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DocumentationType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentationTypeRepository extends JpaRepository<DocumentationType, Long> {

}
