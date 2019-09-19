package soldimet.web.rest;

import soldimet.domain.TipoDetalleMovimiento;
import soldimet.service.TipoDetalleMovimientoService;
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
 * REST controller for managing {@link soldimet.domain.TipoDetalleMovimiento}.
 */
@RestController
@RequestMapping("/api")
public class TipoDetalleMovimientoResource {

    private final Logger log = LoggerFactory.getLogger(TipoDetalleMovimientoResource.class);

    private static final String ENTITY_NAME = "tipoDetalleMovimiento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoDetalleMovimientoService tipoDetalleMovimientoService;

    public TipoDetalleMovimientoResource(TipoDetalleMovimientoService tipoDetalleMovimientoService) {
        this.tipoDetalleMovimientoService = tipoDetalleMovimientoService;
    }

    /**
     * {@code POST  /tipo-detalle-movimientos} : Create a new tipoDetalleMovimiento.
     *
     * @param tipoDetalleMovimiento the tipoDetalleMovimiento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoDetalleMovimiento, or with status {@code 400 (Bad Request)} if the tipoDetalleMovimiento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-detalle-movimientos")
    public ResponseEntity<TipoDetalleMovimiento> createTipoDetalleMovimiento(@Valid @RequestBody TipoDetalleMovimiento tipoDetalleMovimiento) throws URISyntaxException {
        log.debug("REST request to save TipoDetalleMovimiento : {}", tipoDetalleMovimiento);
        if (tipoDetalleMovimiento.getId() != null) {
            throw new BadRequestAlertException("A new tipoDetalleMovimiento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoDetalleMovimiento result = tipoDetalleMovimientoService.save(tipoDetalleMovimiento);
        return ResponseEntity.created(new URI("/api/tipo-detalle-movimientos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-detalle-movimientos} : Updates an existing tipoDetalleMovimiento.
     *
     * @param tipoDetalleMovimiento the tipoDetalleMovimiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoDetalleMovimiento,
     * or with status {@code 400 (Bad Request)} if the tipoDetalleMovimiento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoDetalleMovimiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-detalle-movimientos")
    public ResponseEntity<TipoDetalleMovimiento> updateTipoDetalleMovimiento(@Valid @RequestBody TipoDetalleMovimiento tipoDetalleMovimiento) throws URISyntaxException {
        log.debug("REST request to update TipoDetalleMovimiento : {}", tipoDetalleMovimiento);
        if (tipoDetalleMovimiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoDetalleMovimiento result = tipoDetalleMovimientoService.save(tipoDetalleMovimiento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoDetalleMovimiento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-detalle-movimientos} : get all the tipoDetalleMovimientos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoDetalleMovimientos in body.
     */
    @GetMapping("/tipo-detalle-movimientos")
    public List<TipoDetalleMovimiento> getAllTipoDetalleMovimientos() {
        log.debug("REST request to get all TipoDetalleMovimientos");
        return tipoDetalleMovimientoService.findAll();
    }

    /**
     * {@code GET  /tipo-detalle-movimientos/:id} : get the "id" tipoDetalleMovimiento.
     *
     * @param id the id of the tipoDetalleMovimiento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoDetalleMovimiento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-detalle-movimientos/{id}")
    public ResponseEntity<TipoDetalleMovimiento> getTipoDetalleMovimiento(@PathVariable Long id) {
        log.debug("REST request to get TipoDetalleMovimiento : {}", id);
        Optional<TipoDetalleMovimiento> tipoDetalleMovimiento = tipoDetalleMovimientoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoDetalleMovimiento);
    }

    /**
     * {@code DELETE  /tipo-detalle-movimientos/:id} : delete the "id" tipoDetalleMovimiento.
     *
     * @param id the id of the tipoDetalleMovimiento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-detalle-movimientos/{id}")
    public ResponseEntity<Void> deleteTipoDetalleMovimiento(@PathVariable Long id) {
        log.debug("REST request to delete TipoDetalleMovimiento : {}", id);
        tipoDetalleMovimientoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
