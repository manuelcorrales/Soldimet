package soldimet.service;

import soldimet.domain.PedidoRepuesto;
import soldimet.repository.PedidoRepuestoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing PedidoRepuesto.
 */
@Service
@Transactional
public class PedidoRepuestoService {

    private final Logger log = LoggerFactory.getLogger(PedidoRepuestoService.class);

    private final PedidoRepuestoRepository pedidoRepuestoRepository;

    public PedidoRepuestoService(PedidoRepuestoRepository pedidoRepuestoRepository) {
        this.pedidoRepuestoRepository = pedidoRepuestoRepository;
    }

    /**
     * Save a pedidoRepuesto.
     *
     * @param pedidoRepuesto the entity to save
     * @return the persisted entity
     */
    public PedidoRepuesto save(PedidoRepuesto pedidoRepuesto) {
        log.debug("Request to save PedidoRepuesto : {}", pedidoRepuesto);
        return pedidoRepuestoRepository.save(pedidoRepuesto);
    }

    /**
     *  Get all the pedidoRepuestos.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PedidoRepuesto> findAll(Pageable pageable) {
        log.debug("Request to get all PedidoRepuestos");
        return pedidoRepuestoRepository.findAll(pageable);
    }

    /**
     *  Get one pedidoRepuesto by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public PedidoRepuesto findOne(Long id) {
        log.debug("Request to get PedidoRepuesto : {}", id);
        return pedidoRepuestoRepository.findOne(id);
    }

    /**
     *  Delete the  pedidoRepuesto by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete PedidoRepuesto : {}", id);
        pedidoRepuestoRepository.delete(id);
    }
}
