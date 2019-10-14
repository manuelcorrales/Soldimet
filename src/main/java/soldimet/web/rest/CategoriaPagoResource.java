package soldimet.web.rest;

import soldimet.domain.CategoriaPago;
import soldimet.service.CategoriaPagoService;
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
 * REST controller for managing {@link soldimet.domain.CategoriaPago}.
 */
@RestController
@RequestMapping("/api")
public class CategoriaPagoResource {

    private final Logger log = LoggerFactory.getLogger(CategoriaPagoResource.class);

    private static final String ENTITY_NAME = "categoriaPago";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CategoriaPagoService categoriaPagoService;

    public CategoriaPagoResource(CategoriaPagoService categoriaPagoService) {
        this.categoriaPagoService = categoriaPagoService;
    }

    /**
     * {@code POST  /categoria-pagos} : Create a new categoriaPago.
     *
     * @param categoriaPago the categoriaPago to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new categoriaPago, or with status {@code 400 (Bad Request)} if the categoriaPago has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/categoria-pagos")
    public ResponseEntity<CategoriaPago> createCategoriaPago(@Valid @RequestBody CategoriaPago categoriaPago) throws URISyntaxException {
        log.debug("REST request to save CategoriaPago : {}", categoriaPago);
        if (categoriaPago.getId() != null) {
            throw new BadRequestAlertException("A new categoriaPago cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CategoriaPago result = categoriaPagoService.save(categoriaPago);
        return ResponseEntity.created(new URI("/api/categoria-pagos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /categoria-pagos} : Updates an existing categoriaPago.
     *
     * @param categoriaPago the categoriaPago to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated categoriaPago,
     * or with status {@code 400 (Bad Request)} if the categoriaPago is not valid,
     * or with status {@code 500 (Internal Server Error)} if the categoriaPago couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/categoria-pagos")
    public ResponseEntity<CategoriaPago> updateCategoriaPago(@Valid @RequestBody CategoriaPago categoriaPago) throws URISyntaxException {
        log.debug("REST request to update CategoriaPago : {}", categoriaPago);
        if (categoriaPago.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CategoriaPago result = categoriaPagoService.save(categoriaPago);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, categoriaPago.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /categoria-pagos} : get all the categoriaPagos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of categoriaPagos in body.
     */
    @GetMapping("/categoria-pagos")
    public List<CategoriaPago> getAllCategoriaPagos() {
        log.debug("REST request to get all CategoriaPagos");
        return categoriaPagoService.findAll();
    }

    /**
     * {@code GET  /categoria-pagos/:id} : get the "id" categoriaPago.
     *
     * @param id the id of the categoriaPago to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the categoriaPago, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/categoria-pagos/{id}")
    public ResponseEntity<CategoriaPago> getCategoriaPago(@PathVariable Long id) {
        log.debug("REST request to get CategoriaPago : {}", id);
        Optional<CategoriaPago> categoriaPago = categoriaPagoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(categoriaPago);
    }

    /**
     * {@code DELETE  /categoria-pagos/:id} : delete the "id" categoriaPago.
     *
     * @param id the id of the categoriaPago to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/categoria-pagos/{id}")
    public ResponseEntity<Void> deleteCategoriaPago(@PathVariable Long id) {
        log.debug("REST request to delete CategoriaPago : {}", id);
        categoriaPagoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
