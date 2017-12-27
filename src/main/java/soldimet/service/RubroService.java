package soldimet.service;

import soldimet.domain.Rubro;
import soldimet.repository.RubroRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Rubro.
 */
@Service
@Transactional
public class RubroService {

    private final Logger log = LoggerFactory.getLogger(RubroService.class);

    private final RubroRepository rubroRepository;

    public RubroService(RubroRepository rubroRepository) {
        this.rubroRepository = rubroRepository;
    }

    /**
     * Save a rubro.
     *
     * @param rubro the entity to save
     * @return the persisted entity
     */
    public Rubro save(Rubro rubro) {
        log.debug("Request to save Rubro : {}", rubro);
        return rubroRepository.save(rubro);
    }

    /**
     *  Get all the rubros.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Rubro> findAll() {
        log.debug("Request to get all Rubros");
        return rubroRepository.findAll();
    }

    /**
     *  Get one rubro by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Rubro findOne(Long id) {
        log.debug("Request to get Rubro : {}", id);
        return rubroRepository.findOne(id);
    }

    /**
     *  Delete the  rubro by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Rubro : {}", id);
        rubroRepository.delete(id);
    }
}
