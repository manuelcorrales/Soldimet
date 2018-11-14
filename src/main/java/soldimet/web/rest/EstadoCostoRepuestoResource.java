package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.EstadoCostoRepuesto;
import soldimet.repository.EstadoCostoRepuestoRepository;
import soldimet.web.rest.errors.BadRequestAlertException;
import soldimet.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing EstadoCostoRepuesto.
 */
@RestController
@RequestMapping("/api")
public class EstadoCostoRepuestoResource {

    private final Logger log = LoggerFactory.getLogger(EstadoCostoRepuestoResource.class);

    private static final String ENTITY_NAME = "estadoCostoRepuesto";

    private final EstadoCostoRepuestoRepository estadoCostoRepuestoRepository;

    public EstadoCostoRepuestoResource(EstadoCostoRepuestoRepository estadoCostoRepuestoRepository) {
        this.estadoCostoRepuestoRepository = estadoCostoRepuestoRepository;
    }

    /**
     * POST  /estado-costo-repuestos : Create a new estadoCostoRepuesto.
     *
     * @param estadoCostoRepuesto the estadoCostoRepuesto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new estadoCostoRepuesto, or with status 400 (Bad Request) if the estadoCostoRepuesto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/estado-costo-repuestos")
    @Timed
    public ResponseEntity<EstadoCostoRepuesto> createEstadoCostoRepuesto(@Valid @RequestBody EstadoCostoRepuesto estadoCostoRepuesto) throws URISyntaxException {
        log.debug("REST request to save EstadoCostoRepuesto : {}", estadoCostoRepuesto);
        if (estadoCostoRepuesto.getId() != null) {
            throw new BadRequestAlertException("A new estadoCostoRepuesto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstadoCostoRepuesto result = estadoCostoRepuestoRepository.save(estadoCostoRepuesto);
        return ResponseEntity.created(new URI("/api/estado-costo-repuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /estado-costo-repuestos : Updates an existing estadoCostoRepuesto.
     *
     * @param estadoCostoRepuesto the estadoCostoRepuesto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated estadoCostoRepuesto,
     * or with status 400 (Bad Request) if the estadoCostoRepuesto is not valid,
     * or with status 500 (Internal Server Error) if the estadoCostoRepuesto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/estado-costo-repuestos")
    @Timed
    public ResponseEntity<EstadoCostoRepuesto> updateEstadoCostoRepuesto(@Valid @RequestBody EstadoCostoRepuesto estadoCostoRepuesto) throws URISyntaxException {
        log.debug("REST request to update EstadoCostoRepuesto : {}", estadoCostoRepuesto);
        if (estadoCostoRepuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EstadoCostoRepuesto result = estadoCostoRepuestoRepository.save(estadoCostoRepuesto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, estadoCostoRepuesto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /estado-costo-repuestos : get all the estadoCostoRepuestos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of estadoCostoRepuestos in body
     */
    @GetMapping("/estado-costo-repuestos")
    @Timed
    public List<EstadoCostoRepuesto> getAllEstadoCostoRepuestos() {
        log.debug("REST request to get all EstadoCostoRepuestos");
        return estadoCostoRepuestoRepository.findAll();
    }

    /**
     * GET  /estado-costo-repuestos/:id : get the "id" estadoCostoRepuesto.
     *
     * @param id the id of the estadoCostoRepuesto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the estadoCostoRepuesto, or with status 404 (Not Found)
     */
    @GetMapping("/estado-costo-repuestos/{id}")
    @Timed
    public ResponseEntity<EstadoCostoRepuesto> getEstadoCostoRepuesto(@PathVariable Long id) {
        log.debug("REST request to get EstadoCostoRepuesto : {}", id);
        Optional<EstadoCostoRepuesto> estadoCostoRepuesto = estadoCostoRepuestoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(estadoCostoRepuesto);
    }

    /**
     * DELETE  /estado-costo-repuestos/:id : delete the "id" estadoCostoRepuesto.
     *
     * @param id the id of the estadoCostoRepuesto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/estado-costo-repuestos/{id}")
    @Timed
    public ResponseEntity<Void> deleteEstadoCostoRepuesto(@PathVariable Long id) {
        log.debug("REST request to delete EstadoCostoRepuesto : {}", id);

        estadoCostoRepuestoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
