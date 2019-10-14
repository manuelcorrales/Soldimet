package soldimet.web.rest;

import soldimet.domain.DetalleMovimiento;
import soldimet.service.DetalleMovimientoService;
import soldimet.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link soldimet.domain.DetalleMovimiento}.
 */
@RestController
@RequestMapping("/api")
public class DetalleMovimientoResource {

    private final Logger log = LoggerFactory.getLogger(DetalleMovimientoResource.class);

    private static final String ENTITY_NAME = "detalleMovimiento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DetalleMovimientoService detalleMovimientoService;

    public DetalleMovimientoResource(DetalleMovimientoService detalleMovimientoService) {
        this.detalleMovimientoService = detalleMovimientoService;
    }

    /**
     * {@code POST  /detalle-movimientos} : Create a new detalleMovimiento.
     *
     * @param detalleMovimiento the detalleMovimiento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new detalleMovimiento, or with status {@code 400 (Bad Request)} if the detalleMovimiento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/detalle-movimientos")
    public ResponseEntity<DetalleMovimiento> createDetalleMovimiento(@Valid @RequestBody DetalleMovimiento detalleMovimiento) throws URISyntaxException {
        log.debug("REST request to save DetalleMovimiento : {}", detalleMovimiento);
        if (detalleMovimiento.getId() != null) {
            throw new BadRequestAlertException("A new detalleMovimiento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DetalleMovimiento result = detalleMovimientoService.save(detalleMovimiento);
        return ResponseEntity.created(new URI("/api/detalle-movimientos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /detalle-movimientos} : Updates an existing detalleMovimiento.
     *
     * @param detalleMovimiento the detalleMovimiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated detalleMovimiento,
     * or with status {@code 400 (Bad Request)} if the detalleMovimiento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the detalleMovimiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/detalle-movimientos")
    public ResponseEntity<DetalleMovimiento> updateDetalleMovimiento(@Valid @RequestBody DetalleMovimiento detalleMovimiento) throws URISyntaxException {
        log.debug("REST request to update DetalleMovimiento : {}", detalleMovimiento);
        if (detalleMovimiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DetalleMovimiento result = detalleMovimientoService.save(detalleMovimiento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, detalleMovimiento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /detalle-movimientos} : get all the detalleMovimientos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of detalleMovimientos in body.
     */
    @GetMapping("/detalle-movimientos")
    public List<DetalleMovimiento> getAllDetalleMovimientos() {
        log.debug("REST request to get all DetalleMovimientos");
        return detalleMovimientoService.findAll();
    }

    /**
     * {@code GET  /detalle-movimientos/:id} : get the "id" detalleMovimiento.
     *
     * @param id the id of the detalleMovimiento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the detalleMovimiento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/detalle-movimientos/{id}")
    public ResponseEntity<DetalleMovimiento> getDetalleMovimiento(@PathVariable Long id) {
        log.debug("REST request to get DetalleMovimiento : {}", id);
        Optional<DetalleMovimiento> detalleMovimiento = detalleMovimientoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(detalleMovimiento);
    }

    /**
     * {@code DELETE  /detalle-movimientos/:id} : delete the "id" detalleMovimiento.
     *
     * @param id the id of the detalleMovimiento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/detalle-movimientos/{id}")
    public ResponseEntity<Void> deleteDetalleMovimiento(@PathVariable Long id) {
        log.debug("REST request to delete DetalleMovimiento : {}", id);
        detalleMovimientoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
