package soldimet.service;

import soldimet.domain.CobranzaOperacion;
import soldimet.repository.CobranzaOperacionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link CobranzaOperacion}.
 */
@Service
@Transactional
public class CobranzaOperacionService {

    private final Logger log = LoggerFactory.getLogger(CobranzaOperacionService.class);

    private final CobranzaOperacionRepository cobranzaOperacionRepository;

    public CobranzaOperacionService(CobranzaOperacionRepository cobranzaOperacionRepository) {
        this.cobranzaOperacionRepository = cobranzaOperacionRepository;
    }

    /**
     * Save a cobranzaOperacion.
     *
     * @param cobranzaOperacion the entity to save.
     * @return the persisted entity.
     */
    public CobranzaOperacion save(CobranzaOperacion cobranzaOperacion) {
        log.debug("Request to save CobranzaOperacion : {}", cobranzaOperacion);
        return cobranzaOperacionRepository.save(cobranzaOperacion);
    }

    /**
     * Get all the cobranzaOperacions.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<CobranzaOperacion> findAll() {
        log.debug("Request to get all CobranzaOperacions");
        return cobranzaOperacionRepository.findAll();
    }


    /**
     * Get one cobranzaOperacion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CobranzaOperacion> findOne(Long id) {
        log.debug("Request to get CobranzaOperacion : {}", id);
        return cobranzaOperacionRepository.findById(id);
    }

    /**
     * Delete the cobranzaOperacion by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete CobranzaOperacion : {}", id);
        cobranzaOperacionRepository.deleteById(id);
    }
}
