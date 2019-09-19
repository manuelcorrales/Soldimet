package soldimet.web.rest;

import soldimet.domain.MovimientoPedido;
import soldimet.service.MovimientoPedidoService;
import soldimet.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link soldimet.domain.MovimientoPedido}.
 */
@RestController
@RequestMapping("/api")
public class MovimientoPedidoResource {

    private final Logger log = LoggerFactory.getLogger(MovimientoPedidoResource.class);

    private static final String ENTITY_NAME = "movimientoPedido";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MovimientoPedidoService movimientoPedidoService;

    public MovimientoPedidoResource(MovimientoPedidoService movimientoPedidoService) {
        this.movimientoPedidoService = movimientoPedidoService;
    }

    /**
     * {@code POST  /movimiento-pedidos} : Create a new movimientoPedido.
     *
     * @param movimientoPedido the movimientoPedido to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new movimientoPedido, or with status {@code 400 (Bad Request)} if the movimientoPedido has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/movimiento-pedidos")
    public ResponseEntity<MovimientoPedido> createMovimientoPedido(@Valid @RequestBody MovimientoPedido movimientoPedido) throws URISyntaxException {
        log.debug("REST request to save MovimientoPedido : {}", movimientoPedido);
        if (movimientoPedido.getId() != null) {
            throw new BadRequestAlertException("A new movimientoPedido cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MovimientoPedido result = movimientoPedidoService.save(movimientoPedido);
        return ResponseEntity.created(new URI("/api/movimiento-pedidos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /movimiento-pedidos} : Updates an existing movimientoPedido.
     *
     * @param movimientoPedido the movimientoPedido to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated movimientoPedido,
     * or with status {@code 400 (Bad Request)} if the movimientoPedido is not valid,
     * or with status {@code 500 (Internal Server Error)} if the movimientoPedido couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/movimiento-pedidos")
    public ResponseEntity<MovimientoPedido> updateMovimientoPedido(@Valid @RequestBody MovimientoPedido movimientoPedido) throws URISyntaxException {
        log.debug("REST request to update MovimientoPedido : {}", movimientoPedido);
        if (movimientoPedido.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MovimientoPedido result = movimientoPedidoService.save(movimientoPedido);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, movimientoPedido.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /movimiento-pedidos} : get all the movimientoPedidos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of movimientoPedidos in body.
     */
    @GetMapping("/movimiento-pedidos")
    public List<MovimientoPedido> getAllMovimientoPedidos() {
        log.debug("REST request to get all MovimientoPedidos");
        return movimientoPedidoService.findAll();
    }

    /**
     * {@code GET  /movimiento-pedidos/:id} : get the "id" movimientoPedido.
     *
     * @param id the id of the movimientoPedido to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the movimientoPedido, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/movimiento-pedidos/{id}")
    public ResponseEntity<MovimientoPedido> getMovimientoPedido(@PathVariable Long id) {
        log.debug("REST request to get MovimientoPedido : {}", id);
        Optional<MovimientoPedido> movimientoPedido = movimientoPedidoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(movimientoPedido);
    }

    /**
     * {@code DELETE  /movimiento-pedidos/:id} : delete the "id" movimientoPedido.
     *
     * @param id the id of the movimientoPedido to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/movimiento-pedidos/{id}")
    public ResponseEntity<Void> deleteMovimientoPedido(@PathVariable Long id) {
        log.debug("REST request to delete MovimientoPedido : {}", id);
        movimientoPedidoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
