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

import soldimet.domain.PedidoRepuesto;
import soldimet.domain.*; // for static metamodels
import soldimet.repository.PedidoRepuestoRepository;
import soldimet.service.dto.PedidoRepuestoCriteria;


/**
 * Service for executing complex queries for PedidoRepuesto entities in the database.
 * The main input is a {@link PedidoRepuestoCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {%link PedidoRepuesto} or a {@link Page} of {%link PedidoRepuesto} which fulfills the criterias
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
     * Return a {@link List} of {%link PedidoRepuesto} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<PedidoRepuesto> findByCriteria(PedidoRepuestoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<PedidoRepuesto> specification = createSpecification(criteria);
        return pedidoRepuestoRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {%link PedidoRepuesto} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<PedidoRepuesto> findByCriteria(PedidoRepuestoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<PedidoRepuesto> specification = createSpecification(criteria);
        return pedidoRepuestoRepository.findAll(specification, page);
    }

    /**
     * Function to convert PedidoRepuestoCriteria to a {@link Specifications}
     */
    private Specifications<PedidoRepuesto> createSpecification(PedidoRepuestoCriteria criteria) {
        Specifications<PedidoRepuesto> specification = Specifications.where(null);
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
                specification = specification.and(buildReferringEntitySpecification(criteria.getEstadoPedidoRepuestoId(), PedidoRepuesto_.estadoPedidoRepuesto, EstadoPedidoRepuesto_.id));
            }
            if (criteria.getPresupuestoId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getPresupuestoId(), PedidoRepuesto_.presupuesto, Presupuesto_.id));
            }
        }
        return specification;
    }

}
