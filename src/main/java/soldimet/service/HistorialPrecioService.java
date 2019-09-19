package soldimet.service;

import soldimet.domain.HistorialPrecio;
import soldimet.repository.HistorialPrecioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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
