package soldimet.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.Direccion;
import soldimet.repository.DireccionRepository;

/**
 * Service Implementation for managing {@link Direccion}.
 */
@Service
@Transactional
public class DireccionService {

    private final Logger log = LoggerFactory.getLogger(DireccionService.class);

    private final DireccionRepository direccionRepository;

    public DireccionService(DireccionRepository direccionRepository) {
        this.direccionRepository = direccionRepository;
    }

    /**
     * Save a direccion.
     *
     * @param direccion the entity to save.
     * @return the persisted entity.
     */
    public Direccion save(Direccion direccion) {
        log.debug("Request to save Direccion : {}", direccion);
        return direccionRepository.save(direccion);
    }

    /**
     * Partially update a direccion.
     *
     * @param direccion the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Direccion> partialUpdate(Direccion direccion) {
        log.debug("Request to partially update Direccion : {}", direccion);

        return direccionRepository
            .findById(direccion.getId())
            .map(
                existingDireccion -> {
                    if (direccion.getCalle() != null) {
                        existingDireccion.setCalle(direccion.getCalle());
                    }
                    if (direccion.getNumero() != null) {
                        existingDireccion.setNumero(direccion.getNumero());
                    }

                    return existingDireccion;
                }
            )
            .map(direccionRepository::save);
    }

    /**
     * Get all the direccions.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Direccion> findAll() {
        log.debug("Request to get all Direccions");
        return direccionRepository.findAll();
    }

    /**
     * Get one direccion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Direccion> findOne(Long id) {
        log.debug("Request to get Direccion : {}", id);
        return direccionRepository.findById(id);
    }

    /**
     * Delete the direccion by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Direccion : {}", id);
        direccionRepository.deleteById(id);
    }
}
