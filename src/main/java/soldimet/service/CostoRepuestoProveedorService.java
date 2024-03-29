package soldimet.service;

import soldimet.domain.CostoRepuestoProveedor;
import soldimet.repository.CostoRepuestoProveedorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link CostoRepuestoProveedor}.
 */
@Service
@Transactional
public class CostoRepuestoProveedorService {

    private final Logger log = LoggerFactory.getLogger(CostoRepuestoProveedorService.class);

    private final CostoRepuestoProveedorRepository costoRepuestoProveedorRepository;

    public CostoRepuestoProveedorService(CostoRepuestoProveedorRepository costoRepuestoProveedorRepository) {
        this.costoRepuestoProveedorRepository = costoRepuestoProveedorRepository;
    }

    /**
     * Save a costoRepuestoProveedor.
     *
     * @param costoRepuestoProveedor the entity to save.
     * @return the persisted entity.
     */
    public CostoRepuestoProveedor save(CostoRepuestoProveedor costoRepuestoProveedor) {
        log.debug("Request to save CostoRepuestoProveedor : {}", costoRepuestoProveedor);
        return costoRepuestoProveedorRepository.save(costoRepuestoProveedor);
    }

    /**
     * Get all the costoRepuestoProveedors.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<CostoRepuestoProveedor> findAll() {
        log.debug("Request to get all CostoRepuestoProveedors");
        return costoRepuestoProveedorRepository.findAll();
    }


    /**
     * Get one costoRepuestoProveedor by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CostoRepuestoProveedor> findOne(Long id) {
        log.debug("Request to get CostoRepuestoProveedor : {}", id);
        return costoRepuestoProveedorRepository.findById(id);
    }

    /**
     * Delete the costoRepuestoProveedor by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete CostoRepuestoProveedor : {}", id);
        costoRepuestoProveedorRepository.deleteById(id);
    }
}
