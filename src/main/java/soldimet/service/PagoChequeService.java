package soldimet.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.PagoCheque;
import soldimet.repository.PagoChequeRepository;

/**
 * Service Implementation for managing {@link PagoCheque}.
 */
@Service
@Transactional
public class PagoChequeService {

    private final Logger log = LoggerFactory.getLogger(PagoChequeService.class);

    private final PagoChequeRepository pagoChequeRepository;

    public PagoChequeService(PagoChequeRepository pagoChequeRepository) {
        this.pagoChequeRepository = pagoChequeRepository;
    }

    /**
     * Save a pagoCheque.
     *
     * @param pagoCheque the entity to save.
     * @return the persisted entity.
     */
    public PagoCheque save(PagoCheque pagoCheque) {
        log.debug("Request to save PagoCheque : {}", pagoCheque);
        return pagoChequeRepository.save(pagoCheque);
    }

    /**
     * Partially update a pagoCheque.
     *
     * @param pagoCheque the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<PagoCheque> partialUpdate(PagoCheque pagoCheque) {
        log.debug("Request to partially update PagoCheque : {}", pagoCheque);

        return pagoChequeRepository
            .findById(pagoCheque.getId())
            .map(
                existingPagoCheque -> {
                    if (pagoCheque.getNumeroCheque() != null) {
                        existingPagoCheque.setNumeroCheque(pagoCheque.getNumeroCheque());
                    }

                    return existingPagoCheque;
                }
            )
            .map(pagoChequeRepository::save);
    }

    /**
     * Get all the pagoCheques.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<PagoCheque> findAll() {
        log.debug("Request to get all PagoCheques");
        return pagoChequeRepository.findAll();
    }

    /**
     * Get one pagoCheque by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<PagoCheque> findOne(Long id) {
        log.debug("Request to get PagoCheque : {}", id);
        return pagoChequeRepository.findById(id);
    }

    /**
     * Delete the pagoCheque by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete PagoCheque : {}", id);
        pagoChequeRepository.deleteById(id);
    }
}
