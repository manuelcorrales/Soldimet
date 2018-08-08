package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.PagoEfectivo;
import soldimet.service.PagoEfectivoService;
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
 * REST controller for managing PagoEfectivo.
 */
@RestController
@RequestMapping("/api")
public class PagoEfectivoResource {

    private final Logger log = LoggerFactory.getLogger(PagoEfectivoResource.class);

    private static final String ENTITY_NAME = "pagoEfectivo";

    private final PagoEfectivoService pagoEfectivoService;

    public PagoEfectivoResource(PagoEfectivoService pagoEfectivoService) {
        this.pagoEfectivoService = pagoEfectivoService;
    }

    /**
     * POST  /pago-efectivos : Create a new pagoEfectivo.
     *
     * @param pagoEfectivo the pagoEfectivo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pagoEfectivo, or with status 400 (Bad Request) if the pagoEfectivo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pago-efectivos")
    @Timed
    public ResponseEntity<PagoEfectivo> createPagoEfectivo(@Valid @RequestBody PagoEfectivo pagoEfectivo) throws URISyntaxException {
        log.debug("REST request to save PagoEfectivo : {}", pagoEfectivo);
        if (pagoEfectivo.getId() != null) {
            throw new BadRequestAlertException("A new pagoEfectivo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PagoEfectivo result = pagoEfectivoService.save(pagoEfectivo);
        return ResponseEntity.created(new URI("/api/pago-efectivos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pago-efectivos : Updates an existing pagoEfectivo.
     *
     * @param pagoEfectivo the pagoEfectivo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pagoEfectivo,
     * or with status 400 (Bad Request) if the pagoEfectivo is not valid,
     * or with status 500 (Internal Server Error) if the pagoEfectivo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pago-efectivos")
    @Timed
    public ResponseEntity<PagoEfectivo> updatePagoEfectivo(@Valid @RequestBody PagoEfectivo pagoEfectivo) throws URISyntaxException {
        log.debug("REST request to update PagoEfectivo : {}", pagoEfectivo);
        if (pagoEfectivo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PagoEfectivo result = pagoEfectivoService.save(pagoEfectivo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pagoEfectivo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pago-efectivos : get all the pagoEfectivos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of pagoEfectivos in body
     */
    @GetMapping("/pago-efectivos")
    @Timed
    public List<PagoEfectivo> getAllPagoEfectivos() {
        log.debug("REST request to get all PagoEfectivos");
        return pagoEfectivoService.findAll();
    }

    /**
     * GET  /pago-efectivos/:id : get the "id" pagoEfectivo.
     *
     * @param id the id of the pagoEfectivo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pagoEfectivo, or with status 404 (Not Found)
     */
    @GetMapping("/pago-efectivos/{id}")
    @Timed
    public ResponseEntity<PagoEfectivo> getPagoEfectivo(@PathVariable Long id) {
        log.debug("REST request to get PagoEfectivo : {}", id);
        Optional<PagoEfectivo> pagoEfectivo = pagoEfectivoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(pagoEfectivo);
    }

    /**
     * DELETE  /pago-efectivos/:id : delete the "id" pagoEfectivo.
     *
     * @param id the id of the pagoEfectivo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pago-efectivos/{id}")
    @Timed
    public ResponseEntity<Void> deletePagoEfectivo(@PathVariable Long id) {
        log.debug("REST request to delete PagoEfectivo : {}", id);
        pagoEfectivoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
