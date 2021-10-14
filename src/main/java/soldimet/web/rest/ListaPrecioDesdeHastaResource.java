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
import soldimet.domain.ListaPrecioDesdeHasta;
import soldimet.repository.ListaPrecioDesdeHastaRepository;
import soldimet.service.ListaPrecioDesdeHastaService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.ListaPrecioDesdeHasta}.
 */
@RestController
@RequestMapping("/api")
public class ListaPrecioDesdeHastaResource {

    private final Logger log = LoggerFactory.getLogger(ListaPrecioDesdeHastaResource.class);

    private static final String ENTITY_NAME = "listaPrecioDesdeHasta";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ListaPrecioDesdeHastaService listaPrecioDesdeHastaService;

    private final ListaPrecioDesdeHastaRepository listaPrecioDesdeHastaRepository;

    public ListaPrecioDesdeHastaResource(
        ListaPrecioDesdeHastaService listaPrecioDesdeHastaService,
        ListaPrecioDesdeHastaRepository listaPrecioDesdeHastaRepository
    ) {
        this.listaPrecioDesdeHastaService = listaPrecioDesdeHastaService;
        this.listaPrecioDesdeHastaRepository = listaPrecioDesdeHastaRepository;
    }

    /**
     * {@code POST  /lista-precio-desde-hastas} : Create a new listaPrecioDesdeHasta.
     *
     * @param listaPrecioDesdeHasta the listaPrecioDesdeHasta to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new listaPrecioDesdeHasta, or with status {@code 400 (Bad Request)} if the listaPrecioDesdeHasta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/lista-precio-desde-hastas")
    public ResponseEntity<ListaPrecioDesdeHasta> createListaPrecioDesdeHasta(
        @Valid @RequestBody ListaPrecioDesdeHasta listaPrecioDesdeHasta
    ) throws URISyntaxException {
        log.debug("REST request to save ListaPrecioDesdeHasta : {}", listaPrecioDesdeHasta);
        if (listaPrecioDesdeHasta.getId() != null) {
            throw new BadRequestAlertException("A new listaPrecioDesdeHasta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ListaPrecioDesdeHasta result = listaPrecioDesdeHastaService.save(listaPrecioDesdeHasta);
        return ResponseEntity
            .created(new URI("/api/lista-precio-desde-hastas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /lista-precio-desde-hastas/:id} : Updates an existing listaPrecioDesdeHasta.
     *
     * @param id the id of the listaPrecioDesdeHasta to save.
     * @param listaPrecioDesdeHasta the listaPrecioDesdeHasta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated listaPrecioDesdeHasta,
     * or with status {@code 400 (Bad Request)} if the listaPrecioDesdeHasta is not valid,
     * or with status {@code 500 (Internal Server Error)} if the listaPrecioDesdeHasta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/lista-precio-desde-hastas/{id}")
    public ResponseEntity<ListaPrecioDesdeHasta> updateListaPrecioDesdeHasta(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ListaPrecioDesdeHasta listaPrecioDesdeHasta
    ) throws URISyntaxException {
        log.debug("REST request to update ListaPrecioDesdeHasta : {}, {}", id, listaPrecioDesdeHasta);
        if (listaPrecioDesdeHasta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, listaPrecioDesdeHasta.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!listaPrecioDesdeHastaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ListaPrecioDesdeHasta result = listaPrecioDesdeHastaService.save(listaPrecioDesdeHasta);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, listaPrecioDesdeHasta.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /lista-precio-desde-hastas/:id} : Partial updates given fields of an existing listaPrecioDesdeHasta, field will ignore if it is null
     *
     * @param id the id of the listaPrecioDesdeHasta to save.
     * @param listaPrecioDesdeHasta the listaPrecioDesdeHasta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated listaPrecioDesdeHasta,
     * or with status {@code 400 (Bad Request)} if the listaPrecioDesdeHasta is not valid,
     * or with status {@code 404 (Not Found)} if the listaPrecioDesdeHasta is not found,
     * or with status {@code 500 (Internal Server Error)} if the listaPrecioDesdeHasta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/lista-precio-desde-hastas/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<ListaPrecioDesdeHasta> partialUpdateListaPrecioDesdeHasta(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ListaPrecioDesdeHasta listaPrecioDesdeHasta
    ) throws URISyntaxException {
        log.debug("REST request to partial update ListaPrecioDesdeHasta partially : {}, {}", id, listaPrecioDesdeHasta);
        if (listaPrecioDesdeHasta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, listaPrecioDesdeHasta.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!listaPrecioDesdeHastaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ListaPrecioDesdeHasta> result = listaPrecioDesdeHastaService.partialUpdate(listaPrecioDesdeHasta);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, listaPrecioDesdeHasta.getId().toString())
        );
    }

    /**
     * {@code GET  /lista-precio-desde-hastas} : get all the listaPrecioDesdeHastas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of listaPrecioDesdeHastas in body.
     */
    @GetMapping("/lista-precio-desde-hastas")
    public List<ListaPrecioDesdeHasta> getAllListaPrecioDesdeHastas() {
        log.debug("REST request to get all ListaPrecioDesdeHastas");
        return listaPrecioDesdeHastaService.findAll();
    }

    /**
     * {@code GET  /lista-precio-desde-hastas/:id} : get the "id" listaPrecioDesdeHasta.
     *
     * @param id the id of the listaPrecioDesdeHasta to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the listaPrecioDesdeHasta, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/lista-precio-desde-hastas/{id}")
    public ResponseEntity<ListaPrecioDesdeHasta> getListaPrecioDesdeHasta(@PathVariable Long id) {
        log.debug("REST request to get ListaPrecioDesdeHasta : {}", id);
        Optional<ListaPrecioDesdeHasta> listaPrecioDesdeHasta = listaPrecioDesdeHastaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(listaPrecioDesdeHasta);
    }

    /**
     * {@code DELETE  /lista-precio-desde-hastas/:id} : delete the "id" listaPrecioDesdeHasta.
     *
     * @param id the id of the listaPrecioDesdeHasta to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/lista-precio-desde-hastas/{id}")
    public ResponseEntity<Void> deleteListaPrecioDesdeHasta(@PathVariable Long id) {
        log.debug("REST request to delete ListaPrecioDesdeHasta : {}", id);
        listaPrecioDesdeHastaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
