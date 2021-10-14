package soldimet.service;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.Presupuesto;
import soldimet.repository.PresupuestoRepository;

/**
 * Service Implementation for managing {@link Presupuesto}.
 */
@Service
@Transactional
public class PresupuestoService {

    private final Logger log = LoggerFactory.getLogger(PresupuestoService.class);

    private final PresupuestoRepository presupuestoRepository;

    public PresupuestoService(PresupuestoRepository presupuestoRepository) {
        this.presupuestoRepository = presupuestoRepository;
    }

    /**
     * Save a presupuesto.
     *
     * @param presupuesto the entity to save.
     * @return the persisted entity.
     */
    public Presupuesto save(Presupuesto presupuesto) {
        log.debug("Request to save Presupuesto : {}", presupuesto);
        return presupuestoRepository.save(presupuesto);
    }

    /**
     * Partially update a presupuesto.
     *
     * @param presupuesto the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Presupuesto> partialUpdate(Presupuesto presupuesto) {
        log.debug("Request to partially update Presupuesto : {}", presupuesto);

        return presupuestoRepository
            .findById(presupuesto.getId())
            .map(
                existingPresupuesto -> {
                    if (presupuesto.getDescripcionDescuento() != null) {
                        existingPresupuesto.setDescripcionDescuento(presupuesto.getDescripcionDescuento());
                    }
                    if (presupuesto.getDescuento() != null) {
                        existingPresupuesto.setDescuento(presupuesto.getDescuento());
                    }
                    if (presupuesto.getFechaCreacion() != null) {
                        existingPresupuesto.setFechaCreacion(presupuesto.getFechaCreacion());
                    }
                    if (presupuesto.getFechaAceptado() != null) {
                        existingPresupuesto.setFechaAceptado(presupuesto.getFechaAceptado());
                    }
                    if (presupuesto.getFechaEntregado() != null) {
                        existingPresupuesto.setFechaEntregado(presupuesto.getFechaEntregado());
                    }
                    if (presupuesto.getImporteTotal() != null) {
                        existingPresupuesto.setImporteTotal(presupuesto.getImporteTotal());
                    }
                    if (presupuesto.getObservaciones() != null) {
                        existingPresupuesto.setObservaciones(presupuesto.getObservaciones());
                    }
                    if (presupuesto.getSoldadura() != null) {
                        existingPresupuesto.setSoldadura(presupuesto.getSoldadura());
                    }
                    if (presupuesto.getModelo() != null) {
                        existingPresupuesto.setModelo(presupuesto.getModelo());
                    }

                    return existingPresupuesto;
                }
            )
            .map(presupuestoRepository::save);
    }

    /**
     * Get all the presupuestos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Presupuesto> findAll(Pageable pageable) {
        log.debug("Request to get all Presupuestos");
        return presupuestoRepository.findAll(pageable);
    }

    /**
     * Get one presupuesto by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Presupuesto> findOne(Long id) {
        log.debug("Request to get Presupuesto : {}", id);
        return presupuestoRepository.findById(id);
    }

    /**
     * Delete the presupuesto by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Presupuesto : {}", id);
        presupuestoRepository.deleteById(id);
    }
}
