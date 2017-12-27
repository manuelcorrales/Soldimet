package soldimet.service;

import soldimet.domain.TipoTarjeta;
import soldimet.repository.TipoTarjetaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing TipoTarjeta.
 */
@Service
@Transactional
public class TipoTarjetaService {

    private final Logger log = LoggerFactory.getLogger(TipoTarjetaService.class);

    private final TipoTarjetaRepository tipoTarjetaRepository;

    public TipoTarjetaService(TipoTarjetaRepository tipoTarjetaRepository) {
        this.tipoTarjetaRepository = tipoTarjetaRepository;
    }

    /**
     * Save a tipoTarjeta.
     *
     * @param tipoTarjeta the entity to save
     * @return the persisted entity
     */
    public TipoTarjeta save(TipoTarjeta tipoTarjeta) {
        log.debug("Request to save TipoTarjeta : {}", tipoTarjeta);
        return tipoTarjetaRepository.save(tipoTarjeta);
    }

    /**
     *  Get all the tipoTarjetas.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<TipoTarjeta> findAll() {
        log.debug("Request to get all TipoTarjetas");
        return tipoTarjetaRepository.findAll();
    }

    /**
     *  Get one tipoTarjeta by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public TipoTarjeta findOne(Long id) {
        log.debug("Request to get TipoTarjeta : {}", id);
        return tipoTarjetaRepository.findOne(id);
    }

    /**
     *  Delete the  tipoTarjeta by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete TipoTarjeta : {}", id);
        tipoTarjetaRepository.delete(id);
    }
}
