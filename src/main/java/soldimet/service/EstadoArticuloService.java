package soldimet.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.EstadoArticulo;
import soldimet.repository.EstadoArticuloRepository;

/**
 * Service Implementation for managing {@link EstadoArticulo}.
 */
@Service
@Transactional
public class EstadoArticuloService {

    private final Logger log = LoggerFactory.getLogger(EstadoArticuloService.class);

    private final EstadoArticuloRepository estadoArticuloRepository;

    public EstadoArticuloService(EstadoArticuloRepository estadoArticuloRepository) {
        this.estadoArticuloRepository = estadoArticuloRepository;
    }

    /**
     * Save a estadoArticulo.
     *
     * @param estadoArticulo the entity to save.
     * @return the persisted entity.
     */
    public EstadoArticulo save(EstadoArticulo estadoArticulo) {
        log.debug("Request to save EstadoArticulo : {}", estadoArticulo);
        return estadoArticuloRepository.save(estadoArticulo);
    }

    /**
     * Partially update a estadoArticulo.
     *
     * @param estadoArticulo the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<EstadoArticulo> partialUpdate(EstadoArticulo estadoArticulo) {
        log.debug("Request to partially update EstadoArticulo : {}", estadoArticulo);

        return estadoArticuloRepository
            .findById(estadoArticulo.getId())
            .map(
                existingEstadoArticulo -> {
                    if (estadoArticulo.getNombreEstado() != null) {
                        existingEstadoArticulo.setNombreEstado(estadoArticulo.getNombreEstado());
                    }

                    return existingEstadoArticulo;
                }
            )
            .map(estadoArticuloRepository::save);
    }

    /**
     * Get all the estadoArticulos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<EstadoArticulo> findAll() {
        log.debug("Request to get all EstadoArticulos");
        return estadoArticuloRepository.findAll();
    }

    /**
     * Get one estadoArticulo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<EstadoArticulo> findOne(Long id) {
        log.debug("Request to get EstadoArticulo : {}", id);
        return estadoArticuloRepository.findById(id);
    }

    /**
     * Delete the estadoArticulo by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete EstadoArticulo : {}", id);
        estadoArticuloRepository.deleteById(id);
    }
}
