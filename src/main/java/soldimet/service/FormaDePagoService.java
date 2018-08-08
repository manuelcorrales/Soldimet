package soldimet.service;

import soldimet.domain.FormaDePago;
import soldimet.repository.FormaDePagoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing FormaDePago.
 */
@Service
@Transactional
public class FormaDePagoService {

    private final Logger log = LoggerFactory.getLogger(FormaDePagoService.class);

    private final FormaDePagoRepository formaDePagoRepository;

    public FormaDePagoService(FormaDePagoRepository formaDePagoRepository) {
        this.formaDePagoRepository = formaDePagoRepository;
    }

    /**
     * Save a formaDePago.
     *
     * @param formaDePago the entity to save
     * @return the persisted entity
     */
    public FormaDePago save(FormaDePago formaDePago) {
        log.debug("Request to save FormaDePago : {}", formaDePago);        return formaDePagoRepository.save(formaDePago);
    }

    /**
     * Get all the formaDePagos.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<FormaDePago> findAll() {
        log.debug("Request to get all FormaDePagos");
        return formaDePagoRepository.findAll();
    }


    /**
     * Get one formaDePago by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<FormaDePago> findOne(Long id) {
        log.debug("Request to get FormaDePago : {}", id);
        return formaDePagoRepository.findById(id);
    }

    /**
     * Delete the formaDePago by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete FormaDePago : {}", id);
        formaDePagoRepository.deleteById(id);
    }
}
