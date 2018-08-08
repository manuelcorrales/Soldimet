package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.TipoParteMotor;
import soldimet.service.TipoParteMotorService;
import soldimet.web.rest.errors.BadRequestAlertException;
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
 * REST controller for managing TipoParteMotor.
 */
@RestController
@RequestMapping("/api")
public class TipoParteMotorResource {

    private final Logger log = LoggerFactory.getLogger(TipoParteMotorResource.class);

    private static final String ENTITY_NAME = "tipoParteMotor";

    private final TipoParteMotorService tipoParteMotorService;

    public TipoParteMotorResource(TipoParteMotorService tipoParteMotorService) {
        this.tipoParteMotorService = tipoParteMotorService;
    }

    /**
     * POST  /tipo-parte-motors : Create a new tipoParteMotor.
     *
     * @param tipoParteMotor the tipoParteMotor to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tipoParteMotor, or with status 400 (Bad Request) if the tipoParteMotor has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipo-parte-motors")
    @Timed
    public ResponseEntity<TipoParteMotor> createTipoParteMotor(@Valid @RequestBody TipoParteMotor tipoParteMotor) throws URISyntaxException {
        log.debug("REST request to save TipoParteMotor : {}", tipoParteMotor);
        if (tipoParteMotor.getId() != null) {
            throw new BadRequestAlertException("A new tipoParteMotor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoParteMotor result = tipoParteMotorService.save(tipoParteMotor);
        return ResponseEntity.created(new URI("/api/tipo-parte-motors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipo-parte-motors : Updates an existing tipoParteMotor.
     *
     * @param tipoParteMotor the tipoParteMotor to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tipoParteMotor,
     * or with status 400 (Bad Request) if the tipoParteMotor is not valid,
     * or with status 500 (Internal Server Error) if the tipoParteMotor couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipo-parte-motors")
    @Timed
    public ResponseEntity<TipoParteMotor> updateTipoParteMotor(@Valid @RequestBody TipoParteMotor tipoParteMotor) throws URISyntaxException {
        log.debug("REST request to update TipoParteMotor : {}", tipoParteMotor);
        if (tipoParteMotor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoParteMotor result = tipoParteMotorService.save(tipoParteMotor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tipoParteMotor.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tipo-parte-motors : get all the tipoParteMotors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tipoParteMotors in body
     */
    @GetMapping("/tipo-parte-motors")
    @Timed
    public List<TipoParteMotor> getAllTipoParteMotors() {
        log.debug("REST request to get all TipoParteMotors");
        return tipoParteMotorService.findAll();
    }

    /**
     * GET  /tipo-parte-motors/:id : get the "id" tipoParteMotor.
     *
     * @param id the id of the tipoParteMotor to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tipoParteMotor, or with status 404 (Not Found)
     */
    @GetMapping("/tipo-parte-motors/{id}")
    @Timed
    public ResponseEntity<TipoParteMotor> getTipoParteMotor(@PathVariable Long id) {
        log.debug("REST request to get TipoParteMotor : {}", id);
        Optional<TipoParteMotor> tipoParteMotor = tipoParteMotorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoParteMotor);
    }

    /**
     * DELETE  /tipo-parte-motors/:id : delete the "id" tipoParteMotor.
     *
     * @param id the id of the tipoParteMotor to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipo-parte-motors/{id}")
    @Timed
    public ResponseEntity<Void> deleteTipoParteMotor(@PathVariable Long id) {
        log.debug("REST request to delete TipoParteMotor : {}", id);
        tipoParteMotorService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
