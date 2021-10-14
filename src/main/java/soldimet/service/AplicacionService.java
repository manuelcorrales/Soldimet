package soldimet.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.Aplicacion;
import soldimet.repository.AplicacionRepository;

/**
 * Service Implementation for managing {@link Aplicacion}.
 */
@Service
@Transactional
public class AplicacionService {

    private final Logger log = LoggerFactory.getLogger(AplicacionService.class);

    private final AplicacionRepository aplicacionRepository;

    public AplicacionService(AplicacionRepository aplicacionRepository) {
        this.aplicacionRepository = aplicacionRepository;
    }

    /**
     * Save a aplicacion.
     *
     * @param aplicacion the entity to save.
     * @return the persisted entity.
     */
    public Aplicacion save(Aplicacion aplicacion) {
        log.debug("Request to save Aplicacion : {}", aplicacion);
        return aplicacionRepository.save(aplicacion);
    }

    /**
     * Partially update a aplicacion.
     *
     * @param aplicacion the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Aplicacion> partialUpdate(Aplicacion aplicacion) {
        log.debug("Request to partially update Aplicacion : {}", aplicacion);

        return aplicacionRepository
            .findById(aplicacion.getId())
            .map(
                existingAplicacion -> {
                    if (aplicacion.getNombreAplicacion() != null) {
                        existingAplicacion.setNombreAplicacion(aplicacion.getNombreAplicacion());
                    }
                    if (aplicacion.getNumeroGrupo() != null) {
                        existingAplicacion.setNumeroGrupo(aplicacion.getNumeroGrupo());
                    }

                    return existingAplicacion;
                }
            )
            .map(aplicacionRepository::save);
    }

    /**
     * Get all the aplicacions.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Aplicacion> findAll() {
        log.debug("Request to get all Aplicacions");
        return aplicacionRepository.findAll();
    }

    /**
     * Get one aplicacion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Aplicacion> findOne(Long id) {
        log.debug("Request to get Aplicacion : {}", id);
        return aplicacionRepository.findById(id);
    }

    /**
     * Delete the aplicacion by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Aplicacion : {}", id);
        aplicacionRepository.deleteById(id);
    }
}
