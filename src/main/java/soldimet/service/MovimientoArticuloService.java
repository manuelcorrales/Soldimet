package soldimet.service;

import soldimet.domain.MovimientoArticulo;
import soldimet.repository.MovimientoArticuloRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing MovimientoArticulo.
 */
@Service
@Transactional
public class MovimientoArticuloService {

    private final Logger log = LoggerFactory.getLogger(MovimientoArticuloService.class);

    private final MovimientoArticuloRepository movimientoArticuloRepository;

    public MovimientoArticuloService(MovimientoArticuloRepository movimientoArticuloRepository) {
        this.movimientoArticuloRepository = movimientoArticuloRepository;
    }

    /**
     * Save a movimientoArticulo.
     *
     * @param movimientoArticulo the entity to save
     * @return the persisted entity
     */
    public MovimientoArticulo save(MovimientoArticulo movimientoArticulo) {
        log.debug("Request to save MovimientoArticulo : {}", movimientoArticulo);
        return movimientoArticuloRepository.save(movimientoArticulo);
    }

    /**
     *  Get all the movimientoArticulos.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<MovimientoArticulo> findAll() {
        log.debug("Request to get all MovimientoArticulos");
        return movimientoArticuloRepository.findAll();
    }

    /**
     *  Get one movimientoArticulo by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public MovimientoArticulo findOne(Long id) {
        log.debug("Request to get MovimientoArticulo : {}", id);
        return movimientoArticuloRepository.findOne(id);
    }

    /**
     *  Delete the  movimientoArticulo by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete MovimientoArticulo : {}", id);
        movimientoArticuloRepository.delete(id);
    }
}
