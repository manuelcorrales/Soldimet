package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.Aplicacion;
import soldimet.service.AplicacionService;
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
 * REST controller for managing Aplicacion.
 */
@RestController
@RequestMapping("/api")
public class AplicacionResource {

    private final Logger log = LoggerFactory.getLogger(AplicacionResource.class);

    private static final String ENTITY_NAME = "aplicacion";

    private final AplicacionService aplicacionService;

    public AplicacionResource(AplicacionService aplicacionService) {
        this.aplicacionService = aplicacionService;
    }

    /**
     * POST  /aplicacions : Create a new aplicacion.
     *
     * @param aplicacion the aplicacion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new aplicacion, or with status 400 (Bad Request) if the aplicacion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/aplicacions")
    @Timed
    public ResponseEntity<Aplicacion> createAplicacion(@Valid @RequestBody Aplicacion aplicacion) throws URISyntaxException {
        log.debug("REST request to save Aplicacion : {}", aplicacion);
        if (aplicacion.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new aplicacion cannot already have an ID")).body(null);
        }
        Aplicacion result = aplicacionService.save(aplicacion);
        return ResponseEntity.created(new URI("/api/aplicacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /aplicacions : Updates an existing aplicacion.
     *
     * @param aplicacion the aplicacion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated aplicacion,
     * or with status 400 (Bad Request) if the aplicacion is not valid,
     * or with status 500 (Internal Server Error) if the aplicacion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/aplicacions")
    @Timed
    public ResponseEntity<Aplicacion> updateAplicacion(@Valid @RequestBody Aplicacion aplicacion) throws URISyntaxException {
        log.debug("REST request to update Aplicacion : {}", aplicacion);
        if (aplicacion.getId() == null) {
            return createAplicacion(aplicacion);
        }
        Aplicacion result = aplicacionService.save(aplicacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, aplicacion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /aplicacions : get all the aplicacions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of aplicacions in body
     */
    @GetMapping("/aplicacions")
    @Timed
    public List<Aplicacion> getAllAplicacions() {
        log.debug("REST request to get all Aplicacions");
        return aplicacionService.findAll();
        }

    /**
     * GET  /aplicacions/:id : get the "id" aplicacion.
     *
     * @param id the id of the aplicacion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the aplicacion, or with status 404 (Not Found)
     */
    @GetMapping("/aplicacions/{id}")
    @Timed
    public ResponseEntity<Aplicacion> getAplicacion(@PathVariable Long id) {
        log.debug("REST request to get Aplicacion : {}", id);
        Aplicacion aplicacion = aplicacionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(aplicacion));
    }

    /**
     * DELETE  /aplicacions/:id : delete the "id" aplicacion.
     *
     * @param id the id of the aplicacion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/aplicacions/{id}")
    @Timed
    public ResponseEntity<Void> deleteAplicacion(@PathVariable Long id) {
        log.debug("REST request to delete Aplicacion : {}", id);
        aplicacionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
