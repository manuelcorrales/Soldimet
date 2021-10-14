package soldimet.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.FormaDePago;
import soldimet.repository.FormaDePagoRepository;

/**
 * Service Implementation for managing {@link FormaDePago}.
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
     * @param formaDePago the entity to save.
     * @return the persisted entity.
     */
    public FormaDePago save(FormaDePago formaDePago) {
        log.debug("Request to save FormaDePago : {}", formaDePago);
        return formaDePagoRepository.save(formaDePago);
    }

    /**
     * Partially update a formaDePago.
     *
     * @param formaDePago the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<FormaDePago> partialUpdate(FormaDePago formaDePago) {
        log.debug("Request to partially update FormaDePago : {}", formaDePago);

        return formaDePagoRepository
            .findById(formaDePago.getId())
            .map(
                existingFormaDePago -> {
                    if (formaDePago.getNombreFormaDePago() != null) {
                        existingFormaDePago.setNombreFormaDePago(formaDePago.getNombreFormaDePago());
                    }

                    return existingFormaDePago;
                }
            )
            .map(formaDePagoRepository::save);
    }

    /**
     * Get all the formaDePagos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<FormaDePago> findAll() {
        log.debug("Request to get all FormaDePagos");
        return formaDePagoRepository.findAll();
    }

    /**
     * Get one formaDePago by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<FormaDePago> findOne(Long id) {
        log.debug("Request to get FormaDePago : {}", id);
        return formaDePagoRepository.findById(id);
    }

    /**
     * Delete the formaDePago by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete FormaDePago : {}", id);
        formaDePagoRepository.deleteById(id);
    }
}
