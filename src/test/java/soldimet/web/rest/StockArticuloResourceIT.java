package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.StockArticulo;
import soldimet.domain.MedidaArticulo;
import soldimet.domain.Sucursal;
import soldimet.repository.StockArticuloRepository;
import soldimet.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static soldimet.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link StockArticuloResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class StockArticuloResourceIT {

    private static final Integer DEFAULT_CANTIDAD = 1;
    private static final Integer UPDATED_CANTIDAD = 2;
    private static final Integer SMALLER_CANTIDAD = 1 - 1;

    @Autowired
    private StockArticuloRepository stockArticuloRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restStockArticuloMockMvc;

    private StockArticulo stockArticulo;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StockArticuloResource stockArticuloResource = new StockArticuloResource(stockArticuloRepository);
        this.restStockArticuloMockMvc = MockMvcBuilders.standaloneSetup(stockArticuloResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StockArticulo createEntity(EntityManager em) {
        StockArticulo stockArticulo = new StockArticulo()
            .cantidad(DEFAULT_CANTIDAD);
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
        StockArticulo stockArticulo = new StockArticulo()
            .cantidad(UPDATED_CANTIDAD);
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
    public void createStockArticulo() throws Exception {
        int databaseSizeBeforeCreate = stockArticuloRepository.findAll().size();

        // Create the StockArticulo
        restStockArticuloMockMvc.perform(post("/api/stock-articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stockArticulo)))
            .andExpect(status().isCreated());

        // Validate the StockArticulo in the database
        List<StockArticulo> stockArticuloList = stockArticuloRepository.findAll();
        assertThat(stockArticuloList).hasSize(databaseSizeBeforeCreate + 1);
        StockArticulo testStockArticulo = stockArticuloList.get(stockArticuloList.size() - 1);
        assertThat(testStockArticulo.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
    }

    @Test
    @Transactional
    public void createStockArticuloWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stockArticuloRepository.findAll().size();

        // Create the StockArticulo with an existing ID
        stockArticulo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStockArticuloMockMvc.perform(post("/api/stock-articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stockArticulo)))
            .andExpect(status().isBadRequest());

        // Validate the StockArticulo in the database
        List<StockArticulo> stockArticuloList = stockArticuloRepository.findAll();
        assertThat(stockArticuloList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCantidadIsRequired() throws Exception {
        int databaseSizeBeforeTest = stockArticuloRepository.findAll().size();
        // set the field null
        stockArticulo.setCantidad(null);

        // Create the StockArticulo, which fails.

        restStockArticuloMockMvc.perform(post("/api/stock-articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stockArticulo)))
            .andExpect(status().isBadRequest());

        List<StockArticulo> stockArticuloList = stockArticuloRepository.findAll();
        assertThat(stockArticuloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllStockArticulos() throws Exception {
        // Initialize the database
        stockArticuloRepository.saveAndFlush(stockArticulo);

        // Get all the stockArticuloList
        restStockArticuloMockMvc.perform(get("/api/stock-articulos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stockArticulo.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD)));
    }
    
    @Test
    @Transactional
    public void getStockArticulo() throws Exception {
        // Initialize the database
        stockArticuloRepository.saveAndFlush(stockArticulo);

        // Get the stockArticulo
        restStockArticuloMockMvc.perform(get("/api/stock-articulos/{id}", stockArticulo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(stockArticulo.getId().intValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD));
    }

    @Test
    @Transactional
    public void getNonExistingStockArticulo() throws Exception {
        // Get the stockArticulo
        restStockArticuloMockMvc.perform(get("/api/stock-articulos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStockArticulo() throws Exception {
        // Initialize the database
        stockArticuloRepository.saveAndFlush(stockArticulo);

        int databaseSizeBeforeUpdate = stockArticuloRepository.findAll().size();

        // Update the stockArticulo
        StockArticulo updatedStockArticulo = stockArticuloRepository.findById(stockArticulo.getId()).get();
        // Disconnect from session so that the updates on updatedStockArticulo are not directly saved in db
        em.detach(updatedStockArticulo);
        updatedStockArticulo
            .cantidad(UPDATED_CANTIDAD);

        restStockArticuloMockMvc.perform(put("/api/stock-articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStockArticulo)))
            .andExpect(status().isOk());

        // Validate the StockArticulo in the database
        List<StockArticulo> stockArticuloList = stockArticuloRepository.findAll();
        assertThat(stockArticuloList).hasSize(databaseSizeBeforeUpdate);
        StockArticulo testStockArticulo = stockArticuloList.get(stockArticuloList.size() - 1);
        assertThat(testStockArticulo.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
    }

    @Test
    @Transactional
    public void updateNonExistingStockArticulo() throws Exception {
        int databaseSizeBeforeUpdate = stockArticuloRepository.findAll().size();

        // Create the StockArticulo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStockArticuloMockMvc.perform(put("/api/stock-articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stockArticulo)))
            .andExpect(status().isBadRequest());

        // Validate the StockArticulo in the database
        List<StockArticulo> stockArticuloList = stockArticuloRepository.findAll();
        assertThat(stockArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStockArticulo() throws Exception {
        // Initialize the database
        stockArticuloRepository.saveAndFlush(stockArticulo);

        int databaseSizeBeforeDelete = stockArticuloRepository.findAll().size();

        // Delete the stockArticulo
        restStockArticuloMockMvc.perform(delete("/api/stock-articulos/{id}", stockArticulo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StockArticulo> stockArticuloList = stockArticuloRepository.findAll();
        assertThat(stockArticuloList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StockArticulo.class);
        StockArticulo stockArticulo1 = new StockArticulo();
        stockArticulo1.setId(1L);
        StockArticulo stockArticulo2 = new StockArticulo();
        stockArticulo2.setId(stockArticulo1.getId());
        assertThat(stockArticulo1).isEqualTo(stockArticulo2);
        stockArticulo2.setId(2L);
        assertThat(stockArticulo1).isNotEqualTo(stockArticulo2);
        stockArticulo1.setId(null);
        assertThat(stockArticulo1).isNotEqualTo(stockArticulo2);
    }
}
