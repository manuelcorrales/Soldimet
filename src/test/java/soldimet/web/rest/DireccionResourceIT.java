package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.Direccion;
import soldimet.domain.Localidad;
import soldimet.repository.DireccionRepository;
import soldimet.service.DireccionService;
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
 * Integration tests for the {@link DireccionResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class DireccionResourceIT {

    private static final String DEFAULT_CALLE = "AAAAAAAAAA";
    private static final String UPDATED_CALLE = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUMERO = 0;
    private static final Integer UPDATED_NUMERO = 1;
    private static final Integer SMALLER_NUMERO = 0 - 1;

    @Autowired
    private DireccionRepository direccionRepository;

    @Autowired
    private DireccionService direccionService;

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

    private MockMvc restDireccionMockMvc;

    private Direccion direccion;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DireccionResource direccionResource = new DireccionResource(direccionService);
        this.restDireccionMockMvc = MockMvcBuilders.standaloneSetup(direccionResource)
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
    public static Direccion createEntity(EntityManager em) {
        Direccion direccion = new Direccion()
            .calle(DEFAULT_CALLE)
            .numero(DEFAULT_NUMERO);
        // Add required entity
        Localidad localidad;
        if (TestUtil.findAll(em, Localidad.class).isEmpty()) {
            localidad = LocalidadResourceIT.createEntity(em);
            em.persist(localidad);
            em.flush();
        } else {
            localidad = TestUtil.findAll(em, Localidad.class).get(0);
        }
        direccion.setLocalidad(localidad);
        return direccion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Direccion createUpdatedEntity(EntityManager em) {
        Direccion direccion = new Direccion()
            .calle(UPDATED_CALLE)
            .numero(UPDATED_NUMERO);
        // Add required entity
        Localidad localidad;
        if (TestUtil.findAll(em, Localidad.class).isEmpty()) {
            localidad = LocalidadResourceIT.createUpdatedEntity(em);
            em.persist(localidad);
            em.flush();
        } else {
            localidad = TestUtil.findAll(em, Localidad.class).get(0);
        }
        direccion.setLocalidad(localidad);
        return direccion;
    }

    @BeforeEach
    public void initTest() {
        direccion = createEntity(em);
    }

    @Test
    @Transactional
    public void createDireccion() throws Exception {
        int databaseSizeBeforeCreate = direccionRepository.findAll().size();

        // Create the Direccion
        restDireccionMockMvc.perform(post("/api/direccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(direccion)))
            .andExpect(status().isCreated());

        // Validate the Direccion in the database
        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeCreate + 1);
        Direccion testDireccion = direccionList.get(direccionList.size() - 1);
        assertThat(testDireccion.getCalle()).isEqualTo(DEFAULT_CALLE);
        assertThat(testDireccion.getNumero()).isEqualTo(DEFAULT_NUMERO);
    }

    @Test
    @Transactional
    public void createDireccionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = direccionRepository.findAll().size();

        // Create the Direccion with an existing ID
        direccion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDireccionMockMvc.perform(post("/api/direccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(direccion)))
            .andExpect(status().isBadRequest());

        // Validate the Direccion in the database
        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCalleIsRequired() throws Exception {
        int databaseSizeBeforeTest = direccionRepository.findAll().size();
        // set the field null
        direccion.setCalle(null);

        // Create the Direccion, which fails.

        restDireccionMockMvc.perform(post("/api/direccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(direccion)))
            .andExpect(status().isBadRequest());

        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumeroIsRequired() throws Exception {
        int databaseSizeBeforeTest = direccionRepository.findAll().size();
        // set the field null
        direccion.setNumero(null);

        // Create the Direccion, which fails.

        restDireccionMockMvc.perform(post("/api/direccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(direccion)))
            .andExpect(status().isBadRequest());

        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDireccions() throws Exception {
        // Initialize the database
        direccionRepository.saveAndFlush(direccion);

        // Get all the direccionList
        restDireccionMockMvc.perform(get("/api/direccions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(direccion.getId().intValue())))
            .andExpect(jsonPath("$.[*].calle").value(hasItem(DEFAULT_CALLE.toString())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)));
    }
    
    @Test
    @Transactional
    public void getDireccion() throws Exception {
        // Initialize the database
        direccionRepository.saveAndFlush(direccion);

        // Get the direccion
        restDireccionMockMvc.perform(get("/api/direccions/{id}", direccion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(direccion.getId().intValue()))
            .andExpect(jsonPath("$.calle").value(DEFAULT_CALLE.toString()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO));
    }

    @Test
    @Transactional
    public void getNonExistingDireccion() throws Exception {
        // Get the direccion
        restDireccionMockMvc.perform(get("/api/direccions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDireccion() throws Exception {
        // Initialize the database
        direccionService.save(direccion);

        int databaseSizeBeforeUpdate = direccionRepository.findAll().size();

        // Update the direccion
        Direccion updatedDireccion = direccionRepository.findById(direccion.getId()).get();
        // Disconnect from session so that the updates on updatedDireccion are not directly saved in db
        em.detach(updatedDireccion);
        updatedDireccion
            .calle(UPDATED_CALLE)
            .numero(UPDATED_NUMERO);

        restDireccionMockMvc.perform(put("/api/direccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDireccion)))
            .andExpect(status().isOk());

        // Validate the Direccion in the database
        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeUpdate);
        Direccion testDireccion = direccionList.get(direccionList.size() - 1);
        assertThat(testDireccion.getCalle()).isEqualTo(UPDATED_CALLE);
        assertThat(testDireccion.getNumero()).isEqualTo(UPDATED_NUMERO);
    }

    @Test
    @Transactional
    public void updateNonExistingDireccion() throws Exception {
        int databaseSizeBeforeUpdate = direccionRepository.findAll().size();

        // Create the Direccion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDireccionMockMvc.perform(put("/api/direccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(direccion)))
            .andExpect(status().isBadRequest());

        // Validate the Direccion in the database
        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDireccion() throws Exception {
        // Initialize the database
        direccionService.save(direccion);

        int databaseSizeBeforeDelete = direccionRepository.findAll().size();

        // Delete the direccion
        restDireccionMockMvc.perform(delete("/api/direccions/{id}", direccion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Direccion> direccionList = direccionRepository.findAll();
        assertThat(direccionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Direccion.class);
        Direccion direccion1 = new Direccion();
        direccion1.setId(1L);
        Direccion direccion2 = new Direccion();
        direccion2.setId(direccion1.getId());
        assertThat(direccion1).isEqualTo(direccion2);
        direccion2.setId(2L);
        assertThat(direccion1).isNotEqualTo(direccion2);
        direccion1.setId(null);
        assertThat(direccion1).isNotEqualTo(direccion2);
    }
}
