package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.PagoCheque;
import soldimet.service.PagoChequeService;
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
 * REST controller for managing PagoCheque.
 */
@RestController
@RequestMapping("/api")
public class PagoChequeResource {

    private final Logger log = LoggerFactory.getLogger(PagoChequeResource.class);

    private static final String ENTITY_NAME = "pagoCheque";

    private final PagoChequeService pagoChequeService;

    public PagoChequeResource(PagoChequeService pagoChequeService) {
        this.pagoChequeService = pagoChequeService;
    }

    /**
     * POST  /pago-cheques : Create a new pagoCheque.
     *
     * @param pagoCheque the pagoCheque to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pagoCheque, or with status 400 (Bad Request) if the pagoCheque has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pago-cheques")
    @Timed
    public ResponseEntity<PagoCheque> createPagoCheque(@Valid @RequestBody PagoCheque pagoCheque) throws URISyntaxException {
        log.debug("REST request to save PagoCheque : {}", pagoCheque);
        if (pagoCheque.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new pagoCheque cannot already have an ID")).body(null);
        }
        PagoCheque result = pagoChequeService.save(pagoCheque);
        return ResponseEntity.created(new URI("/api/pago-cheques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pago-cheques : Updates an existing pagoCheque.
     *
     * @param pagoCheque the pagoCheque to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pagoCheque,
     * or with status 400 (Bad Request) if the pagoCheque is not valid,
     * or with status 500 (Internal Server Error) if the pagoCheque couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pago-cheques")
    @Timed
    public ResponseEntity<PagoCheque> updatePagoCheque(@Valid @RequestBody PagoCheque pagoCheque) throws URISyntaxException {
        log.debug("REST request to update PagoCheque : {}", pagoCheque);
        if (pagoCheque.getId() == null) {
            return createPagoCheque(pagoCheque);
        }
        PagoCheque result = pagoChequeService.save(pagoCheque);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pagoCheque.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pago-cheques : get all the pagoCheques.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of pagoCheques in body
     */
    @GetMapping("/pago-cheques")
    @Timed
    public List<PagoCheque> getAllPagoCheques() {
        log.debug("REST request to get all PagoCheques");
        return pagoChequeService.findAll();
        }

    /**
     * GET  /pago-cheques/:id : get the "id" pagoCheque.
     *
     * @param id the id of the pagoCheque to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pagoCheque, or with status 404 (Not Found)
     */
    @GetMapping("/pago-cheques/{id}")
    @Timed
    public ResponseEntity<PagoCheque> getPagoCheque(@PathVariable Long id) {
        log.debug("REST request to get PagoCheque : {}", id);
        PagoCheque pagoCheque = pagoChequeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(pagoCheque));
    }

    /**
     * DELETE  /pago-cheques/:id : delete the "id" pagoCheque.
     *
     * @param id the id of the pagoCheque to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pago-cheques/{id}")
    @Timed
    public ResponseEntity<Void> deletePagoCheque(@PathVariable Long id) {
        log.debug("REST request to delete PagoCheque : {}", id);
        pagoChequeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
