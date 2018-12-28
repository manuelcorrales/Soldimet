package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.Movimiento;
import soldimet.domain.EstadoMovimiento;
import soldimet.domain.FormaDePago;
import soldimet.domain.TipoMovimiento;
import soldimet.domain.Empleado;
import soldimet.domain.Persona;
import soldimet.repository.MovimientoRepository;
import soldimet.service.MovimientoService;
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
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static soldimet.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MovimientoResource REST controller.
 *
 * @see MovimientoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class MovimientoResourceIntTest {

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());

    private static final Instant DEFAULT_HORA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_HORA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Float DEFAULT_IMPORTE = 0F;
    private static final Float UPDATED_IMPORTE = 1F;

    private static final Float DEFAULT_DESCUENTO = 1F;
    private static final Float UPDATED_DESCUENTO = 2F;

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    @Autowired
    private MovimientoRepository movimientoRepository;
    
    @Autowired
    private MovimientoService movimientoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMovimientoMockMvc;

    private Movimiento movimiento;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MovimientoResource movimientoResource = new MovimientoResource(movimientoService);
        this.restMovimientoMockMvc = MockMvcBuilders.standaloneSetup(movimientoResource)
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
    public static Movimiento createEntity(EntityManager em) {
        Movimiento movimiento = new Movimiento()
            .fecha(DEFAULT_FECHA)
            .hora(DEFAULT_HORA)
            .importe(DEFAULT_IMPORTE)
            .descuento(DEFAULT_DESCUENTO)
            .observaciones(DEFAULT_OBSERVACIONES);
        // Add required entity
        EstadoMovimiento estadoMovimiento = EstadoMovimientoResourceIntTest.createEntity(em);
        em.persist(estadoMovimiento);
        em.flush();
        movimiento.setEstado(estadoMovimiento);
        // Add required entity
        FormaDePago formaDePago = FormaDePagoResourceIntTest.createEntity(em);
        em.persist(formaDePago);
        em.flush();
        movimiento.setFormaDePago(formaDePago);
        // Add required entity
        TipoMovimiento tipoMovimiento = TipoMovimientoResourceIntTest.createEntity(em);
        em.persist(tipoMovimiento);
        em.flush();
        movimiento.setTipoMovimiento(tipoMovimiento);
        // Add required entity
        Empleado empleado = EmpleadoResourceIntTest.createEntity(em);
        em.persist(empleado);
        em.flush();
        movimiento.setEmpleado(empleado);
        // Add required entity
        Persona persona = PersonaResourceIntTest.createEntity(em);
        em.persist(persona);
        em.flush();
        movimiento.setPersona(persona);
        return movimiento;
    }

    @Before
    public void initTest() {
        movimiento = createEntity(em);
    }

    @Test
    @Transactional
    public void createMovimiento() throws Exception {
        int databaseSizeBeforeCreate = movimientoRepository.findAll().size();

        // Create the Movimiento
        restMovimientoMockMvc.perform(post("/api/movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movimiento)))
            .andExpect(status().isCreated());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeCreate + 1);
        Movimiento testMovimiento = movimientoList.get(movimientoList.size() - 1);
        assertThat(testMovimiento.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testMovimiento.getHora()).isEqualTo(DEFAULT_HORA);
        assertThat(testMovimiento.getImporte()).isEqualTo(DEFAULT_IMPORTE);
        assertThat(testMovimiento.getDescuento()).isEqualTo(DEFAULT_DESCUENTO);
        assertThat(testMovimiento.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
    }

    @Test
    @Transactional
    public void createMovimientoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = movimientoRepository.findAll().size();

        // Create the Movimiento with an existing ID
        movimiento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMovimientoMockMvc.perform(post("/api/movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movimiento)))
            .andExpect(status().isBadRequest());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFechaIsRequired() throws Exception {
        int databaseSizeBeforeTest = movimientoRepository.findAll().size();
        // set the field null
        movimiento.setFecha(null);

        // Create the Movimiento, which fails.

        restMovimientoMockMvc.perform(post("/api/movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movimiento)))
            .andExpect(status().isBadRequest());

        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHoraIsRequired() throws Exception {
        int databaseSizeBeforeTest = movimientoRepository.findAll().size();
        // set the field null
        movimiento.setHora(null);

        // Create the Movimiento, which fails.

        restMovimientoMockMvc.perform(post("/api/movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movimiento)))
            .andExpect(status().isBadRequest());

        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkImporteIsRequired() throws Exception {
        int databaseSizeBeforeTest = movimientoRepository.findAll().size();
        // set the field null
        movimiento.setImporte(null);

        // Create the Movimiento, which fails.

        restMovimientoMockMvc.perform(post("/api/movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movimiento)))
            .andExpect(status().isBadRequest());

        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMovimientos() throws Exception {
        // Initialize the database
        movimientoRepository.saveAndFlush(movimiento);

        // Get all the movimientoList
        restMovimientoMockMvc.perform(get("/api/movimientos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(movimiento.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].hora").value(hasItem(DEFAULT_HORA.toString())))
            .andExpect(jsonPath("$.[*].importe").value(hasItem(DEFAULT_IMPORTE.doubleValue())))
            .andExpect(jsonPath("$.[*].descuento").value(hasItem(DEFAULT_DESCUENTO.doubleValue())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())));
    }
    
    @Test
    @Transactional
    public void getMovimiento() throws Exception {
        // Initialize the database
        movimientoRepository.saveAndFlush(movimiento);

        // Get the movimiento
        restMovimientoMockMvc.perform(get("/api/movimientos/{id}", movimiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(movimiento.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.hora").value(DEFAULT_HORA.toString()))
            .andExpect(jsonPath("$.importe").value(DEFAULT_IMPORTE.doubleValue()))
            .andExpect(jsonPath("$.descuento").value(DEFAULT_DESCUENTO.doubleValue()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMovimiento() throws Exception {
        // Get the movimiento
        restMovimientoMockMvc.perform(get("/api/movimientos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMovimiento() throws Exception {
        // Initialize the database
        movimientoService.save(movimiento);

        int databaseSizeBeforeUpdate = movimientoRepository.findAll().size();

        // Update the movimiento
        Movimiento updatedMovimiento = movimientoRepository.findById(movimiento.getId()).get();
        // Disconnect from session so that the updates on updatedMovimiento are not directly saved in db
        em.detach(updatedMovimiento);
        updatedMovimiento
            .fecha(UPDATED_FECHA)
            .hora(UPDATED_HORA)
            .importe(UPDATED_IMPORTE)
            .descuento(UPDATED_DESCUENTO)
            .observaciones(UPDATED_OBSERVACIONES);

        restMovimientoMockMvc.perform(put("/api/movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMovimiento)))
            .andExpect(status().isOk());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeUpdate);
        Movimiento testMovimiento = movimientoList.get(movimientoList.size() - 1);
        assertThat(testMovimiento.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testMovimiento.getHora()).isEqualTo(UPDATED_HORA);
        assertThat(testMovimiento.getImporte()).isEqualTo(UPDATED_IMPORTE);
        assertThat(testMovimiento.getDescuento()).isEqualTo(UPDATED_DESCUENTO);
        assertThat(testMovimiento.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    public void updateNonExistingMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = movimientoRepository.findAll().size();

        // Create the Movimiento

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMovimientoMockMvc.perform(put("/api/movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movimiento)))
            .andExpect(status().isBadRequest());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMovimiento() throws Exception {
        // Initialize the database
        movimientoService.save(movimiento);

        int databaseSizeBeforeDelete = movimientoRepository.findAll().size();

        // Get the movimiento
        restMovimientoMockMvc.perform(delete("/api/movimientos/{id}", movimiento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Movimiento.class);
        Movimiento movimiento1 = new Movimiento();
        movimiento1.setId(1L);
        Movimiento movimiento2 = new Movimiento();
        movimiento2.setId(movimiento1.getId());
        assertThat(movimiento1).isEqualTo(movimiento2);
        movimiento2.setId(2L);
        assertThat(movimiento1).isNotEqualTo(movimiento2);
        movimiento1.setId(null);
        assertThat(movimiento1).isNotEqualTo(movimiento2);
    }
}
