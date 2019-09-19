package soldimet.service;

import soldimet.domain.DetallePresupuesto;
import soldimet.repository.DetallePresupuestoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link DetallePresupuesto}.
 */
@Service
@Transactional
public class DetallePresupuestoService {

    private final Logger log = LoggerFactory.getLogger(DetallePresupuestoService.class);

    private final DetallePresupuestoRepository detallePresupuestoRepository;

    public DetallePresupuestoService(DetallePresupuestoRepository detallePresupuestoRepository) {
        this.detallePresupuestoRepository = detallePresupuestoRepository;
    }

    /**
     * Save a detallePresupuesto.
     *
     * @param detallePresupuesto the entity to save.
     * @return the persisted entity.
     */
    public DetallePresupuesto save(DetallePresupuesto detallePresupuesto) {
        log.debug("Request to save DetallePresupuesto : {}", detallePresupuesto);
        return detallePresupuestoRepository.save(detallePresupuesto);
    }

    /**
     * Get all the detallePresupuestos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<DetallePresupuesto> findAll() {
        log.debug("Request to get all DetallePresupuestos");
        return detallePresupuestoRepository.findAll();
    }


    /**
     * Get one detallePresupuesto by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<DetallePresupuesto> findOne(Long id) {
        log.debug("Request to get DetallePresupuesto : {}", id);
        return detallePresupuestoRepository.findById(id);
    }

    /**
     * Delete the detallePresupuesto by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete DetallePresupuesto : {}", id);
        detallePresupuestoRepository.deleteById(id);
    }
}
