package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.CostoOperacion;
import soldimet.domain.Cilindrada;
import soldimet.domain.Operacion;
import soldimet.domain.TipoParteMotor;
import soldimet.repository.CostoOperacionRepository;
import soldimet.service.CostoOperacionService;
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
 * Integration tests for the {@link CostoOperacionResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class CostoOperacionResourceIT {

    private static final Float DEFAULT_COSTO_OPERACION = 0F;
    private static final Float UPDATED_COSTO_OPERACION = 1F;
    private static final Float SMALLER_COSTO_OPERACION = 0F - 1F;

    @Autowired
    private CostoOperacionRepository costoOperacionRepository;

    @Autowired
    private CostoOperacionService costoOperacionService;

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

    private MockMvc restCostoOperacionMockMvc;

    private CostoOperacion costoOperacion;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CostoOperacionResource costoOperacionResource = new CostoOperacionResource(costoOperacionService);
        this.restCostoOperacionMockMvc = MockMvcBuilders.standaloneSetup(costoOperacionResource)
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
    public static CostoOperacion createEntity(EntityManager em) {
        CostoOperacion costoOperacion = new CostoOperacion()
            .costoOperacion(DEFAULT_COSTO_OPERACION);
        // Add required entity
        Cilindrada cilindrada;
        if (TestUtil.findAll(em, Cilindrada.class).isEmpty()) {
            cilindrada = CilindradaResourceIT.createEntity(em);
            em.persist(cilindrada);
            em.flush();
        } else {
            cilindrada = TestUtil.findAll(em, Cilindrada.class).get(0);
        }
        costoOperacion.setCilindrada(cilindrada);
        // Add required entity
        Operacion operacion;
        if (TestUtil.findAll(em, Operacion.class).isEmpty()) {
            operacion = OperacionResourceIT.createEntity(em);
            em.persist(operacion);
            em.flush();
        } else {
            operacion = TestUtil.findAll(em, Operacion.class).get(0);
        }
        costoOperacion.setOperacion(operacion);
        // Add required entity
        TipoParteMotor tipoParteMotor;
        if (TestUtil.findAll(em, TipoParteMotor.class).isEmpty()) {
            tipoParteMotor = TipoParteMotorResourceIT.createEntity(em);
            em.persist(tipoParteMotor);
            em.flush();
        } else {
            tipoParteMotor = TestUtil.findAll(em, TipoParteMotor.class).get(0);
        }
        costoOperacion.setTipoParteMotor(tipoParteMotor);
        return costoOperacion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CostoOperacion createUpdatedEntity(EntityManager em) {
        CostoOperacion costoOperacion = new CostoOperacion()
            .costoOperacion(UPDATED_COSTO_OPERACION);
        // Add required entity
        Cilindrada cilindrada;
        if (TestUtil.findAll(em, Cilindrada.class).isEmpty()) {
            cilindrada = CilindradaResourceIT.createUpdatedEntity(em);
            em.persist(cilindrada);
            em.flush();
        } else {
            cilindrada = TestUtil.findAll(em, Cilindrada.class).get(0);
        }
        costoOperacion.setCilindrada(cilindrada);
        // Add required entity
        Operacion operacion;
        if (TestUtil.findAll(em, Operacion.class).isEmpty()) {
            operacion = OperacionResourceIT.createUpdatedEntity(em);
            em.persist(operacion);
            em.flush();
        } else {
            operacion = TestUtil.findAll(em, Operacion.class).get(0);
        }
        costoOperacion.setOperacion(operacion);
        // Add required entity
        TipoParteMotor tipoParteMotor;
        if (TestUtil.findAll(em, TipoParteMotor.class).isEmpty()) {
            tipoParteMotor = TipoParteMotorResourceIT.createUpdatedEntity(em);
            em.persist(tipoParteMotor);
            em.flush();
        } else {
            tipoParteMotor = TestUtil.findAll(em, TipoParteMotor.class).get(0);
        }
        costoOperacion.setTipoParteMotor(tipoParteMotor);
        return costoOperacion;
    }

    @BeforeEach
    public void initTest() {
        costoOperacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createCostoOperacion() throws Exception {
        int databaseSizeBeforeCreate = costoOperacionRepository.findAll().size();

        // Create the CostoOperacion
        restCostoOperacionMockMvc.perform(post("/api/costo-operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(costoOperacion)))
            .andExpect(status().isCreated());

        // Validate the CostoOperacion in the database
        List<CostoOperacion> costoOperacionList = costoOperacionRepository.findAll();
        assertThat(costoOperacionList).hasSize(databaseSizeBeforeCreate + 1);
        CostoOperacion testCostoOperacion = costoOperacionList.get(costoOperacionList.size() - 1);
        assertThat(testCostoOperacion.getCostoOperacion()).isEqualTo(DEFAULT_COSTO_OPERACION);
    }

    @Test
    @Transactional
    public void createCostoOperacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = costoOperacionRepository.findAll().size();

        // Create the CostoOperacion with an existing ID
        costoOperacion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCostoOperacionMockMvc.perform(post("/api/costo-operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(costoOperacion)))
            .andExpect(status().isBadRequest());

        // Validate the CostoOperacion in the database
        List<CostoOperacion> costoOperacionList = costoOperacionRepository.findAll();
        assertThat(costoOperacionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCostoOperacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = costoOperacionRepository.findAll().size();
        // set the field null
        costoOperacion.setCostoOperacion(null);

        // Create the CostoOperacion, which fails.

        restCostoOperacionMockMvc.perform(post("/api/costo-operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(costoOperacion)))
            .andExpect(status().isBadRequest());

        List<CostoOperacion> costoOperacionList = costoOperacionRepository.findAll();
        assertThat(costoOperacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCostoOperacions() throws Exception {
        // Initialize the database
        costoOperacionRepository.saveAndFlush(costoOperacion);

        // Get all the costoOperacionList
        restCostoOperacionMockMvc.perform(get("/api/costo-operacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(costoOperacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].costoOperacion").value(hasItem(DEFAULT_COSTO_OPERACION.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getCostoOperacion() throws Exception {
        // Initialize the database
        costoOperacionRepository.saveAndFlush(costoOperacion);

        // Get the costoOperacion
        restCostoOperacionMockMvc.perform(get("/api/costo-operacions/{id}", costoOperacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(costoOperacion.getId().intValue()))
            .andExpect(jsonPath("$.costoOperacion").value(DEFAULT_COSTO_OPERACION.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCostoOperacion() throws Exception {
        // Get the costoOperacion
        restCostoOperacionMockMvc.perform(get("/api/costo-operacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCostoOperacion() throws Exception {
        // Initialize the database
        costoOperacionService.save(costoOperacion);

        int databaseSizeBeforeUpdate = costoOperacionRepository.findAll().size();

        // Update the costoOperacion
        CostoOperacion updatedCostoOperacion = costoOperacionRepository.findById(costoOperacion.getId()).get();
        // Disconnect from session so that the updates on updatedCostoOperacion are not directly saved in db
        em.detach(updatedCostoOperacion);
        updatedCostoOperacion
            .costoOperacion(UPDATED_COSTO_OPERACION);

        restCostoOperacionMockMvc.perform(put("/api/costo-operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCostoOperacion)))
            .andExpect(status().isOk());

        // Validate the CostoOperacion in the database
        List<CostoOperacion> costoOperacionList = costoOperacionRepository.findAll();
        assertThat(costoOperacionList).hasSize(databaseSizeBeforeUpdate);
        CostoOperacion testCostoOperacion = costoOperacionList.get(costoOperacionList.size() - 1);
        assertThat(testCostoOperacion.getCostoOperacion()).isEqualTo(UPDATED_COSTO_OPERACION);
    }

    @Test
    @Transactional
    public void updateNonExistingCostoOperacion() throws Exception {
        int databaseSizeBeforeUpdate = costoOperacionRepository.findAll().size();

        // Create the CostoOperacion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCostoOperacionMockMvc.perform(put("/api/costo-operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(costoOperacion)))
            .andExpect(status().isBadRequest());

        // Validate the CostoOperacion in the database
        List<CostoOperacion> costoOperacionList = costoOperacionRepository.findAll();
        assertThat(costoOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCostoOperacion() throws Exception {
        // Initialize the database
        costoOperacionService.save(costoOperacion);

        int databaseSizeBeforeDelete = costoOperacionRepository.findAll().size();

        // Delete the costoOperacion
        restCostoOperacionMockMvc.perform(delete("/api/costo-operacions/{id}", costoOperacion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CostoOperacion> costoOperacionList = costoOperacionRepository.findAll();
        assertThat(costoOperacionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CostoOperacion.class);
        CostoOperacion costoOperacion1 = new CostoOperacion();
        costoOperacion1.setId(1L);
        CostoOperacion costoOperacion2 = new CostoOperacion();
        costoOperacion2.setId(costoOperacion1.getId());
        assertThat(costoOperacion1).isEqualTo(costoOperacion2);
        costoOperacion2.setId(2L);
        assertThat(costoOperacion1).isNotEqualTo(costoOperacion2);
        costoOperacion1.setId(null);
        assertThat(costoOperacion1).isNotEqualTo(costoOperacion2);
    }
}
