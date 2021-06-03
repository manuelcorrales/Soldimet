package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.MedidaArticulo;
import soldimet.repository.MedidaArticuloRepository;
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
 * Integration tests for the {@link MedidaArticuloResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class MedidaArticuloResourceIT {

    private static final String DEFAULT_MEDIDA = "AAAAAAAAAA";
    private static final String UPDATED_MEDIDA = "BBBBBBBBBB";

    @Autowired
    private MedidaArticuloRepository medidaArticuloRepository;

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

    private MockMvc restMedidaArticuloMockMvc;

    private MedidaArticulo medidaArticulo;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MedidaArticuloResource medidaArticuloResource = new MedidaArticuloResource(medidaArticuloRepository);
        this.restMedidaArticuloMockMvc = MockMvcBuilders.standaloneSetup(medidaArticuloResource)
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
    public static MedidaArticulo createEntity(EntityManager em) {
        MedidaArticulo medidaArticulo = new MedidaArticulo()
            .medida(DEFAULT_MEDIDA);
        return medidaArticulo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MedidaArticulo createUpdatedEntity(EntityManager em) {
        MedidaArticulo medidaArticulo = new MedidaArticulo()
            .medida(UPDATED_MEDIDA);
        return medidaArticulo;
    }

    @BeforeEach
    public void initTest() {
        medidaArticulo = createEntity(em);
    }

    @Test
    @Transactional
    public void createMedidaArticulo() throws Exception {
        int databaseSizeBeforeCreate = medidaArticuloRepository.findAll().size();

        // Create the MedidaArticulo
        restMedidaArticuloMockMvc.perform(post("/api/medida-articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medidaArticulo)))
            .andExpect(status().isCreated());

        // Validate the MedidaArticulo in the database
        List<MedidaArticulo> medidaArticuloList = medidaArticuloRepository.findAll();
        assertThat(medidaArticuloList).hasSize(databaseSizeBeforeCreate + 1);
        MedidaArticulo testMedidaArticulo = medidaArticuloList.get(medidaArticuloList.size() - 1);
        assertThat(testMedidaArticulo.getMedida()).isEqualTo(DEFAULT_MEDIDA);
    }

    @Test
    @Transactional
    public void createMedidaArticuloWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = medidaArticuloRepository.findAll().size();

        // Create the MedidaArticulo with an existing ID
        medidaArticulo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedidaArticuloMockMvc.perform(post("/api/medida-articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medidaArticulo)))
            .andExpect(status().isBadRequest());

        // Validate the MedidaArticulo in the database
        List<MedidaArticulo> medidaArticuloList = medidaArticuloRepository.findAll();
        assertThat(medidaArticuloList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMedidaArticulos() throws Exception {
        // Initialize the database
        medidaArticuloRepository.saveAndFlush(medidaArticulo);

        // Get all the medidaArticuloList
        restMedidaArticuloMockMvc.perform(get("/api/medida-articulos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medidaArticulo.getId().intValue())))
            .andExpect(jsonPath("$.[*].medida").value(hasItem(DEFAULT_MEDIDA.toString())));
    }
    
    @Test
    @Transactional
    public void getMedidaArticulo() throws Exception {
        // Initialize the database
        medidaArticuloRepository.saveAndFlush(medidaArticulo);

        // Get the medidaArticulo
        restMedidaArticuloMockMvc.perform(get("/api/medida-articulos/{id}", medidaArticulo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(medidaArticulo.getId().intValue()))
            .andExpect(jsonPath("$.medida").value(DEFAULT_MEDIDA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMedidaArticulo() throws Exception {
        // Get the medidaArticulo
        restMedidaArticuloMockMvc.perform(get("/api/medida-articulos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMedidaArticulo() throws Exception {
        // Initialize the database
        medidaArticuloRepository.saveAndFlush(medidaArticulo);

        int databaseSizeBeforeUpdate = medidaArticuloRepository.findAll().size();

        // Update the medidaArticulo
        MedidaArticulo updatedMedidaArticulo = medidaArticuloRepository.findById(medidaArticulo.getId()).get();
        // Disconnect from session so that the updates on updatedMedidaArticulo are not directly saved in db
        em.detach(updatedMedidaArticulo);
        updatedMedidaArticulo
            .medida(UPDATED_MEDIDA);

        restMedidaArticuloMockMvc.perform(put("/api/medida-articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMedidaArticulo)))
            .andExpect(status().isOk());

        // Validate the MedidaArticulo in the database
        List<MedidaArticulo> medidaArticuloList = medidaArticuloRepository.findAll();
        assertThat(medidaArticuloList).hasSize(databaseSizeBeforeUpdate);
        MedidaArticulo testMedidaArticulo = medidaArticuloList.get(medidaArticuloList.size() - 1);
        assertThat(testMedidaArticulo.getMedida()).isEqualTo(UPDATED_MEDIDA);
    }

    @Test
    @Transactional
    public void updateNonExistingMedidaArticulo() throws Exception {
        int databaseSizeBeforeUpdate = medidaArticuloRepository.findAll().size();

        // Create the MedidaArticulo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedidaArticuloMockMvc.perform(put("/api/medida-articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medidaArticulo)))
            .andExpect(status().isBadRequest());

        // Validate the MedidaArticulo in the database
        List<MedidaArticulo> medidaArticuloList = medidaArticuloRepository.findAll();
        assertThat(medidaArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMedidaArticulo() throws Exception {
        // Initialize the database
        medidaArticuloRepository.saveAndFlush(medidaArticulo);

        int databaseSizeBeforeDelete = medidaArticuloRepository.findAll().size();

        // Delete the medidaArticulo
        restMedidaArticuloMockMvc.perform(delete("/api/medida-articulos/{id}", medidaArticulo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MedidaArticulo> medidaArticuloList = medidaArticuloRepository.findAll();
        assertThat(medidaArticuloList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedidaArticulo.class);
        MedidaArticulo medidaArticulo1 = new MedidaArticulo();
        medidaArticulo1.setId(1L);
        MedidaArticulo medidaArticulo2 = new MedidaArticulo();
        medidaArticulo2.setId(medidaArticulo1.getId());
        assertThat(medidaArticulo1).isEqualTo(medidaArticulo2);
        medidaArticulo2.setId(2L);
        assertThat(medidaArticulo1).isNotEqualTo(medidaArticulo2);
        medidaArticulo1.setId(null);
        assertThat(medidaArticulo1).isNotEqualTo(medidaArticulo2);
    }
}
