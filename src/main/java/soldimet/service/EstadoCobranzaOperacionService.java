package soldimet.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.EstadoCobranzaOperacion;
import soldimet.repository.EstadoCobranzaOperacionRepository;

/**
 * Service Implementation for managing {@link EstadoCobranzaOperacion}.
 */
@Service
@Transactional
public class EstadoCobranzaOperacionService {

    private final Logger log = LoggerFactory.getLogger(EstadoCobranzaOperacionService.class);

    private final EstadoCobranzaOperacionRepository estadoCobranzaOperacionRepository;

    public EstadoCobranzaOperacionService(EstadoCobranzaOperacionRepository estadoCobranzaOperacionRepository) {
        this.estadoCobranzaOperacionRepository = estadoCobranzaOperacionRepository;
    }

    /**
     * Save a estadoCobranzaOperacion.
     *
     * @param estadoCobranzaOperacion the entity to save.
     * @return the persisted entity.
     */
    public EstadoCobranzaOperacion save(EstadoCobranzaOperacion estadoCobranzaOperacion) {
        log.debug("Request to save EstadoCobranzaOperacion : {}", estadoCobranzaOperacion);
        return estadoCobranzaOperacionRepository.save(estadoCobranzaOperacion);
    }

    /**
     * Partially update a estadoCobranzaOperacion.
     *
     * @param estadoCobranzaOperacion the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<EstadoCobranzaOperacion> partialUpdate(EstadoCobranzaOperacion estadoCobranzaOperacion) {
        log.debug("Request to partially update EstadoCobranzaOperacion : {}", estadoCobranzaOperacion);

        return estadoCobranzaOperacionRepository
            .findById(estadoCobranzaOperacion.getId())
            .map(
                existingEstadoCobranzaOperacion -> {
                    if (estadoCobranzaOperacion.getNombreEstado() != null) {
                        existingEstadoCobranzaOperacion.setNombreEstado(estadoCobranzaOperacion.getNombreEstado());
                    }

                    return existingEstadoCobranzaOperacion;
                }
            )
            .map(estadoCobranzaOperacionRepository::save);
    }

    /**
     * Get all the estadoCobranzaOperacions.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<EstadoCobranzaOperacion> findAll() {
        log.debug("Request to get all EstadoCobranzaOperacions");
        return estadoCobranzaOperacionRepository.findAll();
    }

    /**
     * Get one estadoCobranzaOperacion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<EstadoCobranzaOperacion> findOne(Long id) {
        log.debug("Request to get EstadoCobranzaOperacion : {}", id);
        return estadoCobranzaOperacionRepository.findById(id);
    }

    /**
     * Delete the estadoCobranzaOperacion by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete EstadoCobranzaOperacion : {}", id);
        estadoCobranzaOperacionRepository.deleteById(id);
    }
}
