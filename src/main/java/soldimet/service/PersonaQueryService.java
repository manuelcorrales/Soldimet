package soldimet.service;


import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import soldimet.domain.Persona;
import soldimet.domain.*; // for static metamodels
import soldimet.repository.PersonaRepository;
import soldimet.service.dto.PersonaCriteria;


/**
 * Service for executing complex queries for Persona entities in the database.
 * The main input is a {@link PersonaCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {%link Persona} or a {@link Page} of {%link Persona} which fulfills the criterias
 */
@Service
@Transactional(readOnly = true)
public class PersonaQueryService extends QueryService<Persona> {

    private final Logger log = LoggerFactory.getLogger(PersonaQueryService.class);


    private final PersonaRepository personaRepository;

    public PersonaQueryService(PersonaRepository personaRepository) {
        this.personaRepository = personaRepository;
    }

    /**
     * Return a {@link List} of {%link Persona} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Persona> findByCriteria(PersonaCriteria criteria) {
        log.debug("findPresupuestoCabecera by criteria : {}", criteria);
        final Specifications<Persona> specification = createSpecification(criteria);
        return personaRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {%link Persona} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Persona> findByCriteria(PersonaCriteria criteria, Pageable page) {
        log.debug("findPresupuestoCabecera by criteria : {}, page: {}", criteria, page);
        final Specifications<Persona> specification = createSpecification(criteria);
        return personaRepository.findAll(specification, page);
    }

    /**
     * Function to convert PersonaCriteria to a {@link Specifications}
     */
    private Specifications<Persona> createSpecification(PersonaCriteria criteria) {
        Specifications<Persona> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Persona_.id));
            }
            if (criteria.getNombre() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombre(), Persona_.nombre));
            }
            if (criteria.getNumeroTelefono() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNumeroTelefono(), Persona_.numeroTelefono));
            }
            if (criteria.getDireccionId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getDireccionId(), Persona_.direccion, Direccion_.id));
            }
            if (criteria.getEstadoPersonaId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getEstadoPersonaId(), Persona_.estadoPersona, EstadoPersona_.id));
            }
            if (criteria.getUserId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getUserId(), Persona_.user, User_.id));
            }
        }
        return specification;
    }

}
