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
 * Integration tests for the {@link DetallePresupuestoResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class DetallePresupuestoResourceIT {

    private static final Float DEFAULT_IMPORTE = 0F;
    private static final Float UPDATED_IMPORTE = 1F;
    private static final Float SMALLER_IMPORTE = 0F - 1F;

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

    @Autowired
    private Validator validator;

    private MockMvc restDetallePresupuestoMockMvc;

    private DetallePresupuesto detallePresupuesto;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DetallePresupuestoResource detallePresupuestoResource = new DetallePresupuestoResource(detallePresupuestoService);
        this.restDetallePresupuestoMockMvc = MockMvcBuilders.standaloneSetup(detallePresupuestoResource)
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
    public static DetallePresupuesto createEntity(EntityManager em) {
        DetallePresupuesto detallePresupuesto = new DetallePresupuesto()
            .importe(DEFAULT_IMPORTE);
        // Add required entity
        Aplicacion aplicacion;
        if (TestUtil.findAll(em, Aplicacion.class).isEmpty()) {
            aplicacion = AplicacionResourceIT.createEntity(em);
            em.persist(aplicacion);
            em.flush();
        } else {
            aplicacion = TestUtil.findAll(em, Aplicacion.class).get(0);
        }
        detallePresupuesto.setAplicacion(aplicacion);
        // Add required entity
        Cilindrada cilindrada;
        if (TestUtil.findAll(em, Cilindrada.class).isEmpty()) {
            cilindrada = CilindradaResourceIT.createEntity(em);
            em.persist(cilindrada);
            em.flush();
        } else {
            cilindrada = TestUtil.findAll(em, Cilindrada.class).get(0);
        }
        detallePresupuesto.setCilindrada(cilindrada);
        // Add required entity
        Motor motor;
        if (TestUtil.findAll(em, Motor.class).isEmpty()) {
            motor = MotorResourceIT.createEntity(em);
            em.persist(motor);
            em.flush();
        } else {
            motor = TestUtil.findAll(em, Motor.class).get(0);
        }
        detallePresupuesto.setMotor(motor);
        // Add required entity
        TipoParteMotor tipoParteMotor;
        if (TestUtil.findAll(em, TipoParteMotor.class).isEmpty()) {
            tipoParteMotor = TipoParteMotorResourceIT.createEntity(em);
            em.persist(tipoParteMotor);
            em.flush();
        } else {
            tipoParteMotor = TestUtil.findAll(em, TipoParteMotor.class).get(0);
        }
        detallePresupuesto.setTipoParteMotor(tipoParteMotor);
        return detallePresupuesto;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetallePresupuesto createUpdatedEntity(EntityManager em) {
        DetallePresupuesto detallePresupuesto = new DetallePresupuesto()
            .importe(UPDATED_IMPORTE);
        // Add required entity
        Aplicacion aplicacion;
        if (TestUtil.findAll(em, Aplicacion.class).isEmpty()) {
            aplicacion = AplicacionResourceIT.createUpdatedEntity(em);
            em.persist(aplicacion);
            em.flush();
        } else {
            aplicacion = TestUtil.findAll(em, Aplicacion.class).get(0);
        }
        detallePresupuesto.setAplicacion(aplicacion);
        // Add required entity
        Cilindrada cilindrada;
        if (TestUtil.findAll(em, Cilindrada.class).isEmpty()) {
            cilindrada = CilindradaResourceIT.createUpdatedEntity(em);
            em.persist(cilindrada);
            em.flush();
        } else {
            cilindrada = TestUtil.findAll(em, Cilindrada.class).get(0);
        }
        detallePresupuesto.setCilindrada(cilindrada);
        // Add required entity
        Motor motor;
        if (TestUtil.findAll(em, Motor.class).isEmpty()) {
            motor = MotorResourceIT.createUpdatedEntity(em);
            em.persist(motor);
            em.flush();
        } else {
            motor = TestUtil.findAll(em, Motor.class).get(0);
        }
        detallePresupuesto.setMotor(motor);
        // Add required entity
        TipoParteMotor tipoParteMotor;
        if (TestUtil.findAll(em, TipoParteMotor.class).isEmpty()) {
            tipoParteMotor = TipoParteMotorResourceIT.createUpdatedEntity(em);
            em.persist(tipoParteMotor);
            em.flush();
        } else {
            tipoParteMotor = TestUtil.findAll(em, TipoParteMotor.class).get(0);
        }
        detallePresupuesto.setTipoParteMotor(tipoParteMotor);
        return detallePresupuesto;
    }

    @BeforeEach
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

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
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

        // Delete the detallePresupuesto
        restDetallePresupuestoMockMvc.perform(delete("/api/detalle-presupuestos/{id}", detallePresupuesto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
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
