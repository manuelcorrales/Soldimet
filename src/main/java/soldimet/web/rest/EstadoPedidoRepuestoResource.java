package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.EstadoPedidoRepuesto;
import soldimet.service.EstadoPedidoRepuestoService;
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
 * REST controller for managing EstadoPedidoRepuesto.
 */
@RestController
@RequestMapping("/api")
public class EstadoPedidoRepuestoResource {

    private final Logger log = LoggerFactory.getLogger(EstadoPedidoRepuestoResource.class);

    private static final String ENTITY_NAME = "estadoPedidoRepuesto";

    private final EstadoPedidoRepuestoService estadoPedidoRepuestoService;

    public EstadoPedidoRepuestoResource(EstadoPedidoRepuestoService estadoPedidoRepuestoService) {
        this.estadoPedidoRepuestoService = estadoPedidoRepuestoService;
    }

    /**
     * POST  /estado-pedido-repuestos : Create a new estadoPedidoRepuesto.
     *
     * @param estadoPedidoRepuesto the estadoPedidoRepuesto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new estadoPedidoRepuesto, or with status 400 (Bad Request) if the estadoPedidoRepuesto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/estado-pedido-repuestos")
    @Timed
    public ResponseEntity<EstadoPedidoRepuesto> createEstadoPedidoRepuesto(@Valid @RequestBody EstadoPedidoRepuesto estadoPedidoRepuesto) throws URISyntaxException {
        log.debug("REST request to save EstadoPedidoRepuesto : {}", estadoPedidoRepuesto);
        if (estadoPedidoRepuesto.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new estadoPedidoRepuesto cannot already have an ID")).body(null);
        }
        EstadoPedidoRepuesto result = estadoPedidoRepuestoService.save(estadoPedidoRepuesto);
        return ResponseEntity.created(new URI("/api/estado-pedido-repuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /estado-pedido-repuestos : Updates an existing estadoPedidoRepuesto.
     *
     * @param estadoPedidoRepuesto the estadoPedidoRepuesto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated estadoPedidoRepuesto,
     * or with status 400 (Bad Request) if the estadoPedidoRepuesto is not valid,
     * or with status 500 (Internal Server Error) if the estadoPedidoRepuesto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/estado-pedido-repuestos")
    @Timed
    public ResponseEntity<EstadoPedidoRepuesto> updateEstadoPedidoRepuesto(@Valid @RequestBody EstadoPedidoRepuesto estadoPedidoRepuesto) throws URISyntaxException {
        log.debug("REST request to update EstadoPedidoRepuesto : {}", estadoPedidoRepuesto);
        if (estadoPedidoRepuesto.getId() == null) {
            return createEstadoPedidoRepuesto(estadoPedidoRepuesto);
        }
        EstadoPedidoRepuesto result = estadoPedidoRepuestoService.save(estadoPedidoRepuesto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, estadoPedidoRepuesto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /estado-pedido-repuestos : get all the estadoPedidoRepuestos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of estadoPedidoRepuestos in body
     */
    @GetMapping("/estado-pedido-repuestos")
    @Timed
    public List<EstadoPedidoRepuesto> getAllEstadoPedidoRepuestos() {
        log.debug("REST request to get all EstadoPedidoRepuestos");
        return estadoPedidoRepuestoService.findAll();
        }

    /**
     * GET  /estado-pedido-repuestos/:id : get the "id" estadoPedidoRepuesto.
     *
     * @param id the id of the estadoPedidoRepuesto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the estadoPedidoRepuesto, or with status 404 (Not Found)
     */
    @GetMapping("/estado-pedido-repuestos/{id}")
    @Timed
    public ResponseEntity<EstadoPedidoRepuesto> getEstadoPedidoRepuesto(@PathVariable Long id) {
        log.debug("REST request to get EstadoPedidoRepuesto : {}", id);
        EstadoPedidoRepuesto estadoPedidoRepuesto = estadoPedidoRepuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(estadoPedidoRepuesto));
    }

    /**
     * DELETE  /estado-pedido-repuestos/:id : delete the "id" estadoPedidoRepuesto.
     *
     * @param id the id of the estadoPedidoRepuesto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/estado-pedido-repuestos/{id}")
    @Timed
    public ResponseEntity<Void> deleteEstadoPedidoRepuesto(@PathVariable Long id) {
        log.debug("REST request to delete EstadoPedidoRepuesto : {}", id);
        estadoPedidoRepuestoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
