package soldimet.service;

import soldimet.domain.TipoParteMotor;
import soldimet.repository.TipoParteMotorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing TipoParteMotor.
 */
@Service
@Transactional
public class TipoParteMotorService {

    private final Logger log = LoggerFactory.getLogger(TipoParteMotorService.class);

    private final TipoParteMotorRepository tipoParteMotorRepository;

    public TipoParteMotorService(TipoParteMotorRepository tipoParteMotorRepository) {
        this.tipoParteMotorRepository = tipoParteMotorRepository;
    }

    /**
     * Save a tipoParteMotor.
     *
     * @param tipoParteMotor the entity to save
     * @return the persisted entity
     */
    public TipoParteMotor save(TipoParteMotor tipoParteMotor) {
        log.debug("Request to save TipoParteMotor : {}", tipoParteMotor);        return tipoParteMotorRepository.save(tipoParteMotor);
    }

    /**
     * Get all the tipoParteMotors.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<TipoParteMotor> findAll() {
        log.debug("Request to get all TipoParteMotors");
        return tipoParteMotorRepository.findAll();
    }


    /**
     * Get one tipoParteMotor by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<TipoParteMotor> findOne(Long id) {
        log.debug("Request to get TipoParteMotor : {}", id);
        return tipoParteMotorRepository.findById(id);
    }

    /**
     * Delete the tipoParteMotor by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete TipoParteMotor : {}", id);
        tipoParteMotorRepository.deleteById(id);
    }
}
