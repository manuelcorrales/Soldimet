package soldimet.web.rest;

import soldimet.domain.StockArticulo;
import soldimet.repository.StockArticuloRepository;
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
 * REST controller for managing {@link soldimet.domain.StockArticulo}.
 */
@RestController
@RequestMapping("/api")
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
        return ResponseEntity.created(new URI("/api/stock-articulos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /stock-articulos} : Updates an existing stockArticulo.
     *
     * @param stockArticulo the stockArticulo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated stockArticulo,
     * or with status {@code 400 (Bad Request)} if the stockArticulo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the stockArticulo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/stock-articulos")
    public ResponseEntity<StockArticulo> updateStockArticulo(@Valid @RequestBody StockArticulo stockArticulo) throws URISyntaxException {
        log.debug("REST request to update StockArticulo : {}", stockArticulo);
        if (stockArticulo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StockArticulo result = stockArticuloRepository.save(stockArticulo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, stockArticulo.getId().toString()))
            .body(result);
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
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
