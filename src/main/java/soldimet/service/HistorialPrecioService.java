package soldimet.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.HistorialPrecio;
import soldimet.repository.HistorialPrecioRepository;

/**
 * Service Implementation for managing {@link HistorialPrecio}.
 */
@Service
@Transactional
public class HistorialPrecioService {

    private final Logger log = LoggerFactory.getLogger(HistorialPrecioService.class);

    private final HistorialPrecioRepository historialPrecioRepository;

    public HistorialPrecioService(HistorialPrecioRepository historialPrecioRepository) {
        this.historialPrecioRepository = historialPrecioRepository;
    }

    /**
     * Save a historialPrecio.
     *
     * @param historialPrecio the entity to save.
     * @return the persisted entity.
     */
    public HistorialPrecio save(HistorialPrecio historialPrecio) {
        log.debug("Request to save HistorialPrecio : {}", historialPrecio);
        return historialPrecioRepository.save(historialPrecio);
    }

    /**
     * Partially update a historialPrecio.
     *
     * @param historialPrecio the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<HistorialPrecio> partialUpdate(HistorialPrecio historialPrecio) {
        log.debug("Request to partially update HistorialPrecio : {}", historialPrecio);

        return historialPrecioRepository
            .findById(historialPrecio.getId())
            .map(
                existingHistorialPrecio -> {
                    if (historialPrecio.getFechaHistorial() != null) {
                        existingHistorialPrecio.setFechaHistorial(historialPrecio.getFechaHistorial());
                    }

                    return existingHistorialPrecio;
                }
            )
            .map(historialPrecioRepository::save);
    }

    /**
     * Get all the historialPrecios.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<HistorialPrecio> findAll() {
        log.debug("Request to get all HistorialPrecios");
        return historialPrecioRepository.findAll();
    }

    /**
     * Get one historialPrecio by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<HistorialPrecio> findOne(Long id) {
        log.debug("Request to get HistorialPrecio : {}", id);
        return historialPrecioRepository.findById(id);
    }

    /**
     * Delete the historialPrecio by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete HistorialPrecio : {}", id);
        historialPrecioRepository.deleteById(id);
    }
}
