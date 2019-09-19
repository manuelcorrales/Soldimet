package soldimet.service;

import soldimet.domain.Tarjeta;
import soldimet.repository.TarjetaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Tarjeta}.
 */
@Service
@Transactional
public class TarjetaService {

    private final Logger log = LoggerFactory.getLogger(TarjetaService.class);

    private final TarjetaRepository tarjetaRepository;

    public TarjetaService(TarjetaRepository tarjetaRepository) {
        this.tarjetaRepository = tarjetaRepository;
    }

    /**
     * Save a tarjeta.
     *
     * @param tarjeta the entity to save.
     * @return the persisted entity.
     */
    public Tarjeta save(Tarjeta tarjeta) {
        log.debug("Request to save Tarjeta : {}", tarjeta);
        return tarjetaRepository.save(tarjeta);
    }

    /**
     * Get all the tarjetas.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Tarjeta> findAll() {
        log.debug("Request to get all Tarjetas");
        return tarjetaRepository.findAll();
    }


    /**
     * Get one tarjeta by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Tarjeta> findOne(Long id) {
        log.debug("Request to get Tarjeta : {}", id);
        return tarjetaRepository.findById(id);
    }

    /**
     * Delete the tarjeta by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Tarjeta : {}", id);
        tarjetaRepository.deleteById(id);
    }
}
