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

import soldimet.domain.Articulo;
import soldimet.domain.*; // for static metamodels
import soldimet.repository.ArticuloRepository;
import soldimet.service.dto.ArticuloCriteria;


/**
 * Service for executing complex queries for Articulo entities in the database.
 * The main input is a {@link ArticuloCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {%link Articulo} or a {@link Page} of {%link Articulo} which fulfills the criterias
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
     * Return a {@link List} of {%link Articulo} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Articulo> findByCriteria(ArticuloCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<Articulo> specification = createSpecification(criteria);
        return articuloRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {%link Articulo} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Articulo> findByCriteria(ArticuloCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<Articulo> specification = createSpecification(criteria);
        return articuloRepository.findAll(specification, page);
    }

    /**
     * Function to convert ArticuloCriteria to a {@link Specifications}
     */
    private Specifications<Articulo> createSpecification(ArticuloCriteria criteria) {
        Specifications<Articulo> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Articulo_.id));
            }
            if (criteria.getDescripcion() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescripcion(), Articulo_.descripcion));
            }
            if (criteria.getCodigoArticuloProveedor() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCodigoArticuloProveedor(), Articulo_.codigoArticuloProveedor));
            }
            if (criteria.getEstadoId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getEstadoId(), Articulo_.estado, EstadoArticulo_.id));
            }
            if (criteria.getRubroId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getRubroId(), Articulo_.rubro, Rubro_.id));
            }
            if (criteria.getMarcaId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getMarcaId(), Articulo_.marca, Marca_.id));
            }
            if (criteria.getProveedorId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getProveedorId(), Articulo_.proveedor, Proveedor_.id));
            }
            if (criteria.getTipoRepuestoId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getTipoRepuestoId(), Articulo_.tipoRepuesto, TipoRepuesto_.id));
            }
        }
        return specification;
    }

}
