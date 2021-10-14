package soldimet.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.EstadoOperacion;
import soldimet.repository.EstadoOperacionRepository;

/**
 * Service Implementation for managing {@link EstadoOperacion}.
 */
@Service
@Transactional
public class EstadoOperacionService {

    private final Logger log = LoggerFactory.getLogger(EstadoOperacionService.class);

    private final EstadoOperacionRepository estadoOperacionRepository;

    public EstadoOperacionService(EstadoOperacionRepository estadoOperacionRepository) {
        this.estadoOperacionRepository = estadoOperacionRepository;
    }

    /**
     * Save a estadoOperacion.
     *
     * @param estadoOperacion the entity to save.
     * @return the persisted entity.
     */
    public EstadoOperacion save(EstadoOperacion estadoOperacion) {
        log.debug("Request to save EstadoOperacion : {}", estadoOperacion);
        return estadoOperacionRepository.save(estadoOperacion);
    }

    /**
     * Partially update a estadoOperacion.
     *
     * @param estadoOperacion the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<EstadoOperacion> partialUpdate(EstadoOperacion estadoOperacion) {
        log.debug("Request to partially update EstadoOperacion : {}", estadoOperacion);

        return estadoOperacionRepository
            .findById(estadoOperacion.getId())
            .map(
                existingEstadoOperacion -> {
                    if (estadoOperacion.getNombreEstado() != null) {
                        existingEstadoOperacion.setNombreEstado(estadoOperacion.getNombreEstado());
                    }

                    return existingEstadoOperacion;
                }
            )
            .map(estadoOperacionRepository::save);
    }

    /**
     * Get all the estadoOperacions.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<EstadoOperacion> findAll() {
        log.debug("Request to get all EstadoOperacions");
        return estadoOperacionRepository.findAll();
    }

    /**
     * Get one estadoOperacion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<EstadoOperacion> findOne(Long id) {
        log.debug("Request to get EstadoOperacion : {}", id);
        return estadoOperacionRepository.findById(id);
    }

    /**
     * Delete the estadoOperacion by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete EstadoOperacion : {}", id);
        estadoOperacionRepository.deleteById(id);
    }
}
