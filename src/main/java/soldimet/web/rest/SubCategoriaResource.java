package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.SubCategoria;
import soldimet.service.SubCategoriaService;
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
 * REST controller for managing SubCategoria.
 */
@RestController
@RequestMapping("/api")
public class SubCategoriaResource {

    private final Logger log = LoggerFactory.getLogger(SubCategoriaResource.class);

    private static final String ENTITY_NAME = "subCategoria";

    private final SubCategoriaService subCategoriaService;

    public SubCategoriaResource(SubCategoriaService subCategoriaService) {
        this.subCategoriaService = subCategoriaService;
    }

    /**
     * POST  /sub-categorias : Create a new subCategoria.
     *
     * @param subCategoria the subCategoria to create
     * @return the ResponseEntity with status 201 (Created) and with body the new subCategoria, or with status 400 (Bad Request) if the subCategoria has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sub-categorias")
    @Timed
    public ResponseEntity<SubCategoria> createSubCategoria(@Valid @RequestBody SubCategoria subCategoria) throws URISyntaxException {
        log.debug("REST request to save SubCategoria : {}", subCategoria);
        if (subCategoria.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new subCategoria cannot already have an ID")).body(null);
        }
        SubCategoria result = subCategoriaService.save(subCategoria);
        return ResponseEntity.created(new URI("/api/sub-categorias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sub-categorias : Updates an existing subCategoria.
     *
     * @param subCategoria the subCategoria to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated subCategoria,
     * or with status 400 (Bad Request) if the subCategoria is not valid,
     * or with status 500 (Internal Server Error) if the subCategoria couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sub-categorias")
    @Timed
    public ResponseEntity<SubCategoria> updateSubCategoria(@Valid @RequestBody SubCategoria subCategoria) throws URISyntaxException {
        log.debug("REST request to update SubCategoria : {}", subCategoria);
        if (subCategoria.getId() == null) {
            return createSubCategoria(subCategoria);
        }
        SubCategoria result = subCategoriaService.save(subCategoria);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, subCategoria.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sub-categorias : get all the subCategorias.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of subCategorias in body
     */
    @GetMapping("/sub-categorias")
    @Timed
    public List<SubCategoria> getAllSubCategorias() {
        log.debug("REST request to get all SubCategorias");
        return subCategoriaService.findAll();
        }

    /**
     * GET  /sub-categorias/:id : get the "id" subCategoria.
     *
     * @param id the id of the subCategoria to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the subCategoria, or with status 404 (Not Found)
     */
    @GetMapping("/sub-categorias/{id}")
    @Timed
    public ResponseEntity<SubCategoria> getSubCategoria(@PathVariable Long id) {
        log.debug("REST request to get SubCategoria : {}", id);
        SubCategoria subCategoria = subCategoriaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(subCategoria));
    }

    /**
     * DELETE  /sub-categorias/:id : delete the "id" subCategoria.
     *
     * @param id the id of the subCategoria to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sub-categorias/{id}")
    @Timed
    public ResponseEntity<Void> deleteSubCategoria(@PathVariable Long id) {
        log.debug("REST request to delete SubCategoria : {}", id);
        subCategoriaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
