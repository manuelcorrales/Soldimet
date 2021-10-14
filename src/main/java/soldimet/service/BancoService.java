package soldimet.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.Banco;
import soldimet.repository.BancoRepository;

/**
 * Service Implementation for managing {@link Banco}.
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
     * @param banco the entity to save.
     * @return the persisted entity.
     */
    public Banco save(Banco banco) {
        log.debug("Request to save Banco : {}", banco);
        return bancoRepository.save(banco);
    }

    /**
     * Partially update a banco.
     *
     * @param banco the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Banco> partialUpdate(Banco banco) {
        log.debug("Request to partially update Banco : {}", banco);

        return bancoRepository
            .findById(banco.getId())
            .map(
                existingBanco -> {
                    if (banco.getNombreBanco() != null) {
                        existingBanco.setNombreBanco(banco.getNombreBanco());
                    }

                    return existingBanco;
                }
            )
            .map(bancoRepository::save);
    }

    /**
     * Get all the bancos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Banco> findAll() {
        log.debug("Request to get all Bancos");
        return bancoRepository.findAll();
    }

    /**
     * Get one banco by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Banco> findOne(Long id) {
        log.debug("Request to get Banco : {}", id);
        return bancoRepository.findById(id);
    }

    /**
     * Delete the banco by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Banco : {}", id);
        bancoRepository.deleteById(id);
    }
}
