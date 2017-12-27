package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.CategoriaPago;
import soldimet.service.CategoriaPagoService;
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
 * REST controller for managing CategoriaPago.
 */
@RestController
@RequestMapping("/api")
public class CategoriaPagoResource {

    private final Logger log = LoggerFactory.getLogger(CategoriaPagoResource.class);

    private static final String ENTITY_NAME = "categoriaPago";

    private final CategoriaPagoService categoriaPagoService;

    public CategoriaPagoResource(CategoriaPagoService categoriaPagoService) {
        this.categoriaPagoService = categoriaPagoService;
    }

    /**
     * POST  /categoria-pagos : Create a new categoriaPago.
     *
     * @param categoriaPago the categoriaPago to create
     * @return the ResponseEntity with status 201 (Created) and with body the new categoriaPago, or with status 400 (Bad Request) if the categoriaPago has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/categoria-pagos")
    @Timed
    public ResponseEntity<CategoriaPago> createCategoriaPago(@Valid @RequestBody CategoriaPago categoriaPago) throws URISyntaxException {
        log.debug("REST request to save CategoriaPago : {}", categoriaPago);
        if (categoriaPago.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new categoriaPago cannot already have an ID")).body(null);
        }
        CategoriaPago result = categoriaPagoService.save(categoriaPago);
        return ResponseEntity.created(new URI("/api/categoria-pagos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /categoria-pagos : Updates an existing categoriaPago.
     *
     * @param categoriaPago the categoriaPago to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated categoriaPago,
     * or with status 400 (Bad Request) if the categoriaPago is not valid,
     * or with status 500 (Internal Server Error) if the categoriaPago couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/categoria-pagos")
    @Timed
    public ResponseEntity<CategoriaPago> updateCategoriaPago(@Valid @RequestBody CategoriaPago categoriaPago) throws URISyntaxException {
        log.debug("REST request to update CategoriaPago : {}", categoriaPago);
        if (categoriaPago.getId() == null) {
            return createCategoriaPago(categoriaPago);
        }
        CategoriaPago result = categoriaPagoService.save(categoriaPago);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, categoriaPago.getId().toString()))
            .body(result);
    }

    /**
     * GET  /categoria-pagos : get all the categoriaPagos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of categoriaPagos in body
     */
    @GetMapping("/categoria-pagos")
    @Timed
    public List<CategoriaPago> getAllCategoriaPagos() {
        log.debug("REST request to get all CategoriaPagos");
        return categoriaPagoService.findAll();
        }

    /**
     * GET  /categoria-pagos/:id : get the "id" categoriaPago.
     *
     * @param id the id of the categoriaPago to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the categoriaPago, or with status 404 (Not Found)
     */
    @GetMapping("/categoria-pagos/{id}")
    @Timed
    public ResponseEntity<CategoriaPago> getCategoriaPago(@PathVariable Long id) {
        log.debug("REST request to get CategoriaPago : {}", id);
        CategoriaPago categoriaPago = categoriaPagoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(categoriaPago));
    }

    /**
     * DELETE  /categoria-pagos/:id : delete the "id" categoriaPago.
     *
     * @param id the id of the categoriaPago to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/categoria-pagos/{id}")
    @Timed
    public ResponseEntity<Void> deleteCategoriaPago(@PathVariable Long id) {
        log.debug("REST request to delete CategoriaPago : {}", id);
        categoriaPagoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
