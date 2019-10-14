package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.Cilindrada;
import soldimet.repository.CilindradaRepository;
import soldimet.service.CilindradaService;
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
 * Integration tests for the {@link CilindradaResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class CilindradaResourceIT {

    private static final Integer DEFAULT_CANTIDAD_DE_CILINDROS = 1;
    private static final Integer UPDATED_CANTIDAD_DE_CILINDROS = 2;
    private static final Integer SMALLER_CANTIDAD_DE_CILINDROS = 1 - 1;

    @Autowired
    private CilindradaRepository cilindradaRepository;

    @Autowired
    private CilindradaService cilindradaService;

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

    private MockMvc restCilindradaMockMvc;

    private Cilindrada cilindrada;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CilindradaResource cilindradaResource = new CilindradaResource(cilindradaService);
        this.restCilindradaMockMvc = MockMvcBuilders.standaloneSetup(cilindradaResource)
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
    public static Cilindrada createEntity(EntityManager em) {
        Cilindrada cilindrada = new Cilindrada()
            .cantidadDeCilindros(DEFAULT_CANTIDAD_DE_CILINDROS);
        return cilindrada;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cilindrada createUpdatedEntity(EntityManager em) {
        Cilindrada cilindrada = new Cilindrada()
            .cantidadDeCilindros(UPDATED_CANTIDAD_DE_CILINDROS);
        return cilindrada;
    }

    @BeforeEach
    public void initTest() {
        cilindrada = createEntity(em);
    }

    @Test
    @Transactional
    public void createCilindrada() throws Exception {
        int databaseSizeBeforeCreate = cilindradaRepository.findAll().size();

        // Create the Cilindrada
        restCilindradaMockMvc.perform(post("/api/cilindradas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cilindrada)))
            .andExpect(status().isCreated());

        // Validate the Cilindrada in the database
        List<Cilindrada> cilindradaList = cilindradaRepository.findAll();
        assertThat(cilindradaList).hasSize(databaseSizeBeforeCreate + 1);
        Cilindrada testCilindrada = cilindradaList.get(cilindradaList.size() - 1);
        assertThat(testCilindrada.getCantidadDeCilindros()).isEqualTo(DEFAULT_CANTIDAD_DE_CILINDROS);
    }

    @Test
    @Transactional
    public void createCilindradaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cilindradaRepository.findAll().size();

        // Create the Cilindrada with an existing ID
        cilindrada.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCilindradaMockMvc.perform(post("/api/cilindradas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cilindrada)))
            .andExpect(status().isBadRequest());

        // Validate the Cilindrada in the database
        List<Cilindrada> cilindradaList = cilindradaRepository.findAll();
        assertThat(cilindradaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCantidadDeCilindrosIsRequired() throws Exception {
        int databaseSizeBeforeTest = cilindradaRepository.findAll().size();
        // set the field null
        cilindrada.setCantidadDeCilindros(null);

        // Create the Cilindrada, which fails.

        restCilindradaMockMvc.perform(post("/api/cilindradas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cilindrada)))
            .andExpect(status().isBadRequest());

        List<Cilindrada> cilindradaList = cilindradaRepository.findAll();
        assertThat(cilindradaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCilindradas() throws Exception {
        // Initialize the database
        cilindradaRepository.saveAndFlush(cilindrada);

        // Get all the cilindradaList
        restCilindradaMockMvc.perform(get("/api/cilindradas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cilindrada.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidadDeCilindros").value(hasItem(DEFAULT_CANTIDAD_DE_CILINDROS)));
    }
    
    @Test
    @Transactional
    public void getCilindrada() throws Exception {
        // Initialize the database
        cilindradaRepository.saveAndFlush(cilindrada);

        // Get the cilindrada
        restCilindradaMockMvc.perform(get("/api/cilindradas/{id}", cilindrada.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cilindrada.getId().intValue()))
            .andExpect(jsonPath("$.cantidadDeCilindros").value(DEFAULT_CANTIDAD_DE_CILINDROS));
    }

    @Test
    @Transactional
    public void getNonExistingCilindrada() throws Exception {
        // Get the cilindrada
        restCilindradaMockMvc.perform(get("/api/cilindradas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCilindrada() throws Exception {
        // Initialize the database
        cilindradaService.save(cilindrada);

        int databaseSizeBeforeUpdate = cilindradaRepository.findAll().size();

        // Update the cilindrada
        Cilindrada updatedCilindrada = cilindradaRepository.findById(cilindrada.getId()).get();
        // Disconnect from session so that the updates on updatedCilindrada are not directly saved in db
        em.detach(updatedCilindrada);
        updatedCilindrada
            .cantidadDeCilindros(UPDATED_CANTIDAD_DE_CILINDROS);

        restCilindradaMockMvc.perform(put("/api/cilindradas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCilindrada)))
            .andExpect(status().isOk());

        // Validate the Cilindrada in the database
        List<Cilindrada> cilindradaList = cilindradaRepository.findAll();
        assertThat(cilindradaList).hasSize(databaseSizeBeforeUpdate);
        Cilindrada testCilindrada = cilindradaList.get(cilindradaList.size() - 1);
        assertThat(testCilindrada.getCantidadDeCilindros()).isEqualTo(UPDATED_CANTIDAD_DE_CILINDROS);
    }

    @Test
    @Transactional
    public void updateNonExistingCilindrada() throws Exception {
        int databaseSizeBeforeUpdate = cilindradaRepository.findAll().size();

        // Create the Cilindrada

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCilindradaMockMvc.perform(put("/api/cilindradas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cilindrada)))
            .andExpect(status().isBadRequest());

        // Validate the Cilindrada in the database
        List<Cilindrada> cilindradaList = cilindradaRepository.findAll();
        assertThat(cilindradaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCilindrada() throws Exception {
        // Initialize the database
        cilindradaService.save(cilindrada);

        int databaseSizeBeforeDelete = cilindradaRepository.findAll().size();

        // Delete the cilindrada
        restCilindradaMockMvc.perform(delete("/api/cilindradas/{id}", cilindrada.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Cilindrada> cilindradaList = cilindradaRepository.findAll();
        assertThat(cilindradaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cilindrada.class);
        Cilindrada cilindrada1 = new Cilindrada();
        cilindrada1.setId(1L);
        Cilindrada cilindrada2 = new Cilindrada();
        cilindrada2.setId(cilindrada1.getId());
        assertThat(cilindrada1).isEqualTo(cilindrada2);
        cilindrada2.setId(2L);
        assertThat(cilindrada1).isNotEqualTo(cilindrada2);
        cilindrada1.setId(null);
        assertThat(cilindrada1).isNotEqualTo(cilindrada2);
    }
}
