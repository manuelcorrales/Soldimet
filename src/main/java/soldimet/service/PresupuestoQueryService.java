package soldimet.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import soldimet.domain.Presupuesto;
import soldimet.domain.*; // for static metamodels
import soldimet.repository.PresupuestoRepository;
import soldimet.service.dto.PresupuestoCriteria;

/**
 * Service for executing complex queries for {@link Presupuesto} entities in the database.
 * The main input is a {@link PresupuestoCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Presupuesto} or a {@link Page} of {@link Presupuesto} which fulfills the criteria.
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
     * Return a {@link List} of {@link Presupuesto} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Presupuesto> findByCriteria(PresupuestoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Presupuesto> specification = createSpecification(criteria);
        return presupuestoRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Presupuesto} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Presupuesto> findByCriteria(PresupuestoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Presupuesto> specification = createSpecification(criteria);
        return presupuestoRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(PresupuestoCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Presupuesto> specification = createSpecification(criteria);
        return presupuestoRepository.count(specification);
    }

    /**
     * Function to convert ConsumerCriteria to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */    
    protected Specification<Presupuesto> createSpecification(PresupuestoCriteria criteria) {
        Specification<Presupuesto> specification = Specification.where(null);
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
            if (criteria.getSoldadura() != null) {
                specification = specification.and(buildSpecification(criteria.getSoldadura(), Presupuesto_.soldadura));
            }
            if (criteria.getModelo() != null) {
                specification = specification.and(buildSpecification(criteria.getModelo(), Presupuesto_.modelo));
            }
            if (criteria.getClienteId() != null) {
                specification = specification.and(buildSpecification(criteria.getClienteId(),
                    root -> root.join(Presupuesto_.cliente, JoinType.LEFT).get(Cliente_.id)));
            }
            if (criteria.getEstadoPresupuestoId() != null) {
                specification = specification.and(buildSpecification(criteria.getEstadoPresupuestoId(),
                    root -> root.join(Presupuesto_.estadoPresupuesto, JoinType.LEFT).get(EstadoPresupuesto_.id)));
            }
            if (criteria.getDetallePresupuestoId() != null) {
                specification = specification.and(buildSpecification(criteria.getDetallePresupuestoId(),
                    root -> root.join(Presupuesto_.detallePresupuestos, JoinType.LEFT).get(DetallePresupuesto_.id)));
            }
            if (criteria.getDocumentTypeId() != null) {
                specification = specification.and(buildSpecification(criteria.getDocumentTypeId(),
                    root -> root.join(Presupuesto_.documentType, JoinType.LEFT).get(DocumentationType_.id)));
            }
            if (criteria.getSucursalId() != null) {
                specification = specification.and(buildSpecification(criteria.getSucursalId(),
                    root -> root.join(Presupuesto_.sucursal, JoinType.LEFT).get(Sucursal_.id)));
            }
        }
        return specification;
    }
}
