package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.DetallePedido;
import soldimet.service.DetallePedidoService;
import soldimet.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing DetallePedido.
 */
@RestController
@RequestMapping("/api")
public class DetallePedidoResource {

    private final Logger log = LoggerFactory.getLogger(DetallePedidoResource.class);

    private static final String ENTITY_NAME = "detallePedido";

    private final DetallePedidoService detallePedidoService;

    public DetallePedidoResource(DetallePedidoService detallePedidoService) {
        this.detallePedidoService = detallePedidoService;
    }

    /**
     * POST  /detalle-pedidos : Create a new detallePedido.
     *
     * @param detallePedido the detallePedido to create
     * @return the ResponseEntity with status 201 (Created) and with body the new detallePedido, or with status 400 (Bad Request) if the detallePedido has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/detalle-pedidos")
    @Timed
    public ResponseEntity<DetallePedido> createDetallePedido(@Valid @RequestBody DetallePedido detallePedido) throws URISyntaxException {
        log.debug("REST request to save DetallePedido : {}", detallePedido);
        if (detallePedido.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new detallePedido cannot already have an ID")).body(null);
        }
        DetallePedido result = detallePedidoService.save(detallePedido);
        return ResponseEntity.created(new URI("/api/detalle-pedidos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /detalle-pedidos : Updates an existing detallePedido.
     *
     * @param detallePedido the detallePedido to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated detallePedido,
     * or with status 400 (Bad Request) if the detallePedido is not valid,
     * or with status 500 (Internal Server Error) if the detallePedido couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/detalle-pedidos")
    @Timed
    public ResponseEntity<DetallePedido> updateDetallePedido(@Valid @RequestBody DetallePedido detallePedido) throws URISyntaxException {
        log.debug("REST request to update DetallePedido : {}", detallePedido);
        if (detallePedido.getId() == null) {
            return createDetallePedido(detallePedido);
        }
        DetallePedido result = detallePedidoService.save(detallePedido);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, detallePedido.getId().toString()))
            .body(result);
    }

    /**
     * GET  /detalle-pedidos : get all the detallePedidos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of detallePedidos in body
     */
    @GetMapping("/detalle-pedidos")
    @Timed
    public List<DetallePedido> getAllDetallePedidos() {
        log.debug("REST request to get all DetallePedidos");
        return detallePedidoService.findAll();
        }

    /**
     * GET  /detalle-pedidos/:id : get the "id" detallePedido.
     *
     * @param id the id of the detallePedido to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the detallePedido, or with status 404 (Not Found)
     */
    @GetMapping("/detalle-pedidos/{id}")
    @Timed
    public ResponseEntity<DetallePedido> getDetallePedido(@PathVariable Long id) {
        log.debug("REST request to get DetallePedido : {}", id);
        DetallePedido detallePedido = detallePedidoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(detallePedido));
    }

    /**
     * DELETE  /detalle-pedidos/:id : delete the "id" detallePedido.
     *
     * @param id the id of the detallePedido to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/detalle-pedidos/{id}")
    @Timed
    public ResponseEntity<Void> deleteDetallePedido(@PathVariable Long id) {
        log.debug("REST request to delete DetallePedido : {}", id);
        detallePedidoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
