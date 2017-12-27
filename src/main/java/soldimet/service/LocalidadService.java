package soldimet.service;

import soldimet.domain.Localidad;
import soldimet.repository.LocalidadRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Localidad.
 */
@Service
@Transactional
public class LocalidadService {

    private final Logger log = LoggerFactory.getLogger(LocalidadService.class);

    private final LocalidadRepository localidadRepository;

    public LocalidadService(LocalidadRepository localidadRepository) {
        this.localidadRepository = localidadRepository;
    }

    /**
     * Save a localidad.
     *
     * @param localidad the entity to save
     * @return the persisted entity
     */
    public Localidad save(Localidad localidad) {
        log.debug("Request to save Localidad : {}", localidad);
        return localidadRepository.save(localidad);
    }

    /**
     *  Get all the localidads.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Localidad> findAll() {
        log.debug("Request to get all Localidads");
        return localidadRepository.findAll();
    }

    /**
     *  Get one localidad by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Localidad findOne(Long id) {
        log.debug("Request to get Localidad : {}", id);
        return localidadRepository.findOne(id);
    }

    /**
     *  Delete the  localidad by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Localidad : {}", id);
        localidadRepository.delete(id);
    }
}
