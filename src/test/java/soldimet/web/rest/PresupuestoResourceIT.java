package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.Presupuesto;
import soldimet.domain.Cliente;
import soldimet.domain.EstadoPresupuesto;
import soldimet.domain.DetallePresupuesto;
import soldimet.domain.DocumentationType;
import soldimet.domain.Sucursal;
import soldimet.repository.PresupuestoRepository;
import soldimet.service.PresupuestoService;
import soldimet.web.rest.errors.ExceptionTranslator;
import soldimet.service.dto.PresupuestoCriteria;
import soldimet.service.PresupuestoQueryService;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static soldimet.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PresupuestoResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class PresupuestoResourceIT {

    private static final String DEFAULT_DESCRIPCION_DESCUENTO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION_DESCUENTO = "BBBBBBBBBB";

    private static final Float DEFAULT_DESCUENTO = 0F;
    private static final Float UPDATED_DESCUENTO = 1F;
    private static final Float SMALLER_DESCUENTO = 0F - 1F;

    private static final LocalDate DEFAULT_FECHA_CREACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CREACION = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA_CREACION = LocalDate.ofEpochDay(-1L);

    private static final LocalDate DEFAULT_FECHA_ACEPTADO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_ACEPTADO = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA_ACEPTADO = LocalDate.ofEpochDay(-1L);

    private static final LocalDate DEFAULT_FECHA_ENTREGADO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_ENTREGADO = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA_ENTREGADO = LocalDate.ofEpochDay(-1L);

    private static final Float DEFAULT_IMPORTE_TOTAL = 0F;
    private static final Float UPDATED_IMPORTE_TOTAL = 1F;
    private static final Float SMALLER_IMPORTE_TOTAL = 0F - 1F;

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    private static final Boolean DEFAULT_SOLDADURA = false;
    private static final Boolean UPDATED_SOLDADURA = true;

    private static final Boolean DEFAULT_MODELO = false;
    private static final Boolean UPDATED_MODELO = true;

    @Autowired
    private PresupuestoRepository presupuestoRepository;

    @Autowired
    private PresupuestoService presupuestoService;

    @Autowired
    private PresupuestoQueryService presupuestoQueryService;

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

    private MockMvc restPresupuestoMockMvc;

    private Presupuesto presupuesto;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PresupuestoResource presupuestoResource = new PresupuestoResource(presupuestoService, presupuestoQueryService);
        this.restPresupuestoMockMvc = MockMvcBuilders.standaloneSetup(presupuestoResource)
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
    public static Presupuesto createEntity(EntityManager em) {
        Presupuesto presupuesto = new Presupuesto()
            .descripcionDescuento(DEFAULT_DESCRIPCION_DESCUENTO)
            .descuento(DEFAULT_DESCUENTO)
            .fechaCreacion(DEFAULT_FECHA_CREACION)
            .fechaAceptado(DEFAULT_FECHA_ACEPTADO)
            .fechaEntregado(DEFAULT_FECHA_ENTREGADO)
            .importeTotal(DEFAULT_IMPORTE_TOTAL)
            .observaciones(DEFAULT_OBSERVACIONES)
            .soldadura(DEFAULT_SOLDADURA)
            .modelo(DEFAULT_MODELO);
        // Add required entity
        Cliente cliente;
        if (TestUtil.findAll(em, Cliente.class).isEmpty()) {
            cliente = ClienteResourceIT.createEntity(em);
            em.persist(cliente);
            em.flush();
        } else {
            cliente = TestUtil.findAll(em, Cliente.class).get(0);
        }
        presupuesto.setCliente(cliente);
        // Add required entity
        EstadoPresupuesto estadoPresupuesto;
        if (TestUtil.findAll(em, EstadoPresupuesto.class).isEmpty()) {
            estadoPresupuesto = EstadoPresupuestoResourceIT.createEntity(em);
            em.persist(estadoPresupuesto);
            em.flush();
        } else {
            estadoPresupuesto = TestUtil.findAll(em, EstadoPresupuesto.class).get(0);
        }
        presupuesto.setEstadoPresupuesto(estadoPresupuesto);
        return presupuesto;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Presupuesto createUpdatedEntity(EntityManager em) {
        Presupuesto presupuesto = new Presupuesto()
            .descripcionDescuento(UPDATED_DESCRIPCION_DESCUENTO)
            .descuento(UPDATED_DESCUENTO)
            .fechaCreacion(UPDATED_FECHA_CREACION)
            .fechaAceptado(UPDATED_FECHA_ACEPTADO)
            .fechaEntregado(UPDATED_FECHA_ENTREGADO)
            .importeTotal(UPDATED_IMPORTE_TOTAL)
            .observaciones(UPDATED_OBSERVACIONES)
            .soldadura(UPDATED_SOLDADURA)
            .modelo(UPDATED_MODELO);
        // Add required entity
        Cliente cliente;
        if (TestUtil.findAll(em, Cliente.class).isEmpty()) {
            cliente = ClienteResourceIT.createUpdatedEntity(em);
            em.persist(cliente);
            em.flush();
        } else {
            cliente = TestUtil.findAll(em, Cliente.class).get(0);
        }
        presupuesto.setCliente(cliente);
        // Add required entity
        EstadoPresupuesto estadoPresupuesto;
        if (TestUtil.findAll(em, EstadoPresupuesto.class).isEmpty()) {
            estadoPresupuesto = EstadoPresupuestoResourceIT.createUpdatedEntity(em);
            em.persist(estadoPresupuesto);
            em.flush();
        } else {
            estadoPresupuesto = TestUtil.findAll(em, EstadoPresupuesto.class).get(0);
        }
        presupuesto.setEstadoPresupuesto(estadoPresupuesto);
        return presupuesto;
    }

    @BeforeEach
    public void initTest() {
        presupuesto = createEntity(em);
    }

    @Test
    @Transactional
    public void createPresupuesto() throws Exception {
        int databaseSizeBeforeCreate = presupuestoRepository.findAll().size();

        // Create the Presupuesto
        restPresupuestoMockMvc.perform(post("/api/presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presupuesto)))
            .andExpect(status().isCreated());

        // Validate the Presupuesto in the database
        List<Presupuesto> presupuestoList = presupuestoRepository.findAll();
        assertThat(presupuestoList).hasSize(databaseSizeBeforeCreate + 1);
        Presupuesto testPresupuesto = presupuestoList.get(presupuestoList.size() - 1);
        assertThat(testPresupuesto.getDescripcionDescuento()).isEqualTo(DEFAULT_DESCRIPCION_DESCUENTO);
        assertThat(testPresupuesto.getDescuento()).isEqualTo(DEFAULT_DESCUENTO);
        assertThat(testPresupuesto.getFechaCreacion()).isEqualTo(DEFAULT_FECHA_CREACION);
        assertThat(testPresupuesto.getFechaAceptado()).isEqualTo(DEFAULT_FECHA_ACEPTADO);
        assertThat(testPresupuesto.getFechaEntregado()).isEqualTo(DEFAULT_FECHA_ENTREGADO);
        assertThat(testPresupuesto.getImporteTotal()).isEqualTo(DEFAULT_IMPORTE_TOTAL);
        assertThat(testPresupuesto.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
        assertThat(testPresupuesto.isSoldadura()).isEqualTo(DEFAULT_SOLDADURA);
        assertThat(testPresupuesto.isModelo()).isEqualTo(DEFAULT_MODELO);
    }

    @Test
    @Transactional
    public void createPresupuestoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = presupuestoRepository.findAll().size();

        // Create the Presupuesto with an existing ID
        presupuesto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPresupuestoMockMvc.perform(post("/api/presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presupuesto)))
            .andExpect(status().isBadRequest());

        // Validate the Presupuesto in the database
        List<Presupuesto> presupuestoList = presupuestoRepository.findAll();
        assertThat(presupuestoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkImporteTotalIsRequired() throws Exception {
        int databaseSizeBeforeTest = presupuestoRepository.findAll().size();
        // set the field null
        presupuesto.setImporteTotal(null);

        // Create the Presupuesto, which fails.

        restPresupuestoMockMvc.perform(post("/api/presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presupuesto)))
            .andExpect(status().isBadRequest());

        List<Presupuesto> presupuestoList = presupuestoRepository.findAll();
        assertThat(presupuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPresupuestos() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList
        restPresupuestoMockMvc.perform(get("/api/presupuestos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(presupuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcionDescuento").value(hasItem(DEFAULT_DESCRIPCION_DESCUENTO.toString())))
            .andExpect(jsonPath("$.[*].descuento").value(hasItem(DEFAULT_DESCUENTO.doubleValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].fechaAceptado").value(hasItem(DEFAULT_FECHA_ACEPTADO.toString())))
            .andExpect(jsonPath("$.[*].fechaEntregado").value(hasItem(DEFAULT_FECHA_ENTREGADO.toString())))
            .andExpect(jsonPath("$.[*].importeTotal").value(hasItem(DEFAULT_IMPORTE_TOTAL.doubleValue())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())))
            .andExpect(jsonPath("$.[*].soldadura").value(hasItem(DEFAULT_SOLDADURA.booleanValue())))
            .andExpect(jsonPath("$.[*].modelo").value(hasItem(DEFAULT_MODELO.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getPresupuesto() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get the presupuesto
        restPresupuestoMockMvc.perform(get("/api/presupuestos/{id}", presupuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(presupuesto.getId().intValue()))
            .andExpect(jsonPath("$.descripcionDescuento").value(DEFAULT_DESCRIPCION_DESCUENTO.toString()))
            .andExpect(jsonPath("$.descuento").value(DEFAULT_DESCUENTO.doubleValue()))
            .andExpect(jsonPath("$.fechaCreacion").value(DEFAULT_FECHA_CREACION.toString()))
            .andExpect(jsonPath("$.fechaAceptado").value(DEFAULT_FECHA_ACEPTADO.toString()))
            .andExpect(jsonPath("$.fechaEntregado").value(DEFAULT_FECHA_ENTREGADO.toString()))
            .andExpect(jsonPath("$.importeTotal").value(DEFAULT_IMPORTE_TOTAL.doubleValue()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()))
            .andExpect(jsonPath("$.soldadura").value(DEFAULT_SOLDADURA.booleanValue()))
            .andExpect(jsonPath("$.modelo").value(DEFAULT_MODELO.booleanValue()));
    }

    @Test
    @Transactional
    public void getAllPresupuestosByDescripcionDescuentoIsEqualToSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where descripcionDescuento equals to DEFAULT_DESCRIPCION_DESCUENTO
        defaultPresupuestoShouldBeFound("descripcionDescuento.equals=" + DEFAULT_DESCRIPCION_DESCUENTO);

        // Get all the presupuestoList where descripcionDescuento equals to UPDATED_DESCRIPCION_DESCUENTO
        defaultPresupuestoShouldNotBeFound("descripcionDescuento.equals=" + UPDATED_DESCRIPCION_DESCUENTO);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByDescripcionDescuentoIsInShouldWork() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where descripcionDescuento in DEFAULT_DESCRIPCION_DESCUENTO or UPDATED_DESCRIPCION_DESCUENTO
        defaultPresupuestoShouldBeFound("descripcionDescuento.in=" + DEFAULT_DESCRIPCION_DESCUENTO + "," + UPDATED_DESCRIPCION_DESCUENTO);

        // Get all the presupuestoList where descripcionDescuento equals to UPDATED_DESCRIPCION_DESCUENTO
        defaultPresupuestoShouldNotBeFound("descripcionDescuento.in=" + UPDATED_DESCRIPCION_DESCUENTO);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByDescripcionDescuentoIsNullOrNotNull() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where descripcionDescuento is not null
        defaultPresupuestoShouldBeFound("descripcionDescuento.specified=true");

        // Get all the presupuestoList where descripcionDescuento is null
        defaultPresupuestoShouldNotBeFound("descripcionDescuento.specified=false");
    }

    @Test
    @Transactional
    public void getAllPresupuestosByDescuentoIsEqualToSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where descuento equals to DEFAULT_DESCUENTO
        defaultPresupuestoShouldBeFound("descuento.equals=" + DEFAULT_DESCUENTO);

        // Get all the presupuestoList where descuento equals to UPDATED_DESCUENTO
        defaultPresupuestoShouldNotBeFound("descuento.equals=" + UPDATED_DESCUENTO);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByDescuentoIsInShouldWork() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where descuento in DEFAULT_DESCUENTO or UPDATED_DESCUENTO
        defaultPresupuestoShouldBeFound("descuento.in=" + DEFAULT_DESCUENTO + "," + UPDATED_DESCUENTO);

        // Get all the presupuestoList where descuento equals to UPDATED_DESCUENTO
        defaultPresupuestoShouldNotBeFound("descuento.in=" + UPDATED_DESCUENTO);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByDescuentoIsNullOrNotNull() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where descuento is not null
        defaultPresupuestoShouldBeFound("descuento.specified=true");

        // Get all the presupuestoList where descuento is null
        defaultPresupuestoShouldNotBeFound("descuento.specified=false");
    }

    @Test
    @Transactional
    public void getAllPresupuestosByDescuentoIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where descuento is greater than or equal to DEFAULT_DESCUENTO
        defaultPresupuestoShouldBeFound("descuento.greaterThanOrEqual=" + DEFAULT_DESCUENTO);

        // Get all the presupuestoList where descuento is greater than or equal to UPDATED_DESCUENTO
        defaultPresupuestoShouldNotBeFound("descuento.greaterThanOrEqual=" + UPDATED_DESCUENTO);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByDescuentoIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where descuento is less than or equal to DEFAULT_DESCUENTO
        defaultPresupuestoShouldBeFound("descuento.lessThanOrEqual=" + DEFAULT_DESCUENTO);

        // Get all the presupuestoList where descuento is less than or equal to SMALLER_DESCUENTO
        defaultPresupuestoShouldNotBeFound("descuento.lessThanOrEqual=" + SMALLER_DESCUENTO);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByDescuentoIsLessThanSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where descuento is less than DEFAULT_DESCUENTO
        defaultPresupuestoShouldNotBeFound("descuento.lessThan=" + DEFAULT_DESCUENTO);

        // Get all the presupuestoList where descuento is less than UPDATED_DESCUENTO
        defaultPresupuestoShouldBeFound("descuento.lessThan=" + UPDATED_DESCUENTO);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByDescuentoIsGreaterThanSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where descuento is greater than DEFAULT_DESCUENTO
        defaultPresupuestoShouldNotBeFound("descuento.greaterThan=" + DEFAULT_DESCUENTO);

        // Get all the presupuestoList where descuento is greater than SMALLER_DESCUENTO
        defaultPresupuestoShouldBeFound("descuento.greaterThan=" + SMALLER_DESCUENTO);
    }


    @Test
    @Transactional
    public void getAllPresupuestosByFechaCreacionIsEqualToSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where fechaCreacion equals to DEFAULT_FECHA_CREACION
        defaultPresupuestoShouldBeFound("fechaCreacion.equals=" + DEFAULT_FECHA_CREACION);

        // Get all the presupuestoList where fechaCreacion equals to UPDATED_FECHA_CREACION
        defaultPresupuestoShouldNotBeFound("fechaCreacion.equals=" + UPDATED_FECHA_CREACION);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByFechaCreacionIsInShouldWork() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where fechaCreacion in DEFAULT_FECHA_CREACION or UPDATED_FECHA_CREACION
        defaultPresupuestoShouldBeFound("fechaCreacion.in=" + DEFAULT_FECHA_CREACION + "," + UPDATED_FECHA_CREACION);

        // Get all the presupuestoList where fechaCreacion equals to UPDATED_FECHA_CREACION
        defaultPresupuestoShouldNotBeFound("fechaCreacion.in=" + UPDATED_FECHA_CREACION);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByFechaCreacionIsNullOrNotNull() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where fechaCreacion is not null
        defaultPresupuestoShouldBeFound("fechaCreacion.specified=true");

        // Get all the presupuestoList where fechaCreacion is null
        defaultPresupuestoShouldNotBeFound("fechaCreacion.specified=false");
    }

    @Test
    @Transactional
    public void getAllPresupuestosByFechaCreacionIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where fechaCreacion is greater than or equal to DEFAULT_FECHA_CREACION
        defaultPresupuestoShouldBeFound("fechaCreacion.greaterThanOrEqual=" + DEFAULT_FECHA_CREACION);

        // Get all the presupuestoList where fechaCreacion is greater than or equal to UPDATED_FECHA_CREACION
        defaultPresupuestoShouldNotBeFound("fechaCreacion.greaterThanOrEqual=" + UPDATED_FECHA_CREACION);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByFechaCreacionIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where fechaCreacion is less than or equal to DEFAULT_FECHA_CREACION
        defaultPresupuestoShouldBeFound("fechaCreacion.lessThanOrEqual=" + DEFAULT_FECHA_CREACION);

        // Get all the presupuestoList where fechaCreacion is less than or equal to SMALLER_FECHA_CREACION
        defaultPresupuestoShouldNotBeFound("fechaCreacion.lessThanOrEqual=" + SMALLER_FECHA_CREACION);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByFechaCreacionIsLessThanSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where fechaCreacion is less than DEFAULT_FECHA_CREACION
        defaultPresupuestoShouldNotBeFound("fechaCreacion.lessThan=" + DEFAULT_FECHA_CREACION);

        // Get all the presupuestoList where fechaCreacion is less than UPDATED_FECHA_CREACION
        defaultPresupuestoShouldBeFound("fechaCreacion.lessThan=" + UPDATED_FECHA_CREACION);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByFechaCreacionIsGreaterThanSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where fechaCreacion is greater than DEFAULT_FECHA_CREACION
        defaultPresupuestoShouldNotBeFound("fechaCreacion.greaterThan=" + DEFAULT_FECHA_CREACION);

        // Get all the presupuestoList where fechaCreacion is greater than SMALLER_FECHA_CREACION
        defaultPresupuestoShouldBeFound("fechaCreacion.greaterThan=" + SMALLER_FECHA_CREACION);
    }


    @Test
    @Transactional
    public void getAllPresupuestosByFechaAceptadoIsEqualToSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where fechaAceptado equals to DEFAULT_FECHA_ACEPTADO
        defaultPresupuestoShouldBeFound("fechaAceptado.equals=" + DEFAULT_FECHA_ACEPTADO);

        // Get all the presupuestoList where fechaAceptado equals to UPDATED_FECHA_ACEPTADO
        defaultPresupuestoShouldNotBeFound("fechaAceptado.equals=" + UPDATED_FECHA_ACEPTADO);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByFechaAceptadoIsInShouldWork() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where fechaAceptado in DEFAULT_FECHA_ACEPTADO or UPDATED_FECHA_ACEPTADO
        defaultPresupuestoShouldBeFound("fechaAceptado.in=" + DEFAULT_FECHA_ACEPTADO + "," + UPDATED_FECHA_ACEPTADO);

        // Get all the presupuestoList where fechaAceptado equals to UPDATED_FECHA_ACEPTADO
        defaultPresupuestoShouldNotBeFound("fechaAceptado.in=" + UPDATED_FECHA_ACEPTADO);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByFechaAceptadoIsNullOrNotNull() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where fechaAceptado is not null
        defaultPresupuestoShouldBeFound("fechaAceptado.specified=true");

        // Get all the presupuestoList where fechaAceptado is null
        defaultPresupuestoShouldNotBeFound("fechaAceptado.specified=false");
    }

    @Test
    @Transactional
    public void getAllPresupuestosByFechaAceptadoIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where fechaAceptado is greater than or equal to DEFAULT_FECHA_ACEPTADO
        defaultPresupuestoShouldBeFound("fechaAceptado.greaterThanOrEqual=" + DEFAULT_FECHA_ACEPTADO);

        // Get all the presupuestoList where fechaAceptado is greater than or equal to UPDATED_FECHA_ACEPTADO
        defaultPresupuestoShouldNotBeFound("fechaAceptado.greaterThanOrEqual=" + UPDATED_FECHA_ACEPTADO);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByFechaAceptadoIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where fechaAceptado is less than or equal to DEFAULT_FECHA_ACEPTADO
        defaultPresupuestoShouldBeFound("fechaAceptado.lessThanOrEqual=" + DEFAULT_FECHA_ACEPTADO);

        // Get all the presupuestoList where fechaAceptado is less than or equal to SMALLER_FECHA_ACEPTADO
        defaultPresupuestoShouldNotBeFound("fechaAceptado.lessThanOrEqual=" + SMALLER_FECHA_ACEPTADO);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByFechaAceptadoIsLessThanSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where fechaAceptado is less than DEFAULT_FECHA_ACEPTADO
        defaultPresupuestoShouldNotBeFound("fechaAceptado.lessThan=" + DEFAULT_FECHA_ACEPTADO);

        // Get all the presupuestoList where fechaAceptado is less than UPDATED_FECHA_ACEPTADO
        defaultPresupuestoShouldBeFound("fechaAceptado.lessThan=" + UPDATED_FECHA_ACEPTADO);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByFechaAceptadoIsGreaterThanSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where fechaAceptado is greater than DEFAULT_FECHA_ACEPTADO
        defaultPresupuestoShouldNotBeFound("fechaAceptado.greaterThan=" + DEFAULT_FECHA_ACEPTADO);

        // Get all the presupuestoList where fechaAceptado is greater than SMALLER_FECHA_ACEPTADO
        defaultPresupuestoShouldBeFound("fechaAceptado.greaterThan=" + SMALLER_FECHA_ACEPTADO);
    }


    @Test
    @Transactional
    public void getAllPresupuestosByFechaEntregadoIsEqualToSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where fechaEntregado equals to DEFAULT_FECHA_ENTREGADO
        defaultPresupuestoShouldBeFound("fechaEntregado.equals=" + DEFAULT_FECHA_ENTREGADO);

        // Get all the presupuestoList where fechaEntregado equals to UPDATED_FECHA_ENTREGADO
        defaultPresupuestoShouldNotBeFound("fechaEntregado.equals=" + UPDATED_FECHA_ENTREGADO);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByFechaEntregadoIsInShouldWork() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where fechaEntregado in DEFAULT_FECHA_ENTREGADO or UPDATED_FECHA_ENTREGADO
        defaultPresupuestoShouldBeFound("fechaEntregado.in=" + DEFAULT_FECHA_ENTREGADO + "," + UPDATED_FECHA_ENTREGADO);

        // Get all the presupuestoList where fechaEntregado equals to UPDATED_FECHA_ENTREGADO
        defaultPresupuestoShouldNotBeFound("fechaEntregado.in=" + UPDATED_FECHA_ENTREGADO);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByFechaEntregadoIsNullOrNotNull() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where fechaEntregado is not null
        defaultPresupuestoShouldBeFound("fechaEntregado.specified=true");

        // Get all the presupuestoList where fechaEntregado is null
        defaultPresupuestoShouldNotBeFound("fechaEntregado.specified=false");
    }

    @Test
    @Transactional
    public void getAllPresupuestosByFechaEntregadoIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where fechaEntregado is greater than or equal to DEFAULT_FECHA_ENTREGADO
        defaultPresupuestoShouldBeFound("fechaEntregado.greaterThanOrEqual=" + DEFAULT_FECHA_ENTREGADO);

        // Get all the presupuestoList where fechaEntregado is greater than or equal to UPDATED_FECHA_ENTREGADO
        defaultPresupuestoShouldNotBeFound("fechaEntregado.greaterThanOrEqual=" + UPDATED_FECHA_ENTREGADO);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByFechaEntregadoIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where fechaEntregado is less than or equal to DEFAULT_FECHA_ENTREGADO
        defaultPresupuestoShouldBeFound("fechaEntregado.lessThanOrEqual=" + DEFAULT_FECHA_ENTREGADO);

        // Get all the presupuestoList where fechaEntregado is less than or equal to SMALLER_FECHA_ENTREGADO
        defaultPresupuestoShouldNotBeFound("fechaEntregado.lessThanOrEqual=" + SMALLER_FECHA_ENTREGADO);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByFechaEntregadoIsLessThanSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where fechaEntregado is less than DEFAULT_FECHA_ENTREGADO
        defaultPresupuestoShouldNotBeFound("fechaEntregado.lessThan=" + DEFAULT_FECHA_ENTREGADO);

        // Get all the presupuestoList where fechaEntregado is less than UPDATED_FECHA_ENTREGADO
        defaultPresupuestoShouldBeFound("fechaEntregado.lessThan=" + UPDATED_FECHA_ENTREGADO);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByFechaEntregadoIsGreaterThanSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where fechaEntregado is greater than DEFAULT_FECHA_ENTREGADO
        defaultPresupuestoShouldNotBeFound("fechaEntregado.greaterThan=" + DEFAULT_FECHA_ENTREGADO);

        // Get all the presupuestoList where fechaEntregado is greater than SMALLER_FECHA_ENTREGADO
        defaultPresupuestoShouldBeFound("fechaEntregado.greaterThan=" + SMALLER_FECHA_ENTREGADO);
    }


    @Test
    @Transactional
    public void getAllPresupuestosByImporteTotalIsEqualToSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where importeTotal equals to DEFAULT_IMPORTE_TOTAL
        defaultPresupuestoShouldBeFound("importeTotal.equals=" + DEFAULT_IMPORTE_TOTAL);

        // Get all the presupuestoList where importeTotal equals to UPDATED_IMPORTE_TOTAL
        defaultPresupuestoShouldNotBeFound("importeTotal.equals=" + UPDATED_IMPORTE_TOTAL);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByImporteTotalIsInShouldWork() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where importeTotal in DEFAULT_IMPORTE_TOTAL or UPDATED_IMPORTE_TOTAL
        defaultPresupuestoShouldBeFound("importeTotal.in=" + DEFAULT_IMPORTE_TOTAL + "," + UPDATED_IMPORTE_TOTAL);

        // Get all the presupuestoList where importeTotal equals to UPDATED_IMPORTE_TOTAL
        defaultPresupuestoShouldNotBeFound("importeTotal.in=" + UPDATED_IMPORTE_TOTAL);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByImporteTotalIsNullOrNotNull() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where importeTotal is not null
        defaultPresupuestoShouldBeFound("importeTotal.specified=true");

        // Get all the presupuestoList where importeTotal is null
        defaultPresupuestoShouldNotBeFound("importeTotal.specified=false");
    }

    @Test
    @Transactional
    public void getAllPresupuestosByImporteTotalIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where importeTotal is greater than or equal to DEFAULT_IMPORTE_TOTAL
        defaultPresupuestoShouldBeFound("importeTotal.greaterThanOrEqual=" + DEFAULT_IMPORTE_TOTAL);

        // Get all the presupuestoList where importeTotal is greater than or equal to UPDATED_IMPORTE_TOTAL
        defaultPresupuestoShouldNotBeFound("importeTotal.greaterThanOrEqual=" + UPDATED_IMPORTE_TOTAL);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByImporteTotalIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where importeTotal is less than or equal to DEFAULT_IMPORTE_TOTAL
        defaultPresupuestoShouldBeFound("importeTotal.lessThanOrEqual=" + DEFAULT_IMPORTE_TOTAL);

        // Get all the presupuestoList where importeTotal is less than or equal to SMALLER_IMPORTE_TOTAL
        defaultPresupuestoShouldNotBeFound("importeTotal.lessThanOrEqual=" + SMALLER_IMPORTE_TOTAL);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByImporteTotalIsLessThanSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where importeTotal is less than DEFAULT_IMPORTE_TOTAL
        defaultPresupuestoShouldNotBeFound("importeTotal.lessThan=" + DEFAULT_IMPORTE_TOTAL);

        // Get all the presupuestoList where importeTotal is less than UPDATED_IMPORTE_TOTAL
        defaultPresupuestoShouldBeFound("importeTotal.lessThan=" + UPDATED_IMPORTE_TOTAL);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByImporteTotalIsGreaterThanSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where importeTotal is greater than DEFAULT_IMPORTE_TOTAL
        defaultPresupuestoShouldNotBeFound("importeTotal.greaterThan=" + DEFAULT_IMPORTE_TOTAL);

        // Get all the presupuestoList where importeTotal is greater than SMALLER_IMPORTE_TOTAL
        defaultPresupuestoShouldBeFound("importeTotal.greaterThan=" + SMALLER_IMPORTE_TOTAL);
    }


    @Test
    @Transactional
    public void getAllPresupuestosByObservacionesIsEqualToSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where observaciones equals to DEFAULT_OBSERVACIONES
        defaultPresupuestoShouldBeFound("observaciones.equals=" + DEFAULT_OBSERVACIONES);

        // Get all the presupuestoList where observaciones equals to UPDATED_OBSERVACIONES
        defaultPresupuestoShouldNotBeFound("observaciones.equals=" + UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByObservacionesIsInShouldWork() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where observaciones in DEFAULT_OBSERVACIONES or UPDATED_OBSERVACIONES
        defaultPresupuestoShouldBeFound("observaciones.in=" + DEFAULT_OBSERVACIONES + "," + UPDATED_OBSERVACIONES);

        // Get all the presupuestoList where observaciones equals to UPDATED_OBSERVACIONES
        defaultPresupuestoShouldNotBeFound("observaciones.in=" + UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByObservacionesIsNullOrNotNull() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where observaciones is not null
        defaultPresupuestoShouldBeFound("observaciones.specified=true");

        // Get all the presupuestoList where observaciones is null
        defaultPresupuestoShouldNotBeFound("observaciones.specified=false");
    }

    @Test
    @Transactional
    public void getAllPresupuestosBySoldaduraIsEqualToSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where soldadura equals to DEFAULT_SOLDADURA
        defaultPresupuestoShouldBeFound("soldadura.equals=" + DEFAULT_SOLDADURA);

        // Get all the presupuestoList where soldadura equals to UPDATED_SOLDADURA
        defaultPresupuestoShouldNotBeFound("soldadura.equals=" + UPDATED_SOLDADURA);
    }

    @Test
    @Transactional
    public void getAllPresupuestosBySoldaduraIsInShouldWork() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where soldadura in DEFAULT_SOLDADURA or UPDATED_SOLDADURA
        defaultPresupuestoShouldBeFound("soldadura.in=" + DEFAULT_SOLDADURA + "," + UPDATED_SOLDADURA);

        // Get all the presupuestoList where soldadura equals to UPDATED_SOLDADURA
        defaultPresupuestoShouldNotBeFound("soldadura.in=" + UPDATED_SOLDADURA);
    }

    @Test
    @Transactional
    public void getAllPresupuestosBySoldaduraIsNullOrNotNull() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where soldadura is not null
        defaultPresupuestoShouldBeFound("soldadura.specified=true");

        // Get all the presupuestoList where soldadura is null
        defaultPresupuestoShouldNotBeFound("soldadura.specified=false");
    }

    @Test
    @Transactional
    public void getAllPresupuestosByModeloIsEqualToSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where modelo equals to DEFAULT_MODELO
        defaultPresupuestoShouldBeFound("modelo.equals=" + DEFAULT_MODELO);

        // Get all the presupuestoList where modelo equals to UPDATED_MODELO
        defaultPresupuestoShouldNotBeFound("modelo.equals=" + UPDATED_MODELO);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByModeloIsInShouldWork() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where modelo in DEFAULT_MODELO or UPDATED_MODELO
        defaultPresupuestoShouldBeFound("modelo.in=" + DEFAULT_MODELO + "," + UPDATED_MODELO);

        // Get all the presupuestoList where modelo equals to UPDATED_MODELO
        defaultPresupuestoShouldNotBeFound("modelo.in=" + UPDATED_MODELO);
    }

    @Test
    @Transactional
    public void getAllPresupuestosByModeloIsNullOrNotNull() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);

        // Get all the presupuestoList where modelo is not null
        defaultPresupuestoShouldBeFound("modelo.specified=true");

        // Get all the presupuestoList where modelo is null
        defaultPresupuestoShouldNotBeFound("modelo.specified=false");
    }

    @Test
    @Transactional
    public void getAllPresupuestosByClienteIsEqualToSomething() throws Exception {
        // Get already existing entity
        Cliente cliente = presupuesto.getCliente();
        presupuestoRepository.saveAndFlush(presupuesto);
        Long clienteId = cliente.getId();

        // Get all the presupuestoList where cliente equals to clienteId
        defaultPresupuestoShouldBeFound("clienteId.equals=" + clienteId);

        // Get all the presupuestoList where cliente equals to clienteId + 1
        defaultPresupuestoShouldNotBeFound("clienteId.equals=" + (clienteId + 1));
    }


    @Test
    @Transactional
    public void getAllPresupuestosByEstadoPresupuestoIsEqualToSomething() throws Exception {
        // Get already existing entity
        EstadoPresupuesto estadoPresupuesto = presupuesto.getEstadoPresupuesto();
        presupuestoRepository.saveAndFlush(presupuesto);
        Long estadoPresupuestoId = estadoPresupuesto.getId();

        // Get all the presupuestoList where estadoPresupuesto equals to estadoPresupuestoId
        defaultPresupuestoShouldBeFound("estadoPresupuestoId.equals=" + estadoPresupuestoId);

        // Get all the presupuestoList where estadoPresupuesto equals to estadoPresupuestoId + 1
        defaultPresupuestoShouldNotBeFound("estadoPresupuestoId.equals=" + (estadoPresupuestoId + 1));
    }


    @Test
    @Transactional
    public void getAllPresupuestosByDetallePresupuestoIsEqualToSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);
        DetallePresupuesto detallePresupuesto = DetallePresupuestoResourceIT.createEntity(em);
        em.persist(detallePresupuesto);
        em.flush();
        presupuesto.addDetallePresupuesto(detallePresupuesto);
        presupuestoRepository.saveAndFlush(presupuesto);
        Long detallePresupuestoId = detallePresupuesto.getId();

        // Get all the presupuestoList where detallePresupuesto equals to detallePresupuestoId
        defaultPresupuestoShouldBeFound("detallePresupuestoId.equals=" + detallePresupuestoId);

        // Get all the presupuestoList where detallePresupuesto equals to detallePresupuestoId + 1
        defaultPresupuestoShouldNotBeFound("detallePresupuestoId.equals=" + (detallePresupuestoId + 1));
    }


    @Test
    @Transactional
    public void getAllPresupuestosByDocumentTypeIsEqualToSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);
        DocumentationType documentType = DocumentationTypeResourceIT.createEntity(em);
        em.persist(documentType);
        em.flush();
        presupuesto.setDocumentType(documentType);
        presupuestoRepository.saveAndFlush(presupuesto);
        Long documentTypeId = documentType.getId();

        // Get all the presupuestoList where documentType equals to documentTypeId
        defaultPresupuestoShouldBeFound("documentTypeId.equals=" + documentTypeId);

        // Get all the presupuestoList where documentType equals to documentTypeId + 1
        defaultPresupuestoShouldNotBeFound("documentTypeId.equals=" + (documentTypeId + 1));
    }


    @Test
    @Transactional
    public void getAllPresupuestosBySucursalIsEqualToSomething() throws Exception {
        // Initialize the database
        presupuestoRepository.saveAndFlush(presupuesto);
        Sucursal sucursal = SucursalResourceIT.createEntity(em);
        em.persist(sucursal);
        em.flush();
        presupuesto.setSucursal(sucursal);
        presupuestoRepository.saveAndFlush(presupuesto);
        Long sucursalId = sucursal.getId();

        // Get all the presupuestoList where sucursal equals to sucursalId
        defaultPresupuestoShouldBeFound("sucursalId.equals=" + sucursalId);

        // Get all the presupuestoList where sucursal equals to sucursalId + 1
        defaultPresupuestoShouldNotBeFound("sucursalId.equals=" + (sucursalId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultPresupuestoShouldBeFound(String filter) throws Exception {
        restPresupuestoMockMvc.perform(get("/api/presupuestos?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(presupuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcionDescuento").value(hasItem(DEFAULT_DESCRIPCION_DESCUENTO)))
            .andExpect(jsonPath("$.[*].descuento").value(hasItem(DEFAULT_DESCUENTO.doubleValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].fechaAceptado").value(hasItem(DEFAULT_FECHA_ACEPTADO.toString())))
            .andExpect(jsonPath("$.[*].fechaEntregado").value(hasItem(DEFAULT_FECHA_ENTREGADO.toString())))
            .andExpect(jsonPath("$.[*].importeTotal").value(hasItem(DEFAULT_IMPORTE_TOTAL.doubleValue())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES)))
            .andExpect(jsonPath("$.[*].soldadura").value(hasItem(DEFAULT_SOLDADURA.booleanValue())))
            .andExpect(jsonPath("$.[*].modelo").value(hasItem(DEFAULT_MODELO.booleanValue())));

        // Check, that the count call also returns 1
        restPresupuestoMockMvc.perform(get("/api/presupuestos/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultPresupuestoShouldNotBeFound(String filter) throws Exception {
        restPresupuestoMockMvc.perform(get("/api/presupuestos?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restPresupuestoMockMvc.perform(get("/api/presupuestos/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingPresupuesto() throws Exception {
        // Get the presupuesto
        restPresupuestoMockMvc.perform(get("/api/presupuestos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePresupuesto() throws Exception {
        // Initialize the database
        presupuestoService.save(presupuesto);

        int databaseSizeBeforeUpdate = presupuestoRepository.findAll().size();

        // Update the presupuesto
        Presupuesto updatedPresupuesto = presupuestoRepository.findById(presupuesto.getId()).get();
        // Disconnect from session so that the updates on updatedPresupuesto are not directly saved in db
        em.detach(updatedPresupuesto);
        updatedPresupuesto
            .descripcionDescuento(UPDATED_DESCRIPCION_DESCUENTO)
            .descuento(UPDATED_DESCUENTO)
            .fechaCreacion(UPDATED_FECHA_CREACION)
            .fechaAceptado(UPDATED_FECHA_ACEPTADO)
            .fechaEntregado(UPDATED_FECHA_ENTREGADO)
            .importeTotal(UPDATED_IMPORTE_TOTAL)
            .observaciones(UPDATED_OBSERVACIONES)
            .soldadura(UPDATED_SOLDADURA)
            .modelo(UPDATED_MODELO);

        restPresupuestoMockMvc.perform(put("/api/presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPresupuesto)))
            .andExpect(status().isOk());

        // Validate the Presupuesto in the database
        List<Presupuesto> presupuestoList = presupuestoRepository.findAll();
        assertThat(presupuestoList).hasSize(databaseSizeBeforeUpdate);
        Presupuesto testPresupuesto = presupuestoList.get(presupuestoList.size() - 1);
        assertThat(testPresupuesto.getDescripcionDescuento()).isEqualTo(UPDATED_DESCRIPCION_DESCUENTO);
        assertThat(testPresupuesto.getDescuento()).isEqualTo(UPDATED_DESCUENTO);
        assertThat(testPresupuesto.getFechaCreacion()).isEqualTo(UPDATED_FECHA_CREACION);
        assertThat(testPresupuesto.getFechaAceptado()).isEqualTo(UPDATED_FECHA_ACEPTADO);
        assertThat(testPresupuesto.getFechaEntregado()).isEqualTo(UPDATED_FECHA_ENTREGADO);
        assertThat(testPresupuesto.getImporteTotal()).isEqualTo(UPDATED_IMPORTE_TOTAL);
        assertThat(testPresupuesto.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
        assertThat(testPresupuesto.isSoldadura()).isEqualTo(UPDATED_SOLDADURA);
        assertThat(testPresupuesto.isModelo()).isEqualTo(UPDATED_MODELO);
    }

    @Test
    @Transactional
    public void updateNonExistingPresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = presupuestoRepository.findAll().size();

        // Create the Presupuesto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPresupuestoMockMvc.perform(put("/api/presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(presupuesto)))
            .andExpect(status().isBadRequest());

        // Validate the Presupuesto in the database
        List<Presupuesto> presupuestoList = presupuestoRepository.findAll();
        assertThat(presupuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePresupuesto() throws Exception {
        // Initialize the database
        presupuestoService.save(presupuesto);

        int databaseSizeBeforeDelete = presupuestoRepository.findAll().size();

        // Delete the presupuesto
        restPresupuestoMockMvc.perform(delete("/api/presupuestos/{id}", presupuesto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Presupuesto> presupuestoList = presupuestoRepository.findAll();
        assertThat(presupuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Presupuesto.class);
        Presupuesto presupuesto1 = new Presupuesto();
        presupuesto1.setId(1L);
        Presupuesto presupuesto2 = new Presupuesto();
        presupuesto2.setId(presupuesto1.getId());
        assertThat(presupuesto1).isEqualTo(presupuesto2);
        presupuesto2.setId(2L);
        assertThat(presupuesto1).isNotEqualTo(presupuesto2);
        presupuesto1.setId(null);
        assertThat(presupuesto1).isNotEqualTo(presupuesto2);
    }
}
