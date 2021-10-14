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
import soldimet.domain.MovimientoPedido;
import soldimet.repository.MovimientoPedidoRepository;
import soldimet.service.MovimientoPedidoService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.MovimientoPedido}.
 */
@RestController
@RequestMapping("/api")
public class MovimientoPedidoResource {

    private final Logger log = LoggerFactory.getLogger(MovimientoPedidoResource.class);

    private static final String ENTITY_NAME = "movimientoPedido";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MovimientoPedidoService movimientoPedidoService;

    private final MovimientoPedidoRepository movimientoPedidoRepository;

    public MovimientoPedidoResource(
        MovimientoPedidoService movimientoPedidoService,
        MovimientoPedidoRepository movimientoPedidoRepository
    ) {
        this.movimientoPedidoService = movimientoPedidoService;
        this.movimientoPedidoRepository = movimientoPedidoRepository;
    }

    /**
     * {@code POST  /movimiento-pedidos} : Create a new movimientoPedido.
     *
     * @param movimientoPedido the movimientoPedido to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new movimientoPedido, or with status {@code 400 (Bad Request)} if the movimientoPedido has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/movimiento-pedidos")
    public ResponseEntity<MovimientoPedido> createMovimientoPedido(@Valid @RequestBody MovimientoPedido movimientoPedido)
        throws URISyntaxException {
        log.debug("REST request to save MovimientoPedido : {}", movimientoPedido);
        if (movimientoPedido.getId() != null) {
            throw new BadRequestAlertException("A new movimientoPedido cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MovimientoPedido result = movimientoPedidoService.save(movimientoPedido);
        return ResponseEntity
            .created(new URI("/api/movimiento-pedidos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /movimiento-pedidos/:id} : Updates an existing movimientoPedido.
     *
     * @param id the id of the movimientoPedido to save.
     * @param movimientoPedido the movimientoPedido to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated movimientoPedido,
     * or with status {@code 400 (Bad Request)} if the movimientoPedido is not valid,
     * or with status {@code 500 (Internal Server Error)} if the movimientoPedido couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/movimiento-pedidos/{id}")
    public ResponseEntity<MovimientoPedido> updateMovimientoPedido(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody MovimientoPedido movimientoPedido
    ) throws URISyntaxException {
        log.debug("REST request to update MovimientoPedido : {}, {}", id, movimientoPedido);
        if (movimientoPedido.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, movimientoPedido.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!movimientoPedidoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        MovimientoPedido result = movimientoPedidoService.save(movimientoPedido);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, movimientoPedido.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /movimiento-pedidos/:id} : Partial updates given fields of an existing movimientoPedido, field will ignore if it is null
     *
     * @param id the id of the movimientoPedido to save.
     * @param movimientoPedido the movimientoPedido to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated movimientoPedido,
     * or with status {@code 400 (Bad Request)} if the movimientoPedido is not valid,
     * or with status {@code 404 (Not Found)} if the movimientoPedido is not found,
     * or with status {@code 500 (Internal Server Error)} if the movimientoPedido couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/movimiento-pedidos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<MovimientoPedido> partialUpdateMovimientoPedido(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody MovimientoPedido movimientoPedido
    ) throws URISyntaxException {
        log.debug("REST request to partial update MovimientoPedido partially : {}, {}", id, movimientoPedido);
        if (movimientoPedido.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, movimientoPedido.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!movimientoPedidoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MovimientoPedido> result = movimientoPedidoService.partialUpdate(movimientoPedido);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, movimientoPedido.getId().toString())
        );
    }

    /**
     * {@code GET  /movimiento-pedidos} : get all the movimientoPedidos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of movimientoPedidos in body.
     */
    @GetMapping("/movimiento-pedidos")
    public List<MovimientoPedido> getAllMovimientoPedidos() {
        log.debug("REST request to get all MovimientoPedidos");
        return movimientoPedidoService.findAll();
    }

    /**
     * {@code GET  /movimiento-pedidos/:id} : get the "id" movimientoPedido.
     *
     * @param id the id of the movimientoPedido to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the movimientoPedido, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/movimiento-pedidos/{id}")
    public ResponseEntity<MovimientoPedido> getMovimientoPedido(@PathVariable Long id) {
        log.debug("REST request to get MovimientoPedido : {}", id);
        Optional<MovimientoPedido> movimientoPedido = movimientoPedidoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(movimientoPedido);
    }

    /**
     * {@code DELETE  /movimiento-pedidos/:id} : delete the "id" movimientoPedido.
     *
     * @param id the id of the movimientoPedido to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/movimiento-pedidos/{id}")
    public ResponseEntity<Void> deleteMovimientoPedido(@PathVariable Long id) {
        log.debug("REST request to delete MovimientoPedido : {}", id);
        movimientoPedidoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
