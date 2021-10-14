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
import soldimet.domain.*; // for static metamodels
import soldimet.domain.Caja;
import soldimet.repository.CajaRepository;
import soldimet.service.criteria.CajaCriteria;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link Caja} entities in the database.
 * The main input is a {@link CajaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Caja} or a {@link Page} of {@link Caja} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class CajaQueryService extends QueryService<Caja> {

    private final Logger log = LoggerFactory.getLogger(CajaQueryService.class);

    private final CajaRepository cajaRepository;

    public CajaQueryService(CajaRepository cajaRepository) {
        this.cajaRepository = cajaRepository;
    }

    /**
     * Return a {@link List} of {@link Caja} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Caja> findByCriteria(CajaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Caja> specification = createSpecification(criteria);
        return cajaRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Caja} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Caja> findByCriteria(CajaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Caja> specification = createSpecification(criteria);
        return cajaRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(CajaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Caja> specification = createSpecification(criteria);
        return cajaRepository.count(specification);
    }

    /**
     * Function to convert {@link CajaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Caja> createSpecification(CajaCriteria criteria) {
        Specification<Caja> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Caja_.id));
            }
            if (criteria.getFecha() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFecha(), Caja_.fecha));
            }
            if (criteria.getHoraApertura() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getHoraApertura(), Caja_.horaApertura));
            }
            if (criteria.getHoraCierre() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getHoraCierre(), Caja_.horaCierre));
            }
            if (criteria.getSaldo() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getSaldo(), Caja_.saldo));
            }
            if (criteria.getObservaciones() != null) {
                specification = specification.and(buildStringSpecification(criteria.getObservaciones(), Caja_.observaciones));
            }
            if (criteria.getSaldoFisico() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getSaldoFisico(), Caja_.saldoFisico));
            }
            if (criteria.getSucursalId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getSucursalId(), root -> root.join(Caja_.sucursal, JoinType.LEFT).get(Sucursal_.id))
                    );
            }
        }
        return specification;
    }
}
