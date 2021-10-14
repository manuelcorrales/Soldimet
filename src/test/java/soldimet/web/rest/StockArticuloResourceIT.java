package soldimet.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import soldimet.IntegrationTest;
import soldimet.domain.Articulo;
import soldimet.domain.MedidaArticulo;
import soldimet.domain.StockArticulo;
import soldimet.domain.Sucursal;
import soldimet.repository.StockArticuloRepository;

/**
 * Integration tests for the {@link StockArticuloResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class StockArticuloResourceIT {

    private static final Integer DEFAULT_CANTIDAD = 1;
    private static final Integer UPDATED_CANTIDAD = 2;

    private static final String ENTITY_API_URL = "/api/stock-articulos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private StockArticuloRepository stockArticuloRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStockArticuloMockMvc;

    private StockArticulo stockArticulo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StockArticulo createEntity(EntityManager em) {
        StockArticulo stockArticulo = new StockArticulo().cantidad(DEFAULT_CANTIDAD);
        // Add required entity
        MedidaArticulo medidaArticulo;
        if (TestUtil.findAll(em, MedidaArticulo.class).isEmpty()) {
            medidaArticulo = MedidaArticuloResourceIT.createEntity(em);
            em.persist(medidaArticulo);
            em.flush();
        } else {
            medidaArticulo = TestUtil.findAll(em, MedidaArticulo.class).get(0);
        }
        stockArticulo.setMedida(medidaArticulo);
        // Add required entity
        Articulo articulo;
        if (TestUtil.findAll(em, Articulo.class).isEmpty()) {
            articulo = ArticuloResourceIT.createEntity(em);
            em.persist(articulo);
            em.flush();
        } else {
            articulo = TestUtil.findAll(em, Articulo.class).get(0);
        }
        stockArticulo.setArticulo(articulo);
        // Add required entity
        Sucursal sucursal;
        if (TestUtil.findAll(em, Sucursal.class).isEmpty()) {
            sucursal = SucursalResourceIT.createEntity(em);
            em.persist(sucursal);
            em.flush();
        } else {
            sucursal = TestUtil.findAll(em, Sucursal.class).get(0);
        }
        stockArticulo.setSucursal(sucursal);
        return stockArticulo;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StockArticulo createUpdatedEntity(EntityManager em) {
        StockArticulo stockArticulo = new StockArticulo().cantidad(UPDATED_CANTIDAD);
        // Add required entity
        MedidaArticulo medidaArticulo;
        if (TestUtil.findAll(em, MedidaArticulo.class).isEmpty()) {
            medidaArticulo = MedidaArticuloResourceIT.createUpdatedEntity(em);
            em.persist(medidaArticulo);
            em.flush();
        } else {
            medidaArticulo = TestUtil.findAll(em, MedidaArticulo.class).get(0);
        }
        stockArticulo.setMedida(medidaArticulo);
        // Add required entity
        Articulo articulo;
        if (TestUtil.findAll(em, Articulo.class).isEmpty()) {
            articulo = ArticuloResourceIT.createUpdatedEntity(em);
            em.persist(articulo);
            em.flush();
        } else {
            articulo = TestUtil.findAll(em, Articulo.class).get(0);
        }
        stockArticulo.setArticulo(articulo);
        // Add required entity
        Sucursal sucursal;
        if (TestUtil.findAll(em, Sucursal.class).isEmpty()) {
            sucursal = SucursalResourceIT.createUpdatedEntity(em);
            em.persist(sucursal);
            em.flush();
        } else {
            sucursal = TestUtil.findAll(em, Sucursal.class).get(0);
        }
        stockArticulo.setSucursal(sucursal);
        return stockArticulo;
    }

    @BeforeEach
    public void initTest() {
        stockArticulo = createEntity(em);
    }

    @Test
    @Transactional
    void createStockArticulo() throws Exception {
        int databaseSizeBeforeCreate = stockArticuloRepository.findAll().size();
        // Create the StockArticulo
        restStockArticuloMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(stockArticulo)))
            .andExpect(status().isCreated());

        // Validate the StockArticulo in the database
        List<StockArticulo> stockArticuloList = stockArticuloRepository.findAll();
        assertThat(stockArticuloList).hasSize(databaseSizeBeforeCreate + 1);
        StockArticulo testStockArticulo = stockArticuloList.get(stockArticuloList.size() - 1);
        assertThat(testStockArticulo.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
    }

    @Test
    @Transactional
    void createStockArticuloWithExistingId() throws Exception {
        // Create the StockArticulo with an existing ID
        stockArticulo.setId(1L);

        int databaseSizeBeforeCreate = stockArticuloRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restStockArticuloMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(stockArticulo)))
            .andExpect(status().isBadRequest());

        // Validate the StockArticulo in the database
        List<StockArticulo> stockArticuloList = stockArticuloRepository.findAll();
        assertThat(stockArticuloList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkCantidadIsRequired() throws Exception {
        int databaseSizeBeforeTest = stockArticuloRepository.findAll().size();
        // set the field null
        stockArticulo.setCantidad(null);

        // Create the StockArticulo, which fails.

        restStockArticuloMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(stockArticulo)))
            .andExpect(status().isBadRequest());

        List<StockArticulo> stockArticuloList = stockArticuloRepository.findAll();
        assertThat(stockArticuloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllStockArticulos() throws Exception {
        // Initialize the database
        stockArticuloRepository.saveAndFlush(stockArticulo);

        // Get all the stockArticuloList
        restStockArticuloMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stockArticulo.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD)));
    }

    @Test
    @Transactional
    void getStockArticulo() throws Exception {
        // Initialize the database
        stockArticuloRepository.saveAndFlush(stockArticulo);

        // Get the stockArticulo
        restStockArticuloMockMvc
            .perform(get(ENTITY_API_URL_ID, stockArticulo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(stockArticulo.getId().intValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD));
    }

    @Test
    @Transactional
    void getNonExistingStockArticulo() throws Exception {
        // Get the stockArticulo
        restStockArticuloMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewStockArticulo() throws Exception {
        // Initialize the database
        stockArticuloRepository.saveAndFlush(stockArticulo);

        int databaseSizeBeforeUpdate = stockArticuloRepository.findAll().size();

        // Update the stockArticulo
        StockArticulo updatedStockArticulo = stockArticuloRepository.findById(stockArticulo.getId()).get();
        // Disconnect from session so that the updates on updatedStockArticulo are not directly saved in db
        em.detach(updatedStockArticulo);
        updatedStockArticulo.cantidad(UPDATED_CANTIDAD);

        restStockArticuloMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedStockArticulo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedStockArticulo))
            )
            .andExpect(status().isOk());

        // Validate the StockArticulo in the database
        List<StockArticulo> stockArticuloList = stockArticuloRepository.findAll();
        assertThat(stockArticuloList).hasSize(databaseSizeBeforeUpdate);
        StockArticulo testStockArticulo = stockArticuloList.get(stockArticuloList.size() - 1);
        assertThat(testStockArticulo.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
    }

    @Test
    @Transactional
    void putNonExistingStockArticulo() throws Exception {
        int databaseSizeBeforeUpdate = stockArticuloRepository.findAll().size();
        stockArticulo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStockArticuloMockMvc
            .perform(
                put(ENTITY_API_URL_ID, stockArticulo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(stockArticulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the StockArticulo in the database
        List<StockArticulo> stockArticuloList = stockArticuloRepository.findAll();
        assertThat(stockArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchStockArticulo() throws Exception {
        int databaseSizeBeforeUpdate = stockArticuloRepository.findAll().size();
        stockArticulo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStockArticuloMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(stockArticulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the StockArticulo in the database
        List<StockArticulo> stockArticuloList = stockArticuloRepository.findAll();
        assertThat(stockArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamStockArticulo() throws Exception {
        int databaseSizeBeforeUpdate = stockArticuloRepository.findAll().size();
        stockArticulo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStockArticuloMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(stockArticulo)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the StockArticulo in the database
        List<StockArticulo> stockArticuloList = stockArticuloRepository.findAll();
        assertThat(stockArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateStockArticuloWithPatch() throws Exception {
        // Initialize the database
        stockArticuloRepository.saveAndFlush(stockArticulo);

        int databaseSizeBeforeUpdate = stockArticuloRepository.findAll().size();

        // Update the stockArticulo using partial update
        StockArticulo partialUpdatedStockArticulo = new StockArticulo();
        partialUpdatedStockArticulo.setId(stockArticulo.getId());

        restStockArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStockArticulo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedStockArticulo))
            )
            .andExpect(status().isOk());

        // Validate the StockArticulo in the database
        List<StockArticulo> stockArticuloList = stockArticuloRepository.findAll();
        assertThat(stockArticuloList).hasSize(databaseSizeBeforeUpdate);
        StockArticulo testStockArticulo = stockArticuloList.get(stockArticuloList.size() - 1);
        assertThat(testStockArticulo.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
    }

    @Test
    @Transactional
    void fullUpdateStockArticuloWithPatch() throws Exception {
        // Initialize the database
        stockArticuloRepository.saveAndFlush(stockArticulo);

        int databaseSizeBeforeUpdate = stockArticuloRepository.findAll().size();

        // Update the stockArticulo using partial update
        StockArticulo partialUpdatedStockArticulo = new StockArticulo();
        partialUpdatedStockArticulo.setId(stockArticulo.getId());

        partialUpdatedStockArticulo.cantidad(UPDATED_CANTIDAD);

        restStockArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStockArticulo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedStockArticulo))
            )
            .andExpect(status().isOk());

        // Validate the StockArticulo in the database
        List<StockArticulo> stockArticuloList = stockArticuloRepository.findAll();
        assertThat(stockArticuloList).hasSize(databaseSizeBeforeUpdate);
        StockArticulo testStockArticulo = stockArticuloList.get(stockArticuloList.size() - 1);
        assertThat(testStockArticulo.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
    }

    @Test
    @Transactional
    void patchNonExistingStockArticulo() throws Exception {
        int databaseSizeBeforeUpdate = stockArticuloRepository.findAll().size();
        stockArticulo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStockArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, stockArticulo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(stockArticulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the StockArticulo in the database
        List<StockArticulo> stockArticuloList = stockArticuloRepository.findAll();
        assertThat(stockArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchStockArticulo() throws Exception {
        int databaseSizeBeforeUpdate = stockArticuloRepository.findAll().size();
        stockArticulo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStockArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(stockArticulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the StockArticulo in the database
        List<StockArticulo> stockArticuloList = stockArticuloRepository.findAll();
        assertThat(stockArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamStockArticulo() throws Exception {
        int databaseSizeBeforeUpdate = stockArticuloRepository.findAll().size();
        stockArticulo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStockArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(stockArticulo))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the StockArticulo in the database
        List<StockArticulo> stockArticuloList = stockArticuloRepository.findAll();
        assertThat(stockArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteStockArticulo() throws Exception {
        // Initialize the database
        stockArticuloRepository.saveAndFlush(stockArticulo);

        int databaseSizeBeforeDelete = stockArticuloRepository.findAll().size();

        // Delete the stockArticulo
        restStockArticuloMockMvc
            .perform(delete(ENTITY_API_URL_ID, stockArticulo.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StockArticulo> stockArticuloList = stockArticuloRepository.findAll();
        assertThat(stockArticuloList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
