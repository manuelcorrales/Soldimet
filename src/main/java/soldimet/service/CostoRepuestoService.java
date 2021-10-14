package soldimet.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.CostoRepuesto;
import soldimet.repository.CostoRepuestoRepository;

/**
 * Service Implementation for managing {@link CostoRepuesto}.
 */
@Service
@Transactional
public class CostoRepuestoService {

    private final Logger log = LoggerFactory.getLogger(CostoRepuestoService.class);

    private final CostoRepuestoRepository costoRepuestoRepository;

    public CostoRepuestoService(CostoRepuestoRepository costoRepuestoRepository) {
        this.costoRepuestoRepository = costoRepuestoRepository;
    }

    /**
     * Save a costoRepuesto.
     *
     * @param costoRepuesto the entity to save.
     * @return the persisted entity.
     */
    public CostoRepuesto save(CostoRepuesto costoRepuesto) {
        log.debug("Request to save CostoRepuesto : {}", costoRepuesto);
        return costoRepuestoRepository.save(costoRepuesto);
    }

    /**
     * Partially update a costoRepuesto.
     *
     * @param costoRepuesto the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<CostoRepuesto> partialUpdate(CostoRepuesto costoRepuesto) {
        log.debug("Request to partially update CostoRepuesto : {}", costoRepuesto);

        return costoRepuestoRepository
            .findById(costoRepuesto.getId())
            .map(
                existingCostoRepuesto -> {
                    if (costoRepuesto.getValor() != null) {
                        existingCostoRepuesto.setValor(costoRepuesto.getValor());
                    }

                    return existingCostoRepuesto;
                }
            )
            .map(costoRepuestoRepository::save);
    }

    /**
     * Get all the costoRepuestos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<CostoRepuesto> findAll() {
        log.debug("Request to get all CostoRepuestos");
        return costoRepuestoRepository.findAll();
    }

    /**
     * Get one costoRepuesto by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CostoRepuesto> findOne(Long id) {
        log.debug("Request to get CostoRepuesto : {}", id);
        return costoRepuestoRepository.findById(id);
    }

    /**
     * Delete the costoRepuesto by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete CostoRepuesto : {}", id);
        costoRepuestoRepository.deleteById(id);
    }
}
