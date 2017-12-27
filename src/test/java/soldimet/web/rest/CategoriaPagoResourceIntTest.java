package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.CategoriaPago;
import soldimet.repository.CategoriaPagoRepository;
import soldimet.service.CategoriaPagoService;
import soldimet.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CategoriaPagoResource REST controller.
 *
 * @see CategoriaPagoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class CategoriaPagoResourceIntTest {

    private static final String DEFAULT_NOMBRE_CATEGORIA_PAGO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_CATEGORIA_PAGO = "BBBBBBBBBB";

    @Autowired
    private CategoriaPagoRepository categoriaPagoRepository;

    @Autowired
    private CategoriaPagoService categoriaPagoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCategoriaPagoMockMvc;

    private CategoriaPago categoriaPago;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CategoriaPagoResource categoriaPagoResource = new CategoriaPagoResource(categoriaPagoService);
        this.restCategoriaPagoMockMvc = MockMvcBuilders.standaloneSetup(categoriaPagoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CategoriaPago createEntity(EntityManager em) {
        CategoriaPago categoriaPago = new CategoriaPago()
            .nombreCategoriaPago(DEFAULT_NOMBRE_CATEGORIA_PAGO);
        return categoriaPago;
    }

    @Before
    public void initTest() {
        categoriaPago = createEntity(em);
    }

    @Test
    @Transactional
    public void createCategoriaPago() throws Exception {
        int databaseSizeBeforeCreate = categoriaPagoRepository.findAll().size();

        // Create the CategoriaPago
        restCategoriaPagoMockMvc.perform(post("/api/categoria-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriaPago)))
            .andExpect(status().isCreated());

        // Validate the CategoriaPago in the database
        List<CategoriaPago> categoriaPagoList = categoriaPagoRepository.findAll();
        assertThat(categoriaPagoList).hasSize(databaseSizeBeforeCreate + 1);
        CategoriaPago testCategoriaPago = categoriaPagoList.get(categoriaPagoList.size() - 1);
        assertThat(testCategoriaPago.getNombreCategoriaPago()).isEqualTo(DEFAULT_NOMBRE_CATEGORIA_PAGO);
    }

    @Test
    @Transactional
    public void createCategoriaPagoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = categoriaPagoRepository.findAll().size();

        // Create the CategoriaPago with an existing ID
        categoriaPago.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCategoriaPagoMockMvc.perform(post("/api/categoria-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriaPago)))
            .andExpect(status().isBadRequest());

        // Validate the CategoriaPago in the database
        List<CategoriaPago> categoriaPagoList = categoriaPagoRepository.findAll();
        assertThat(categoriaPagoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreCategoriaPagoIsRequired() throws Exception {
        int databaseSizeBeforeTest = categoriaPagoRepository.findAll().size();
        // set the field null
        categoriaPago.setNombreCategoriaPago(null);

        // Create the CategoriaPago, which fails.

        restCategoriaPagoMockMvc.perform(post("/api/categoria-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriaPago)))
            .andExpect(status().isBadRequest());

        List<CategoriaPago> categoriaPagoList = categoriaPagoRepository.findAll();
        assertThat(categoriaPagoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCategoriaPagos() throws Exception {
        // Initialize the database
        categoriaPagoRepository.saveAndFlush(categoriaPago);

        // Get all the categoriaPagoList
        restCategoriaPagoMockMvc.perform(get("/api/categoria-pagos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(categoriaPago.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreCategoriaPago").value(hasItem(DEFAULT_NOMBRE_CATEGORIA_PAGO.toString())));
    }

    @Test
    @Transactional
    public void getCategoriaPago() throws Exception {
        // Initialize the database
        categoriaPagoRepository.saveAndFlush(categoriaPago);

        // Get the categoriaPago
        restCategoriaPagoMockMvc.perform(get("/api/categoria-pagos/{id}", categoriaPago.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(categoriaPago.getId().intValue()))
            .andExpect(jsonPath("$.nombreCategoriaPago").value(DEFAULT_NOMBRE_CATEGORIA_PAGO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCategoriaPago() throws Exception {
        // Get the categoriaPago
        restCategoriaPagoMockMvc.perform(get("/api/categoria-pagos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCategoriaPago() throws Exception {
        // Initialize the database
        categoriaPagoService.save(categoriaPago);

        int databaseSizeBeforeUpdate = categoriaPagoRepository.findAll().size();

        // Update the categoriaPago
        CategoriaPago updatedCategoriaPago = categoriaPagoRepository.findOne(categoriaPago.getId());
        updatedCategoriaPago
            .nombreCategoriaPago(UPDATED_NOMBRE_CATEGORIA_PAGO);

        restCategoriaPagoMockMvc.perform(put("/api/categoria-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCategoriaPago)))
            .andExpect(status().isOk());

        // Validate the CategoriaPago in the database
        List<CategoriaPago> categoriaPagoList = categoriaPagoRepository.findAll();
        assertThat(categoriaPagoList).hasSize(databaseSizeBeforeUpdate);
        CategoriaPago testCategoriaPago = categoriaPagoList.get(categoriaPagoList.size() - 1);
        assertThat(testCategoriaPago.getNombreCategoriaPago()).isEqualTo(UPDATED_NOMBRE_CATEGORIA_PAGO);
    }

    @Test
    @Transactional
    public void updateNonExistingCategoriaPago() throws Exception {
        int databaseSizeBeforeUpdate = categoriaPagoRepository.findAll().size();

        // Create the CategoriaPago

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCategoriaPagoMockMvc.perform(put("/api/categoria-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriaPago)))
            .andExpect(status().isCreated());

        // Validate the CategoriaPago in the database
        List<CategoriaPago> categoriaPagoList = categoriaPagoRepository.findAll();
        assertThat(categoriaPagoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCategoriaPago() throws Exception {
        // Initialize the database
        categoriaPagoService.save(categoriaPago);

        int databaseSizeBeforeDelete = categoriaPagoRepository.findAll().size();

        // Get the categoriaPago
        restCategoriaPagoMockMvc.perform(delete("/api/categoria-pagos/{id}", categoriaPago.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CategoriaPago> categoriaPagoList = categoriaPagoRepository.findAll();
        assertThat(categoriaPagoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CategoriaPago.class);
        CategoriaPago categoriaPago1 = new CategoriaPago();
        categoriaPago1.setId(1L);
        CategoriaPago categoriaPago2 = new CategoriaPago();
        categoriaPago2.setId(categoriaPago1.getId());
        assertThat(categoriaPago1).isEqualTo(categoriaPago2);
        categoriaPago2.setId(2L);
        assertThat(categoriaPago1).isNotEqualTo(categoriaPago2);
        categoriaPago1.setId(null);
        assertThat(categoriaPago1).isNotEqualTo(categoriaPago2);
    }
}
