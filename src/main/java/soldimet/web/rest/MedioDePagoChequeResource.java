package soldimet.web.rest;

import soldimet.domain.MedioDePagoCheque;
import soldimet.repository.MedioDePagoChequeRepository;
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
 * REST controller for managing {@link soldimet.domain.MedioDePagoCheque}.
 */
@RestController
@RequestMapping("/api")
public class MedioDePagoChequeResource {

    private final Logger log = LoggerFactory.getLogger(MedioDePagoChequeResource.class);

    private static final String ENTITY_NAME = "medioDePagoCheque";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MedioDePagoChequeRepository medioDePagoChequeRepository;

    public MedioDePagoChequeResource(MedioDePagoChequeRepository medioDePagoChequeRepository) {
        this.medioDePagoChequeRepository = medioDePagoChequeRepository;
    }

    /**
     * {@code POST  /medio-de-pago-cheques} : Create a new medioDePagoCheque.
     *
     * @param medioDePagoCheque the medioDePagoCheque to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new medioDePagoCheque, or with status {@code 400 (Bad Request)} if the medioDePagoCheque has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/medio-de-pago-cheques")
    public ResponseEntity<MedioDePagoCheque> createMedioDePagoCheque(@Valid @RequestBody MedioDePagoCheque medioDePagoCheque) throws URISyntaxException {
        log.debug("REST request to save MedioDePagoCheque : {}", medioDePagoCheque);
        if (medioDePagoCheque.getId() != null) {
            throw new BadRequestAlertException("A new medioDePagoCheque cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MedioDePagoCheque result = medioDePagoChequeRepository.save(medioDePagoCheque);
        return ResponseEntity.created(new URI("/api/medio-de-pago-cheques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /medio-de-pago-cheques} : Updates an existing medioDePagoCheque.
     *
     * @param medioDePagoCheque the medioDePagoCheque to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated medioDePagoCheque,
     * or with status {@code 400 (Bad Request)} if the medioDePagoCheque is not valid,
     * or with status {@code 500 (Internal Server Error)} if the medioDePagoCheque couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/medio-de-pago-cheques")
    public ResponseEntity<MedioDePagoCheque> updateMedioDePagoCheque(@Valid @RequestBody MedioDePagoCheque medioDePagoCheque) throws URISyntaxException {
        log.debug("REST request to update MedioDePagoCheque : {}", medioDePagoCheque);
        if (medioDePagoCheque.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MedioDePagoCheque result = medioDePagoChequeRepository.save(medioDePagoCheque);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, medioDePagoCheque.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /medio-de-pago-cheques} : get all the medioDePagoCheques.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of medioDePagoCheques in body.
     */
    @GetMapping("/medio-de-pago-cheques")
    public List<MedioDePagoCheque> getAllMedioDePagoCheques() {
        log.debug("REST request to get all MedioDePagoCheques");
        return medioDePagoChequeRepository.findAll();
    }

    /**
     * {@code GET  /medio-de-pago-cheques/:id} : get the "id" medioDePagoCheque.
     *
     * @param id the id of the medioDePagoCheque to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the medioDePagoCheque, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/medio-de-pago-cheques/{id}")
    public ResponseEntity<MedioDePagoCheque> getMedioDePagoCheque(@PathVariable Long id) {
        log.debug("REST request to get MedioDePagoCheque : {}", id);
        Optional<MedioDePagoCheque> medioDePagoCheque = medioDePagoChequeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(medioDePagoCheque);
    }

    /**
     * {@code DELETE  /medio-de-pago-cheques/:id} : delete the "id" medioDePagoCheque.
     *
     * @param id the id of the medioDePagoCheque to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/medio-de-pago-cheques/{id}")
    public ResponseEntity<Void> deleteMedioDePagoCheque(@PathVariable Long id) {
        log.debug("REST request to delete MedioDePagoCheque : {}", id);
        medioDePagoChequeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
