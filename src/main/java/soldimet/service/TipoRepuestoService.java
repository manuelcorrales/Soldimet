package soldimet.service;

import soldimet.domain.TipoRepuesto;
import soldimet.repository.TipoRepuestoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing TipoRepuesto.
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
     * @param tipoRepuesto the entity to save
     * @return the persisted entity
     */
    public TipoRepuesto save(TipoRepuesto tipoRepuesto) {
        log.debug("Request to save TipoRepuesto : {}", tipoRepuesto);
        return tipoRepuestoRepository.save(tipoRepuesto);
    }

    /**
     *  Get all the tipoRepuestos.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<TipoRepuesto> findAll() {
        log.debug("Request to get all TipoRepuestos");
        return tipoRepuestoRepository.findAll();
    }

    /**
     *  Get one tipoRepuesto by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public TipoRepuesto findOne(Long id) {
        log.debug("Request to get TipoRepuesto : {}", id);
        return tipoRepuestoRepository.findOne(id);
    }

    /**
     *  Delete the  tipoRepuesto by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete TipoRepuesto : {}", id);
        tipoRepuestoRepository.delete(id);
    }
}
