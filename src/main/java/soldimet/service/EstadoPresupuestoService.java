package soldimet.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.EstadoPresupuesto;
import soldimet.repository.EstadoPresupuestoRepository;

/**
 * Service Implementation for managing {@link EstadoPresupuesto}.
 */
@Service
@Transactional
public class EstadoPresupuestoService {

    private final Logger log = LoggerFactory.getLogger(EstadoPresupuestoService.class);

    private final EstadoPresupuestoRepository estadoPresupuestoRepository;

    public EstadoPresupuestoService(EstadoPresupuestoRepository estadoPresupuestoRepository) {
        this.estadoPresupuestoRepository = estadoPresupuestoRepository;
    }

    /**
     * Save a estadoPresupuesto.
     *
     * @param estadoPresupuesto the entity to save.
     * @return the persisted entity.
     */
    public EstadoPresupuesto save(EstadoPresupuesto estadoPresupuesto) {
        log.debug("Request to save EstadoPresupuesto : {}", estadoPresupuesto);
        return estadoPresupuestoRepository.save(estadoPresupuesto);
    }

    /**
     * Partially update a estadoPresupuesto.
     *
     * @param estadoPresupuesto the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<EstadoPresupuesto> partialUpdate(EstadoPresupuesto estadoPresupuesto) {
        log.debug("Request to partially update EstadoPresupuesto : {}", estadoPresupuesto);

        return estadoPresupuestoRepository
            .findById(estadoPresupuesto.getId())
            .map(
                existingEstadoPresupuesto -> {
                    if (estadoPresupuesto.getNombreEstado() != null) {
                        existingEstadoPresupuesto.setNombreEstado(estadoPresupuesto.getNombreEstado());
                    }

                    return existingEstadoPresupuesto;
                }
            )
            .map(estadoPresupuestoRepository::save);
    }

    /**
     * Get all the estadoPresupuestos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<EstadoPresupuesto> findAll() {
        log.debug("Request to get all EstadoPresupuestos");
        return estadoPresupuestoRepository.findAll();
    }

    /**
     * Get one estadoPresupuesto by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<EstadoPresupuesto> findOne(Long id) {
        log.debug("Request to get EstadoPresupuesto : {}", id);
        return estadoPresupuestoRepository.findById(id);
    }

    /**
     * Delete the estadoPresupuesto by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete EstadoPresupuesto : {}", id);
        estadoPresupuestoRepository.deleteById(id);
    }
}
