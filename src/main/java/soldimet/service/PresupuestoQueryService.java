package soldimet.service;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import soldimet.domain.Presupuesto;
import soldimet.domain.*; // for static metamodels
import soldimet.repository.PresupuestoRepository;
import soldimet.service.dto.PresupuestoCriteria;


/**
 * Service for executing complex queries for Presupuesto entities in the database.
 * The main input is a {@link PresupuestoCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {%link Presupuesto} or a {@link Page} of {%link Presupuesto} which fulfills the criterias
 */
@Service
@Transactional(readOnly = true)
public class PresupuestoQueryService extends QueryService<Presupuesto> {

    private final Logger log = LoggerFactory.getLogger(PresupuestoQueryService.class);


    private final PresupuestoRepository presupuestoRepository;

    public PresupuestoQueryService(PresupuestoRepository presupuestoRepository) {
        this.presupuestoRepository = presupuestoRepository;
    }

    /**
     * Return a {@link List} of {%link Presupuesto} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Presupuesto> findByCriteria(PresupuestoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<Presupuesto> specification = createSpecification(criteria);
        return presupuestoRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {%link Presupuesto} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Presupuesto> findByCriteria(PresupuestoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<Presupuesto> specification = createSpecification(criteria);
        return presupuestoRepository.findAll(specification, page);
    }

    /**
     * Function to convert PresupuestoCriteria to a {@link Specifications}
     */
    private Specifications<Presupuesto> createSpecification(PresupuestoCriteria criteria) {
        Specifications<Presupuesto> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Presupuesto_.id));
            }
            if (criteria.getDescripcionDescuento() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescripcionDescuento(), Presupuesto_.descripcionDescuento));
            }
            if (criteria.getDescuento() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDescuento(), Presupuesto_.descuento));
            }
            if (criteria.getFechaCreacion() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaCreacion(), Presupuesto_.fechaCreacion));
            }
            if (criteria.getFechaAceptado() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaAceptado(), Presupuesto_.fechaAceptado));
            }
            if (criteria.getFechaEntregado() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaEntregado(), Presupuesto_.fechaEntregado));
            }
            if (criteria.getImporteTotal() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getImporteTotal(), Presupuesto_.importeTotal));
            }
            if (criteria.getObservaciones() != null) {
                specification = specification.and(buildStringSpecification(criteria.getObservaciones(), Presupuesto_.observaciones));
            }
            if (criteria.getClienteId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getClienteId(), Presupuesto_.cliente, Cliente_.id));
            }
            if (criteria.getEstadoPresupuestoId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getEstadoPresupuestoId(), Presupuesto_.estadoPresupuesto, EstadoPresupuesto_.id));
            }
        }
        return specification;
    }

}
