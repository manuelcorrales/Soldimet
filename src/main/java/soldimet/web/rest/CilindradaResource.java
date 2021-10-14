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
import soldimet.domain.Cilindrada;
import soldimet.repository.CilindradaRepository;
import soldimet.service.CilindradaService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.Cilindrada}.
 */
@RestController
@RequestMapping("/api")
public class CilindradaResource {

    private final Logger log = LoggerFactory.getLogger(CilindradaResource.class);

    private static final String ENTITY_NAME = "cilindrada";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CilindradaService cilindradaService;

    private final CilindradaRepository cilindradaRepository;

    public CilindradaResource(CilindradaService cilindradaService, CilindradaRepository cilindradaRepository) {
        this.cilindradaService = cilindradaService;
        this.cilindradaRepository = cilindradaRepository;
    }

    /**
     * {@code POST  /cilindradas} : Create a new cilindrada.
     *
     * @param cilindrada the cilindrada to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cilindrada, or with status {@code 400 (Bad Request)} if the cilindrada has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cilindradas")
    public ResponseEntity<Cilindrada> createCilindrada(@Valid @RequestBody Cilindrada cilindrada) throws URISyntaxException {
        log.debug("REST request to save Cilindrada : {}", cilindrada);
        if (cilindrada.getId() != null) {
            throw new BadRequestAlertException("A new cilindrada cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cilindrada result = cilindradaService.save(cilindrada);
        return ResponseEntity
            .created(new URI("/api/cilindradas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cilindradas/:id} : Updates an existing cilindrada.
     *
     * @param id the id of the cilindrada to save.
     * @param cilindrada the cilindrada to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cilindrada,
     * or with status {@code 400 (Bad Request)} if the cilindrada is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cilindrada couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cilindradas/{id}")
    public ResponseEntity<Cilindrada> updateCilindrada(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Cilindrada cilindrada
    ) throws URISyntaxException {
        log.debug("REST request to update Cilindrada : {}, {}", id, cilindrada);
        if (cilindrada.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cilindrada.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cilindradaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Cilindrada result = cilindradaService.save(cilindrada);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, cilindrada.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cilindradas/:id} : Partial updates given fields of an existing cilindrada, field will ignore if it is null
     *
     * @param id the id of the cilindrada to save.
     * @param cilindrada the cilindrada to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cilindrada,
     * or with status {@code 400 (Bad Request)} if the cilindrada is not valid,
     * or with status {@code 404 (Not Found)} if the cilindrada is not found,
     * or with status {@code 500 (Internal Server Error)} if the cilindrada couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cilindradas/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Cilindrada> partialUpdateCilindrada(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Cilindrada cilindrada
    ) throws URISyntaxException {
        log.debug("REST request to partial update Cilindrada partially : {}, {}", id, cilindrada);
        if (cilindrada.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cilindrada.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cilindradaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Cilindrada> result = cilindradaService.partialUpdate(cilindrada);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, cilindrada.getId().toString())
        );
    }

    /**
     * {@code GET  /cilindradas} : get all the cilindradas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cilindradas in body.
     */
    @GetMapping("/cilindradas")
    public List<Cilindrada> getAllCilindradas() {
        log.debug("REST request to get all Cilindradas");
        return cilindradaService.findAll();
    }

    /**
     * {@code GET  /cilindradas/:id} : get the "id" cilindrada.
     *
     * @param id the id of the cilindrada to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cilindrada, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cilindradas/{id}")
    public ResponseEntity<Cilindrada> getCilindrada(@PathVariable Long id) {
        log.debug("REST request to get Cilindrada : {}", id);
        Optional<Cilindrada> cilindrada = cilindradaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cilindrada);
    }

    /**
     * {@code DELETE  /cilindradas/:id} : delete the "id" cilindrada.
     *
     * @param id the id of the cilindrada to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cilindradas/{id}")
    public ResponseEntity<Void> deleteCilindrada(@PathVariable Long id) {
        log.debug("REST request to delete Cilindrada : {}", id);
        cilindradaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
