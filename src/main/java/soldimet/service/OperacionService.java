package soldimet.service;

import soldimet.domain.Operacion;
import soldimet.repository.OperacionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Operacion}.
 */
@Service
@Transactional
public class OperacionService {

    private final Logger log = LoggerFactory.getLogger(OperacionService.class);

    private final OperacionRepository operacionRepository;

    public OperacionService(OperacionRepository operacionRepository) {
        this.operacionRepository = operacionRepository;
    }

    /**
     * Save a operacion.
     *
     * @param operacion the entity to save.
     * @return the persisted entity.
     */
    public Operacion save(Operacion operacion) {
        log.debug("Request to save Operacion : {}", operacion);
        return operacionRepository.save(operacion);
    }

    /**
     * Get all the operacions.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Operacion> findAll() {
        log.debug("Request to get all Operacions");
        return operacionRepository.findAll();
    }


    /**
     * Get one operacion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Operacion> findOne(Long id) {
        log.debug("Request to get Operacion : {}", id);
        return operacionRepository.findById(id);
    }

    /**
     * Delete the operacion by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Operacion : {}", id);
        operacionRepository.deleteById(id);
    }
}
