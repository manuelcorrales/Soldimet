package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.MedioDePagoCheque;
import soldimet.repository.MedioDePagoChequeRepository;
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
 * REST controller for managing MedioDePagoCheque.
 */
@RestController
@RequestMapping("/api")
public class MedioDePagoChequeResource {

    private final Logger log = LoggerFactory.getLogger(MedioDePagoChequeResource.class);

    private static final String ENTITY_NAME = "medioDePagoCheque";

    private final MedioDePagoChequeRepository medioDePagoChequeRepository;

    public MedioDePagoChequeResource(MedioDePagoChequeRepository medioDePagoChequeRepository) {
        this.medioDePagoChequeRepository = medioDePagoChequeRepository;
    }

    /**
     * POST  /medio-de-pago-cheques : Create a new medioDePagoCheque.
     *
     * @param medioDePagoCheque the medioDePagoCheque to create
     * @return the ResponseEntity with status 201 (Created) and with body the new medioDePagoCheque, or with status 400 (Bad Request) if the medioDePagoCheque has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/medio-de-pago-cheques")
    @Timed
    public ResponseEntity<MedioDePagoCheque> createMedioDePagoCheque(@Valid @RequestBody MedioDePagoCheque medioDePagoCheque) throws URISyntaxException {
        log.debug("REST request to save MedioDePagoCheque : {}", medioDePagoCheque);
        if (medioDePagoCheque.getId() != null) {
            throw new BadRequestAlertException("A new medioDePagoCheque cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MedioDePagoCheque result = medioDePagoChequeRepository.save(medioDePagoCheque);
        return ResponseEntity.created(new URI("/api/medio-de-pago-cheques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /medio-de-pago-cheques : Updates an existing medioDePagoCheque.
     *
     * @param medioDePagoCheque the medioDePagoCheque to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated medioDePagoCheque,
     * or with status 400 (Bad Request) if the medioDePagoCheque is not valid,
     * or with status 500 (Internal Server Error) if the medioDePagoCheque couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/medio-de-pago-cheques")
    @Timed
    public ResponseEntity<MedioDePagoCheque> updateMedioDePagoCheque(@Valid @RequestBody MedioDePagoCheque medioDePagoCheque) throws URISyntaxException {
        log.debug("REST request to update MedioDePagoCheque : {}", medioDePagoCheque);
        if (medioDePagoCheque.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MedioDePagoCheque result = medioDePagoChequeRepository.save(medioDePagoCheque);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, medioDePagoCheque.getId().toString()))
            .body(result);
    }

    /**
     * GET  /medio-de-pago-cheques : get all the medioDePagoCheques.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of medioDePagoCheques in body
     */
    @GetMapping("/medio-de-pago-cheques")
    @Timed
    public List<MedioDePagoCheque> getAllMedioDePagoCheques() {
        log.debug("REST request to get all MedioDePagoCheques");
        return medioDePagoChequeRepository.findAll();
    }

    /**
     * GET  /medio-de-pago-cheques/:id : get the "id" medioDePagoCheque.
     *
     * @param id the id of the medioDePagoCheque to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the medioDePagoCheque, or with status 404 (Not Found)
     */
    @GetMapping("/medio-de-pago-cheques/{id}")
    @Timed
    public ResponseEntity<MedioDePagoCheque> getMedioDePagoCheque(@PathVariable Long id) {
        log.debug("REST request to get MedioDePagoCheque : {}", id);
        Optional<MedioDePagoCheque> medioDePagoCheque = medioDePagoChequeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(medioDePagoCheque);
    }

    /**
     * DELETE  /medio-de-pago-cheques/:id : delete the "id" medioDePagoCheque.
     *
     * @param id the id of the medioDePagoCheque to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/medio-de-pago-cheques/{id}")
    @Timed
    public ResponseEntity<Void> deleteMedioDePagoCheque(@PathVariable Long id) {
        log.debug("REST request to delete MedioDePagoCheque : {}", id);

        medioDePagoChequeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
