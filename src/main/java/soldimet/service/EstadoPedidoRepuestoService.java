package soldimet.service;

import soldimet.domain.EstadoPedidoRepuesto;
import soldimet.repository.EstadoPedidoRepuestoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing EstadoPedidoRepuesto.
 */
@Service
@Transactional
public class EstadoPedidoRepuestoService {

    private final Logger log = LoggerFactory.getLogger(EstadoPedidoRepuestoService.class);

    private final EstadoPedidoRepuestoRepository estadoPedidoRepuestoRepository;

    public EstadoPedidoRepuestoService(EstadoPedidoRepuestoRepository estadoPedidoRepuestoRepository) {
        this.estadoPedidoRepuestoRepository = estadoPedidoRepuestoRepository;
    }

    /**
     * Save a estadoPedidoRepuesto.
     *
     * @param estadoPedidoRepuesto the entity to save
     * @return the persisted entity
     */
    public EstadoPedidoRepuesto save(EstadoPedidoRepuesto estadoPedidoRepuesto) {
        log.debug("Request to save EstadoPedidoRepuesto : {}", estadoPedidoRepuesto);        return estadoPedidoRepuestoRepository.save(estadoPedidoRepuesto);
    }

    /**
     * Get all the estadoPedidoRepuestos.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<EstadoPedidoRepuesto> findAll() {
        log.debug("Request to get all EstadoPedidoRepuestos");
        return estadoPedidoRepuestoRepository.findAll();
    }


    /**
     * Get one estadoPedidoRepuesto by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<EstadoPedidoRepuesto> findOne(Long id) {
        log.debug("Request to get EstadoPedidoRepuesto : {}", id);
        return estadoPedidoRepuestoRepository.findById(id);
    }

    /**
     * Delete the estadoPedidoRepuesto by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete EstadoPedidoRepuesto : {}", id);
        estadoPedidoRepuestoRepository.deleteById(id);
    }
}
