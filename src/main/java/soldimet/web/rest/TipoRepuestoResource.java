package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.TipoRepuesto;
import soldimet.service.TipoRepuestoService;
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
 * REST controller for managing TipoRepuesto.
 */
@RestController
@RequestMapping("/api")
public class TipoRepuestoResource {

    private final Logger log = LoggerFactory.getLogger(TipoRepuestoResource.class);

    private static final String ENTITY_NAME = "tipoRepuesto";

    private final TipoRepuestoService tipoRepuestoService;

    public TipoRepuestoResource(TipoRepuestoService tipoRepuestoService) {
        this.tipoRepuestoService = tipoRepuestoService;
    }

    /**
     * POST  /tipo-repuestos : Create a new tipoRepuesto.
     *
     * @param tipoRepuesto the tipoRepuesto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tipoRepuesto, or with status 400 (Bad Request) if the tipoRepuesto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipo-repuestos")
    @Timed
    public ResponseEntity<TipoRepuesto> createTipoRepuesto(@Valid @RequestBody TipoRepuesto tipoRepuesto) throws URISyntaxException {
        log.debug("REST request to save TipoRepuesto : {}", tipoRepuesto);
        if (tipoRepuesto.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new tipoRepuesto cannot already have an ID")).body(null);
        }
        TipoRepuesto result = tipoRepuestoService.save(tipoRepuesto);
        return ResponseEntity.created(new URI("/api/tipo-repuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipo-repuestos : Updates an existing tipoRepuesto.
     *
     * @param tipoRepuesto the tipoRepuesto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tipoRepuesto,
     * or with status 400 (Bad Request) if the tipoRepuesto is not valid,
     * or with status 500 (Internal Server Error) if the tipoRepuesto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipo-repuestos")
    @Timed
    public ResponseEntity<TipoRepuesto> updateTipoRepuesto(@Valid @RequestBody TipoRepuesto tipoRepuesto) throws URISyntaxException {
        log.debug("REST request to update TipoRepuesto : {}", tipoRepuesto);
        if (tipoRepuesto.getId() == null) {
            return createTipoRepuesto(tipoRepuesto);
        }
        TipoRepuesto result = tipoRepuestoService.save(tipoRepuesto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tipoRepuesto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tipo-repuestos : get all the tipoRepuestos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tipoRepuestos in body
     */
    @GetMapping("/tipo-repuestos")
    @Timed
    public List<TipoRepuesto> getAllTipoRepuestos() {
        log.debug("REST request to get all TipoRepuestos");
        return tipoRepuestoService.findAll();
        }

    /**
     * GET  /tipo-repuestos/:id : get the "id" tipoRepuesto.
     *
     * @param id the id of the tipoRepuesto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tipoRepuesto, or with status 404 (Not Found)
     */
    @GetMapping("/tipo-repuestos/{id}")
    @Timed
    public ResponseEntity<TipoRepuesto> getTipoRepuesto(@PathVariable Long id) {
        log.debug("REST request to get TipoRepuesto : {}", id);
        TipoRepuesto tipoRepuesto = tipoRepuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tipoRepuesto));
    }

    /**
     * DELETE  /tipo-repuestos/:id : delete the "id" tipoRepuesto.
     *
     * @param id the id of the tipoRepuesto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipo-repuestos/{id}")
    @Timed
    public ResponseEntity<Void> deleteTipoRepuesto(@PathVariable Long id) {
        log.debug("REST request to delete TipoRepuesto : {}", id);
        tipoRepuestoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
