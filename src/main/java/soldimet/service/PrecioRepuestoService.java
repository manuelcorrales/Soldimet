package soldimet.service;

import soldimet.domain.PrecioRepuesto;
import soldimet.repository.PrecioRepuestoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link PrecioRepuesto}.
 */
@Service
@Transactional
public class PrecioRepuestoService {

    private final Logger log = LoggerFactory.getLogger(PrecioRepuestoService.class);

    private final PrecioRepuestoRepository precioRepuestoRepository;

    public PrecioRepuestoService(PrecioRepuestoRepository precioRepuestoRepository) {
        this.precioRepuestoRepository = precioRepuestoRepository;
    }

    /**
     * Save a precioRepuesto.
     *
     * @param precioRepuesto the entity to save.
     * @return the persisted entity.
     */
    public PrecioRepuesto save(PrecioRepuesto precioRepuesto) {
        log.debug("Request to save PrecioRepuesto : {}", precioRepuesto);
        return precioRepuestoRepository.save(precioRepuesto);
    }

    /**
     * Get all the precioRepuestos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<PrecioRepuesto> findAll() {
        log.debug("Request to get all PrecioRepuestos");
        return precioRepuestoRepository.findAll();
    }


    /**
     * Get one precioRepuesto by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<PrecioRepuesto> findOne(Long id) {
        log.debug("Request to get PrecioRepuesto : {}", id);
        return precioRepuestoRepository.findById(id);
    }

    /**
     * Delete the precioRepuesto by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete PrecioRepuesto : {}", id);
        precioRepuestoRepository.deleteById(id);
    }
}
