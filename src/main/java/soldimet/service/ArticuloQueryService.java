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

import soldimet.domain.Articulo;
import soldimet.domain.*; // for static metamodels
import soldimet.repository.ArticuloRepository;
import soldimet.service.dto.ArticuloCriteria;

/**
 * Service for executing complex queries for {@link Articulo} entities in the database.
 * The main input is a {@link ArticuloCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Articulo} or a {@link Page} of {@link Articulo} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class ArticuloQueryService extends QueryService<Articulo> {

    private final Logger log = LoggerFactory.getLogger(ArticuloQueryService.class);

    private final ArticuloRepository articuloRepository;

    public ArticuloQueryService(ArticuloRepository articuloRepository) {
        this.articuloRepository = articuloRepository;
    }

    /**
     * Return a {@link List} of {@link Articulo} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Articulo> findByCriteria(ArticuloCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Articulo> specification = createSpecification(criteria);
        return articuloRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Articulo} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Articulo> findByCriteria(ArticuloCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Articulo> specification = createSpecification(criteria);
        return articuloRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(ArticuloCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Articulo> specification = createSpecification(criteria);
        return articuloRepository.count(specification);
    }

    /**
     * Function to convert ConsumerCriteria to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */    
    protected Specification<Articulo> createSpecification(ArticuloCriteria criteria) {
        Specification<Articulo> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Articulo_.id));
            }
            if (criteria.getCodigoArticuloProveedor() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCodigoArticuloProveedor(), Articulo_.codigoArticuloProveedor));
            }
            if (criteria.getValor() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getValor(), Articulo_.valor));
            }
            if (criteria.getFechaCosto() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaCosto(), Articulo_.fechaCosto));
            }
            if (criteria.getEstadoId() != null) {
                specification = specification.and(buildSpecification(criteria.getEstadoId(),
                    root -> root.join(Articulo_.estado, JoinType.LEFT).get(EstadoArticulo_.id)));
            }
            if (criteria.getMarcaId() != null) {
                specification = specification.and(buildSpecification(criteria.getMarcaId(),
                    root -> root.join(Articulo_.marca, JoinType.LEFT).get(Marca_.id)));
            }
            if (criteria.getTipoRepuestoId() != null) {
                specification = specification.and(buildSpecification(criteria.getTipoRepuestoId(),
                    root -> root.join(Articulo_.tipoRepuesto, JoinType.LEFT).get(TipoRepuesto_.id)));
            }
        }
        return specification;
    }
}
