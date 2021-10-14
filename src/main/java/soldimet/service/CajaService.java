package soldimet.service;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.Caja;
import soldimet.repository.CajaRepository;

/**
 * Service Implementation for managing {@link Caja}.
 */
@Service
@Transactional
public class CajaService {

    private final Logger log = LoggerFactory.getLogger(CajaService.class);

    private final CajaRepository cajaRepository;

    public CajaService(CajaRepository cajaRepository) {
        this.cajaRepository = cajaRepository;
    }

    /**
     * Save a caja.
     *
     * @param caja the entity to save.
     * @return the persisted entity.
     */
    public Caja save(Caja caja) {
        log.debug("Request to save Caja : {}", caja);
        return cajaRepository.save(caja);
    }

    /**
     * Partially update a caja.
     *
     * @param caja the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Caja> partialUpdate(Caja caja) {
        log.debug("Request to partially update Caja : {}", caja);

        return cajaRepository
            .findById(caja.getId())
            .map(
                existingCaja -> {
                    if (caja.getFecha() != null) {
                        existingCaja.setFecha(caja.getFecha());
                    }
                    if (caja.getHoraApertura() != null) {
                        existingCaja.setHoraApertura(caja.getHoraApertura());
                    }
                    if (caja.getHoraCierre() != null) {
                        existingCaja.setHoraCierre(caja.getHoraCierre());
                    }
                    if (caja.getSaldo() != null) {
                        existingCaja.setSaldo(caja.getSaldo());
                    }
                    if (caja.getObservaciones() != null) {
                        existingCaja.setObservaciones(caja.getObservaciones());
                    }
                    if (caja.getSaldoFisico() != null) {
                        existingCaja.setSaldoFisico(caja.getSaldoFisico());
                    }

                    return existingCaja;
                }
            )
            .map(cajaRepository::save);
    }

    /**
     * Get all the cajas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Caja> findAll(Pageable pageable) {
        log.debug("Request to get all Cajas");
        return cajaRepository.findAll(pageable);
    }

    /**
     * Get one caja by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Caja> findOne(Long id) {
        log.debug("Request to get Caja : {}", id);
        return cajaRepository.findById(id);
    }

    /**
     * Delete the caja by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Caja : {}", id);
        cajaRepository.deleteById(id);
    }
}
