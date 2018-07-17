package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.MovimientoPedido;
import soldimet.service.MovimientoPedidoService;
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
 * REST controller for managing MovimientoPedido.
 */
@RestController
@RequestMapping("/api")
public class MovimientoPedidoResource {

    private final Logger log = LoggerFactory.getLogger(MovimientoPedidoResource.class);

    private static final String ENTITY_NAME = "movimientoPedido";

    private final MovimientoPedidoService movimientoPedidoService;

    public MovimientoPedidoResource(MovimientoPedidoService movimientoPedidoService) {
        this.movimientoPedidoService = movimientoPedidoService;
    }

    /**
     * POST  /movimiento-pedidos : Create a new movimientoPedido.
     *
     * @param movimientoPedido the movimientoPedido to create
     * @return the ResponseEntity with status 201 (Created) and with body the new movimientoPedido, or with status 400 (Bad Request) if the movimientoPedido has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/movimiento-pedidos")
    @Timed
    public ResponseEntity<MovimientoPedido> createMovimientoPedido(@Valid @RequestBody MovimientoPedido movimientoPedido) throws URISyntaxException {
        log.debug("REST request to save MovimientoPedido : {}", movimientoPedido);
        if (movimientoPedido.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new movimientoPedido cannot already have an ID")).body(null);
        }
        MovimientoPedido result = movimientoPedidoService.save(movimientoPedido);
        return ResponseEntity.created(new URI("/api/movimiento-pedidos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /movimiento-pedidos : Updates an existing movimientoPedido.
     *
     * @param movimientoPedido the movimientoPedido to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated movimientoPedido,
     * or with status 400 (Bad Request) if the movimientoPedido is not valid,
     * or with status 500 (Internal Server Error) if the movimientoPedido couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/movimiento-pedidos")
    @Timed
    public ResponseEntity<MovimientoPedido> updateMovimientoPedido(@Valid @RequestBody MovimientoPedido movimientoPedido) throws URISyntaxException {
        log.debug("REST request to update MovimientoPedido : {}", movimientoPedido);
        if (movimientoPedido.getId() == null) {
            return createMovimientoPedido(movimientoPedido);
        }
        MovimientoPedido result = movimientoPedidoService.save(movimientoPedido);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, movimientoPedido.getId().toString()))
            .body(result);
    }

    /**
     * GET  /movimiento-pedidos : get all the movimientoPedidos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of movimientoPedidos in body
     */
    @GetMapping("/movimiento-pedidos")
    @Timed
    public List<MovimientoPedido> getAllMovimientoPedidos() {
        log.debug("REST request to get all MovimientoPedidos");
        return movimientoPedidoService.findAll();
        }

    /**
     * GET  /movimiento-pedidos/:id : get the "id" movimientoPedido.
     *
     * @param id the id of the movimientoPedido to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the movimientoPedido, or with status 404 (Not Found)
     */
    @GetMapping("/movimiento-pedidos/{id}")
    @Timed
    public ResponseEntity<MovimientoPedido> getMovimientoPedido(@PathVariable Long id) {
        log.debug("REST request to get MovimientoPedido : {}", id);
        MovimientoPedido movimientoPedido = movimientoPedidoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(movimientoPedido));
    }

    /**
     * DELETE  /movimiento-pedidos/:id : delete the "id" movimientoPedido.
     *
     * @param id the id of the movimientoPedido to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/movimiento-pedidos/{id}")
    @Timed
    public ResponseEntity<Void> deleteMovimientoPedido(@PathVariable Long id) {
        log.debug("REST request to delete MovimientoPedido : {}", id);
        movimientoPedidoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
