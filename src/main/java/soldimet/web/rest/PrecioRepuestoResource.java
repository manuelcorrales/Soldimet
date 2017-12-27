package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.PrecioRepuesto;
import soldimet.service.PrecioRepuestoService;
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
 * REST controller for managing PrecioRepuesto.
 */
@RestController
@RequestMapping("/api")
public class PrecioRepuestoResource {

    private final Logger log = LoggerFactory.getLogger(PrecioRepuestoResource.class);

    private static final String ENTITY_NAME = "precioRepuesto";

    private final PrecioRepuestoService precioRepuestoService;

    public PrecioRepuestoResource(PrecioRepuestoService precioRepuestoService) {
        this.precioRepuestoService = precioRepuestoService;
    }

    /**
     * POST  /precio-repuestos : Create a new precioRepuesto.
     *
     * @param precioRepuesto the precioRepuesto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new precioRepuesto, or with status 400 (Bad Request) if the precioRepuesto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/precio-repuestos")
    @Timed
    public ResponseEntity<PrecioRepuesto> createPrecioRepuesto(@Valid @RequestBody PrecioRepuesto precioRepuesto) throws URISyntaxException {
        log.debug("REST request to save PrecioRepuesto : {}", precioRepuesto);
        if (precioRepuesto.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new precioRepuesto cannot already have an ID")).body(null);
        }
        PrecioRepuesto result = precioRepuestoService.save(precioRepuesto);
        return ResponseEntity.created(new URI("/api/precio-repuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /precio-repuestos : Updates an existing precioRepuesto.
     *
     * @param precioRepuesto the precioRepuesto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated precioRepuesto,
     * or with status 400 (Bad Request) if the precioRepuesto is not valid,
     * or with status 500 (Internal Server Error) if the precioRepuesto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/precio-repuestos")
    @Timed
    public ResponseEntity<PrecioRepuesto> updatePrecioRepuesto(@Valid @RequestBody PrecioRepuesto precioRepuesto) throws URISyntaxException {
        log.debug("REST request to update PrecioRepuesto : {}", precioRepuesto);
        if (precioRepuesto.getId() == null) {
            return createPrecioRepuesto(precioRepuesto);
        }
        PrecioRepuesto result = precioRepuestoService.save(precioRepuesto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, precioRepuesto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /precio-repuestos : get all the precioRepuestos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of precioRepuestos in body
     */
    @GetMapping("/precio-repuestos")
    @Timed
    public List<PrecioRepuesto> getAllPrecioRepuestos() {
        log.debug("REST request to get all PrecioRepuestos");
        return precioRepuestoService.findAll();
        }

    /**
     * GET  /precio-repuestos/:id : get the "id" precioRepuesto.
     *
     * @param id the id of the precioRepuesto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the precioRepuesto, or with status 404 (Not Found)
     */
    @GetMapping("/precio-repuestos/{id}")
    @Timed
    public ResponseEntity<PrecioRepuesto> getPrecioRepuesto(@PathVariable Long id) {
        log.debug("REST request to get PrecioRepuesto : {}", id);
        PrecioRepuesto precioRepuesto = precioRepuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(precioRepuesto));
    }

    /**
     * DELETE  /precio-repuestos/:id : delete the "id" precioRepuesto.
     *
     * @param id the id of the precioRepuesto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/precio-repuestos/{id}")
    @Timed
    public ResponseEntity<Void> deletePrecioRepuesto(@PathVariable Long id) {
        log.debug("REST request to delete PrecioRepuesto : {}", id);
        precioRepuestoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
