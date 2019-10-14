package soldimet.web.rest;

import soldimet.domain.TipoRepuesto;
import soldimet.service.TipoRepuestoService;
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
 * REST controller for managing {@link soldimet.domain.TipoRepuesto}.
 */
@RestController
@RequestMapping("/api")
public class TipoRepuestoResource {

    private final Logger log = LoggerFactory.getLogger(TipoRepuestoResource.class);

    private static final String ENTITY_NAME = "tipoRepuesto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoRepuestoService tipoRepuestoService;

    public TipoRepuestoResource(TipoRepuestoService tipoRepuestoService) {
        this.tipoRepuestoService = tipoRepuestoService;
    }

    /**
     * {@code POST  /tipo-repuestos} : Create a new tipoRepuesto.
     *
     * @param tipoRepuesto the tipoRepuesto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoRepuesto, or with status {@code 400 (Bad Request)} if the tipoRepuesto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-repuestos")
    public ResponseEntity<TipoRepuesto> createTipoRepuesto(@Valid @RequestBody TipoRepuesto tipoRepuesto) throws URISyntaxException {
        log.debug("REST request to save TipoRepuesto : {}", tipoRepuesto);
        if (tipoRepuesto.getId() != null) {
            throw new BadRequestAlertException("A new tipoRepuesto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoRepuesto result = tipoRepuestoService.save(tipoRepuesto);
        return ResponseEntity.created(new URI("/api/tipo-repuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-repuestos} : Updates an existing tipoRepuesto.
     *
     * @param tipoRepuesto the tipoRepuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoRepuesto,
     * or with status {@code 400 (Bad Request)} if the tipoRepuesto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoRepuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-repuestos")
    public ResponseEntity<TipoRepuesto> updateTipoRepuesto(@Valid @RequestBody TipoRepuesto tipoRepuesto) throws URISyntaxException {
        log.debug("REST request to update TipoRepuesto : {}", tipoRepuesto);
        if (tipoRepuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoRepuesto result = tipoRepuestoService.save(tipoRepuesto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoRepuesto.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-repuestos} : get all the tipoRepuestos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoRepuestos in body.
     */
    @GetMapping("/tipo-repuestos")
    public List<TipoRepuesto> getAllTipoRepuestos() {
        log.debug("REST request to get all TipoRepuestos");
        return tipoRepuestoService.findAll();
    }

    /**
     * {@code GET  /tipo-repuestos/:id} : get the "id" tipoRepuesto.
     *
     * @param id the id of the tipoRepuesto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoRepuesto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-repuestos/{id}")
    public ResponseEntity<TipoRepuesto> getTipoRepuesto(@PathVariable Long id) {
        log.debug("REST request to get TipoRepuesto : {}", id);
        Optional<TipoRepuesto> tipoRepuesto = tipoRepuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoRepuesto);
    }

    /**
     * {@code DELETE  /tipo-repuestos/:id} : delete the "id" tipoRepuesto.
     *
     * @param id the id of the tipoRepuesto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-repuestos/{id}")
    public ResponseEntity<Void> deleteTipoRepuesto(@PathVariable Long id) {
        log.debug("REST request to delete TipoRepuesto : {}", id);
        tipoRepuestoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
