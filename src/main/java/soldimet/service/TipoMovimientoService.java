package soldimet.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.TipoMovimiento;
import soldimet.repository.TipoMovimientoRepository;

/**
 * Service Implementation for managing {@link TipoMovimiento}.
 */
@Service
@Transactional
public class TipoMovimientoService {

    private final Logger log = LoggerFactory.getLogger(TipoMovimientoService.class);

    private final TipoMovimientoRepository tipoMovimientoRepository;

    public TipoMovimientoService(TipoMovimientoRepository tipoMovimientoRepository) {
        this.tipoMovimientoRepository = tipoMovimientoRepository;
    }

    /**
     * Save a tipoMovimiento.
     *
     * @param tipoMovimiento the entity to save.
     * @return the persisted entity.
     */
    public TipoMovimiento save(TipoMovimiento tipoMovimiento) {
        log.debug("Request to save TipoMovimiento : {}", tipoMovimiento);
        return tipoMovimientoRepository.save(tipoMovimiento);
    }

    /**
     * Partially update a tipoMovimiento.
     *
     * @param tipoMovimiento the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<TipoMovimiento> partialUpdate(TipoMovimiento tipoMovimiento) {
        log.debug("Request to partially update TipoMovimiento : {}", tipoMovimiento);

        return tipoMovimientoRepository
            .findById(tipoMovimiento.getId())
            .map(
                existingTipoMovimiento -> {
                    if (tipoMovimiento.getNombreTipoMovimiento() != null) {
                        existingTipoMovimiento.setNombreTipoMovimiento(tipoMovimiento.getNombreTipoMovimiento());
                    }

                    return existingTipoMovimiento;
                }
            )
            .map(tipoMovimientoRepository::save);
    }

    /**
     * Get all the tipoMovimientos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<TipoMovimiento> findAll() {
        log.debug("Request to get all TipoMovimientos");
        return tipoMovimientoRepository.findAll();
    }

    /**
     * Get one tipoMovimiento by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<TipoMovimiento> findOne(Long id) {
        log.debug("Request to get TipoMovimiento : {}", id);
        return tipoMovimientoRepository.findById(id);
    }

    /**
     * Delete the tipoMovimiento by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete TipoMovimiento : {}", id);
        tipoMovimientoRepository.deleteById(id);
    }
}
