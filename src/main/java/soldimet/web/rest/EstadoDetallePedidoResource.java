package soldimet.web.rest;

import soldimet.domain.EstadoDetallePedido;
import soldimet.service.EstadoDetallePedidoService;
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
 * REST controller for managing {@link soldimet.domain.EstadoDetallePedido}.
 */
@RestController
@RequestMapping("/api")
public class EstadoDetallePedidoResource {

    private final Logger log = LoggerFactory.getLogger(EstadoDetallePedidoResource.class);

    private static final String ENTITY_NAME = "estadoDetallePedido";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstadoDetallePedidoService estadoDetallePedidoService;

    public EstadoDetallePedidoResource(EstadoDetallePedidoService estadoDetallePedidoService) {
        this.estadoDetallePedidoService = estadoDetallePedidoService;
    }

    /**
     * {@code POST  /estado-detalle-pedidos} : Create a new estadoDetallePedido.
     *
     * @param estadoDetallePedido the estadoDetallePedido to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estadoDetallePedido, or with status {@code 400 (Bad Request)} if the estadoDetallePedido has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estado-detalle-pedidos")
    public ResponseEntity<EstadoDetallePedido> createEstadoDetallePedido(@Valid @RequestBody EstadoDetallePedido estadoDetallePedido) throws URISyntaxException {
        log.debug("REST request to save EstadoDetallePedido : {}", estadoDetallePedido);
        if (estadoDetallePedido.getId() != null) {
            throw new BadRequestAlertException("A new estadoDetallePedido cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstadoDetallePedido result = estadoDetallePedidoService.save(estadoDetallePedido);
        return ResponseEntity.created(new URI("/api/estado-detalle-pedidos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estado-detalle-pedidos} : Updates an existing estadoDetallePedido.
     *
     * @param estadoDetallePedido the estadoDetallePedido to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoDetallePedido,
     * or with status {@code 400 (Bad Request)} if the estadoDetallePedido is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estadoDetallePedido couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estado-detalle-pedidos")
    public ResponseEntity<EstadoDetallePedido> updateEstadoDetallePedido(@Valid @RequestBody EstadoDetallePedido estadoDetallePedido) throws URISyntaxException {
        log.debug("REST request to update EstadoDetallePedido : {}", estadoDetallePedido);
        if (estadoDetallePedido.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EstadoDetallePedido result = estadoDetallePedidoService.save(estadoDetallePedido);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estadoDetallePedido.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /estado-detalle-pedidos} : get all the estadoDetallePedidos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estadoDetallePedidos in body.
     */
    @GetMapping("/estado-detalle-pedidos")
    public List<EstadoDetallePedido> getAllEstadoDetallePedidos() {
        log.debug("REST request to get all EstadoDetallePedidos");
        return estadoDetallePedidoService.findAll();
    }

    /**
     * {@code GET  /estado-detalle-pedidos/:id} : get the "id" estadoDetallePedido.
     *
     * @param id the id of the estadoDetallePedido to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estadoDetallePedido, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estado-detalle-pedidos/{id}")
    public ResponseEntity<EstadoDetallePedido> getEstadoDetallePedido(@PathVariable Long id) {
        log.debug("REST request to get EstadoDetallePedido : {}", id);
        Optional<EstadoDetallePedido> estadoDetallePedido = estadoDetallePedidoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(estadoDetallePedido);
    }

    /**
     * {@code DELETE  /estado-detalle-pedidos/:id} : delete the "id" estadoDetallePedido.
     *
     * @param id the id of the estadoDetallePedido to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estado-detalle-pedidos/{id}")
    public ResponseEntity<Void> deleteEstadoDetallePedido(@PathVariable Long id) {
        log.debug("REST request to delete EstadoDetallePedido : {}", id);
        estadoDetallePedidoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
