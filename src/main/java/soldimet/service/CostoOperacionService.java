package soldimet.service;

import soldimet.domain.CostoOperacion;
import soldimet.repository.CostoOperacionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link CostoOperacion}.
 */
@Service
@Transactional
public class CostoOperacionService {

    private final Logger log = LoggerFactory.getLogger(CostoOperacionService.class);

    private final CostoOperacionRepository costoOperacionRepository;

    public CostoOperacionService(CostoOperacionRepository costoOperacionRepository) {
        this.costoOperacionRepository = costoOperacionRepository;
    }

    /**
     * Save a costoOperacion.
     *
     * @param costoOperacion the entity to save.
     * @return the persisted entity.
     */
    public CostoOperacion save(CostoOperacion costoOperacion) {
        log.debug("Request to save CostoOperacion : {}", costoOperacion);
        return costoOperacionRepository.save(costoOperacion);
    }

    /**
     * Get all the costoOperacions.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<CostoOperacion> findAll() {
        log.debug("Request to get all CostoOperacions");
        return costoOperacionRepository.findAll();
    }


    /**
     * Get one costoOperacion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CostoOperacion> findOne(Long id) {
        log.debug("Request to get CostoOperacion : {}", id);
        return costoOperacionRepository.findById(id);
    }

    /**
     * Delete the costoOperacion by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete CostoOperacion : {}", id);
        costoOperacionRepository.deleteById(id);
    }
}
