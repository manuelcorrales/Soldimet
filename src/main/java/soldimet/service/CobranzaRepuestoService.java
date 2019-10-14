package soldimet.service;

import soldimet.domain.CobranzaRepuesto;
import soldimet.repository.CobranzaRepuestoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link CobranzaRepuesto}.
 */
@Service
@Transactional
public class CobranzaRepuestoService {

    private final Logger log = LoggerFactory.getLogger(CobranzaRepuestoService.class);

    private final CobranzaRepuestoRepository cobranzaRepuestoRepository;

    public CobranzaRepuestoService(CobranzaRepuestoRepository cobranzaRepuestoRepository) {
        this.cobranzaRepuestoRepository = cobranzaRepuestoRepository;
    }

    /**
     * Save a cobranzaRepuesto.
     *
     * @param cobranzaRepuesto the entity to save.
     * @return the persisted entity.
     */
    public CobranzaRepuesto save(CobranzaRepuesto cobranzaRepuesto) {
        log.debug("Request to save CobranzaRepuesto : {}", cobranzaRepuesto);
        return cobranzaRepuestoRepository.save(cobranzaRepuesto);
    }

    /**
     * Get all the cobranzaRepuestos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<CobranzaRepuesto> findAll() {
        log.debug("Request to get all CobranzaRepuestos");
        return cobranzaRepuestoRepository.findAll();
    }


    /**
     * Get one cobranzaRepuesto by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CobranzaRepuesto> findOne(Long id) {
        log.debug("Request to get CobranzaRepuesto : {}", id);
        return cobranzaRepuestoRepository.findById(id);
    }

    /**
     * Delete the cobranzaRepuesto by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete CobranzaRepuesto : {}", id);
        cobranzaRepuestoRepository.deleteById(id);
    }
}
