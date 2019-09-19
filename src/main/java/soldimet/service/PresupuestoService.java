package soldimet.service;

import soldimet.domain.Presupuesto;
import soldimet.repository.PresupuestoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Presupuesto}.
 */
@Service
@Transactional
public class PresupuestoService {

    private final Logger log = LoggerFactory.getLogger(PresupuestoService.class);

    private final PresupuestoRepository presupuestoRepository;

    public PresupuestoService(PresupuestoRepository presupuestoRepository) {
        this.presupuestoRepository = presupuestoRepository;
    }

    /**
     * Save a presupuesto.
     *
     * @param presupuesto the entity to save.
     * @return the persisted entity.
     */
    public Presupuesto save(Presupuesto presupuesto) {
        log.debug("Request to save Presupuesto : {}", presupuesto);
        return presupuestoRepository.save(presupuesto);
    }

    /**
     * Get all the presupuestos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Presupuesto> findAll(Pageable pageable) {
        log.debug("Request to get all Presupuestos");
        return presupuestoRepository.findAll(pageable);
    }


    /**
     * Get one presupuesto by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Presupuesto> findOne(Long id) {
        log.debug("Request to get Presupuesto : {}", id);
        return presupuestoRepository.findById(id);
    }

    /**
     * Delete the presupuesto by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Presupuesto : {}", id);
        presupuestoRepository.deleteById(id);
    }
}
