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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import soldimet.domain.DocumentationType;
import soldimet.repository.DocumentationTypeRepository;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.DocumentationType}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DocumentationTypeResource {

    private final Logger log = LoggerFactory.getLogger(DocumentationTypeResource.class);

    private static final String ENTITY_NAME = "documentationType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DocumentationTypeRepository documentationTypeRepository;

    public DocumentationTypeResource(DocumentationTypeRepository documentationTypeRepository) {
        this.documentationTypeRepository = documentationTypeRepository;
    }

    /**
     * {@code POST  /documentation-types} : Create a new documentationType.
     *
     * @param documentationType the documentationType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new documentationType, or with status {@code 400 (Bad Request)} if the documentationType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/documentation-types")
    public ResponseEntity<DocumentationType> createDocumentationType(@Valid @RequestBody DocumentationType documentationType)
        throws URISyntaxException {
        log.debug("REST request to save DocumentationType : {}", documentationType);
        if (documentationType.getId() != null) {
            throw new BadRequestAlertException("A new documentationType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DocumentationType result = documentationTypeRepository.save(documentationType);
        return ResponseEntity
            .created(new URI("/api/documentation-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /documentation-types/:id} : Updates an existing documentationType.
     *
     * @param id the id of the documentationType to save.
     * @param documentationType the documentationType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated documentationType,
     * or with status {@code 400 (Bad Request)} if the documentationType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the documentationType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/documentation-types/{id}")
    public ResponseEntity<DocumentationType> updateDocumentationType(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody DocumentationType documentationType
    ) throws URISyntaxException {
        log.debug("REST request to update DocumentationType : {}, {}", id, documentationType);
        if (documentationType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, documentationType.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!documentationTypeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DocumentationType result = documentationTypeRepository.save(documentationType);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, documentationType.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /documentation-types/:id} : Partial updates given fields of an existing documentationType, field will ignore if it is null
     *
     * @param id the id of the documentationType to save.
     * @param documentationType the documentationType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated documentationType,
     * or with status {@code 400 (Bad Request)} if the documentationType is not valid,
     * or with status {@code 404 (Not Found)} if the documentationType is not found,
     * or with status {@code 500 (Internal Server Error)} if the documentationType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/documentation-types/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<DocumentationType> partialUpdateDocumentationType(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody DocumentationType documentationType
    ) throws URISyntaxException {
        log.debug("REST request to partial update DocumentationType partially : {}, {}", id, documentationType);
        if (documentationType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, documentationType.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!documentationTypeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DocumentationType> result = documentationTypeRepository
            .findById(documentationType.getId())
            .map(
                existingDocumentationType -> {
                    if (documentationType.getDocumentName() != null) {
                        existingDocumentationType.setDocumentName(documentationType.getDocumentName());
                    }

                    return existingDocumentationType;
                }
            )
            .map(documentationTypeRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, documentationType.getId().toString())
        );
    }

    /**
     * {@code GET  /documentation-types} : get all the documentationTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of documentationTypes in body.
     */
    @GetMapping("/documentation-types")
    public List<DocumentationType> getAllDocumentationTypes() {
        log.debug("REST request to get all DocumentationTypes");
        return documentationTypeRepository.findAll();
    }

    /**
     * {@code GET  /documentation-types/:id} : get the "id" documentationType.
     *
     * @param id the id of the documentationType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the documentationType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/documentation-types/{id}")
    public ResponseEntity<DocumentationType> getDocumentationType(@PathVariable Long id) {
        log.debug("REST request to get DocumentationType : {}", id);
        Optional<DocumentationType> documentationType = documentationTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(documentationType);
    }

    /**
     * {@code DELETE  /documentation-types/:id} : delete the "id" documentationType.
     *
     * @param id the id of the documentationType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/documentation-types/{id}")
    public ResponseEntity<Void> deleteDocumentationType(@PathVariable Long id) {
        log.debug("REST request to delete DocumentationType : {}", id);
        documentationTypeRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
