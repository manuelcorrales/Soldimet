package soldimet.service;

import soldimet.domain.PagoTarjeta;
import soldimet.repository.PagoTarjetaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link PagoTarjeta}.
 */
@Service
@Transactional
public class PagoTarjetaService {

    private final Logger log = LoggerFactory.getLogger(PagoTarjetaService.class);

    private final PagoTarjetaRepository pagoTarjetaRepository;

    public PagoTarjetaService(PagoTarjetaRepository pagoTarjetaRepository) {
        this.pagoTarjetaRepository = pagoTarjetaRepository;
    }

    /**
     * Save a pagoTarjeta.
     *
     * @param pagoTarjeta the entity to save.
     * @return the persisted entity.
     */
    public PagoTarjeta save(PagoTarjeta pagoTarjeta) {
        log.debug("Request to save PagoTarjeta : {}", pagoTarjeta);
        return pagoTarjetaRepository.save(pagoTarjeta);
    }

    /**
     * Get all the pagoTarjetas.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<PagoTarjeta> findAll() {
        log.debug("Request to get all PagoTarjetas");
        return pagoTarjetaRepository.findAll();
    }


    /**
     * Get one pagoTarjeta by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<PagoTarjeta> findOne(Long id) {
        log.debug("Request to get PagoTarjeta : {}", id);
        return pagoTarjetaRepository.findById(id);
    }

    /**
     * Delete the pagoTarjeta by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete PagoTarjeta : {}", id);
        pagoTarjetaRepository.deleteById(id);
    }
}
