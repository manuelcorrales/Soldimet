package soldimet.service;

import soldimet.domain.DetallePedido;
import soldimet.repository.DetallePedidoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing DetallePedido.
 */
@Service
@Transactional
public class DetallePedidoService {

    private final Logger log = LoggerFactory.getLogger(DetallePedidoService.class);

    private final DetallePedidoRepository detallePedidoRepository;

    public DetallePedidoService(DetallePedidoRepository detallePedidoRepository) {
        this.detallePedidoRepository = detallePedidoRepository;
    }

    /**
     * Save a detallePedido.
     *
     * @param detallePedido the entity to save
     * @return the persisted entity
     */
    public DetallePedido save(DetallePedido detallePedido) {
        log.debug("Request to save DetallePedido : {}", detallePedido);
        return detallePedidoRepository.save(detallePedido);
    }

    /**
     *  Get all the detallePedidos.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<DetallePedido> findAll() {
        log.debug("Request to get all DetallePedidos");
        return detallePedidoRepository.findAll();
    }

    /**
     *  Get one detallePedido by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public DetallePedido findOne(Long id) {
        log.debug("Request to get DetallePedido : {}", id);
        return detallePedidoRepository.findOne(id);
    }

    /**
     *  Delete the  detallePedido by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete DetallePedido : {}", id);
        detallePedidoRepository.delete(id);
    }
}
