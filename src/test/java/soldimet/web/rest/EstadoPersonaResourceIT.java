package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.EstadoPersona;
import soldimet.repository.EstadoPersonaRepository;
import soldimet.service.EstadoPersonaService;
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
 * Integration tests for the {@link EstadoPersonaResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class EstadoPersonaResourceIT {

    private static final String DEFAULT_NOMBRE_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_ESTADO = "BBBBBBBBBB";

    @Autowired
    private EstadoPersonaRepository estadoPersonaRepository;

    @Autowired
    private EstadoPersonaService estadoPersonaService;

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

    private MockMvc restEstadoPersonaMockMvc;

    private EstadoPersona estadoPersona;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EstadoPersonaResource estadoPersonaResource = new EstadoPersonaResource(estadoPersonaService);
        this.restEstadoPersonaMockMvc = MockMvcBuilders.standaloneSetup(estadoPersonaResource)
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
    public static EstadoPersona createEntity(EntityManager em) {
        EstadoPersona estadoPersona = new EstadoPersona()
            .nombreEstado(DEFAULT_NOMBRE_ESTADO);
        return estadoPersona;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoPersona createUpdatedEntity(EntityManager em) {
        EstadoPersona estadoPersona = new EstadoPersona()
            .nombreEstado(UPDATED_NOMBRE_ESTADO);
        return estadoPersona;
    }

    @BeforeEach
    public void initTest() {
        estadoPersona = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstadoPersona() throws Exception {
        int databaseSizeBeforeCreate = estadoPersonaRepository.findAll().size();

        // Create the EstadoPersona
        restEstadoPersonaMockMvc.perform(post("/api/estado-personas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoPersona)))
            .andExpect(status().isCreated());

        // Validate the EstadoPersona in the database
        List<EstadoPersona> estadoPersonaList = estadoPersonaRepository.findAll();
        assertThat(estadoPersonaList).hasSize(databaseSizeBeforeCreate + 1);
        EstadoPersona testEstadoPersona = estadoPersonaList.get(estadoPersonaList.size() - 1);
        assertThat(testEstadoPersona.getNombreEstado()).isEqualTo(DEFAULT_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    public void createEstadoPersonaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estadoPersonaRepository.findAll().size();

        // Create the EstadoPersona with an existing ID
        estadoPersona.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadoPersonaMockMvc.perform(post("/api/estado-personas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoPersona)))
            .andExpect(status().isBadRequest());

        // Validate the EstadoPersona in the database
        List<EstadoPersona> estadoPersonaList = estadoPersonaRepository.findAll();
        assertThat(estadoPersonaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNombreEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = estadoPersonaRepository.findAll().size();
        // set the field null
        estadoPersona.setNombreEstado(null);

        // Create the EstadoPersona, which fails.

        restEstadoPersonaMockMvc.perform(post("/api/estado-personas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoPersona)))
            .andExpect(status().isBadRequest());

        List<EstadoPersona> estadoPersonaList = estadoPersonaRepository.findAll();
        assertThat(estadoPersonaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEstadoPersonas() throws Exception {
        // Initialize the database
        estadoPersonaRepository.saveAndFlush(estadoPersona);

        // Get all the estadoPersonaList
        restEstadoPersonaMockMvc.perform(get("/api/estado-personas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadoPersona.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreEstado").value(hasItem(DEFAULT_NOMBRE_ESTADO.toString())));
    }
    
    @Test
    @Transactional
    public void getEstadoPersona() throws Exception {
        // Initialize the database
        estadoPersonaRepository.saveAndFlush(estadoPersona);

        // Get the estadoPersona
        restEstadoPersonaMockMvc.perform(get("/api/estado-personas/{id}", estadoPersona.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(estadoPersona.getId().intValue()))
            .andExpect(jsonPath("$.nombreEstado").value(DEFAULT_NOMBRE_ESTADO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEstadoPersona() throws Exception {
        // Get the estadoPersona
        restEstadoPersonaMockMvc.perform(get("/api/estado-personas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstadoPersona() throws Exception {
        // Initialize the database
        estadoPersonaService.save(estadoPersona);

        int databaseSizeBeforeUpdate = estadoPersonaRepository.findAll().size();

        // Update the estadoPersona
        EstadoPersona updatedEstadoPersona = estadoPersonaRepository.findById(estadoPersona.getId()).get();
        // Disconnect from session so that the updates on updatedEstadoPersona are not directly saved in db
        em.detach(updatedEstadoPersona);
        updatedEstadoPersona
            .nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoPersonaMockMvc.perform(put("/api/estado-personas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstadoPersona)))
            .andExpect(status().isOk());

        // Validate the EstadoPersona in the database
        List<EstadoPersona> estadoPersonaList = estadoPersonaRepository.findAll();
        assertThat(estadoPersonaList).hasSize(databaseSizeBeforeUpdate);
        EstadoPersona testEstadoPersona = estadoPersonaList.get(estadoPersonaList.size() - 1);
        assertThat(testEstadoPersona.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingEstadoPersona() throws Exception {
        int databaseSizeBeforeUpdate = estadoPersonaRepository.findAll().size();

        // Create the EstadoPersona

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoPersonaMockMvc.perform(put("/api/estado-personas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoPersona)))
            .andExpect(status().isBadRequest());

        // Validate the EstadoPersona in the database
        List<EstadoPersona> estadoPersonaList = estadoPersonaRepository.findAll();
        assertThat(estadoPersonaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEstadoPersona() throws Exception {
        // Initialize the database
        estadoPersonaService.save(estadoPersona);

        int databaseSizeBeforeDelete = estadoPersonaRepository.findAll().size();

        // Delete the estadoPersona
        restEstadoPersonaMockMvc.perform(delete("/api/estado-personas/{id}", estadoPersona.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EstadoPersona> estadoPersonaList = estadoPersonaRepository.findAll();
        assertThat(estadoPersonaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstadoPersona.class);
        EstadoPersona estadoPersona1 = new EstadoPersona();
        estadoPersona1.setId(1L);
        EstadoPersona estadoPersona2 = new EstadoPersona();
        estadoPersona2.setId(estadoPersona1.getId());
        assertThat(estadoPersona1).isEqualTo(estadoPersona2);
        estadoPersona2.setId(2L);
        assertThat(estadoPersona1).isNotEqualTo(estadoPersona2);
        estadoPersona1.setId(null);
        assertThat(estadoPersona1).isNotEqualTo(estadoPersona2);
    }
}
