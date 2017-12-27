package soldimet.service;

import soldimet.domain.Motor;
import soldimet.repository.MotorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Motor.
 */
@Service
@Transactional
public class MotorService {

    private final Logger log = LoggerFactory.getLogger(MotorService.class);

    private final MotorRepository motorRepository;

    public MotorService(MotorRepository motorRepository) {
        this.motorRepository = motorRepository;
    }

    /**
     * Save a motor.
     *
     * @param motor the entity to save
     * @return the persisted entity
     */
    public Motor save(Motor motor) {
        log.debug("Request to save Motor : {}", motor);
        return motorRepository.save(motor);
    }

    /**
     *  Get all the motors.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Motor> findAll() {
        log.debug("Request to get all Motors");
        return motorRepository.findAll();
    }

    /**
     *  Get one motor by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Motor findOne(Long id) {
        log.debug("Request to get Motor : {}", id);
        return motorRepository.findOne(id);
    }

    /**
     *  Delete the  motor by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Motor : {}", id);
        motorRepository.delete(id);
    }
}
