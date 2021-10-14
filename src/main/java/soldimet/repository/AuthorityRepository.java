package soldimet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import soldimet.domain.Authority;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {}
