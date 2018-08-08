package soldimet.service;

import soldimet.domain.Cilindrada;
import soldimet.repository.CilindradaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing Cilindrada.
 */
@Service
@Transactional
public class CilindradaService {

    private final Logger log = LoggerFactory.getLogger(CilindradaService.class);

    private final CilindradaRepository cilindradaRepository;

    public CilindradaService(CilindradaRepository cilindradaRepository) {
        this.cilindradaRepository = cilindradaRepository;
    }

    /**
     * Save a cilindrada.
     *
     * @param cilindrada the entity to save
     * @return the persisted entity
     */
    public Cilindrada save(Cilindrada cilindrada) {
        log.debug("Request to save Cilindrada : {}", cilindrada);        return cilindradaRepository.save(cilindrada);
    }

    /**
     * Get all the cilindradas.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Cilindrada> findAll() {
        log.debug("Request to get all Cilindradas");
        return cilindradaRepository.findAll();
    }


    /**
     * Get one cilindrada by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Cilindrada> findOne(Long id) {
        log.debug("Request to get Cilindrada : {}", id);
        return cilindradaRepository.findById(id);
    }

    /**
     * Delete the cilindrada by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Cilindrada : {}", id);
        cilindradaRepository.deleteById(id);
    }
}
