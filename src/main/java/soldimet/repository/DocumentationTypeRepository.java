package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.DocumentationType;

/**
 * Spring Data SQL repository for the DocumentationType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentationTypeRepository extends JpaRepository<DocumentationType, Long> {}
