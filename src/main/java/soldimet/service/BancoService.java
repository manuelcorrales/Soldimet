package soldimet.service;

import soldimet.domain.Banco;
import soldimet.repository.BancoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Banco.
 */
@Service
@Transactional
public class BancoService {

    private final Logger log = LoggerFactory.getLogger(BancoService.class);

    private final BancoRepository bancoRepository;

    public BancoService(BancoRepository bancoRepository) {
        this.bancoRepository = bancoRepository;
    }

    /**
     * Save a banco.
     *
     * @param banco the entity to save
     * @return the persisted entity
     */
    public Banco save(Banco banco) {
        log.debug("Request to save Banco : {}", banco);
        return bancoRepository.save(banco);
    }

    /**
     *  Get all the bancos.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Banco> findAll() {
        log.debug("Request to get all Bancos");
        return bancoRepository.findAll();
    }

    /**
     *  Get one banco by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Banco findOne(Long id) {
        log.debug("Request to get Banco : {}", id);
        return bancoRepository.findOne(id);
    }

    /**
     *  Delete the  banco by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Banco : {}", id);
        bancoRepository.delete(id);
    }
}
