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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import soldimet.domain.EstadoCostoRepuesto;
import soldimet.repository.EstadoCostoRepuestoRepository;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.EstadoCostoRepuesto}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EstadoCostoRepuestoResource {

    private final Logger log = LoggerFactory.getLogger(EstadoCostoRepuestoResource.class);

    private static final String ENTITY_NAME = "estadoCostoRepuesto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstadoCostoRepuestoRepository estadoCostoRepuestoRepository;

    public EstadoCostoRepuestoResource(EstadoCostoRepuestoRepository estadoCostoRepuestoRepository) {
        this.estadoCostoRepuestoRepository = estadoCostoRepuestoRepository;
    }

    /**
     * {@code POST  /estado-costo-repuestos} : Create a new estadoCostoRepuesto.
     *
     * @param estadoCostoRepuesto the estadoCostoRepuesto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estadoCostoRepuesto, or with status {@code 400 (Bad Request)} if the estadoCostoRepuesto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estado-costo-repuestos")
    public ResponseEntity<EstadoCostoRepuesto> createEstadoCostoRepuesto(@Valid @RequestBody EstadoCostoRepuesto estadoCostoRepuesto)
        throws URISyntaxException {
        log.debug("REST request to save EstadoCostoRepuesto : {}", estadoCostoRepuesto);
        if (estadoCostoRepuesto.getId() != null) {
            throw new BadRequestAlertException("A new estadoCostoRepuesto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstadoCostoRepuesto result = estadoCostoRepuestoRepository.save(estadoCostoRepuesto);
        return ResponseEntity
            .created(new URI("/api/estado-costo-repuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estado-costo-repuestos/:id} : Updates an existing estadoCostoRepuesto.
     *
     * @param id the id of the estadoCostoRepuesto to save.
     * @param estadoCostoRepuesto the estadoCostoRepuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoCostoRepuesto,
     * or with status {@code 400 (Bad Request)} if the estadoCostoRepuesto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estadoCostoRepuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estado-costo-repuestos/{id}")
    public ResponseEntity<EstadoCostoRepuesto> updateEstadoCostoRepuesto(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody EstadoCostoRepuesto estadoCostoRepuesto
    ) throws URISyntaxException {
        log.debug("REST request to update EstadoCostoRepuesto : {}, {}", id, estadoCostoRepuesto);
        if (estadoCostoRepuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, estadoCostoRepuesto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!estadoCostoRepuestoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        EstadoCostoRepuesto result = estadoCostoRepuestoRepository.save(estadoCostoRepuesto);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estadoCostoRepuesto.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /estado-costo-repuestos/:id} : Partial updates given fields of an existing estadoCostoRepuesto, field will ignore if it is null
     *
     * @param id the id of the estadoCostoRepuesto to save.
     * @param estadoCostoRepuesto the estadoCostoRepuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoCostoRepuesto,
     * or with status {@code 400 (Bad Request)} if the estadoCostoRepuesto is not valid,
     * or with status {@code 404 (Not Found)} if the estadoCostoRepuesto is not found,
     * or with status {@code 500 (Internal Server Error)} if the estadoCostoRepuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/estado-costo-repuestos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<EstadoCostoRepuesto> partialUpdateEstadoCostoRepuesto(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody EstadoCostoRepuesto estadoCostoRepuesto
    ) throws URISyntaxException {
        log.debug("REST request to partial update EstadoCostoRepuesto partially : {}, {}", id, estadoCostoRepuesto);
        if (estadoCostoRepuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, estadoCostoRepuesto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!estadoCostoRepuestoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<EstadoCostoRepuesto> result = estadoCostoRepuestoRepository
            .findById(estadoCostoRepuesto.getId())
            .map(
                existingEstadoCostoRepuesto -> {
                    if (estadoCostoRepuesto.getNombreEstado() != null) {
                        existingEstadoCostoRepuesto.setNombreEstado(estadoCostoRepuesto.getNombreEstado());
                    }

                    return existingEstadoCostoRepuesto;
                }
            )
            .map(estadoCostoRepuestoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estadoCostoRepuesto.getId().toString())
        );
    }

    /**
     * {@code GET  /estado-costo-repuestos} : get all the estadoCostoRepuestos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estadoCostoRepuestos in body.
     */
    @GetMapping("/estado-costo-repuestos")
    public List<EstadoCostoRepuesto> getAllEstadoCostoRepuestos() {
        log.debug("REST request to get all EstadoCostoRepuestos");
        return estadoCostoRepuestoRepository.findAll();
    }

    /**
     * {@code GET  /estado-costo-repuestos/:id} : get the "id" estadoCostoRepuesto.
     *
     * @param id the id of the estadoCostoRepuesto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estadoCostoRepuesto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estado-costo-repuestos/{id}")
    public ResponseEntity<EstadoCostoRepuesto> getEstadoCostoRepuesto(@PathVariable Long id) {
        log.debug("REST request to get EstadoCostoRepuesto : {}", id);
        Optional<EstadoCostoRepuesto> estadoCostoRepuesto = estadoCostoRepuestoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(estadoCostoRepuesto);
    }

    /**
     * {@code DELETE  /estado-costo-repuestos/:id} : delete the "id" estadoCostoRepuesto.
     *
     * @param id the id of the estadoCostoRepuesto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estado-costo-repuestos/{id}")
    public ResponseEntity<Void> deleteEstadoCostoRepuesto(@PathVariable Long id) {
        log.debug("REST request to delete EstadoCostoRepuesto : {}", id);
        estadoCostoRepuestoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
