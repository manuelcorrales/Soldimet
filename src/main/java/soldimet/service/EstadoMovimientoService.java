package soldimet.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.EstadoMovimiento;
import soldimet.repository.EstadoMovimientoRepository;

/**
 * Service Implementation for managing {@link EstadoMovimiento}.
 */
@Service
@Transactional
public class EstadoMovimientoService {

    private final Logger log = LoggerFactory.getLogger(EstadoMovimientoService.class);

    private final EstadoMovimientoRepository estadoMovimientoRepository;

    public EstadoMovimientoService(EstadoMovimientoRepository estadoMovimientoRepository) {
        this.estadoMovimientoRepository = estadoMovimientoRepository;
    }

    /**
     * Save a estadoMovimiento.
     *
     * @param estadoMovimiento the entity to save.
     * @return the persisted entity.
     */
    public EstadoMovimiento save(EstadoMovimiento estadoMovimiento) {
        log.debug("Request to save EstadoMovimiento : {}", estadoMovimiento);
        return estadoMovimientoRepository.save(estadoMovimiento);
    }

    /**
     * Partially update a estadoMovimiento.
     *
     * @param estadoMovimiento the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<EstadoMovimiento> partialUpdate(EstadoMovimiento estadoMovimiento) {
        log.debug("Request to partially update EstadoMovimiento : {}", estadoMovimiento);

        return estadoMovimientoRepository
            .findById(estadoMovimiento.getId())
            .map(
                existingEstadoMovimiento -> {
                    if (estadoMovimiento.getNombreEstado() != null) {
                        existingEstadoMovimiento.setNombreEstado(estadoMovimiento.getNombreEstado());
                    }

                    return existingEstadoMovimiento;
                }
            )
            .map(estadoMovimientoRepository::save);
    }

    /**
     * Get all the estadoMovimientos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<EstadoMovimiento> findAll() {
        log.debug("Request to get all EstadoMovimientos");
        return estadoMovimientoRepository.findAll();
    }

    /**
     * Get one estadoMovimiento by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<EstadoMovimiento> findOne(Long id) {
        log.debug("Request to get EstadoMovimiento : {}", id);
        return estadoMovimientoRepository.findById(id);
    }

    /**
     * Delete the estadoMovimiento by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete EstadoMovimiento : {}", id);
        estadoMovimientoRepository.deleteById(id);
    }
}
