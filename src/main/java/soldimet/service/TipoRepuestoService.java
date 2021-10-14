package soldimet.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.TipoRepuesto;
import soldimet.repository.TipoRepuestoRepository;

/**
 * Service Implementation for managing {@link TipoRepuesto}.
 */
@Service
@Transactional
public class TipoRepuestoService {

    private final Logger log = LoggerFactory.getLogger(TipoRepuestoService.class);

    private final TipoRepuestoRepository tipoRepuestoRepository;

    public TipoRepuestoService(TipoRepuestoRepository tipoRepuestoRepository) {
        this.tipoRepuestoRepository = tipoRepuestoRepository;
    }

    /**
     * Save a tipoRepuesto.
     *
     * @param tipoRepuesto the entity to save.
     * @return the persisted entity.
     */
    public TipoRepuesto save(TipoRepuesto tipoRepuesto) {
        log.debug("Request to save TipoRepuesto : {}", tipoRepuesto);
        return tipoRepuestoRepository.save(tipoRepuesto);
    }

    /**
     * Partially update a tipoRepuesto.
     *
     * @param tipoRepuesto the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<TipoRepuesto> partialUpdate(TipoRepuesto tipoRepuesto) {
        log.debug("Request to partially update TipoRepuesto : {}", tipoRepuesto);

        return tipoRepuestoRepository
            .findById(tipoRepuesto.getId())
            .map(
                existingTipoRepuesto -> {
                    if (tipoRepuesto.getNombreTipoRepuesto() != null) {
                        existingTipoRepuesto.setNombreTipoRepuesto(tipoRepuesto.getNombreTipoRepuesto());
                    }

                    return existingTipoRepuesto;
                }
            )
            .map(tipoRepuestoRepository::save);
    }

    /**
     * Get all the tipoRepuestos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<TipoRepuesto> findAll() {
        log.debug("Request to get all TipoRepuestos");
        return tipoRepuestoRepository.findAll();
    }

    /**
     * Get one tipoRepuesto by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<TipoRepuesto> findOne(Long id) {
        log.debug("Request to get TipoRepuesto : {}", id);
        return tipoRepuestoRepository.findById(id);
    }

    /**
     * Delete the tipoRepuesto by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete TipoRepuesto : {}", id);
        tipoRepuestoRepository.deleteById(id);
    }
}
