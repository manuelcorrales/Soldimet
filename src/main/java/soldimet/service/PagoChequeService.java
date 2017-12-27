package soldimet.service;

import soldimet.domain.PagoCheque;
import soldimet.repository.PagoChequeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing PagoCheque.
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
     * @param pagoCheque the entity to save
     * @return the persisted entity
     */
    public PagoCheque save(PagoCheque pagoCheque) {
        log.debug("Request to save PagoCheque : {}", pagoCheque);
        return pagoChequeRepository.save(pagoCheque);
    }

    /**
     *  Get all the pagoCheques.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<PagoCheque> findAll() {
        log.debug("Request to get all PagoCheques");
        return pagoChequeRepository.findAll();
    }

    /**
     *  Get one pagoCheque by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public PagoCheque findOne(Long id) {
        log.debug("Request to get PagoCheque : {}", id);
        return pagoChequeRepository.findOne(id);
    }

    /**
     *  Delete the  pagoCheque by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete PagoCheque : {}", id);
        pagoChequeRepository.delete(id);
    }
}
