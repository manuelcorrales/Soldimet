package soldimet.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.DetallePedido;
import soldimet.repository.DetallePedidoRepository;

/**
 * Service Implementation for managing {@link DetallePedido}.
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
     * @param detallePedido the entity to save.
     * @return the persisted entity.
     */
    public DetallePedido save(DetallePedido detallePedido) {
        log.debug("Request to save DetallePedido : {}", detallePedido);
        return detallePedidoRepository.save(detallePedido);
    }

    /**
     * Partially update a detallePedido.
     *
     * @param detallePedido the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<DetallePedido> partialUpdate(DetallePedido detallePedido) {
        log.debug("Request to partially update DetallePedido : {}", detallePedido);

        return detallePedidoRepository
            .findById(detallePedido.getId())
            .map(
                existingDetallePedido -> {
                    return existingDetallePedido;
                }
            )
            .map(detallePedidoRepository::save);
    }

    /**
     * Get all the detallePedidos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<DetallePedido> findAll() {
        log.debug("Request to get all DetallePedidos");
        return detallePedidoRepository.findAll();
    }

    /**
     * Get one detallePedido by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<DetallePedido> findOne(Long id) {
        log.debug("Request to get DetallePedido : {}", id);
        return detallePedidoRepository.findById(id);
    }

    /**
     * Delete the detallePedido by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete DetallePedido : {}", id);
        detallePedidoRepository.deleteById(id);
    }
}
