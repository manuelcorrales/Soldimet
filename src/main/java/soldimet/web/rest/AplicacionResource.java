package soldimet.web.rest;

import soldimet.domain.Aplicacion;
import soldimet.service.AplicacionService;
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
 * REST controller for managing {@link soldimet.domain.Aplicacion}.
 */
@RestController
@RequestMapping("/api")
public class AplicacionResource {

    private final Logger log = LoggerFactory.getLogger(AplicacionResource.class);

    private static final String ENTITY_NAME = "aplicacion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AplicacionService aplicacionService;

    public AplicacionResource(AplicacionService aplicacionService) {
        this.aplicacionService = aplicacionService;
    }

    /**
     * {@code POST  /aplicacions} : Create a new aplicacion.
     *
     * @param aplicacion the aplicacion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new aplicacion, or with status {@code 400 (Bad Request)} if the aplicacion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/aplicacions")
    public ResponseEntity<Aplicacion> createAplicacion(@Valid @RequestBody Aplicacion aplicacion) throws URISyntaxException {
        log.debug("REST request to save Aplicacion : {}", aplicacion);
        if (aplicacion.getId() != null) {
            throw new BadRequestAlertException("A new aplicacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Aplicacion result = aplicacionService.save(aplicacion);
        return ResponseEntity.created(new URI("/api/aplicacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /aplicacions} : Updates an existing aplicacion.
     *
     * @param aplicacion the aplicacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated aplicacion,
     * or with status {@code 400 (Bad Request)} if the aplicacion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the aplicacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/aplicacions")
    public ResponseEntity<Aplicacion> updateAplicacion(@Valid @RequestBody Aplicacion aplicacion) throws URISyntaxException {
        log.debug("REST request to update Aplicacion : {}", aplicacion);
        if (aplicacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Aplicacion result = aplicacionService.save(aplicacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, aplicacion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /aplicacions} : get all the aplicacions.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of aplicacions in body.
     */
    @GetMapping("/aplicacions")
    public List<Aplicacion> getAllAplicacions() {
        log.debug("REST request to get all Aplicacions");
        return aplicacionService.findAll();
    }

    /**
     * {@code GET  /aplicacions/:id} : get the "id" aplicacion.
     *
     * @param id the id of the aplicacion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the aplicacion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/aplicacions/{id}")
    public ResponseEntity<Aplicacion> getAplicacion(@PathVariable Long id) {
        log.debug("REST request to get Aplicacion : {}", id);
        Optional<Aplicacion> aplicacion = aplicacionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(aplicacion);
    }

    /**
     * {@code DELETE  /aplicacions/:id} : delete the "id" aplicacion.
     *
     * @param id the id of the aplicacion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/aplicacions/{id}")
    public ResponseEntity<Void> deleteAplicacion(@PathVariable Long id) {
        log.debug("REST request to delete Aplicacion : {}", id);
        aplicacionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
