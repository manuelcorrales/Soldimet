package soldimet.service;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.Movimiento;
import soldimet.repository.MovimientoRepository;

/**
 * Service Implementation for managing {@link Movimiento}.
 */
@Service
@Transactional
public class MovimientoService {

    private final Logger log = LoggerFactory.getLogger(MovimientoService.class);

    private final MovimientoRepository movimientoRepository;

    public MovimientoService(MovimientoRepository movimientoRepository) {
        this.movimientoRepository = movimientoRepository;
    }

    /**
     * Save a movimiento.
     *
     * @param movimiento the entity to save.
     * @return the persisted entity.
     */
    public Movimiento save(Movimiento movimiento) {
        log.debug("Request to save Movimiento : {}", movimiento);
        return movimientoRepository.save(movimiento);
    }

    /**
     * Partially update a movimiento.
     *
     * @param movimiento the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Movimiento> partialUpdate(Movimiento movimiento) {
        log.debug("Request to partially update Movimiento : {}", movimiento);

        return movimientoRepository
            .findById(movimiento.getId())
            .map(
                existingMovimiento -> {
                    if (movimiento.getFecha() != null) {
                        existingMovimiento.setFecha(movimiento.getFecha());
                    }
                    if (movimiento.getImporte() != null) {
                        existingMovimiento.setImporte(movimiento.getImporte());
                    }
                    if (movimiento.getDescuento() != null) {
                        existingMovimiento.setDescuento(movimiento.getDescuento());
                    }
                    if (movimiento.getObservaciones() != null) {
                        existingMovimiento.setObservaciones(movimiento.getObservaciones());
                    }

                    return existingMovimiento;
                }
            )
            .map(movimientoRepository::save);
    }

    /**
     * Get all the movimientos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Movimiento> findAll(Pageable pageable) {
        log.debug("Request to get all Movimientos");
        return movimientoRepository.findAll(pageable);
    }

    /**
     * Get one movimiento by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Movimiento> findOne(Long id) {
        log.debug("Request to get Movimiento : {}", id);
        return movimientoRepository.findById(id);
    }

    /**
     * Delete the movimiento by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Movimiento : {}", id);
        movimientoRepository.deleteById(id);
    }
}
