package soldimet.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.MovimientoPresupuesto;
import soldimet.repository.MovimientoPresupuestoRepository;

/**
 * Service Implementation for managing {@link MovimientoPresupuesto}.
 */
@Service
@Transactional
public class MovimientoPresupuestoService {

    private final Logger log = LoggerFactory.getLogger(MovimientoPresupuestoService.class);

    private final MovimientoPresupuestoRepository movimientoPresupuestoRepository;

    public MovimientoPresupuestoService(MovimientoPresupuestoRepository movimientoPresupuestoRepository) {
        this.movimientoPresupuestoRepository = movimientoPresupuestoRepository;
    }

    /**
     * Save a movimientoPresupuesto.
     *
     * @param movimientoPresupuesto the entity to save.
     * @return the persisted entity.
     */
    public MovimientoPresupuesto save(MovimientoPresupuesto movimientoPresupuesto) {
        log.debug("Request to save MovimientoPresupuesto : {}", movimientoPresupuesto);
        return movimientoPresupuestoRepository.save(movimientoPresupuesto);
    }

    /**
     * Partially update a movimientoPresupuesto.
     *
     * @param movimientoPresupuesto the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<MovimientoPresupuesto> partialUpdate(MovimientoPresupuesto movimientoPresupuesto) {
        log.debug("Request to partially update MovimientoPresupuesto : {}", movimientoPresupuesto);

        return movimientoPresupuestoRepository
            .findById(movimientoPresupuesto.getId())
            .map(
                existingMovimientoPresupuesto -> {
                    return existingMovimientoPresupuesto;
                }
            )
            .map(movimientoPresupuestoRepository::save);
    }

    /**
     * Get all the movimientoPresupuestos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<MovimientoPresupuesto> findAll() {
        log.debug("Request to get all MovimientoPresupuestos");
        return movimientoPresupuestoRepository.findAll();
    }

    /**
     * Get one movimientoPresupuesto by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<MovimientoPresupuesto> findOne(Long id) {
        log.debug("Request to get MovimientoPresupuesto : {}", id);
        return movimientoPresupuestoRepository.findById(id);
    }

    /**
     * Delete the movimientoPresupuesto by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete MovimientoPresupuesto : {}", id);
        movimientoPresupuestoRepository.deleteById(id);
    }
}
