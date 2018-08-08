package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.DetallePresupuesto;
import soldimet.domain.Aplicacion;
import soldimet.domain.Cilindrada;
import soldimet.domain.Motor;
import soldimet.domain.TipoParteMotor;
import soldimet.repository.DetallePresupuestoRepository;
import soldimet.service.DetallePresupuestoService;
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


import static soldimet.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DetallePresupuestoResource REST controller.
 *
 * @see DetallePresupuestoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class DetallePresupuestoResourceIntTest {

    private static final Float DEFAULT_IMPORTE = 0F;
    private static final Float UPDATED_IMPORTE = 1F;

    @Autowired
    private DetallePresupuestoRepository detallePresupuestoRepository;

    

    @Autowired
    private DetallePresupuestoService detallePresupuestoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDetallePresupuestoMockMvc;

    private DetallePresupuesto detallePresupuesto;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DetallePresupuestoResource detallePresupuestoResource = new DetallePresupuestoResource(detallePresupuestoService);
        this.restDetallePresupuestoMockMvc = MockMvcBuilders.standaloneSetup(detallePresupuestoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetallePresupuesto createEntity(EntityManager em) {
        DetallePresupuesto detallePresupuesto = new DetallePresupuesto()
            .importe(DEFAULT_IMPORTE);
        // Add required entity
        Aplicacion aplicacion = AplicacionResourceIntTest.createEntity(em);
        em.persist(aplicacion);
        em.flush();
        detallePresupuesto.setAplicacion(aplicacion);
        // Add required entity
        Cilindrada cilindrada = CilindradaResourceIntTest.createEntity(em);
        em.persist(cilindrada);
        em.flush();
        detallePresupuesto.setCilindrada(cilindrada);
        // Add required entity
        Motor motor = MotorResourceIntTest.createEntity(em);
        em.persist(motor);
        em.flush();
        detallePresupuesto.setMotor(motor);
        // Add required entity
        TipoParteMotor tipoParteMotor = TipoParteMotorResourceIntTest.createEntity(em);
        em.persist(tipoParteMotor);
        em.flush();
        detallePresupuesto.setTipoParteMotor(tipoParteMotor);
        return detallePresupuesto;
    }

    @Before
    public void initTest() {
        detallePresupuesto = createEntity(em);
    }

    @Test
    @Transactional
    public void createDetallePresupuesto() throws Exception {
        int databaseSizeBeforeCreate = detallePresupuestoRepository.findAll().size();

        // Create the DetallePresupuesto
        restDetallePresupuestoMockMvc.perform(post("/api/detalle-presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detallePresupuesto)))
            .andExpect(status().isCreated());

        // Validate the DetallePresupuesto in the database
        List<DetallePresupuesto> detallePresupuestoList = detallePresupuestoRepository.findAll();
        assertThat(detallePresupuestoList).hasSize(databaseSizeBeforeCreate + 1);
        DetallePresupuesto testDetallePresupuesto = detallePresupuestoList.get(detallePresupuestoList.size() - 1);
        assertThat(testDetallePresupuesto.getImporte()).isEqualTo(DEFAULT_IMPORTE);
    }

    @Test
    @Transactional
    public void createDetallePresupuestoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = detallePresupuestoRepository.findAll().size();

        // Create the DetallePresupuesto with an existing ID
        detallePresupuesto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDetallePresupuestoMockMvc.perform(post("/api/detalle-presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detallePresupuesto)))
            .andExpect(status().isBadRequest());

        // Validate the DetallePresupuesto in the database
        List<DetallePresupuesto> detallePresupuestoList = detallePresupuestoRepository.findAll();
        assertThat(detallePresupuestoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkImporteIsRequired() throws Exception {
        int databaseSizeBeforeTest = detallePresupuestoRepository.findAll().size();
        // set the field null
        detallePresupuesto.setImporte(null);

        // Create the DetallePresupuesto, which fails.

        restDetallePresupuestoMockMvc.perform(post("/api/detalle-presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detallePresupuesto)))
            .andExpect(status().isBadRequest());

        List<DetallePresupuesto> detallePresupuestoList = detallePresupuestoRepository.findAll();
        assertThat(detallePresupuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDetallePresupuestos() throws Exception {
        // Initialize the database
        detallePresupuestoRepository.saveAndFlush(detallePresupuesto);

        // Get all the detallePresupuestoList
        restDetallePresupuestoMockMvc.perform(get("/api/detalle-presupuestos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(detallePresupuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].importe").value(hasItem(DEFAULT_IMPORTE.doubleValue())));
    }
    

    @Test
    @Transactional
    public void getDetallePresupuesto() throws Exception {
        // Initialize the database
        detallePresupuestoRepository.saveAndFlush(detallePresupuesto);

        // Get the detallePresupuesto
        restDetallePresupuestoMockMvc.perform(get("/api/detalle-presupuestos/{id}", detallePresupuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(detallePresupuesto.getId().intValue()))
            .andExpect(jsonPath("$.importe").value(DEFAULT_IMPORTE.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingDetallePresupuesto() throws Exception {
        // Get the detallePresupuesto
        restDetallePresupuestoMockMvc.perform(get("/api/detalle-presupuestos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDetallePresupuesto() throws Exception {
        // Initialize the database
        detallePresupuestoService.save(detallePresupuesto);

        int databaseSizeBeforeUpdate = detallePresupuestoRepository.findAll().size();

        // Update the detallePresupuesto
        DetallePresupuesto updatedDetallePresupuesto = detallePresupuestoRepository.findById(detallePresupuesto.getId()).get();
        // Disconnect from session so that the updates on updatedDetallePresupuesto are not directly saved in db
        em.detach(updatedDetallePresupuesto);
        updatedDetallePresupuesto
            .importe(UPDATED_IMPORTE);

        restDetallePresupuestoMockMvc.perform(put("/api/detalle-presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDetallePresupuesto)))
            .andExpect(status().isOk());

        // Validate the DetallePresupuesto in the database
        List<DetallePresupuesto> detallePresupuestoList = detallePresupuestoRepository.findAll();
        assertThat(detallePresupuestoList).hasSize(databaseSizeBeforeUpdate);
        DetallePresupuesto testDetallePresupuesto = detallePresupuestoList.get(detallePresupuestoList.size() - 1);
        assertThat(testDetallePresupuesto.getImporte()).isEqualTo(UPDATED_IMPORTE);
    }

    @Test
    @Transactional
    public void updateNonExistingDetallePresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = detallePresupuestoRepository.findAll().size();

        // Create the DetallePresupuesto

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDetallePresupuestoMockMvc.perform(put("/api/detalle-presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detallePresupuesto)))
            .andExpect(status().isBadRequest());

        // Validate the DetallePresupuesto in the database
        List<DetallePresupuesto> detallePresupuestoList = detallePresupuestoRepository.findAll();
        assertThat(detallePresupuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDetallePresupuesto() throws Exception {
        // Initialize the database
        detallePresupuestoService.save(detallePresupuesto);

        int databaseSizeBeforeDelete = detallePresupuestoRepository.findAll().size();

        // Get the detallePresupuesto
        restDetallePresupuestoMockMvc.perform(delete("/api/detalle-presupuestos/{id}", detallePresupuesto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DetallePresupuesto> detallePresupuestoList = detallePresupuestoRepository.findAll();
        assertThat(detallePresupuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DetallePresupuesto.class);
        DetallePresupuesto detallePresupuesto1 = new DetallePresupuesto();
        detallePresupuesto1.setId(1L);
        DetallePresupuesto detallePresupuesto2 = new DetallePresupuesto();
        detallePresupuesto2.setId(detallePresupuesto1.getId());
        assertThat(detallePresupuesto1).isEqualTo(detallePresupuesto2);
        detallePresupuesto2.setId(2L);
        assertThat(detallePresupuesto1).isNotEqualTo(detallePresupuesto2);
        detallePresupuesto1.setId(null);
        assertThat(detallePresupuesto1).isNotEqualTo(detallePresupuesto2);
    }
}
