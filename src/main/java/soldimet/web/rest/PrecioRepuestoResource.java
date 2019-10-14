package soldimet.web.rest;

import soldimet.domain.PrecioRepuesto;
import soldimet.service.PrecioRepuestoService;
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
 * REST controller for managing {@link soldimet.domain.PrecioRepuesto}.
 */
@RestController
@RequestMapping("/api")
public class PrecioRepuestoResource {

    private final Logger log = LoggerFactory.getLogger(PrecioRepuestoResource.class);

    private static final String ENTITY_NAME = "precioRepuesto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PrecioRepuestoService precioRepuestoService;

    public PrecioRepuestoResource(PrecioRepuestoService precioRepuestoService) {
        this.precioRepuestoService = precioRepuestoService;
    }

    /**
     * {@code POST  /precio-repuestos} : Create a new precioRepuesto.
     *
     * @param precioRepuesto the precioRepuesto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new precioRepuesto, or with status {@code 400 (Bad Request)} if the precioRepuesto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/precio-repuestos")
    public ResponseEntity<PrecioRepuesto> createPrecioRepuesto(@Valid @RequestBody PrecioRepuesto precioRepuesto) throws URISyntaxException {
        log.debug("REST request to save PrecioRepuesto : {}", precioRepuesto);
        if (precioRepuesto.getId() != null) {
            throw new BadRequestAlertException("A new precioRepuesto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PrecioRepuesto result = precioRepuestoService.save(precioRepuesto);
        return ResponseEntity.created(new URI("/api/precio-repuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /precio-repuestos} : Updates an existing precioRepuesto.
     *
     * @param precioRepuesto the precioRepuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated precioRepuesto,
     * or with status {@code 400 (Bad Request)} if the precioRepuesto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the precioRepuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/precio-repuestos")
    public ResponseEntity<PrecioRepuesto> updatePrecioRepuesto(@Valid @RequestBody PrecioRepuesto precioRepuesto) throws URISyntaxException {
        log.debug("REST request to update PrecioRepuesto : {}", precioRepuesto);
        if (precioRepuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PrecioRepuesto result = precioRepuestoService.save(precioRepuesto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, precioRepuesto.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /precio-repuestos} : get all the precioRepuestos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of precioRepuestos in body.
     */
    @GetMapping("/precio-repuestos")
    public List<PrecioRepuesto> getAllPrecioRepuestos() {
        log.debug("REST request to get all PrecioRepuestos");
        return precioRepuestoService.findAll();
    }

    /**
     * {@code GET  /precio-repuestos/:id} : get the "id" precioRepuesto.
     *
     * @param id the id of the precioRepuesto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the precioRepuesto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/precio-repuestos/{id}")
    public ResponseEntity<PrecioRepuesto> getPrecioRepuesto(@PathVariable Long id) {
        log.debug("REST request to get PrecioRepuesto : {}", id);
        Optional<PrecioRepuesto> precioRepuesto = precioRepuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(precioRepuesto);
    }

    /**
     * {@code DELETE  /precio-repuestos/:id} : delete the "id" precioRepuesto.
     *
     * @param id the id of the precioRepuesto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/precio-repuestos/{id}")
    public ResponseEntity<Void> deletePrecioRepuesto(@PathVariable Long id) {
        log.debug("REST request to delete PrecioRepuesto : {}", id);
        precioRepuestoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
