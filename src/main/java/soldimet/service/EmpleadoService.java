package soldimet.service;

import soldimet.domain.Empleado;
import soldimet.repository.EmpleadoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing Empleado.
 */
@Service
@Transactional
public class EmpleadoService {

    private final Logger log = LoggerFactory.getLogger(EmpleadoService.class);

    private final EmpleadoRepository empleadoRepository;

    public EmpleadoService(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    /**
     * Save a empleado.
     *
     * @param empleado the entity to save
     * @return the persisted entity
     */
    public Empleado save(Empleado empleado) {
        log.debug("Request to save Empleado : {}", empleado);        return empleadoRepository.save(empleado);
    }

    /**
     * Get all the empleados.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Empleado> findAll() {
        log.debug("Request to get all Empleados");
        return empleadoRepository.findAll();
    }


    /**
     * Get one empleado by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Empleado> findOne(Long id) {
        log.debug("Request to get Empleado : {}", id);
        return empleadoRepository.findById(id);
    }

    /**
     * Delete the empleado by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Empleado : {}", id);
        empleadoRepository.deleteById(id);
    }
}
