package soldimet.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import soldimet.domain.Caja;
import soldimet.domain.*; // for static metamodels
import soldimet.repository.CajaRepository;
import soldimet.service.dto.CajaCriteria;


/**
 * Service for executing complex queries for Caja entities in the database.
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
     * Return a {@link List} of {@link Caja} which matches the criteria from the database
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
     * Return a {@link Page} of {@link Caja} which matches the criteria from the database
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
     * Function to convert CajaCriteria to a {@link Specification}
     */
    private Specification<Caja> createSpecification(CajaCriteria criteria) {
        Specification<Caja> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Caja_.id));
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
            if (criteria.getSaldo_fisico() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getSaldo_fisico(), Caja_.saldo_fisico));
            }
            if (criteria.getSucursalId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getSucursalId(), Caja_.sucursal, Sucursal_.id));
            }
        }
        return specification;
    }

}
