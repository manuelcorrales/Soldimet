package soldimet.service;

import soldimet.domain.MovimientoPresupuesto;
import soldimet.repository.MovimientoPresupuestoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing MovimientoPresupuesto.
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
     * @param movimientoPresupuesto the entity to save
     * @return the persisted entity
     */
    public MovimientoPresupuesto save(MovimientoPresupuesto movimientoPresupuesto) {
        log.debug("Request to save MovimientoPresupuesto : {}", movimientoPresupuesto);
        return movimientoPresupuestoRepository.save(movimientoPresupuesto);
    }

    /**
     *  Get all the movimientoPresupuestos.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<MovimientoPresupuesto> findAll() {
        log.debug("Request to get all MovimientoPresupuestos");
        return movimientoPresupuestoRepository.findAll();
    }

    /**
     *  Get one movimientoPresupuesto by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public MovimientoPresupuesto findOne(Long id) {
        log.debug("Request to get MovimientoPresupuesto : {}", id);
        return movimientoPresupuestoRepository.findOne(id);
    }

    /**
     *  Delete the  movimientoPresupuesto by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete MovimientoPresupuesto : {}", id);
        movimientoPresupuestoRepository.delete(id);
    }
}
