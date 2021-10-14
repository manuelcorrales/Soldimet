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
import soldimet.domain.EstadoDetallePedido;
import soldimet.repository.EstadoDetallePedidoRepository;
import soldimet.service.EstadoDetallePedidoService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.EstadoDetallePedido}.
 */
@RestController
@RequestMapping("/api")
public class EstadoDetallePedidoResource {

    private final Logger log = LoggerFactory.getLogger(EstadoDetallePedidoResource.class);

    private static final String ENTITY_NAME = "estadoDetallePedido";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstadoDetallePedidoService estadoDetallePedidoService;

    private final EstadoDetallePedidoRepository estadoDetallePedidoRepository;

    public EstadoDetallePedidoResource(
        EstadoDetallePedidoService estadoDetallePedidoService,
        EstadoDetallePedidoRepository estadoDetallePedidoRepository
    ) {
        this.estadoDetallePedidoService = estadoDetallePedidoService;
        this.estadoDetallePedidoRepository = estadoDetallePedidoRepository;
    }

    /**
     * {@code POST  /estado-detalle-pedidos} : Create a new estadoDetallePedido.
     *
     * @param estadoDetallePedido the estadoDetallePedido to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estadoDetallePedido, or with status {@code 400 (Bad Request)} if the estadoDetallePedido has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estado-detalle-pedidos")
    public ResponseEntity<EstadoDetallePedido> createEstadoDetallePedido(@Valid @RequestBody EstadoDetallePedido estadoDetallePedido)
        throws URISyntaxException {
        log.debug("REST request to save EstadoDetallePedido : {}", estadoDetallePedido);
        if (estadoDetallePedido.getId() != null) {
            throw new BadRequestAlertException("A new estadoDetallePedido cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstadoDetallePedido result = estadoDetallePedidoService.save(estadoDetallePedido);
        return ResponseEntity
            .created(new URI("/api/estado-detalle-pedidos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estado-detalle-pedidos/:id} : Updates an existing estadoDetallePedido.
     *
     * @param id the id of the estadoDetallePedido to save.
     * @param estadoDetallePedido the estadoDetallePedido to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoDetallePedido,
     * or with status {@code 400 (Bad Request)} if the estadoDetallePedido is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estadoDetallePedido couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estado-detalle-pedidos/{id}")
    public ResponseEntity<EstadoDetallePedido> updateEstadoDetallePedido(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody EstadoDetallePedido estadoDetallePedido
    ) throws URISyntaxException {
        log.debug("REST request to update EstadoDetallePedido : {}, {}", id, estadoDetallePedido);
        if (estadoDetallePedido.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, estadoDetallePedido.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!estadoDetallePedidoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        EstadoDetallePedido result = estadoDetallePedidoService.save(estadoDetallePedido);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estadoDetallePedido.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /estado-detalle-pedidos/:id} : Partial updates given fields of an existing estadoDetallePedido, field will ignore if it is null
     *
     * @param id the id of the estadoDetallePedido to save.
     * @param estadoDetallePedido the estadoDetallePedido to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoDetallePedido,
     * or with status {@code 400 (Bad Request)} if the estadoDetallePedido is not valid,
     * or with status {@code 404 (Not Found)} if the estadoDetallePedido is not found,
     * or with status {@code 500 (Internal Server Error)} if the estadoDetallePedido couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/estado-detalle-pedidos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<EstadoDetallePedido> partialUpdateEstadoDetallePedido(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody EstadoDetallePedido estadoDetallePedido
    ) throws URISyntaxException {
        log.debug("REST request to partial update EstadoDetallePedido partially : {}, {}", id, estadoDetallePedido);
        if (estadoDetallePedido.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, estadoDetallePedido.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!estadoDetallePedidoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<EstadoDetallePedido> result = estadoDetallePedidoService.partialUpdate(estadoDetallePedido);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estadoDetallePedido.getId().toString())
        );
    }

    /**
     * {@code GET  /estado-detalle-pedidos} : get all the estadoDetallePedidos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estadoDetallePedidos in body.
     */
    @GetMapping("/estado-detalle-pedidos")
    public List<EstadoDetallePedido> getAllEstadoDetallePedidos() {
        log.debug("REST request to get all EstadoDetallePedidos");
        return estadoDetallePedidoService.findAll();
    }

    /**
     * {@code GET  /estado-detalle-pedidos/:id} : get the "id" estadoDetallePedido.
     *
     * @param id the id of the estadoDetallePedido to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estadoDetallePedido, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estado-detalle-pedidos/{id}")
    public ResponseEntity<EstadoDetallePedido> getEstadoDetallePedido(@PathVariable Long id) {
        log.debug("REST request to get EstadoDetallePedido : {}", id);
        Optional<EstadoDetallePedido> estadoDetallePedido = estadoDetallePedidoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(estadoDetallePedido);
    }

    /**
     * {@code DELETE  /estado-detalle-pedidos/:id} : delete the "id" estadoDetallePedido.
     *
     * @param id the id of the estadoDetallePedido to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estado-detalle-pedidos/{id}")
    public ResponseEntity<Void> deleteEstadoDetallePedido(@PathVariable Long id) {
        log.debug("REST request to delete EstadoDetallePedido : {}", id);
        estadoDetallePedidoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
