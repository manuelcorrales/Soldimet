package soldimet.service;

import soldimet.domain.EstadoPresupuesto;
import soldimet.repository.EstadoPresupuestoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing EstadoPresupuesto.
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
     * @param estadoPresupuesto the entity to save
     * @return the persisted entity
     */
    public EstadoPresupuesto save(EstadoPresupuesto estadoPresupuesto) {
        log.debug("Request to save EstadoPresupuesto : {}", estadoPresupuesto);
        return estadoPresupuestoRepository.save(estadoPresupuesto);
    }

    /**
     *  Get all the estadoPresupuestos.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<EstadoPresupuesto> findAll() {
        log.debug("Request to get all EstadoPresupuestos");
        return estadoPresupuestoRepository.findAll();
    }

    /**
     *  Get one estadoPresupuesto by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public EstadoPresupuesto findOne(Long id) {
        log.debug("Request to get EstadoPresupuesto : {}", id);
        return estadoPresupuestoRepository.findOne(id);
    }

    /**
     *  Delete the  estadoPresupuesto by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete EstadoPresupuesto : {}", id);
        estadoPresupuestoRepository.delete(id);
    }
}
