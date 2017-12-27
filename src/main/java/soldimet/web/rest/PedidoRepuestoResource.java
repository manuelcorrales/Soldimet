package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.PedidoRepuesto;
import soldimet.service.PedidoRepuestoService;
import soldimet.web.rest.util.HeaderUtil;
import soldimet.web.rest.util.PaginationUtil;
import soldimet.service.dto.PedidoRepuestoCriteria;
import soldimet.service.PedidoRepuestoQueryService;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing PedidoRepuesto.
 */
@RestController
@RequestMapping("/api")
public class PedidoRepuestoResource {

    private final Logger log = LoggerFactory.getLogger(PedidoRepuestoResource.class);

    private static final String ENTITY_NAME = "pedidoRepuesto";

    private final PedidoRepuestoService pedidoRepuestoService;

    private final PedidoRepuestoQueryService pedidoRepuestoQueryService;

    public PedidoRepuestoResource(PedidoRepuestoService pedidoRepuestoService, PedidoRepuestoQueryService pedidoRepuestoQueryService) {
        this.pedidoRepuestoService = pedidoRepuestoService;
        this.pedidoRepuestoQueryService = pedidoRepuestoQueryService;
    }

    /**
     * POST  /pedido-repuestos : Create a new pedidoRepuesto.
     *
     * @param pedidoRepuesto the pedidoRepuesto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pedidoRepuesto, or with status 400 (Bad Request) if the pedidoRepuesto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pedido-repuestos")
    @Timed
    public ResponseEntity<PedidoRepuesto> createPedidoRepuesto(@Valid @RequestBody PedidoRepuesto pedidoRepuesto) throws URISyntaxException {
        log.debug("REST request to save PedidoRepuesto : {}", pedidoRepuesto);
        if (pedidoRepuesto.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new pedidoRepuesto cannot already have an ID")).body(null);
        }
        PedidoRepuesto result = pedidoRepuestoService.save(pedidoRepuesto);
        return ResponseEntity.created(new URI("/api/pedido-repuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pedido-repuestos : Updates an existing pedidoRepuesto.
     *
     * @param pedidoRepuesto the pedidoRepuesto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pedidoRepuesto,
     * or with status 400 (Bad Request) if the pedidoRepuesto is not valid,
     * or with status 500 (Internal Server Error) if the pedidoRepuesto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pedido-repuestos")
    @Timed
    public ResponseEntity<PedidoRepuesto> updatePedidoRepuesto(@Valid @RequestBody PedidoRepuesto pedidoRepuesto) throws URISyntaxException {
        log.debug("REST request to update PedidoRepuesto : {}", pedidoRepuesto);
        if (pedidoRepuesto.getId() == null) {
            return createPedidoRepuesto(pedidoRepuesto);
        }
        PedidoRepuesto result = pedidoRepuestoService.save(pedidoRepuesto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pedidoRepuesto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pedido-repuestos : get all the pedidoRepuestos.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of pedidoRepuestos in body
     */
    @GetMapping("/pedido-repuestos")
    @Timed
    public ResponseEntity<List<PedidoRepuesto>> getAllPedidoRepuestos(PedidoRepuestoCriteria criteria,@ApiParam Pageable pageable) {
        log.debug("REST request to get PedidoRepuestos by criteria: {}", criteria);
        Page<PedidoRepuesto> page = pedidoRepuestoQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/pedido-repuestos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /pedido-repuestos/:id : get the "id" pedidoRepuesto.
     *
     * @param id the id of the pedidoRepuesto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pedidoRepuesto, or with status 404 (Not Found)
     */
    @GetMapping("/pedido-repuestos/{id}")
    @Timed
    public ResponseEntity<PedidoRepuesto> getPedidoRepuesto(@PathVariable Long id) {
        log.debug("REST request to get PedidoRepuesto : {}", id);
        PedidoRepuesto pedidoRepuesto = pedidoRepuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(pedidoRepuesto));
    }

    /**
     * DELETE  /pedido-repuestos/:id : delete the "id" pedidoRepuesto.
     *
     * @param id the id of the pedidoRepuesto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pedido-repuestos/{id}")
    @Timed
    public ResponseEntity<Void> deletePedidoRepuesto(@PathVariable Long id) {
        log.debug("REST request to delete PedidoRepuesto : {}", id);
        pedidoRepuestoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
