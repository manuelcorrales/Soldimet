package soldimet.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.EstadoDetallePedido;
import soldimet.repository.EstadoDetallePedidoRepository;

/**
 * Service Implementation for managing {@link EstadoDetallePedido}.
 */
@Service
@Transactional
public class EstadoDetallePedidoService {

    private final Logger log = LoggerFactory.getLogger(EstadoDetallePedidoService.class);

    private final EstadoDetallePedidoRepository estadoDetallePedidoRepository;

    public EstadoDetallePedidoService(EstadoDetallePedidoRepository estadoDetallePedidoRepository) {
        this.estadoDetallePedidoRepository = estadoDetallePedidoRepository;
    }

    /**
     * Save a estadoDetallePedido.
     *
     * @param estadoDetallePedido the entity to save.
     * @return the persisted entity.
     */
    public EstadoDetallePedido save(EstadoDetallePedido estadoDetallePedido) {
        log.debug("Request to save EstadoDetallePedido : {}", estadoDetallePedido);
        return estadoDetallePedidoRepository.save(estadoDetallePedido);
    }

    /**
     * Partially update a estadoDetallePedido.
     *
     * @param estadoDetallePedido the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<EstadoDetallePedido> partialUpdate(EstadoDetallePedido estadoDetallePedido) {
        log.debug("Request to partially update EstadoDetallePedido : {}", estadoDetallePedido);

        return estadoDetallePedidoRepository
            .findById(estadoDetallePedido.getId())
            .map(
                existingEstadoDetallePedido -> {
                    if (estadoDetallePedido.getNombreEstado() != null) {
                        existingEstadoDetallePedido.setNombreEstado(estadoDetallePedido.getNombreEstado());
                    }

                    return existingEstadoDetallePedido;
                }
            )
            .map(estadoDetallePedidoRepository::save);
    }

    /**
     * Get all the estadoDetallePedidos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<EstadoDetallePedido> findAll() {
        log.debug("Request to get all EstadoDetallePedidos");
        return estadoDetallePedidoRepository.findAll();
    }

    /**
     * Get one estadoDetallePedido by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<EstadoDetallePedido> findOne(Long id) {
        log.debug("Request to get EstadoDetallePedido : {}", id);
        return estadoDetallePedidoRepository.findById(id);
    }

    /**
     * Delete the estadoDetallePedido by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete EstadoDetallePedido : {}", id);
        estadoDetallePedidoRepository.deleteById(id);
    }
}
