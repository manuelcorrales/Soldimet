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

import soldimet.domain.PedidoRepuesto;
import soldimet.domain.*; // for static metamodels
import soldimet.repository.PedidoRepuestoRepository;
import soldimet.service.dto.PedidoRepuestoCriteria;

/**
 * Service for executing complex queries for {@link PedidoRepuesto} entities in the database.
 * The main input is a {@link PedidoRepuestoCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link PedidoRepuesto} or a {@link Page} of {@link PedidoRepuesto} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class PedidoRepuestoQueryService extends QueryService<PedidoRepuesto> {

    private final Logger log = LoggerFactory.getLogger(PedidoRepuestoQueryService.class);

    private final PedidoRepuestoRepository pedidoRepuestoRepository;

    public PedidoRepuestoQueryService(PedidoRepuestoRepository pedidoRepuestoRepository) {
        this.pedidoRepuestoRepository = pedidoRepuestoRepository;
    }

    /**
     * Return a {@link List} of {@link PedidoRepuesto} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<PedidoRepuesto> findByCriteria(PedidoRepuestoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<PedidoRepuesto> specification = createSpecification(criteria);
        return pedidoRepuestoRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link PedidoRepuesto} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<PedidoRepuesto> findByCriteria(PedidoRepuestoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<PedidoRepuesto> specification = createSpecification(criteria);
        return pedidoRepuestoRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(PedidoRepuestoCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<PedidoRepuesto> specification = createSpecification(criteria);
        return pedidoRepuestoRepository.count(specification);
    }

    /**
     * Function to convert ConsumerCriteria to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */    
    protected Specification<PedidoRepuesto> createSpecification(PedidoRepuestoCriteria criteria) {
        Specification<PedidoRepuesto> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), PedidoRepuesto_.id));
            }
            if (criteria.getFechaCreacion() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaCreacion(), PedidoRepuesto_.fechaCreacion));
            }
            if (criteria.getFechaPedido() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaPedido(), PedidoRepuesto_.fechaPedido));
            }
            if (criteria.getFechaRecibo() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaRecibo(), PedidoRepuesto_.fechaRecibo));
            }
            if (criteria.getEstadoPedidoRepuestoId() != null) {
                specification = specification.and(buildSpecification(criteria.getEstadoPedidoRepuestoId(),
                    root -> root.join(PedidoRepuesto_.estadoPedidoRepuesto, JoinType.LEFT).get(EstadoPedidoRepuesto_.id)));
            }
            if (criteria.getDetallePedidoId() != null) {
                specification = specification.and(buildSpecification(criteria.getDetallePedidoId(),
                    root -> root.join(PedidoRepuesto_.detallePedidos, JoinType.LEFT).get(DetallePedido_.id)));
            }
            if (criteria.getPresupuestoId() != null) {
                specification = specification.and(buildSpecification(criteria.getPresupuestoId(),
                    root -> root.join(PedidoRepuesto_.presupuesto, JoinType.LEFT).get(Presupuesto_.id)));
            }
            if (criteria.getDocumentTypeId() != null) {
                specification = specification.and(buildSpecification(criteria.getDocumentTypeId(),
                    root -> root.join(PedidoRepuesto_.documentType, JoinType.LEFT).get(DocumentationType_.id)));
            }
        }
        return specification;
    }
}
