package soldimet.web.rest;

import soldimet.domain.EstadoPresupuesto;
import soldimet.service.EstadoPresupuestoService;
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
 * REST controller for managing {@link soldimet.domain.EstadoPresupuesto}.
 */
@RestController
@RequestMapping("/api")
public class EstadoPresupuestoResource {

    private final Logger log = LoggerFactory.getLogger(EstadoPresupuestoResource.class);

    private static final String ENTITY_NAME = "estadoPresupuesto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstadoPresupuestoService estadoPresupuestoService;

    public EstadoPresupuestoResource(EstadoPresupuestoService estadoPresupuestoService) {
        this.estadoPresupuestoService = estadoPresupuestoService;
    }

    /**
     * {@code POST  /estado-presupuestos} : Create a new estadoPresupuesto.
     *
     * @param estadoPresupuesto the estadoPresupuesto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estadoPresupuesto, or with status {@code 400 (Bad Request)} if the estadoPresupuesto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estado-presupuestos")
    public ResponseEntity<EstadoPresupuesto> createEstadoPresupuesto(@Valid @RequestBody EstadoPresupuesto estadoPresupuesto) throws URISyntaxException {
        log.debug("REST request to save EstadoPresupuesto : {}", estadoPresupuesto);
        if (estadoPresupuesto.getId() != null) {
            throw new BadRequestAlertException("A new estadoPresupuesto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstadoPresupuesto result = estadoPresupuestoService.save(estadoPresupuesto);
        return ResponseEntity.created(new URI("/api/estado-presupuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estado-presupuestos} : Updates an existing estadoPresupuesto.
     *
     * @param estadoPresupuesto the estadoPresupuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoPresupuesto,
     * or with status {@code 400 (Bad Request)} if the estadoPresupuesto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estadoPresupuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estado-presupuestos")
    public ResponseEntity<EstadoPresupuesto> updateEstadoPresupuesto(@Valid @RequestBody EstadoPresupuesto estadoPresupuesto) throws URISyntaxException {
        log.debug("REST request to update EstadoPresupuesto : {}", estadoPresupuesto);
        if (estadoPresupuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EstadoPresupuesto result = estadoPresupuestoService.save(estadoPresupuesto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estadoPresupuesto.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /estado-presupuestos} : get all the estadoPresupuestos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estadoPresupuestos in body.
     */
    @GetMapping("/estado-presupuestos")
    public List<EstadoPresupuesto> getAllEstadoPresupuestos() {
        log.debug("REST request to get all EstadoPresupuestos");
        return estadoPresupuestoService.findAll();
    }

    /**
     * {@code GET  /estado-presupuestos/:id} : get the "id" estadoPresupuesto.
     *
     * @param id the id of the estadoPresupuesto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estadoPresupuesto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estado-presupuestos/{id}")
    public ResponseEntity<EstadoPresupuesto> getEstadoPresupuesto(@PathVariable Long id) {
        log.debug("REST request to get EstadoPresupuesto : {}", id);
        Optional<EstadoPresupuesto> estadoPresupuesto = estadoPresupuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(estadoPresupuesto);
    }

    /**
     * {@code DELETE  /estado-presupuestos/:id} : delete the "id" estadoPresupuesto.
     *
     * @param id the id of the estadoPresupuesto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estado-presupuestos/{id}")
    public ResponseEntity<Void> deleteEstadoPresupuesto(@PathVariable Long id) {
        log.debug("REST request to delete EstadoPresupuesto : {}", id);
        estadoPresupuestoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
