package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.DetallePresupuesto;
import soldimet.service.DetallePresupuestoService;
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
 * REST controller for managing DetallePresupuesto.
 */
@RestController
@RequestMapping("/api")
public class DetallePresupuestoResource {

    private final Logger log = LoggerFactory.getLogger(DetallePresupuestoResource.class);

    private static final String ENTITY_NAME = "detallePresupuesto";

    private final DetallePresupuestoService detallePresupuestoService;

    public DetallePresupuestoResource(DetallePresupuestoService detallePresupuestoService) {
        this.detallePresupuestoService = detallePresupuestoService;
    }

    /**
     * POST  /detalle-presupuestos : Create a new detallePresupuesto.
     *
     * @param detallePresupuesto the detallePresupuesto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new detallePresupuesto, or with status 400 (Bad Request) if the detallePresupuesto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/detalle-presupuestos")
    @Timed
    public ResponseEntity<DetallePresupuesto> createDetallePresupuesto(@Valid @RequestBody DetallePresupuesto detallePresupuesto) throws URISyntaxException {
        log.debug("REST request to save DetallePresupuesto : {}", detallePresupuesto);
        if (detallePresupuesto.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new detallePresupuesto cannot already have an ID")).body(null);
        }
        DetallePresupuesto result = detallePresupuestoService.save(detallePresupuesto);
        return ResponseEntity.created(new URI("/api/detalle-presupuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /detalle-presupuestos : Updates an existing detallePresupuesto.
     *
     * @param detallePresupuesto the detallePresupuesto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated detallePresupuesto,
     * or with status 400 (Bad Request) if the detallePresupuesto is not valid,
     * or with status 500 (Internal Server Error) if the detallePresupuesto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/detalle-presupuestos")
    @Timed
    public ResponseEntity<DetallePresupuesto> updateDetallePresupuesto(@Valid @RequestBody DetallePresupuesto detallePresupuesto) throws URISyntaxException {
        log.debug("REST request to update DetallePresupuesto : {}", detallePresupuesto);
        if (detallePresupuesto.getId() == null) {
            return createDetallePresupuesto(detallePresupuesto);
        }
        DetallePresupuesto result = detallePresupuestoService.save(detallePresupuesto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, detallePresupuesto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /detalle-presupuestos : get all the detallePresupuestos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of detallePresupuestos in body
     */
    @GetMapping("/detalle-presupuestos")
    @Timed
    public List<DetallePresupuesto> getAllDetallePresupuestos() {
        log.debug("REST request to get all DetallePresupuestos");
        return detallePresupuestoService.findAll();
        }

    /**
     * GET  /detalle-presupuestos/:id : get the "id" detallePresupuesto.
     *
     * @param id the id of the detallePresupuesto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the detallePresupuesto, or with status 404 (Not Found)
     */
    @GetMapping("/detalle-presupuestos/{id}")
    @Timed
    public ResponseEntity<DetallePresupuesto> getDetallePresupuesto(@PathVariable Long id) {
        log.debug("REST request to get DetallePresupuesto : {}", id);
        DetallePresupuesto detallePresupuesto = detallePresupuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(detallePresupuesto));
    }

    /**
     * DELETE  /detalle-presupuestos/:id : delete the "id" detallePresupuesto.
     *
     * @param id the id of the detallePresupuesto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/detalle-presupuestos/{id}")
    @Timed
    public ResponseEntity<Void> deleteDetallePresupuesto(@PathVariable Long id) {
        log.debug("REST request to delete DetallePresupuesto : {}", id);
        detallePresupuestoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
