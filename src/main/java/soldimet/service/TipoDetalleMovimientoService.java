package soldimet.service;

import soldimet.domain.TipoDetalleMovimiento;
import soldimet.repository.TipoDetalleMovimientoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link TipoDetalleMovimiento}.
 */
@Service
@Transactional
public class TipoDetalleMovimientoService {

    private final Logger log = LoggerFactory.getLogger(TipoDetalleMovimientoService.class);

    private final TipoDetalleMovimientoRepository tipoDetalleMovimientoRepository;

    public TipoDetalleMovimientoService(TipoDetalleMovimientoRepository tipoDetalleMovimientoRepository) {
        this.tipoDetalleMovimientoRepository = tipoDetalleMovimientoRepository;
    }

    /**
     * Save a tipoDetalleMovimiento.
     *
     * @param tipoDetalleMovimiento the entity to save.
     * @return the persisted entity.
     */
    public TipoDetalleMovimiento save(TipoDetalleMovimiento tipoDetalleMovimiento) {
        log.debug("Request to save TipoDetalleMovimiento : {}", tipoDetalleMovimiento);
        return tipoDetalleMovimientoRepository.save(tipoDetalleMovimiento);
    }

    /**
     * Get all the tipoDetalleMovimientos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<TipoDetalleMovimiento> findAll() {
        log.debug("Request to get all TipoDetalleMovimientos");
        return tipoDetalleMovimientoRepository.findAll();
    }


    /**
     * Get one tipoDetalleMovimiento by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<TipoDetalleMovimiento> findOne(Long id) {
        log.debug("Request to get TipoDetalleMovimiento : {}", id);
        return tipoDetalleMovimientoRepository.findById(id);
    }

    /**
     * Delete the tipoDetalleMovimiento by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete TipoDetalleMovimiento : {}", id);
        tipoDetalleMovimientoRepository.deleteById(id);
    }
}
