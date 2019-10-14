package soldimet.service;

import soldimet.domain.Aplicacion;
import soldimet.repository.AplicacionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Aplicacion}.
 */
@Service
@Transactional
public class AplicacionService {

    private final Logger log = LoggerFactory.getLogger(AplicacionService.class);

    private final AplicacionRepository aplicacionRepository;

    public AplicacionService(AplicacionRepository aplicacionRepository) {
        this.aplicacionRepository = aplicacionRepository;
    }

    /**
     * Save a aplicacion.
     *
     * @param aplicacion the entity to save.
     * @return the persisted entity.
     */
    public Aplicacion save(Aplicacion aplicacion) {
        log.debug("Request to save Aplicacion : {}", aplicacion);
        return aplicacionRepository.save(aplicacion);
    }

    /**
     * Get all the aplicacions.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Aplicacion> findAll() {
        log.debug("Request to get all Aplicacions");
        return aplicacionRepository.findAll();
    }


    /**
     * Get one aplicacion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Aplicacion> findOne(Long id) {
        log.debug("Request to get Aplicacion : {}", id);
        return aplicacionRepository.findById(id);
    }

    /**
     * Delete the aplicacion by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Aplicacion : {}", id);
        aplicacionRepository.deleteById(id);
    }
}
