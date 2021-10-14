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
import soldimet.domain.StockArticulo;
import soldimet.repository.StockArticuloRepository;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.StockArticulo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class StockArticuloResource {

    private final Logger log = LoggerFactory.getLogger(StockArticuloResource.class);

    private static final String ENTITY_NAME = "stockArticulo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StockArticuloRepository stockArticuloRepository;

    public StockArticuloResource(StockArticuloRepository stockArticuloRepository) {
        this.stockArticuloRepository = stockArticuloRepository;
    }

    /**
     * {@code POST  /stock-articulos} : Create a new stockArticulo.
     *
     * @param stockArticulo the stockArticulo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new stockArticulo, or with status {@code 400 (Bad Request)} if the stockArticulo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/stock-articulos")
    public ResponseEntity<StockArticulo> createStockArticulo(@Valid @RequestBody StockArticulo stockArticulo) throws URISyntaxException {
        log.debug("REST request to save StockArticulo : {}", stockArticulo);
        if (stockArticulo.getId() != null) {
            throw new BadRequestAlertException("A new stockArticulo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StockArticulo result = stockArticuloRepository.save(stockArticulo);
        return ResponseEntity
            .created(new URI("/api/stock-articulos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /stock-articulos/:id} : Updates an existing stockArticulo.
     *
     * @param id the id of the stockArticulo to save.
     * @param stockArticulo the stockArticulo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated stockArticulo,
     * or with status {@code 400 (Bad Request)} if the stockArticulo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the stockArticulo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/stock-articulos/{id}")
    public ResponseEntity<StockArticulo> updateStockArticulo(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody StockArticulo stockArticulo
    ) throws URISyntaxException {
        log.debug("REST request to update StockArticulo : {}, {}", id, stockArticulo);
        if (stockArticulo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, stockArticulo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!stockArticuloRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        StockArticulo result = stockArticuloRepository.save(stockArticulo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, stockArticulo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /stock-articulos/:id} : Partial updates given fields of an existing stockArticulo, field will ignore if it is null
     *
     * @param id the id of the stockArticulo to save.
     * @param stockArticulo the stockArticulo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated stockArticulo,
     * or with status {@code 400 (Bad Request)} if the stockArticulo is not valid,
     * or with status {@code 404 (Not Found)} if the stockArticulo is not found,
     * or with status {@code 500 (Internal Server Error)} if the stockArticulo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/stock-articulos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<StockArticulo> partialUpdateStockArticulo(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody StockArticulo stockArticulo
    ) throws URISyntaxException {
        log.debug("REST request to partial update StockArticulo partially : {}, {}", id, stockArticulo);
        if (stockArticulo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, stockArticulo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!stockArticuloRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<StockArticulo> result = stockArticuloRepository
            .findById(stockArticulo.getId())
            .map(
                existingStockArticulo -> {
                    if (stockArticulo.getCantidad() != null) {
                        existingStockArticulo.setCantidad(stockArticulo.getCantidad());
                    }

                    return existingStockArticulo;
                }
            )
            .map(stockArticuloRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, stockArticulo.getId().toString())
        );
    }

    /**
     * {@code GET  /stock-articulos} : get all the stockArticulos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of stockArticulos in body.
     */
    @GetMapping("/stock-articulos")
    public List<StockArticulo> getAllStockArticulos() {
        log.debug("REST request to get all StockArticulos");
        return stockArticuloRepository.findAll();
    }

    /**
     * {@code GET  /stock-articulos/:id} : get the "id" stockArticulo.
     *
     * @param id the id of the stockArticulo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the stockArticulo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/stock-articulos/{id}")
    public ResponseEntity<StockArticulo> getStockArticulo(@PathVariable Long id) {
        log.debug("REST request to get StockArticulo : {}", id);
        Optional<StockArticulo> stockArticulo = stockArticuloRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(stockArticulo);
    }

    /**
     * {@code DELETE  /stock-articulos/:id} : delete the "id" stockArticulo.
     *
     * @param id the id of the stockArticulo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/stock-articulos/{id}")
    public ResponseEntity<Void> deleteStockArticulo(@PathVariable Long id) {
        log.debug("REST request to delete StockArticulo : {}", id);
        stockArticuloRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
