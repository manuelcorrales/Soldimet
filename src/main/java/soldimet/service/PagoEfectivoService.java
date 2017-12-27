package soldimet.service;

import soldimet.domain.PagoEfectivo;
import soldimet.repository.PagoEfectivoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing PagoEfectivo.
 */
@Service
@Transactional
public class PagoEfectivoService {

    private final Logger log = LoggerFactory.getLogger(PagoEfectivoService.class);

    private final PagoEfectivoRepository pagoEfectivoRepository;

    public PagoEfectivoService(PagoEfectivoRepository pagoEfectivoRepository) {
        this.pagoEfectivoRepository = pagoEfectivoRepository;
    }

    /**
     * Save a pagoEfectivo.
     *
     * @param pagoEfectivo the entity to save
     * @return the persisted entity
     */
    public PagoEfectivo save(PagoEfectivo pagoEfectivo) {
        log.debug("Request to save PagoEfectivo : {}", pagoEfectivo);
        return pagoEfectivoRepository.save(pagoEfectivo);
    }

    /**
     *  Get all the pagoEfectivos.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<PagoEfectivo> findAll() {
        log.debug("Request to get all PagoEfectivos");
        return pagoEfectivoRepository.findAll();
    }

    /**
     *  Get one pagoEfectivo by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public PagoEfectivo findOne(Long id) {
        log.debug("Request to get PagoEfectivo : {}", id);
        return pagoEfectivoRepository.findOne(id);
    }

    /**
     *  Delete the  pagoEfectivo by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete PagoEfectivo : {}", id);
        pagoEfectivoRepository.delete(id);
    }
}
