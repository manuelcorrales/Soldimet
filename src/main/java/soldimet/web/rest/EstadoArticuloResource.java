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
import soldimet.domain.EstadoArticulo;
import soldimet.repository.EstadoArticuloRepository;
import soldimet.service.EstadoArticuloService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.EstadoArticulo}.
 */
@RestController
@RequestMapping("/api")
public class EstadoArticuloResource {

    private final Logger log = LoggerFactory.getLogger(EstadoArticuloResource.class);

    private static final String ENTITY_NAME = "estadoArticulo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstadoArticuloService estadoArticuloService;

    private final EstadoArticuloRepository estadoArticuloRepository;

    public EstadoArticuloResource(EstadoArticuloService estadoArticuloService, EstadoArticuloRepository estadoArticuloRepository) {
        this.estadoArticuloService = estadoArticuloService;
        this.estadoArticuloRepository = estadoArticuloRepository;
    }

    /**
     * {@code POST  /estado-articulos} : Create a new estadoArticulo.
     *
     * @param estadoArticulo the estadoArticulo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estadoArticulo, or with status {@code 400 (Bad Request)} if the estadoArticulo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estado-articulos")
    public ResponseEntity<EstadoArticulo> createEstadoArticulo(@Valid @RequestBody EstadoArticulo estadoArticulo)
        throws URISyntaxException {
        log.debug("REST request to save EstadoArticulo : {}", estadoArticulo);
        if (estadoArticulo.getId() != null) {
            throw new BadRequestAlertException("A new estadoArticulo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstadoArticulo result = estadoArticuloService.save(estadoArticulo);
        return ResponseEntity
            .created(new URI("/api/estado-articulos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estado-articulos/:id} : Updates an existing estadoArticulo.
     *
     * @param id the id of the estadoArticulo to save.
     * @param estadoArticulo the estadoArticulo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoArticulo,
     * or with status {@code 400 (Bad Request)} if the estadoArticulo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estadoArticulo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estado-articulos/{id}")
    public ResponseEntity<EstadoArticulo> updateEstadoArticulo(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody EstadoArticulo estadoArticulo
    ) throws URISyntaxException {
        log.debug("REST request to update EstadoArticulo : {}, {}", id, estadoArticulo);
        if (estadoArticulo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, estadoArticulo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!estadoArticuloRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        EstadoArticulo result = estadoArticuloService.save(estadoArticulo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estadoArticulo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /estado-articulos/:id} : Partial updates given fields of an existing estadoArticulo, field will ignore if it is null
     *
     * @param id the id of the estadoArticulo to save.
     * @param estadoArticulo the estadoArticulo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoArticulo,
     * or with status {@code 400 (Bad Request)} if the estadoArticulo is not valid,
     * or with status {@code 404 (Not Found)} if the estadoArticulo is not found,
     * or with status {@code 500 (Internal Server Error)} if the estadoArticulo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/estado-articulos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<EstadoArticulo> partialUpdateEstadoArticulo(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody EstadoArticulo estadoArticulo
    ) throws URISyntaxException {
        log.debug("REST request to partial update EstadoArticulo partially : {}, {}", id, estadoArticulo);
        if (estadoArticulo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, estadoArticulo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!estadoArticuloRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<EstadoArticulo> result = estadoArticuloService.partialUpdate(estadoArticulo);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estadoArticulo.getId().toString())
        );
    }

    /**
     * {@code GET  /estado-articulos} : get all the estadoArticulos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estadoArticulos in body.
     */
    @GetMapping("/estado-articulos")
    public List<EstadoArticulo> getAllEstadoArticulos() {
        log.debug("REST request to get all EstadoArticulos");
        return estadoArticuloService.findAll();
    }

    /**
     * {@code GET  /estado-articulos/:id} : get the "id" estadoArticulo.
     *
     * @param id the id of the estadoArticulo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estadoArticulo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estado-articulos/{id}")
    public ResponseEntity<EstadoArticulo> getEstadoArticulo(@PathVariable Long id) {
        log.debug("REST request to get EstadoArticulo : {}", id);
        Optional<EstadoArticulo> estadoArticulo = estadoArticuloService.findOne(id);
        return ResponseUtil.wrapOrNotFound(estadoArticulo);
    }

    /**
     * {@code DELETE  /estado-articulos/:id} : delete the "id" estadoArticulo.
     *
     * @param id the id of the estadoArticulo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estado-articulos/{id}")
    public ResponseEntity<Void> deleteEstadoArticulo(@PathVariable Long id) {
        log.debug("REST request to delete EstadoArticulo : {}", id);
        estadoArticuloService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
