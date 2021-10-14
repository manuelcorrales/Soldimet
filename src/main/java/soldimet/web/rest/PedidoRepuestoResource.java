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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import soldimet.domain.PedidoRepuesto;
import soldimet.repository.PedidoRepuestoRepository;
import soldimet.service.PedidoRepuestoQueryService;
import soldimet.service.PedidoRepuestoService;
import soldimet.service.criteria.PedidoRepuestoCriteria;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.PedidoRepuesto}.
 */
@RestController
@RequestMapping("/api")
public class PedidoRepuestoResource {

    private final Logger log = LoggerFactory.getLogger(PedidoRepuestoResource.class);

    private static final String ENTITY_NAME = "pedidoRepuesto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PedidoRepuestoService pedidoRepuestoService;

    private final PedidoRepuestoRepository pedidoRepuestoRepository;

    private final PedidoRepuestoQueryService pedidoRepuestoQueryService;

    public PedidoRepuestoResource(
        PedidoRepuestoService pedidoRepuestoService,
        PedidoRepuestoRepository pedidoRepuestoRepository,
        PedidoRepuestoQueryService pedidoRepuestoQueryService
    ) {
        this.pedidoRepuestoService = pedidoRepuestoService;
        this.pedidoRepuestoRepository = pedidoRepuestoRepository;
        this.pedidoRepuestoQueryService = pedidoRepuestoQueryService;
    }

    /**
     * {@code POST  /pedido-repuestos} : Create a new pedidoRepuesto.
     *
     * @param pedidoRepuesto the pedidoRepuesto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pedidoRepuesto, or with status {@code 400 (Bad Request)} if the pedidoRepuesto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pedido-repuestos")
    public ResponseEntity<PedidoRepuesto> createPedidoRepuesto(@Valid @RequestBody PedidoRepuesto pedidoRepuesto)
        throws URISyntaxException {
        log.debug("REST request to save PedidoRepuesto : {}", pedidoRepuesto);
        if (pedidoRepuesto.getId() != null) {
            throw new BadRequestAlertException("A new pedidoRepuesto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PedidoRepuesto result = pedidoRepuestoService.save(pedidoRepuesto);
        return ResponseEntity
            .created(new URI("/api/pedido-repuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pedido-repuestos/:id} : Updates an existing pedidoRepuesto.
     *
     * @param id the id of the pedidoRepuesto to save.
     * @param pedidoRepuesto the pedidoRepuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pedidoRepuesto,
     * or with status {@code 400 (Bad Request)} if the pedidoRepuesto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pedidoRepuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pedido-repuestos/{id}")
    public ResponseEntity<PedidoRepuesto> updatePedidoRepuesto(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody PedidoRepuesto pedidoRepuesto
    ) throws URISyntaxException {
        log.debug("REST request to update PedidoRepuesto : {}, {}", id, pedidoRepuesto);
        if (pedidoRepuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pedidoRepuesto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pedidoRepuestoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PedidoRepuesto result = pedidoRepuestoService.save(pedidoRepuesto);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pedidoRepuesto.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /pedido-repuestos/:id} : Partial updates given fields of an existing pedidoRepuesto, field will ignore if it is null
     *
     * @param id the id of the pedidoRepuesto to save.
     * @param pedidoRepuesto the pedidoRepuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pedidoRepuesto,
     * or with status {@code 400 (Bad Request)} if the pedidoRepuesto is not valid,
     * or with status {@code 404 (Not Found)} if the pedidoRepuesto is not found,
     * or with status {@code 500 (Internal Server Error)} if the pedidoRepuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/pedido-repuestos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<PedidoRepuesto> partialUpdatePedidoRepuesto(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody PedidoRepuesto pedidoRepuesto
    ) throws URISyntaxException {
        log.debug("REST request to partial update PedidoRepuesto partially : {}, {}", id, pedidoRepuesto);
        if (pedidoRepuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pedidoRepuesto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pedidoRepuestoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PedidoRepuesto> result = pedidoRepuestoService.partialUpdate(pedidoRepuesto);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pedidoRepuesto.getId().toString())
        );
    }

    /**
     * {@code GET  /pedido-repuestos} : get all the pedidoRepuestos.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pedidoRepuestos in body.
     */
    @GetMapping("/pedido-repuestos")
    public ResponseEntity<List<PedidoRepuesto>> getAllPedidoRepuestos(PedidoRepuestoCriteria criteria, Pageable pageable) {
        log.debug("REST request to get PedidoRepuestos by criteria: {}", criteria);
        Page<PedidoRepuesto> page = pedidoRepuestoQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /pedido-repuestos/count} : count all the pedidoRepuestos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/pedido-repuestos/count")
    public ResponseEntity<Long> countPedidoRepuestos(PedidoRepuestoCriteria criteria) {
        log.debug("REST request to count PedidoRepuestos by criteria: {}", criteria);
        return ResponseEntity.ok().body(pedidoRepuestoQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /pedido-repuestos/:id} : get the "id" pedidoRepuesto.
     *
     * @param id the id of the pedidoRepuesto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pedidoRepuesto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pedido-repuestos/{id}")
    public ResponseEntity<PedidoRepuesto> getPedidoRepuesto(@PathVariable Long id) {
        log.debug("REST request to get PedidoRepuesto : {}", id);
        Optional<PedidoRepuesto> pedidoRepuesto = pedidoRepuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(pedidoRepuesto);
    }

    /**
     * {@code DELETE  /pedido-repuestos/:id} : delete the "id" pedidoRepuesto.
     *
     * @param id the id of the pedidoRepuesto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pedido-repuestos/{id}")
    public ResponseEntity<Void> deletePedidoRepuesto(@PathVariable Long id) {
        log.debug("REST request to delete PedidoRepuesto : {}", id);
        pedidoRepuestoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
