package soldimet.service;

import soldimet.domain.EstadoPersona;
import soldimet.repository.EstadoPersonaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link EstadoPersona}.
 */
@Service
@Transactional
public class EstadoPersonaService {

    private final Logger log = LoggerFactory.getLogger(EstadoPersonaService.class);

    private final EstadoPersonaRepository estadoPersonaRepository;

    public EstadoPersonaService(EstadoPersonaRepository estadoPersonaRepository) {
        this.estadoPersonaRepository = estadoPersonaRepository;
    }

    /**
     * Save a estadoPersona.
     *
     * @param estadoPersona the entity to save.
     * @return the persisted entity.
     */
    public EstadoPersona save(EstadoPersona estadoPersona) {
        log.debug("Request to save EstadoPersona : {}", estadoPersona);
        return estadoPersonaRepository.save(estadoPersona);
    }

    /**
     * Get all the estadoPersonas.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<EstadoPersona> findAll() {
        log.debug("Request to get all EstadoPersonas");
        return estadoPersonaRepository.findAll();
    }


    /**
     * Get one estadoPersona by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<EstadoPersona> findOne(Long id) {
        log.debug("Request to get EstadoPersona : {}", id);
        return estadoPersonaRepository.findById(id);
    }

    /**
     * Delete the estadoPersona by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete EstadoPersona : {}", id);
        estadoPersonaRepository.deleteById(id);
    }
}
