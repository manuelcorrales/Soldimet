package soldimet.service;

import soldimet.domain.CostoRepuesto;
import soldimet.repository.CostoRepuestoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing CostoRepuesto.
 */
@Service
@Transactional
public class CostoRepuestoService {

    private final Logger log = LoggerFactory.getLogger(CostoRepuestoService.class);

    private final CostoRepuestoRepository costoRepuestoRepository;

    public CostoRepuestoService(CostoRepuestoRepository costoRepuestoRepository) {
        this.costoRepuestoRepository = costoRepuestoRepository;
    }

    /**
     * Save a costoRepuesto.
     *
     * @param costoRepuesto the entity to save
     * @return the persisted entity
     */
    public CostoRepuesto save(CostoRepuesto costoRepuesto) {
        log.debug("Request to save CostoRepuesto : {}", costoRepuesto);
        return costoRepuestoRepository.save(costoRepuesto);
    }

    /**
     *  Get all the costoRepuestos.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<CostoRepuesto> findAll() {
        log.debug("Request to get all CostoRepuestos");
        return costoRepuestoRepository.findAll();
    }

    /**
     *  Get one costoRepuesto by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public CostoRepuesto findOne(Long id) {
        log.debug("Request to get CostoRepuesto : {}", id);
        return costoRepuestoRepository.findOne(id);
    }

    /**
     *  Delete the  costoRepuesto by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CostoRepuesto : {}", id);
        costoRepuestoRepository.delete(id);
    }
}
