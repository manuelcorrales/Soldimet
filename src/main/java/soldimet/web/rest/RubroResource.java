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
import soldimet.domain.Rubro;
import soldimet.repository.RubroRepository;
import soldimet.service.RubroService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.Rubro}.
 */
@RestController
@RequestMapping("/api")
public class RubroResource {

    private final Logger log = LoggerFactory.getLogger(RubroResource.class);

    private static final String ENTITY_NAME = "rubro";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RubroService rubroService;

    private final RubroRepository rubroRepository;

    public RubroResource(RubroService rubroService, RubroRepository rubroRepository) {
        this.rubroService = rubroService;
        this.rubroRepository = rubroRepository;
    }

    /**
     * {@code POST  /rubros} : Create a new rubro.
     *
     * @param rubro the rubro to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rubro, or with status {@code 400 (Bad Request)} if the rubro has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/rubros")
    public ResponseEntity<Rubro> createRubro(@Valid @RequestBody Rubro rubro) throws URISyntaxException {
        log.debug("REST request to save Rubro : {}", rubro);
        if (rubro.getId() != null) {
            throw new BadRequestAlertException("A new rubro cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Rubro result = rubroService.save(rubro);
        return ResponseEntity
            .created(new URI("/api/rubros/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /rubros/:id} : Updates an existing rubro.
     *
     * @param id the id of the rubro to save.
     * @param rubro the rubro to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rubro,
     * or with status {@code 400 (Bad Request)} if the rubro is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rubro couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/rubros/{id}")
    public ResponseEntity<Rubro> updateRubro(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Rubro rubro)
        throws URISyntaxException {
        log.debug("REST request to update Rubro : {}, {}", id, rubro);
        if (rubro.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, rubro.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!rubroRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Rubro result = rubroService.save(rubro);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, rubro.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /rubros/:id} : Partial updates given fields of an existing rubro, field will ignore if it is null
     *
     * @param id the id of the rubro to save.
     * @param rubro the rubro to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rubro,
     * or with status {@code 400 (Bad Request)} if the rubro is not valid,
     * or with status {@code 404 (Not Found)} if the rubro is not found,
     * or with status {@code 500 (Internal Server Error)} if the rubro couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/rubros/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Rubro> partialUpdateRubro(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Rubro rubro
    ) throws URISyntaxException {
        log.debug("REST request to partial update Rubro partially : {}, {}", id, rubro);
        if (rubro.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, rubro.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!rubroRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Rubro> result = rubroService.partialUpdate(rubro);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, rubro.getId().toString())
        );
    }

    /**
     * {@code GET  /rubros} : get all the rubros.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rubros in body.
     */
    @GetMapping("/rubros")
    public List<Rubro> getAllRubros() {
        log.debug("REST request to get all Rubros");
        return rubroService.findAll();
    }

    /**
     * {@code GET  /rubros/:id} : get the "id" rubro.
     *
     * @param id the id of the rubro to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rubro, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rubros/{id}")
    public ResponseEntity<Rubro> getRubro(@PathVariable Long id) {
        log.debug("REST request to get Rubro : {}", id);
        Optional<Rubro> rubro = rubroService.findOne(id);
        return ResponseUtil.wrapOrNotFound(rubro);
    }

    /**
     * {@code DELETE  /rubros/:id} : delete the "id" rubro.
     *
     * @param id the id of the rubro to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/rubros/{id}")
    public ResponseEntity<Void> deleteRubro(@PathVariable Long id) {
        log.debug("REST request to delete Rubro : {}", id);
        rubroService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
