package soldimet.service;

import soldimet.domain.Movimiento;
import soldimet.repository.MovimientoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Movimiento.
 */
@Service
@Transactional
public class MovimientoService {

    private final Logger log = LoggerFactory.getLogger(MovimientoService.class);

    private final MovimientoRepository movimientoRepository;

    public MovimientoService(MovimientoRepository movimientoRepository) {
        this.movimientoRepository = movimientoRepository;
    }

    /**
     * Save a movimiento.
     *
     * @param movimiento the entity to save
     * @return the persisted entity
     */
    public Movimiento save(Movimiento movimiento) {
        log.debug("Request to save Movimiento : {}", movimiento);
        return movimientoRepository.save(movimiento);
    }

    /**
     *  Get all the movimientos.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Movimiento> findAll(Pageable pageable) {
        log.debug("Request to get all Movimientos");
        return movimientoRepository.findAll(pageable);
    }

    /**
     *  Get one movimiento by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Movimiento findOne(Long id) {
        log.debug("Request to get Movimiento : {}", id);
        return movimientoRepository.findOne(id);
    }

    /**
     *  Delete the  movimiento by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Movimiento : {}", id);
        movimientoRepository.delete(id);
    }
}
