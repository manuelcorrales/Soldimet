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
import soldimet.domain.Marca;
import soldimet.repository.MarcaRepository;
import soldimet.service.MarcaService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.Marca}.
 */
@RestController
@RequestMapping("/api")
public class MarcaResource {

    private final Logger log = LoggerFactory.getLogger(MarcaResource.class);

    private static final String ENTITY_NAME = "marca";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MarcaService marcaService;

    private final MarcaRepository marcaRepository;

    public MarcaResource(MarcaService marcaService, MarcaRepository marcaRepository) {
        this.marcaService = marcaService;
        this.marcaRepository = marcaRepository;
    }

    /**
     * {@code POST  /marcas} : Create a new marca.
     *
     * @param marca the marca to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new marca, or with status {@code 400 (Bad Request)} if the marca has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/marcas")
    public ResponseEntity<Marca> createMarca(@Valid @RequestBody Marca marca) throws URISyntaxException {
        log.debug("REST request to save Marca : {}", marca);
        if (marca.getId() != null) {
            throw new BadRequestAlertException("A new marca cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Marca result = marcaService.save(marca);
        return ResponseEntity
            .created(new URI("/api/marcas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /marcas/:id} : Updates an existing marca.
     *
     * @param id the id of the marca to save.
     * @param marca the marca to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated marca,
     * or with status {@code 400 (Bad Request)} if the marca is not valid,
     * or with status {@code 500 (Internal Server Error)} if the marca couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/marcas/{id}")
    public ResponseEntity<Marca> updateMarca(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Marca marca)
        throws URISyntaxException {
        log.debug("REST request to update Marca : {}, {}", id, marca);
        if (marca.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, marca.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!marcaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Marca result = marcaService.save(marca);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, marca.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /marcas/:id} : Partial updates given fields of an existing marca, field will ignore if it is null
     *
     * @param id the id of the marca to save.
     * @param marca the marca to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated marca,
     * or with status {@code 400 (Bad Request)} if the marca is not valid,
     * or with status {@code 404 (Not Found)} if the marca is not found,
     * or with status {@code 500 (Internal Server Error)} if the marca couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/marcas/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Marca> partialUpdateMarca(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Marca marca
    ) throws URISyntaxException {
        log.debug("REST request to partial update Marca partially : {}, {}", id, marca);
        if (marca.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, marca.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!marcaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Marca> result = marcaService.partialUpdate(marca);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, marca.getId().toString())
        );
    }

    /**
     * {@code GET  /marcas} : get all the marcas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of marcas in body.
     */
    @GetMapping("/marcas")
    public List<Marca> getAllMarcas() {
        log.debug("REST request to get all Marcas");
        return marcaService.findAll();
    }

    /**
     * {@code GET  /marcas/:id} : get the "id" marca.
     *
     * @param id the id of the marca to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the marca, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/marcas/{id}")
    public ResponseEntity<Marca> getMarca(@PathVariable Long id) {
        log.debug("REST request to get Marca : {}", id);
        Optional<Marca> marca = marcaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(marca);
    }

    /**
     * {@code DELETE  /marcas/:id} : delete the "id" marca.
     *
     * @param id the id of the marca to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/marcas/{id}")
    public ResponseEntity<Void> deleteMarca(@PathVariable Long id) {
        log.debug("REST request to delete Marca : {}", id);
        marcaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
