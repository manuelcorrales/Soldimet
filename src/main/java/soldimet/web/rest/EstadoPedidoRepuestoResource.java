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
import soldimet.domain.EstadoPedidoRepuesto;
import soldimet.repository.EstadoPedidoRepuestoRepository;
import soldimet.service.EstadoPedidoRepuestoService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.EstadoPedidoRepuesto}.
 */
@RestController
@RequestMapping("/api")
public class EstadoPedidoRepuestoResource {

    private final Logger log = LoggerFactory.getLogger(EstadoPedidoRepuestoResource.class);

    private static final String ENTITY_NAME = "estadoPedidoRepuesto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstadoPedidoRepuestoService estadoPedidoRepuestoService;

    private final EstadoPedidoRepuestoRepository estadoPedidoRepuestoRepository;

    public EstadoPedidoRepuestoResource(
        EstadoPedidoRepuestoService estadoPedidoRepuestoService,
        EstadoPedidoRepuestoRepository estadoPedidoRepuestoRepository
    ) {
        this.estadoPedidoRepuestoService = estadoPedidoRepuestoService;
        this.estadoPedidoRepuestoRepository = estadoPedidoRepuestoRepository;
    }

    /**
     * {@code POST  /estado-pedido-repuestos} : Create a new estadoPedidoRepuesto.
     *
     * @param estadoPedidoRepuesto the estadoPedidoRepuesto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estadoPedidoRepuesto, or with status {@code 400 (Bad Request)} if the estadoPedidoRepuesto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estado-pedido-repuestos")
    public ResponseEntity<EstadoPedidoRepuesto> createEstadoPedidoRepuesto(@Valid @RequestBody EstadoPedidoRepuesto estadoPedidoRepuesto)
        throws URISyntaxException {
        log.debug("REST request to save EstadoPedidoRepuesto : {}", estadoPedidoRepuesto);
        if (estadoPedidoRepuesto.getId() != null) {
            throw new BadRequestAlertException("A new estadoPedidoRepuesto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstadoPedidoRepuesto result = estadoPedidoRepuestoService.save(estadoPedidoRepuesto);
        return ResponseEntity
            .created(new URI("/api/estado-pedido-repuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estado-pedido-repuestos/:id} : Updates an existing estadoPedidoRepuesto.
     *
     * @param id the id of the estadoPedidoRepuesto to save.
     * @param estadoPedidoRepuesto the estadoPedidoRepuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoPedidoRepuesto,
     * or with status {@code 400 (Bad Request)} if the estadoPedidoRepuesto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estadoPedidoRepuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estado-pedido-repuestos/{id}")
    public ResponseEntity<EstadoPedidoRepuesto> updateEstadoPedidoRepuesto(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody EstadoPedidoRepuesto estadoPedidoRepuesto
    ) throws URISyntaxException {
        log.debug("REST request to update EstadoPedidoRepuesto : {}, {}", id, estadoPedidoRepuesto);
        if (estadoPedidoRepuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, estadoPedidoRepuesto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!estadoPedidoRepuestoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        EstadoPedidoRepuesto result = estadoPedidoRepuestoService.save(estadoPedidoRepuesto);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estadoPedidoRepuesto.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /estado-pedido-repuestos/:id} : Partial updates given fields of an existing estadoPedidoRepuesto, field will ignore if it is null
     *
     * @param id the id of the estadoPedidoRepuesto to save.
     * @param estadoPedidoRepuesto the estadoPedidoRepuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoPedidoRepuesto,
     * or with status {@code 400 (Bad Request)} if the estadoPedidoRepuesto is not valid,
     * or with status {@code 404 (Not Found)} if the estadoPedidoRepuesto is not found,
     * or with status {@code 500 (Internal Server Error)} if the estadoPedidoRepuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/estado-pedido-repuestos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<EstadoPedidoRepuesto> partialUpdateEstadoPedidoRepuesto(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody EstadoPedidoRepuesto estadoPedidoRepuesto
    ) throws URISyntaxException {
        log.debug("REST request to partial update EstadoPedidoRepuesto partially : {}, {}", id, estadoPedidoRepuesto);
        if (estadoPedidoRepuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, estadoPedidoRepuesto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!estadoPedidoRepuestoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<EstadoPedidoRepuesto> result = estadoPedidoRepuestoService.partialUpdate(estadoPedidoRepuesto);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estadoPedidoRepuesto.getId().toString())
        );
    }

    /**
     * {@code GET  /estado-pedido-repuestos} : get all the estadoPedidoRepuestos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estadoPedidoRepuestos in body.
     */
    @GetMapping("/estado-pedido-repuestos")
    public List<EstadoPedidoRepuesto> getAllEstadoPedidoRepuestos() {
        log.debug("REST request to get all EstadoPedidoRepuestos");
        return estadoPedidoRepuestoService.findAll();
    }

    /**
     * {@code GET  /estado-pedido-repuestos/:id} : get the "id" estadoPedidoRepuesto.
     *
     * @param id the id of the estadoPedidoRepuesto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estadoPedidoRepuesto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estado-pedido-repuestos/{id}")
    public ResponseEntity<EstadoPedidoRepuesto> getEstadoPedidoRepuesto(@PathVariable Long id) {
        log.debug("REST request to get EstadoPedidoRepuesto : {}", id);
        Optional<EstadoPedidoRepuesto> estadoPedidoRepuesto = estadoPedidoRepuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(estadoPedidoRepuesto);
    }

    /**
     * {@code DELETE  /estado-pedido-repuestos/:id} : delete the "id" estadoPedidoRepuesto.
     *
     * @param id the id of the estadoPedidoRepuesto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estado-pedido-repuestos/{id}")
    public ResponseEntity<Void> deleteEstadoPedidoRepuesto(@PathVariable Long id) {
        log.debug("REST request to delete EstadoPedidoRepuesto : {}", id);
        estadoPedidoRepuestoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
