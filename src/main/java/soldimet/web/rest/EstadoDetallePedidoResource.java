package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.EstadoDetallePedido;
import soldimet.service.EstadoDetallePedidoService;
import soldimet.web.rest.errors.BadRequestAlertException;
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
 * REST controller for managing EstadoDetallePedido.
 */
@RestController
@RequestMapping("/api")
public class EstadoDetallePedidoResource {

    private final Logger log = LoggerFactory.getLogger(EstadoDetallePedidoResource.class);

    private static final String ENTITY_NAME = "estadoDetallePedido";

    private final EstadoDetallePedidoService estadoDetallePedidoService;

    public EstadoDetallePedidoResource(EstadoDetallePedidoService estadoDetallePedidoService) {
        this.estadoDetallePedidoService = estadoDetallePedidoService;
    }

    /**
     * POST  /estado-detalle-pedidos : Create a new estadoDetallePedido.
     *
     * @param estadoDetallePedido the estadoDetallePedido to create
     * @return the ResponseEntity with status 201 (Created) and with body the new estadoDetallePedido, or with status 400 (Bad Request) if the estadoDetallePedido has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/estado-detalle-pedidos")
    @Timed
    public ResponseEntity<EstadoDetallePedido> createEstadoDetallePedido(@Valid @RequestBody EstadoDetallePedido estadoDetallePedido) throws URISyntaxException {
        log.debug("REST request to save EstadoDetallePedido : {}", estadoDetallePedido);
        if (estadoDetallePedido.getId() != null) {
            throw new BadRequestAlertException("A new estadoDetallePedido cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstadoDetallePedido result = estadoDetallePedidoService.save(estadoDetallePedido);
        return ResponseEntity.created(new URI("/api/estado-detalle-pedidos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /estado-detalle-pedidos : Updates an existing estadoDetallePedido.
     *
     * @param estadoDetallePedido the estadoDetallePedido to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated estadoDetallePedido,
     * or with status 400 (Bad Request) if the estadoDetallePedido is not valid,
     * or with status 500 (Internal Server Error) if the estadoDetallePedido couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/estado-detalle-pedidos")
    @Timed
    public ResponseEntity<EstadoDetallePedido> updateEstadoDetallePedido(@Valid @RequestBody EstadoDetallePedido estadoDetallePedido) throws URISyntaxException {
        log.debug("REST request to update EstadoDetallePedido : {}", estadoDetallePedido);
        if (estadoDetallePedido.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EstadoDetallePedido result = estadoDetallePedidoService.save(estadoDetallePedido);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, estadoDetallePedido.getId().toString()))
            .body(result);
    }

    /**
     * GET  /estado-detalle-pedidos : get all the estadoDetallePedidos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of estadoDetallePedidos in body
     */
    @GetMapping("/estado-detalle-pedidos")
    @Timed
    public List<EstadoDetallePedido> getAllEstadoDetallePedidos() {
        log.debug("REST request to get all EstadoDetallePedidos");
        return estadoDetallePedidoService.findAll();
    }

    /**
     * GET  /estado-detalle-pedidos/:id : get the "id" estadoDetallePedido.
     *
     * @param id the id of the estadoDetallePedido to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the estadoDetallePedido, or with status 404 (Not Found)
     */
    @GetMapping("/estado-detalle-pedidos/{id}")
    @Timed
    public ResponseEntity<EstadoDetallePedido> getEstadoDetallePedido(@PathVariable Long id) {
        log.debug("REST request to get EstadoDetallePedido : {}", id);
        Optional<EstadoDetallePedido> estadoDetallePedido = estadoDetallePedidoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(estadoDetallePedido);
    }

    /**
     * DELETE  /estado-detalle-pedidos/:id : delete the "id" estadoDetallePedido.
     *
     * @param id the id of the estadoDetallePedido to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/estado-detalle-pedidos/{id}")
    @Timed
    public ResponseEntity<Void> deleteEstadoDetallePedido(@PathVariable Long id) {
        log.debug("REST request to delete EstadoDetallePedido : {}", id);
        estadoDetallePedidoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
