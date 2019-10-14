package soldimet.service;

import soldimet.domain.MovimientoPedido;
import soldimet.repository.MovimientoPedidoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link MovimientoPedido}.
 */
@Service
@Transactional
public class MovimientoPedidoService {

    private final Logger log = LoggerFactory.getLogger(MovimientoPedidoService.class);

    private final MovimientoPedidoRepository movimientoPedidoRepository;

    public MovimientoPedidoService(MovimientoPedidoRepository movimientoPedidoRepository) {
        this.movimientoPedidoRepository = movimientoPedidoRepository;
    }

    /**
     * Save a movimientoPedido.
     *
     * @param movimientoPedido the entity to save.
     * @return the persisted entity.
     */
    public MovimientoPedido save(MovimientoPedido movimientoPedido) {
        log.debug("Request to save MovimientoPedido : {}", movimientoPedido);
        return movimientoPedidoRepository.save(movimientoPedido);
    }

    /**
     * Get all the movimientoPedidos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<MovimientoPedido> findAll() {
        log.debug("Request to get all MovimientoPedidos");
        return movimientoPedidoRepository.findAll();
    }


    /**
     * Get one movimientoPedido by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<MovimientoPedido> findOne(Long id) {
        log.debug("Request to get MovimientoPedido : {}", id);
        return movimientoPedidoRepository.findById(id);
    }

    /**
     * Delete the movimientoPedido by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete MovimientoPedido : {}", id);
        movimientoPedidoRepository.deleteById(id);
    }
}
