package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.EstadoPresupuesto;
import soldimet.service.EstadoPresupuestoService;
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
 * REST controller for managing EstadoPresupuesto.
 */
@RestController
@RequestMapping("/api")
public class EstadoPresupuestoResource {

    private final Logger log = LoggerFactory.getLogger(EstadoPresupuestoResource.class);

    private static final String ENTITY_NAME = "estadoPresupuesto";

    private final EstadoPresupuestoService estadoPresupuestoService;

    public EstadoPresupuestoResource(EstadoPresupuestoService estadoPresupuestoService) {
        this.estadoPresupuestoService = estadoPresupuestoService;
    }

    /**
     * POST  /estado-presupuestos : Create a new estadoPresupuesto.
     *
     * @param estadoPresupuesto the estadoPresupuesto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new estadoPresupuesto, or with status 400 (Bad Request) if the estadoPresupuesto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/estado-presupuestos")
    @Timed
    public ResponseEntity<EstadoPresupuesto> createEstadoPresupuesto(@Valid @RequestBody EstadoPresupuesto estadoPresupuesto) throws URISyntaxException {
        log.debug("REST request to save EstadoPresupuesto : {}", estadoPresupuesto);
        if (estadoPresupuesto.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new estadoPresupuesto cannot already have an ID")).body(null);
        }
        EstadoPresupuesto result = estadoPresupuestoService.save(estadoPresupuesto);
        return ResponseEntity.created(new URI("/api/estado-presupuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /estado-presupuestos : Updates an existing estadoPresupuesto.
     *
     * @param estadoPresupuesto the estadoPresupuesto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated estadoPresupuesto,
     * or with status 400 (Bad Request) if the estadoPresupuesto is not valid,
     * or with status 500 (Internal Server Error) if the estadoPresupuesto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/estado-presupuestos")
    @Timed
    public ResponseEntity<EstadoPresupuesto> updateEstadoPresupuesto(@Valid @RequestBody EstadoPresupuesto estadoPresupuesto) throws URISyntaxException {
        log.debug("REST request to update EstadoPresupuesto : {}", estadoPresupuesto);
        if (estadoPresupuesto.getId() == null) {
            return createEstadoPresupuesto(estadoPresupuesto);
        }
        EstadoPresupuesto result = estadoPresupuestoService.save(estadoPresupuesto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, estadoPresupuesto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /estado-presupuestos : get all the estadoPresupuestos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of estadoPresupuestos in body
     */
    @GetMapping("/estado-presupuestos")
    @Timed
    public List<EstadoPresupuesto> getAllEstadoPresupuestos() {
        log.debug("REST request to get all EstadoPresupuestos");
        return estadoPresupuestoService.findAll();
        }

    /**
     * GET  /estado-presupuestos/:id : get the "id" estadoPresupuesto.
     *
     * @param id the id of the estadoPresupuesto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the estadoPresupuesto, or with status 404 (Not Found)
     */
    @GetMapping("/estado-presupuestos/{id}")
    @Timed
    public ResponseEntity<EstadoPresupuesto> getEstadoPresupuesto(@PathVariable Long id) {
        log.debug("REST request to get EstadoPresupuesto : {}", id);
        EstadoPresupuesto estadoPresupuesto = estadoPresupuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(estadoPresupuesto));
    }

    /**
     * DELETE  /estado-presupuestos/:id : delete the "id" estadoPresupuesto.
     *
     * @param id the id of the estadoPresupuesto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/estado-presupuestos/{id}")
    @Timed
    public ResponseEntity<Void> deleteEstadoPresupuesto(@PathVariable Long id) {
        log.debug("REST request to delete EstadoPresupuesto : {}", id);
        estadoPresupuestoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
