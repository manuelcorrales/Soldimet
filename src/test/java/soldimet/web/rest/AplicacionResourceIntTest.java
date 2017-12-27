package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.Aplicacion;
import soldimet.repository.AplicacionRepository;
import soldimet.service.AplicacionService;
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
 * Test class for the AplicacionResource REST controller.
 *
 * @see AplicacionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class AplicacionResourceIntTest {

    private static final String DEFAULT_NOMBRE_APLICACION = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_APLICACION = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUMERO_GRUPO = 1;
    private static final Integer UPDATED_NUMERO_GRUPO = 2;

    @Autowired
    private AplicacionRepository aplicacionRepository;

    @Autowired
    private AplicacionService aplicacionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAplicacionMockMvc;

    private Aplicacion aplicacion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AplicacionResource aplicacionResource = new AplicacionResource(aplicacionService);
        this.restAplicacionMockMvc = MockMvcBuilders.standaloneSetup(aplicacionResource)
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
    public static Aplicacion createEntity(EntityManager em) {
        Aplicacion aplicacion = new Aplicacion()
            .nombreAplicacion(DEFAULT_NOMBRE_APLICACION)
            .numeroGrupo(DEFAULT_NUMERO_GRUPO);
        return aplicacion;
    }

    @Before
    public void initTest() {
        aplicacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createAplicacion() throws Exception {
        int databaseSizeBeforeCreate = aplicacionRepository.findAll().size();

        // Create the Aplicacion
        restAplicacionMockMvc.perform(post("/api/aplicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aplicacion)))
            .andExpect(status().isCreated());

        // Validate the Aplicacion in the database
        List<Aplicacion> aplicacionList = aplicacionRepository.findAll();
        assertThat(aplicacionList).hasSize(databaseSizeBeforeCreate + 1);
        Aplicacion testAplicacion = aplicacionList.get(aplicacionList.size() - 1);
        assertThat(testAplicacion.getNombreAplicacion()).isEqualTo(DEFAULT_NOMBRE_APLICACION);
        assertThat(testAplicacion.getNumeroGrupo()).isEqualTo(DEFAULT_NUMERO_GRUPO);
    }

    @Test
    @Transactional
    public void createAplicacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = aplicacionRepository.findAll().size();

        // Create the Aplicacion with an existing ID
        aplicacion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAplicacionMockMvc.perform(post("/api/aplicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aplicacion)))
            .andExpect(status().isBadRequest());

        // Validate the Aplicacion in the database
        List<Aplicacion> aplicacionList = aplicacionRepository.findAll();
        assertThat(aplicacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreAplicacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = aplicacionRepository.findAll().size();
        // set the field null
        aplicacion.setNombreAplicacion(null);

        // Create the Aplicacion, which fails.

        restAplicacionMockMvc.perform(post("/api/aplicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aplicacion)))
            .andExpect(status().isBadRequest());

        List<Aplicacion> aplicacionList = aplicacionRepository.findAll();
        assertThat(aplicacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumeroGrupoIsRequired() throws Exception {
        int databaseSizeBeforeTest = aplicacionRepository.findAll().size();
        // set the field null
        aplicacion.setNumeroGrupo(null);

        // Create the Aplicacion, which fails.

        restAplicacionMockMvc.perform(post("/api/aplicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aplicacion)))
            .andExpect(status().isBadRequest());

        List<Aplicacion> aplicacionList = aplicacionRepository.findAll();
        assertThat(aplicacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAplicacions() throws Exception {
        // Initialize the database
        aplicacionRepository.saveAndFlush(aplicacion);

        // Get all the aplicacionList
        restAplicacionMockMvc.perform(get("/api/aplicacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(aplicacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreAplicacion").value(hasItem(DEFAULT_NOMBRE_APLICACION.toString())))
            .andExpect(jsonPath("$.[*].numeroGrupo").value(hasItem(DEFAULT_NUMERO_GRUPO)));
    }

    @Test
    @Transactional
    public void getAplicacion() throws Exception {
        // Initialize the database
        aplicacionRepository.saveAndFlush(aplicacion);

        // Get the aplicacion
        restAplicacionMockMvc.perform(get("/api/aplicacions/{id}", aplicacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(aplicacion.getId().intValue()))
            .andExpect(jsonPath("$.nombreAplicacion").value(DEFAULT_NOMBRE_APLICACION.toString()))
            .andExpect(jsonPath("$.numeroGrupo").value(DEFAULT_NUMERO_GRUPO));
    }

    @Test
    @Transactional
    public void getNonExistingAplicacion() throws Exception {
        // Get the aplicacion
        restAplicacionMockMvc.perform(get("/api/aplicacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAplicacion() throws Exception {
        // Initialize the database
        aplicacionService.save(aplicacion);

        int databaseSizeBeforeUpdate = aplicacionRepository.findAll().size();

        // Update the aplicacion
        Aplicacion updatedAplicacion = aplicacionRepository.findOne(aplicacion.getId());
        updatedAplicacion
            .nombreAplicacion(UPDATED_NOMBRE_APLICACION)
            .numeroGrupo(UPDATED_NUMERO_GRUPO);

        restAplicacionMockMvc.perform(put("/api/aplicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAplicacion)))
            .andExpect(status().isOk());

        // Validate the Aplicacion in the database
        List<Aplicacion> aplicacionList = aplicacionRepository.findAll();
        assertThat(aplicacionList).hasSize(databaseSizeBeforeUpdate);
        Aplicacion testAplicacion = aplicacionList.get(aplicacionList.size() - 1);
        assertThat(testAplicacion.getNombreAplicacion()).isEqualTo(UPDATED_NOMBRE_APLICACION);
        assertThat(testAplicacion.getNumeroGrupo()).isEqualTo(UPDATED_NUMERO_GRUPO);
    }

    @Test
    @Transactional
    public void updateNonExistingAplicacion() throws Exception {
        int databaseSizeBeforeUpdate = aplicacionRepository.findAll().size();

        // Create the Aplicacion

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAplicacionMockMvc.perform(put("/api/aplicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aplicacion)))
            .andExpect(status().isCreated());

        // Validate the Aplicacion in the database
        List<Aplicacion> aplicacionList = aplicacionRepository.findAll();
        assertThat(aplicacionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAplicacion() throws Exception {
        // Initialize the database
        aplicacionService.save(aplicacion);

        int databaseSizeBeforeDelete = aplicacionRepository.findAll().size();

        // Get the aplicacion
        restAplicacionMockMvc.perform(delete("/api/aplicacions/{id}", aplicacion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Aplicacion> aplicacionList = aplicacionRepository.findAll();
        assertThat(aplicacionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Aplicacion.class);
        Aplicacion aplicacion1 = new Aplicacion();
        aplicacion1.setId(1L);
        Aplicacion aplicacion2 = new Aplicacion();
        aplicacion2.setId(aplicacion1.getId());
        assertThat(aplicacion1).isEqualTo(aplicacion2);
        aplicacion2.setId(2L);
        assertThat(aplicacion1).isNotEqualTo(aplicacion2);
        aplicacion1.setId(null);
        assertThat(aplicacion1).isNotEqualTo(aplicacion2);
    }
}
