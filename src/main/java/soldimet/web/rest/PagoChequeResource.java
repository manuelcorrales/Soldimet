package soldimet.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import soldimet.domain.PagoCheque;
import soldimet.repository.PagoChequeRepository;
import soldimet.service.PagoChequeService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.PagoCheque}.
 */
@RestController
@RequestMapping("/api")
public class PagoChequeResource {

    private final Logger log = LoggerFactory.getLogger(PagoChequeResource.class);

    private static final String ENTITY_NAME = "pagoCheque";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PagoChequeService pagoChequeService;

    private final PagoChequeRepository pagoChequeRepository;

    public PagoChequeResource(PagoChequeService pagoChequeService, PagoChequeRepository pagoChequeRepository) {
        this.pagoChequeService = pagoChequeService;
        this.pagoChequeRepository = pagoChequeRepository;
    }

    /**
     * {@code POST  /pago-cheques} : Create a new pagoCheque.
     *
     * @param pagoCheque the pagoCheque to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pagoCheque, or with status {@code 400 (Bad Request)} if the pagoCheque has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pago-cheques")
    public ResponseEntity<PagoCheque> createPagoCheque(@Valid @RequestBody PagoCheque pagoCheque) throws URISyntaxException {
        log.debug("REST request to save PagoCheque : {}", pagoCheque);
        if (pagoCheque.getId() != null) {
            throw new BadRequestAlertException("A new pagoCheque cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PagoCheque result = pagoChequeService.save(pagoCheque);
        return ResponseEntity
            .created(new URI("/api/pago-cheques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pago-cheques/:id} : Updates an existing pagoCheque.
     *
     * @param id the id of the pagoCheque to save.
     * @param pagoCheque the pagoCheque to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pagoCheque,
     * or with status {@code 400 (Bad Request)} if the pagoCheque is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pagoCheque couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pago-cheques/{id}")
    public ResponseEntity<PagoCheque> updatePagoCheque(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody PagoCheque pagoCheque
    ) throws URISyntaxException {
        log.debug("REST request to update PagoCheque : {}, {}", id, pagoCheque);
        if (pagoCheque.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pagoCheque.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pagoChequeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PagoCheque result = pagoChequeService.save(pagoCheque);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pagoCheque.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /pago-cheques/:id} : Partial updates given fields of an existing pagoCheque, field will ignore if it is null
     *
     * @param id the id of the pagoCheque to save.
     * @param pagoCheque the pagoCheque to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pagoCheque,
     * or with status {@code 400 (Bad Request)} if the pagoCheque is not valid,
     * or with status {@code 404 (Not Found)} if the pagoCheque is not found,
     * or with status {@code 500 (Internal Server Error)} if the pagoCheque couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/pago-cheques/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<PagoCheque> partialUpdatePagoCheque(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody PagoCheque pagoCheque
    ) throws URISyntaxException {
        log.debug("REST request to partial update PagoCheque partially : {}, {}", id, pagoCheque);
        if (pagoCheque.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pagoCheque.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pagoChequeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PagoCheque> result = pagoChequeService.partialUpdate(pagoCheque);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pagoCheque.getId().toString())
        );
    }

    /**
     * {@code GET  /pago-cheques} : get all the pagoCheques.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pagoCheques in body.
     */
    @GetMapping("/pago-cheques")
    public List<PagoCheque> getAllPagoCheques() {
        log.debug("REST request to get all PagoCheques");
        return pagoChequeService.findAll();
    }

    /**
     * {@code GET  /pago-cheques/:id} : get the "id" pagoCheque.
     *
     * @param id the id of the pagoCheque to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pagoCheque, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pago-cheques/{id}")
    public ResponseEntity<PagoCheque> getPagoCheque(@PathVariable Long id) {
        log.debug("REST request to get PagoCheque : {}", id);
        Optional<PagoCheque> pagoCheque = pagoChequeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(pagoCheque);
    }

    /**
     * {@code DELETE  /pago-cheques/:id} : delete the "id" pagoCheque.
     *
     * @param id the id of the pagoCheque to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pago-cheques/{id}")
    public ResponseEntity<Void> deletePagoCheque(@PathVariable Long id) {
        log.debug("REST request to delete PagoCheque : {}", id);
        pagoChequeService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
