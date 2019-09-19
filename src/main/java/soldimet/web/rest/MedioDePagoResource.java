package soldimet.web.rest;

import soldimet.domain.MedioDePago;
import soldimet.repository.MedioDePagoRepository;
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
 * REST controller for managing {@link soldimet.domain.MedioDePago}.
 */
@RestController
@RequestMapping("/api")
public class MedioDePagoResource {

    private final Logger log = LoggerFactory.getLogger(MedioDePagoResource.class);

    private static final String ENTITY_NAME = "medioDePago";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MedioDePagoRepository medioDePagoRepository;

    public MedioDePagoResource(MedioDePagoRepository medioDePagoRepository) {
        this.medioDePagoRepository = medioDePagoRepository;
    }

    /**
     * {@code POST  /medio-de-pagos} : Create a new medioDePago.
     *
     * @param medioDePago the medioDePago to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new medioDePago, or with status {@code 400 (Bad Request)} if the medioDePago has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/medio-de-pagos")
    public ResponseEntity<MedioDePago> createMedioDePago(@Valid @RequestBody MedioDePago medioDePago) throws URISyntaxException {
        log.debug("REST request to save MedioDePago : {}", medioDePago);
        if (medioDePago.getId() != null) {
            throw new BadRequestAlertException("A new medioDePago cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MedioDePago result = medioDePagoRepository.save(medioDePago);
        return ResponseEntity.created(new URI("/api/medio-de-pagos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /medio-de-pagos} : Updates an existing medioDePago.
     *
     * @param medioDePago the medioDePago to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated medioDePago,
     * or with status {@code 400 (Bad Request)} if the medioDePago is not valid,
     * or with status {@code 500 (Internal Server Error)} if the medioDePago couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/medio-de-pagos")
    public ResponseEntity<MedioDePago> updateMedioDePago(@Valid @RequestBody MedioDePago medioDePago) throws URISyntaxException {
        log.debug("REST request to update MedioDePago : {}", medioDePago);
        if (medioDePago.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MedioDePago result = medioDePagoRepository.save(medioDePago);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, medioDePago.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /medio-de-pagos} : get all the medioDePagos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of medioDePagos in body.
     */
    @GetMapping("/medio-de-pagos")
    public List<MedioDePago> getAllMedioDePagos() {
        log.debug("REST request to get all MedioDePagos");
        return medioDePagoRepository.findAll();
    }

    /**
     * {@code GET  /medio-de-pagos/:id} : get the "id" medioDePago.
     *
     * @param id the id of the medioDePago to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the medioDePago, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/medio-de-pagos/{id}")
    public ResponseEntity<MedioDePago> getMedioDePago(@PathVariable Long id) {
        log.debug("REST request to get MedioDePago : {}", id);
        Optional<MedioDePago> medioDePago = medioDePagoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(medioDePago);
    }

    /**
     * {@code DELETE  /medio-de-pagos/:id} : delete the "id" medioDePago.
     *
     * @param id the id of the medioDePago to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/medio-de-pagos/{id}")
    public ResponseEntity<Void> deleteMedioDePago(@PathVariable Long id) {
        log.debug("REST request to delete MedioDePago : {}", id);
        medioDePagoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
