package soldimet.service;

import soldimet.domain.DetalleMovimiento;
import soldimet.repository.DetalleMovimientoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link DetalleMovimiento}.
 */
@Service
@Transactional
public class DetalleMovimientoService {

    private final Logger log = LoggerFactory.getLogger(DetalleMovimientoService.class);

    private final DetalleMovimientoRepository detalleMovimientoRepository;

    public DetalleMovimientoService(DetalleMovimientoRepository detalleMovimientoRepository) {
        this.detalleMovimientoRepository = detalleMovimientoRepository;
    }

    /**
     * Save a detalleMovimiento.
     *
     * @param detalleMovimiento the entity to save.
     * @return the persisted entity.
     */
    public DetalleMovimiento save(DetalleMovimiento detalleMovimiento) {
        log.debug("Request to save DetalleMovimiento : {}", detalleMovimiento);
        return detalleMovimientoRepository.save(detalleMovimiento);
    }

    /**
     * Get all the detalleMovimientos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<DetalleMovimiento> findAll() {
        log.debug("Request to get all DetalleMovimientos");
        return detalleMovimientoRepository.findAll();
    }


    /**
     * Get one detalleMovimiento by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<DetalleMovimiento> findOne(Long id) {
        log.debug("Request to get DetalleMovimiento : {}", id);
        return detalleMovimientoRepository.findById(id);
    }

    /**
     * Delete the detalleMovimiento by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete DetalleMovimiento : {}", id);
        detalleMovimientoRepository.deleteById(id);
    }
}
