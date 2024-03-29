package soldimet.web.rest;

import soldimet.domain.DetallePresupuesto;
import soldimet.service.DetallePresupuestoService;
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
 * REST controller for managing {@link soldimet.domain.DetallePresupuesto}.
 */
@RestController
@RequestMapping("/api")
public class DetallePresupuestoResource {

    private final Logger log = LoggerFactory.getLogger(DetallePresupuestoResource.class);

    private static final String ENTITY_NAME = "detallePresupuesto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DetallePresupuestoService detallePresupuestoService;

    public DetallePresupuestoResource(DetallePresupuestoService detallePresupuestoService) {
        this.detallePresupuestoService = detallePresupuestoService;
    }

    /**
     * {@code POST  /detalle-presupuestos} : Create a new detallePresupuesto.
     *
     * @param detallePresupuesto the detallePresupuesto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new detallePresupuesto, or with status {@code 400 (Bad Request)} if the detallePresupuesto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/detalle-presupuestos")
    public ResponseEntity<DetallePresupuesto> createDetallePresupuesto(@Valid @RequestBody DetallePresupuesto detallePresupuesto) throws URISyntaxException {
        log.debug("REST request to save DetallePresupuesto : {}", detallePresupuesto);
        if (detallePresupuesto.getId() != null) {
            throw new BadRequestAlertException("A new detallePresupuesto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DetallePresupuesto result = detallePresupuestoService.save(detallePresupuesto);
        return ResponseEntity.created(new URI("/api/detalle-presupuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /detalle-presupuestos} : Updates an existing detallePresupuesto.
     *
     * @param detallePresupuesto the detallePresupuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated detallePresupuesto,
     * or with status {@code 400 (Bad Request)} if the detallePresupuesto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the detallePresupuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/detalle-presupuestos")
    public ResponseEntity<DetallePresupuesto> updateDetallePresupuesto(@Valid @RequestBody DetallePresupuesto detallePresupuesto) throws URISyntaxException {
        log.debug("REST request to update DetallePresupuesto : {}", detallePresupuesto);
        if (detallePresupuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DetallePresupuesto result = detallePresupuestoService.save(detallePresupuesto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, detallePresupuesto.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /detalle-presupuestos} : get all the detallePresupuestos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of detallePresupuestos in body.
     */
    @GetMapping("/detalle-presupuestos")
    public List<DetallePresupuesto> getAllDetallePresupuestos() {
        log.debug("REST request to get all DetallePresupuestos");
        return detallePresupuestoService.findAll();
    }

    /**
     * {@code GET  /detalle-presupuestos/:id} : get the "id" detallePresupuesto.
     *
     * @param id the id of the detallePresupuesto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the detallePresupuesto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/detalle-presupuestos/{id}")
    public ResponseEntity<DetallePresupuesto> getDetallePresupuesto(@PathVariable Long id) {
        log.debug("REST request to get DetallePresupuesto : {}", id);
        Optional<DetallePresupuesto> detallePresupuesto = detallePresupuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(detallePresupuesto);
    }

    /**
     * {@code DELETE  /detalle-presupuestos/:id} : delete the "id" detallePresupuesto.
     *
     * @param id the id of the detallePresupuesto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/detalle-presupuestos/{id}")
    public ResponseEntity<Void> deleteDetallePresupuesto(@PathVariable Long id) {
        log.debug("REST request to delete DetallePresupuesto : {}", id);
        detallePresupuestoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
