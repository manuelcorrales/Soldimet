package soldimet.web.rest;

import soldimet.domain.SubCategoria;
import soldimet.service.SubCategoriaService;
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
 * REST controller for managing {@link soldimet.domain.SubCategoria}.
 */
@RestController
@RequestMapping("/api")
public class SubCategoriaResource {

    private final Logger log = LoggerFactory.getLogger(SubCategoriaResource.class);

    private static final String ENTITY_NAME = "subCategoria";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubCategoriaService subCategoriaService;

    public SubCategoriaResource(SubCategoriaService subCategoriaService) {
        this.subCategoriaService = subCategoriaService;
    }

    /**
     * {@code POST  /sub-categorias} : Create a new subCategoria.
     *
     * @param subCategoria the subCategoria to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new subCategoria, or with status {@code 400 (Bad Request)} if the subCategoria has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sub-categorias")
    public ResponseEntity<SubCategoria> createSubCategoria(@Valid @RequestBody SubCategoria subCategoria) throws URISyntaxException {
        log.debug("REST request to save SubCategoria : {}", subCategoria);
        if (subCategoria.getId() != null) {
            throw new BadRequestAlertException("A new subCategoria cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubCategoria result = subCategoriaService.save(subCategoria);
        return ResponseEntity.created(new URI("/api/sub-categorias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sub-categorias} : Updates an existing subCategoria.
     *
     * @param subCategoria the subCategoria to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subCategoria,
     * or with status {@code 400 (Bad Request)} if the subCategoria is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subCategoria couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sub-categorias")
    public ResponseEntity<SubCategoria> updateSubCategoria(@Valid @RequestBody SubCategoria subCategoria) throws URISyntaxException {
        log.debug("REST request to update SubCategoria : {}", subCategoria);
        if (subCategoria.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubCategoria result = subCategoriaService.save(subCategoria);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, subCategoria.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sub-categorias} : get all the subCategorias.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subCategorias in body.
     */
    @GetMapping("/sub-categorias")
    public List<SubCategoria> getAllSubCategorias() {
        log.debug("REST request to get all SubCategorias");
        return subCategoriaService.findAll();
    }

    /**
     * {@code GET  /sub-categorias/:id} : get the "id" subCategoria.
     *
     * @param id the id of the subCategoria to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subCategoria, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sub-categorias/{id}")
    public ResponseEntity<SubCategoria> getSubCategoria(@PathVariable Long id) {
        log.debug("REST request to get SubCategoria : {}", id);
        Optional<SubCategoria> subCategoria = subCategoriaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(subCategoria);
    }

    /**
     * {@code DELETE  /sub-categorias/:id} : delete the "id" subCategoria.
     *
     * @param id the id of the subCategoria to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sub-categorias/{id}")
    public ResponseEntity<Void> deleteSubCategoria(@PathVariable Long id) {
        log.debug("REST request to delete SubCategoria : {}", id);
        subCategoriaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
