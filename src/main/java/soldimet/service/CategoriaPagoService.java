package soldimet.service;

import soldimet.domain.CategoriaPago;
import soldimet.repository.CategoriaPagoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link CategoriaPago}.
 */
@Service
@Transactional
public class CategoriaPagoService {

    private final Logger log = LoggerFactory.getLogger(CategoriaPagoService.class);

    private final CategoriaPagoRepository categoriaPagoRepository;

    public CategoriaPagoService(CategoriaPagoRepository categoriaPagoRepository) {
        this.categoriaPagoRepository = categoriaPagoRepository;
    }

    /**
     * Save a categoriaPago.
     *
     * @param categoriaPago the entity to save.
     * @return the persisted entity.
     */
    public CategoriaPago save(CategoriaPago categoriaPago) {
        log.debug("Request to save CategoriaPago : {}", categoriaPago);
        return categoriaPagoRepository.save(categoriaPago);
    }

    /**
     * Get all the categoriaPagos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<CategoriaPago> findAll() {
        log.debug("Request to get all CategoriaPagos");
        return categoriaPagoRepository.findAll();
    }


    /**
     * Get one categoriaPago by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CategoriaPago> findOne(Long id) {
        log.debug("Request to get CategoriaPago : {}", id);
        return categoriaPagoRepository.findById(id);
    }

    /**
     * Delete the categoriaPago by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete CategoriaPago : {}", id);
        categoriaPagoRepository.deleteById(id);
    }
}
