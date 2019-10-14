package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.EstadoArticulo;
import soldimet.repository.EstadoArticuloRepository;
import soldimet.service.EstadoArticuloService;
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
 * Integration tests for the {@link EstadoArticuloResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class EstadoArticuloResourceIT {

    private static final String DEFAULT_NOMBRE_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_ESTADO = "BBBBBBBBBB";

    @Autowired
    private EstadoArticuloRepository estadoArticuloRepository;

    @Autowired
    private EstadoArticuloService estadoArticuloService;

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

    private MockMvc restEstadoArticuloMockMvc;

    private EstadoArticulo estadoArticulo;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EstadoArticuloResource estadoArticuloResource = new EstadoArticuloResource(estadoArticuloService);
        this.restEstadoArticuloMockMvc = MockMvcBuilders.standaloneSetup(estadoArticuloResource)
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
    public static EstadoArticulo createEntity(EntityManager em) {
        EstadoArticulo estadoArticulo = new EstadoArticulo()
            .nombreEstado(DEFAULT_NOMBRE_ESTADO);
        return estadoArticulo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoArticulo createUpdatedEntity(EntityManager em) {
        EstadoArticulo estadoArticulo = new EstadoArticulo()
            .nombreEstado(UPDATED_NOMBRE_ESTADO);
        return estadoArticulo;
    }

    @BeforeEach
    public void initTest() {
        estadoArticulo = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstadoArticulo() throws Exception {
        int databaseSizeBeforeCreate = estadoArticuloRepository.findAll().size();

        // Create the EstadoArticulo
        restEstadoArticuloMockMvc.perform(post("/api/estado-articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoArticulo)))
            .andExpect(status().isCreated());

        // Validate the EstadoArticulo in the database
        List<EstadoArticulo> estadoArticuloList = estadoArticuloRepository.findAll();
        assertThat(estadoArticuloList).hasSize(databaseSizeBeforeCreate + 1);
        EstadoArticulo testEstadoArticulo = estadoArticuloList.get(estadoArticuloList.size() - 1);
        assertThat(testEstadoArticulo.getNombreEstado()).isEqualTo(DEFAULT_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    public void createEstadoArticuloWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estadoArticuloRepository.findAll().size();

        // Create the EstadoArticulo with an existing ID
        estadoArticulo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadoArticuloMockMvc.perform(post("/api/estado-articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoArticulo)))
            .andExpect(status().isBadRequest());

        // Validate the EstadoArticulo in the database
        List<EstadoArticulo> estadoArticuloList = estadoArticuloRepository.findAll();
        assertThat(estadoArticuloList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNombreEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = estadoArticuloRepository.findAll().size();
        // set the field null
        estadoArticulo.setNombreEstado(null);

        // Create the EstadoArticulo, which fails.

        restEstadoArticuloMockMvc.perform(post("/api/estado-articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoArticulo)))
            .andExpect(status().isBadRequest());

        List<EstadoArticulo> estadoArticuloList = estadoArticuloRepository.findAll();
        assertThat(estadoArticuloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEstadoArticulos() throws Exception {
        // Initialize the database
        estadoArticuloRepository.saveAndFlush(estadoArticulo);

        // Get all the estadoArticuloList
        restEstadoArticuloMockMvc.perform(get("/api/estado-articulos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadoArticulo.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreEstado").value(hasItem(DEFAULT_NOMBRE_ESTADO.toString())));
    }
    
    @Test
    @Transactional
    public void getEstadoArticulo() throws Exception {
        // Initialize the database
        estadoArticuloRepository.saveAndFlush(estadoArticulo);

        // Get the estadoArticulo
        restEstadoArticuloMockMvc.perform(get("/api/estado-articulos/{id}", estadoArticulo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(estadoArticulo.getId().intValue()))
            .andExpect(jsonPath("$.nombreEstado").value(DEFAULT_NOMBRE_ESTADO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEstadoArticulo() throws Exception {
        // Get the estadoArticulo
        restEstadoArticuloMockMvc.perform(get("/api/estado-articulos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstadoArticulo() throws Exception {
        // Initialize the database
        estadoArticuloService.save(estadoArticulo);

        int databaseSizeBeforeUpdate = estadoArticuloRepository.findAll().size();

        // Update the estadoArticulo
        EstadoArticulo updatedEstadoArticulo = estadoArticuloRepository.findById(estadoArticulo.getId()).get();
        // Disconnect from session so that the updates on updatedEstadoArticulo are not directly saved in db
        em.detach(updatedEstadoArticulo);
        updatedEstadoArticulo
            .nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoArticuloMockMvc.perform(put("/api/estado-articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstadoArticulo)))
            .andExpect(status().isOk());

        // Validate the EstadoArticulo in the database
        List<EstadoArticulo> estadoArticuloList = estadoArticuloRepository.findAll();
        assertThat(estadoArticuloList).hasSize(databaseSizeBeforeUpdate);
        EstadoArticulo testEstadoArticulo = estadoArticuloList.get(estadoArticuloList.size() - 1);
        assertThat(testEstadoArticulo.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingEstadoArticulo() throws Exception {
        int databaseSizeBeforeUpdate = estadoArticuloRepository.findAll().size();

        // Create the EstadoArticulo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoArticuloMockMvc.perform(put("/api/estado-articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoArticulo)))
            .andExpect(status().isBadRequest());

        // Validate the EstadoArticulo in the database
        List<EstadoArticulo> estadoArticuloList = estadoArticuloRepository.findAll();
        assertThat(estadoArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEstadoArticulo() throws Exception {
        // Initialize the database
        estadoArticuloService.save(estadoArticulo);

        int databaseSizeBeforeDelete = estadoArticuloRepository.findAll().size();

        // Delete the estadoArticulo
        restEstadoArticuloMockMvc.perform(delete("/api/estado-articulos/{id}", estadoArticulo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EstadoArticulo> estadoArticuloList = estadoArticuloRepository.findAll();
        assertThat(estadoArticuloList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstadoArticulo.class);
        EstadoArticulo estadoArticulo1 = new EstadoArticulo();
        estadoArticulo1.setId(1L);
        EstadoArticulo estadoArticulo2 = new EstadoArticulo();
        estadoArticulo2.setId(estadoArticulo1.getId());
        assertThat(estadoArticulo1).isEqualTo(estadoArticulo2);
        estadoArticulo2.setId(2L);
        assertThat(estadoArticulo1).isNotEqualTo(estadoArticulo2);
        estadoArticulo1.setId(null);
        assertThat(estadoArticulo1).isNotEqualTo(estadoArticulo2);
    }
}
