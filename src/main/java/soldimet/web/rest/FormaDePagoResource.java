package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.FormaDePago;
import soldimet.service.FormaDePagoService;
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
 * REST controller for managing FormaDePago.
 */
@RestController
@RequestMapping("/api")
public class FormaDePagoResource {

    private final Logger log = LoggerFactory.getLogger(FormaDePagoResource.class);

    private static final String ENTITY_NAME = "formaDePago";

    private final FormaDePagoService formaDePagoService;

    public FormaDePagoResource(FormaDePagoService formaDePagoService) {
        this.formaDePagoService = formaDePagoService;
    }

    /**
     * POST  /forma-de-pagos : Create a new formaDePago.
     *
     * @param formaDePago the formaDePago to create
     * @return the ResponseEntity with status 201 (Created) and with body the new formaDePago, or with status 400 (Bad Request) if the formaDePago has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/forma-de-pagos")
    @Timed
    public ResponseEntity<FormaDePago> createFormaDePago(@Valid @RequestBody FormaDePago formaDePago) throws URISyntaxException {
        log.debug("REST request to save FormaDePago : {}", formaDePago);
        if (formaDePago.getId() != null) {
            throw new BadRequestAlertException("A new formaDePago cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FormaDePago result = formaDePagoService.save(formaDePago);
        return ResponseEntity.created(new URI("/api/forma-de-pagos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /forma-de-pagos : Updates an existing formaDePago.
     *
     * @param formaDePago the formaDePago to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated formaDePago,
     * or with status 400 (Bad Request) if the formaDePago is not valid,
     * or with status 500 (Internal Server Error) if the formaDePago couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/forma-de-pagos")
    @Timed
    public ResponseEntity<FormaDePago> updateFormaDePago(@Valid @RequestBody FormaDePago formaDePago) throws URISyntaxException {
        log.debug("REST request to update FormaDePago : {}", formaDePago);
        if (formaDePago.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FormaDePago result = formaDePagoService.save(formaDePago);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, formaDePago.getId().toString()))
            .body(result);
    }

    /**
     * GET  /forma-de-pagos : get all the formaDePagos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of formaDePagos in body
     */
    @GetMapping("/forma-de-pagos")
    @Timed
    public List<FormaDePago> getAllFormaDePagos() {
        log.debug("REST request to get all FormaDePagos");
        return formaDePagoService.findAll();
    }

    /**
     * GET  /forma-de-pagos/:id : get the "id" formaDePago.
     *
     * @param id the id of the formaDePago to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the formaDePago, or with status 404 (Not Found)
     */
    @GetMapping("/forma-de-pagos/{id}")
    @Timed
    public ResponseEntity<FormaDePago> getFormaDePago(@PathVariable Long id) {
        log.debug("REST request to get FormaDePago : {}", id);
        Optional<FormaDePago> formaDePago = formaDePagoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(formaDePago);
    }

    /**
     * DELETE  /forma-de-pagos/:id : delete the "id" formaDePago.
     *
     * @param id the id of the formaDePago to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/forma-de-pagos/{id}")
    @Timed
    public ResponseEntity<Void> deleteFormaDePago(@PathVariable Long id) {
        log.debug("REST request to delete FormaDePago : {}", id);
        formaDePagoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
