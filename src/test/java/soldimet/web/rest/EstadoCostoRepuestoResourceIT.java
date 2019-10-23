package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.EstadoCostoRepuesto;
import soldimet.repository.EstadoCostoRepuestoRepository;
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
 * Integration tests for the {@link EstadoCostoRepuestoResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class EstadoCostoRepuestoResourceIT {

    private static final String DEFAULT_NOMBRE_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_ESTADO = "BBBBBBBBBB";

    @Autowired
    private EstadoCostoRepuestoRepository estadoCostoRepuestoRepository;

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

    private MockMvc restEstadoCostoRepuestoMockMvc;

    private EstadoCostoRepuesto estadoCostoRepuesto;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EstadoCostoRepuestoResource estadoCostoRepuestoResource = new EstadoCostoRepuestoResource(estadoCostoRepuestoRepository);
        this.restEstadoCostoRepuestoMockMvc = MockMvcBuilders.standaloneSetup(estadoCostoRepuestoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    public static EstadoCostoRepuesto createEntityConEstado(String nombreEstado) {
        EstadoCostoRepuesto estadoCostoRepuesto = new EstadoCostoRepuesto()
            .nombreEstado(nombreEstado);
        return estadoCostoRepuesto;
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoCostoRepuesto createEntity(EntityManager em) {
        EstadoCostoRepuesto estadoCostoRepuesto = new EstadoCostoRepuesto()
            .nombreEstado(DEFAULT_NOMBRE_ESTADO);
        return estadoCostoRepuesto;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoCostoRepuesto createUpdatedEntity(EntityManager em) {
        EstadoCostoRepuesto estadoCostoRepuesto = new EstadoCostoRepuesto()
            .nombreEstado(UPDATED_NOMBRE_ESTADO);
        return estadoCostoRepuesto;
    }

    @BeforeEach
    public void initTest() {
        estadoCostoRepuesto = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstadoCostoRepuesto() throws Exception {
        int databaseSizeBeforeCreate = estadoCostoRepuestoRepository.findAll().size();

        // Create the EstadoCostoRepuesto
        restEstadoCostoRepuestoMockMvc.perform(post("/api/estado-costo-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoCostoRepuesto)))
            .andExpect(status().isCreated());

        // Validate the EstadoCostoRepuesto in the database
        List<EstadoCostoRepuesto> estadoCostoRepuestoList = estadoCostoRepuestoRepository.findAll();
        assertThat(estadoCostoRepuestoList).hasSize(databaseSizeBeforeCreate + 1);
        EstadoCostoRepuesto testEstadoCostoRepuesto = estadoCostoRepuestoList.get(estadoCostoRepuestoList.size() - 1);
        assertThat(testEstadoCostoRepuesto.getNombreEstado()).isEqualTo(DEFAULT_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    public void createEstadoCostoRepuestoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estadoCostoRepuestoRepository.findAll().size();

        // Create the EstadoCostoRepuesto with an existing ID
        estadoCostoRepuesto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadoCostoRepuestoMockMvc.perform(post("/api/estado-costo-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoCostoRepuesto)))
            .andExpect(status().isBadRequest());

        // Validate the EstadoCostoRepuesto in the database
        List<EstadoCostoRepuesto> estadoCostoRepuestoList = estadoCostoRepuestoRepository.findAll();
        assertThat(estadoCostoRepuestoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNombreEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = estadoCostoRepuestoRepository.findAll().size();
        // set the field null
        estadoCostoRepuesto.setNombreEstado(null);

        // Create the EstadoCostoRepuesto, which fails.

        restEstadoCostoRepuestoMockMvc.perform(post("/api/estado-costo-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoCostoRepuesto)))
            .andExpect(status().isBadRequest());

        List<EstadoCostoRepuesto> estadoCostoRepuestoList = estadoCostoRepuestoRepository.findAll();
        assertThat(estadoCostoRepuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEstadoCostoRepuestos() throws Exception {
        // Initialize the database
        estadoCostoRepuestoRepository.saveAndFlush(estadoCostoRepuesto);

        // Get all the estadoCostoRepuestoList
        restEstadoCostoRepuestoMockMvc.perform(get("/api/estado-costo-repuestos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadoCostoRepuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreEstado").value(hasItem(DEFAULT_NOMBRE_ESTADO.toString())));
    }

    @Test
    @Transactional
    public void getEstadoCostoRepuesto() throws Exception {
        // Initialize the database
        estadoCostoRepuestoRepository.saveAndFlush(estadoCostoRepuesto);

        // Get the estadoCostoRepuesto
        restEstadoCostoRepuestoMockMvc.perform(get("/api/estado-costo-repuestos/{id}", estadoCostoRepuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(estadoCostoRepuesto.getId().intValue()))
            .andExpect(jsonPath("$.nombreEstado").value(DEFAULT_NOMBRE_ESTADO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEstadoCostoRepuesto() throws Exception {
        // Get the estadoCostoRepuesto
        restEstadoCostoRepuestoMockMvc.perform(get("/api/estado-costo-repuestos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstadoCostoRepuesto() throws Exception {
        // Initialize the database
        estadoCostoRepuestoRepository.saveAndFlush(estadoCostoRepuesto);

        int databaseSizeBeforeUpdate = estadoCostoRepuestoRepository.findAll().size();

        // Update the estadoCostoRepuesto
        EstadoCostoRepuesto updatedEstadoCostoRepuesto = estadoCostoRepuestoRepository.findById(estadoCostoRepuesto.getId()).get();
        // Disconnect from session so that the updates on updatedEstadoCostoRepuesto are not directly saved in db
        em.detach(updatedEstadoCostoRepuesto);
        updatedEstadoCostoRepuesto
            .nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoCostoRepuestoMockMvc.perform(put("/api/estado-costo-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstadoCostoRepuesto)))
            .andExpect(status().isOk());

        // Validate the EstadoCostoRepuesto in the database
        List<EstadoCostoRepuesto> estadoCostoRepuestoList = estadoCostoRepuestoRepository.findAll();
        assertThat(estadoCostoRepuestoList).hasSize(databaseSizeBeforeUpdate);
        EstadoCostoRepuesto testEstadoCostoRepuesto = estadoCostoRepuestoList.get(estadoCostoRepuestoList.size() - 1);
        assertThat(testEstadoCostoRepuesto.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingEstadoCostoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = estadoCostoRepuestoRepository.findAll().size();

        // Create the EstadoCostoRepuesto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoCostoRepuestoMockMvc.perform(put("/api/estado-costo-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoCostoRepuesto)))
            .andExpect(status().isBadRequest());

        // Validate the EstadoCostoRepuesto in the database
        List<EstadoCostoRepuesto> estadoCostoRepuestoList = estadoCostoRepuestoRepository.findAll();
        assertThat(estadoCostoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEstadoCostoRepuesto() throws Exception {
        // Initialize the database
        estadoCostoRepuestoRepository.saveAndFlush(estadoCostoRepuesto);

        int databaseSizeBeforeDelete = estadoCostoRepuestoRepository.findAll().size();

        // Delete the estadoCostoRepuesto
        restEstadoCostoRepuestoMockMvc.perform(delete("/api/estado-costo-repuestos/{id}", estadoCostoRepuesto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EstadoCostoRepuesto> estadoCostoRepuestoList = estadoCostoRepuestoRepository.findAll();
        assertThat(estadoCostoRepuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstadoCostoRepuesto.class);
        EstadoCostoRepuesto estadoCostoRepuesto1 = new EstadoCostoRepuesto();
        estadoCostoRepuesto1.setId(1L);
        EstadoCostoRepuesto estadoCostoRepuesto2 = new EstadoCostoRepuesto();
        estadoCostoRepuesto2.setId(estadoCostoRepuesto1.getId());
        assertThat(estadoCostoRepuesto1).isEqualTo(estadoCostoRepuesto2);
        estadoCostoRepuesto2.setId(2L);
        assertThat(estadoCostoRepuesto1).isNotEqualTo(estadoCostoRepuesto2);
        estadoCostoRepuesto1.setId(null);
        assertThat(estadoCostoRepuesto1).isNotEqualTo(estadoCostoRepuesto2);
    }
}
