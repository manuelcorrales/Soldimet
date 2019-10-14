package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.MedioDePagoTarjeta;
import soldimet.domain.Tarjeta;
import soldimet.domain.TipoTarjeta;
import soldimet.repository.MedioDePagoTarjetaRepository;
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
 * Integration tests for the {@link MedioDePagoTarjetaResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class MedioDePagoTarjetaResourceIT {

    private static final String DEFAULT_ULTIMOS_4 = "AAAAAAAAAA";
    private static final String UPDATED_ULTIMOS_4 = "BBBBBBBBBB";

    @Autowired
    private MedioDePagoTarjetaRepository medioDePagoTarjetaRepository;

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

    private MockMvc restMedioDePagoTarjetaMockMvc;

    private MedioDePagoTarjeta medioDePagoTarjeta;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MedioDePagoTarjetaResource medioDePagoTarjetaResource = new MedioDePagoTarjetaResource(medioDePagoTarjetaRepository);
        this.restMedioDePagoTarjetaMockMvc = MockMvcBuilders.standaloneSetup(medioDePagoTarjetaResource)
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
    public static MedioDePagoTarjeta createEntity(EntityManager em) {
        MedioDePagoTarjeta medioDePagoTarjeta = new MedioDePagoTarjeta()
            .ultimos4(DEFAULT_ULTIMOS_4);
        // Add required entity
        Tarjeta tarjeta;
        if (TestUtil.findAll(em, Tarjeta.class).isEmpty()) {
            tarjeta = TarjetaResourceIT.createEntity(em);
            em.persist(tarjeta);
            em.flush();
        } else {
            tarjeta = TestUtil.findAll(em, Tarjeta.class).get(0);
        }
        medioDePagoTarjeta.setTarjeta(tarjeta);
        // Add required entity
        TipoTarjeta tipoTarjeta;
        if (TestUtil.findAll(em, TipoTarjeta.class).isEmpty()) {
            tipoTarjeta = TipoTarjetaResourceIT.createEntity(em);
            em.persist(tipoTarjeta);
            em.flush();
        } else {
            tipoTarjeta = TestUtil.findAll(em, TipoTarjeta.class).get(0);
        }
        medioDePagoTarjeta.setTipoTarjeta(tipoTarjeta);
        return medioDePagoTarjeta;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MedioDePagoTarjeta createUpdatedEntity(EntityManager em) {
        MedioDePagoTarjeta medioDePagoTarjeta = new MedioDePagoTarjeta()
            .ultimos4(UPDATED_ULTIMOS_4);
        // Add required entity
        Tarjeta tarjeta;
        if (TestUtil.findAll(em, Tarjeta.class).isEmpty()) {
            tarjeta = TarjetaResourceIT.createUpdatedEntity(em);
            em.persist(tarjeta);
            em.flush();
        } else {
            tarjeta = TestUtil.findAll(em, Tarjeta.class).get(0);
        }
        medioDePagoTarjeta.setTarjeta(tarjeta);
        // Add required entity
        TipoTarjeta tipoTarjeta;
        if (TestUtil.findAll(em, TipoTarjeta.class).isEmpty()) {
            tipoTarjeta = TipoTarjetaResourceIT.createUpdatedEntity(em);
            em.persist(tipoTarjeta);
            em.flush();
        } else {
            tipoTarjeta = TestUtil.findAll(em, TipoTarjeta.class).get(0);
        }
        medioDePagoTarjeta.setTipoTarjeta(tipoTarjeta);
        return medioDePagoTarjeta;
    }

    @BeforeEach
    public void initTest() {
        medioDePagoTarjeta = createEntity(em);
    }

    @Test
    @Transactional
    public void createMedioDePagoTarjeta() throws Exception {
        int databaseSizeBeforeCreate = medioDePagoTarjetaRepository.findAll().size();

        // Create the MedioDePagoTarjeta
        restMedioDePagoTarjetaMockMvc.perform(post("/api/medio-de-pago-tarjetas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medioDePagoTarjeta)))
            .andExpect(status().isCreated());

        // Validate the MedioDePagoTarjeta in the database
        List<MedioDePagoTarjeta> medioDePagoTarjetaList = medioDePagoTarjetaRepository.findAll();
        assertThat(medioDePagoTarjetaList).hasSize(databaseSizeBeforeCreate + 1);
        MedioDePagoTarjeta testMedioDePagoTarjeta = medioDePagoTarjetaList.get(medioDePagoTarjetaList.size() - 1);
        assertThat(testMedioDePagoTarjeta.getUltimos4()).isEqualTo(DEFAULT_ULTIMOS_4);
    }

    @Test
    @Transactional
    public void createMedioDePagoTarjetaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = medioDePagoTarjetaRepository.findAll().size();

        // Create the MedioDePagoTarjeta with an existing ID
        medioDePagoTarjeta.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedioDePagoTarjetaMockMvc.perform(post("/api/medio-de-pago-tarjetas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medioDePagoTarjeta)))
            .andExpect(status().isBadRequest());

        // Validate the MedioDePagoTarjeta in the database
        List<MedioDePagoTarjeta> medioDePagoTarjetaList = medioDePagoTarjetaRepository.findAll();
        assertThat(medioDePagoTarjetaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkUltimos4IsRequired() throws Exception {
        int databaseSizeBeforeTest = medioDePagoTarjetaRepository.findAll().size();
        // set the field null
        medioDePagoTarjeta.setUltimos4(null);

        // Create the MedioDePagoTarjeta, which fails.

        restMedioDePagoTarjetaMockMvc.perform(post("/api/medio-de-pago-tarjetas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medioDePagoTarjeta)))
            .andExpect(status().isBadRequest());

        List<MedioDePagoTarjeta> medioDePagoTarjetaList = medioDePagoTarjetaRepository.findAll();
        assertThat(medioDePagoTarjetaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMedioDePagoTarjetas() throws Exception {
        // Initialize the database
        medioDePagoTarjetaRepository.saveAndFlush(medioDePagoTarjeta);

        // Get all the medioDePagoTarjetaList
        restMedioDePagoTarjetaMockMvc.perform(get("/api/medio-de-pago-tarjetas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medioDePagoTarjeta.getId().intValue())))
            .andExpect(jsonPath("$.[*].ultimos4").value(hasItem(DEFAULT_ULTIMOS_4.toString())));
    }
    
    @Test
    @Transactional
    public void getMedioDePagoTarjeta() throws Exception {
        // Initialize the database
        medioDePagoTarjetaRepository.saveAndFlush(medioDePagoTarjeta);

        // Get the medioDePagoTarjeta
        restMedioDePagoTarjetaMockMvc.perform(get("/api/medio-de-pago-tarjetas/{id}", medioDePagoTarjeta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(medioDePagoTarjeta.getId().intValue()))
            .andExpect(jsonPath("$.ultimos4").value(DEFAULT_ULTIMOS_4.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMedioDePagoTarjeta() throws Exception {
        // Get the medioDePagoTarjeta
        restMedioDePagoTarjetaMockMvc.perform(get("/api/medio-de-pago-tarjetas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMedioDePagoTarjeta() throws Exception {
        // Initialize the database
        medioDePagoTarjetaRepository.saveAndFlush(medioDePagoTarjeta);

        int databaseSizeBeforeUpdate = medioDePagoTarjetaRepository.findAll().size();

        // Update the medioDePagoTarjeta
        MedioDePagoTarjeta updatedMedioDePagoTarjeta = medioDePagoTarjetaRepository.findById(medioDePagoTarjeta.getId()).get();
        // Disconnect from session so that the updates on updatedMedioDePagoTarjeta are not directly saved in db
        em.detach(updatedMedioDePagoTarjeta);
        updatedMedioDePagoTarjeta
            .ultimos4(UPDATED_ULTIMOS_4);

        restMedioDePagoTarjetaMockMvc.perform(put("/api/medio-de-pago-tarjetas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMedioDePagoTarjeta)))
            .andExpect(status().isOk());

        // Validate the MedioDePagoTarjeta in the database
        List<MedioDePagoTarjeta> medioDePagoTarjetaList = medioDePagoTarjetaRepository.findAll();
        assertThat(medioDePagoTarjetaList).hasSize(databaseSizeBeforeUpdate);
        MedioDePagoTarjeta testMedioDePagoTarjeta = medioDePagoTarjetaList.get(medioDePagoTarjetaList.size() - 1);
        assertThat(testMedioDePagoTarjeta.getUltimos4()).isEqualTo(UPDATED_ULTIMOS_4);
    }

    @Test
    @Transactional
    public void updateNonExistingMedioDePagoTarjeta() throws Exception {
        int databaseSizeBeforeUpdate = medioDePagoTarjetaRepository.findAll().size();

        // Create the MedioDePagoTarjeta

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedioDePagoTarjetaMockMvc.perform(put("/api/medio-de-pago-tarjetas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medioDePagoTarjeta)))
            .andExpect(status().isBadRequest());

        // Validate the MedioDePagoTarjeta in the database
        List<MedioDePagoTarjeta> medioDePagoTarjetaList = medioDePagoTarjetaRepository.findAll();
        assertThat(medioDePagoTarjetaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMedioDePagoTarjeta() throws Exception {
        // Initialize the database
        medioDePagoTarjetaRepository.saveAndFlush(medioDePagoTarjeta);

        int databaseSizeBeforeDelete = medioDePagoTarjetaRepository.findAll().size();

        // Delete the medioDePagoTarjeta
        restMedioDePagoTarjetaMockMvc.perform(delete("/api/medio-de-pago-tarjetas/{id}", medioDePagoTarjeta.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MedioDePagoTarjeta> medioDePagoTarjetaList = medioDePagoTarjetaRepository.findAll();
        assertThat(medioDePagoTarjetaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedioDePagoTarjeta.class);
        MedioDePagoTarjeta medioDePagoTarjeta1 = new MedioDePagoTarjeta();
        medioDePagoTarjeta1.setId(1L);
        MedioDePagoTarjeta medioDePagoTarjeta2 = new MedioDePagoTarjeta();
        medioDePagoTarjeta2.setId(medioDePagoTarjeta1.getId());
        assertThat(medioDePagoTarjeta1).isEqualTo(medioDePagoTarjeta2);
        medioDePagoTarjeta2.setId(2L);
        assertThat(medioDePagoTarjeta1).isNotEqualTo(medioDePagoTarjeta2);
        medioDePagoTarjeta1.setId(null);
        assertThat(medioDePagoTarjeta1).isNotEqualTo(medioDePagoTarjeta2);
    }
}
