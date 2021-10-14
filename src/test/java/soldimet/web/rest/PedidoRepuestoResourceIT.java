package soldimet.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import soldimet.IntegrationTest;
import soldimet.domain.DocumentationType;
import soldimet.domain.EstadoPedidoRepuesto;
import soldimet.domain.PedidoRepuesto;
import soldimet.domain.Presupuesto;
import soldimet.repository.PedidoRepuestoRepository;
import soldimet.service.criteria.PedidoRepuestoCriteria;

/**
 * Integration tests for the {@link PedidoRepuestoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PedidoRepuestoResourceIT {

    private static final LocalDate DEFAULT_FECHA_CREACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CREACION = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA_CREACION = LocalDate.ofEpochDay(-1L);

    private static final LocalDate DEFAULT_FECHA_PEDIDO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_PEDIDO = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA_PEDIDO = LocalDate.ofEpochDay(-1L);

    private static final LocalDate DEFAULT_FECHA_RECIBO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_RECIBO = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA_RECIBO = LocalDate.ofEpochDay(-1L);

    private static final String ENTITY_API_URL = "/api/pedido-repuestos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PedidoRepuestoRepository pedidoRepuestoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPedidoRepuestoMockMvc;

    private PedidoRepuesto pedidoRepuesto;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PedidoRepuesto createEntity(EntityManager em) {
        PedidoRepuesto pedidoRepuesto = new PedidoRepuesto()
            .fechaCreacion(DEFAULT_FECHA_CREACION)
            .fechaPedido(DEFAULT_FECHA_PEDIDO)
            .fechaRecibo(DEFAULT_FECHA_RECIBO);
        // Add required entity
        EstadoPedidoRepuesto estadoPedidoRepuesto;
        if (TestUtil.findAll(em, EstadoPedidoRepuesto.class).isEmpty()) {
            estadoPedidoRepuesto = EstadoPedidoRepuestoResourceIT.createEntity(em);
            em.persist(estadoPedidoRepuesto);
            em.flush();
        } else {
            estadoPedidoRepuesto = TestUtil.findAll(em, EstadoPedidoRepuesto.class).get(0);
        }
        pedidoRepuesto.setEstadoPedidoRepuesto(estadoPedidoRepuesto);
        // Add required entity
        Presupuesto presupuesto;
        if (TestUtil.findAll(em, Presupuesto.class).isEmpty()) {
            presupuesto = PresupuestoResourceIT.createEntity(em);
            em.persist(presupuesto);
            em.flush();
        } else {
            presupuesto = TestUtil.findAll(em, Presupuesto.class).get(0);
        }
        pedidoRepuesto.setPresupuesto(presupuesto);
        return pedidoRepuesto;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PedidoRepuesto createUpdatedEntity(EntityManager em) {
        PedidoRepuesto pedidoRepuesto = new PedidoRepuesto()
            .fechaCreacion(UPDATED_FECHA_CREACION)
            .fechaPedido(UPDATED_FECHA_PEDIDO)
            .fechaRecibo(UPDATED_FECHA_RECIBO);
        // Add required entity
        EstadoPedidoRepuesto estadoPedidoRepuesto;
        if (TestUtil.findAll(em, EstadoPedidoRepuesto.class).isEmpty()) {
            estadoPedidoRepuesto = EstadoPedidoRepuestoResourceIT.createUpdatedEntity(em);
            em.persist(estadoPedidoRepuesto);
            em.flush();
        } else {
            estadoPedidoRepuesto = TestUtil.findAll(em, EstadoPedidoRepuesto.class).get(0);
        }
        pedidoRepuesto.setEstadoPedidoRepuesto(estadoPedidoRepuesto);
        // Add required entity
        Presupuesto presupuesto;
        if (TestUtil.findAll(em, Presupuesto.class).isEmpty()) {
            presupuesto = PresupuestoResourceIT.createUpdatedEntity(em);
            em.persist(presupuesto);
            em.flush();
        } else {
            presupuesto = TestUtil.findAll(em, Presupuesto.class).get(0);
        }
        pedidoRepuesto.setPresupuesto(presupuesto);
        return pedidoRepuesto;
    }

    @BeforeEach
    public void initTest() {
        pedidoRepuesto = createEntity(em);
    }

    @Test
    @Transactional
    void createPedidoRepuesto() throws Exception {
        int databaseSizeBeforeCreate = pedidoRepuestoRepository.findAll().size();
        // Create the PedidoRepuesto
        restPedidoRepuestoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pedidoRepuesto))
            )
            .andExpect(status().isCreated());

        // Validate the PedidoRepuesto in the database
        List<PedidoRepuesto> pedidoRepuestoList = pedidoRepuestoRepository.findAll();
        assertThat(pedidoRepuestoList).hasSize(databaseSizeBeforeCreate + 1);
        PedidoRepuesto testPedidoRepuesto = pedidoRepuestoList.get(pedidoRepuestoList.size() - 1);
        assertThat(testPedidoRepuesto.getFechaCreacion()).isEqualTo(DEFAULT_FECHA_CREACION);
        assertThat(testPedidoRepuesto.getFechaPedido()).isEqualTo(DEFAULT_FECHA_PEDIDO);
        assertThat(testPedidoRepuesto.getFechaRecibo()).isEqualTo(DEFAULT_FECHA_RECIBO);
    }

    @Test
    @Transactional
    void createPedidoRepuestoWithExistingId() throws Exception {
        // Create the PedidoRepuesto with an existing ID
        pedidoRepuesto.setId(1L);

        int databaseSizeBeforeCreate = pedidoRepuestoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPedidoRepuestoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pedidoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the PedidoRepuesto in the database
        List<PedidoRepuesto> pedidoRepuestoList = pedidoRepuestoRepository.findAll();
        assertThat(pedidoRepuestoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkFechaCreacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = pedidoRepuestoRepository.findAll().size();
        // set the field null
        pedidoRepuesto.setFechaCreacion(null);

        // Create the PedidoRepuesto, which fails.

        restPedidoRepuestoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pedidoRepuesto))
            )
            .andExpect(status().isBadRequest());

        List<PedidoRepuesto> pedidoRepuestoList = pedidoRepuestoRepository.findAll();
        assertThat(pedidoRepuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestos() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList
        restPedidoRepuestoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pedidoRepuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].fechaPedido").value(hasItem(DEFAULT_FECHA_PEDIDO.toString())))
            .andExpect(jsonPath("$.[*].fechaRecibo").value(hasItem(DEFAULT_FECHA_RECIBO.toString())));
    }

    @Test
    @Transactional
    void getPedidoRepuesto() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get the pedidoRepuesto
        restPedidoRepuestoMockMvc
            .perform(get(ENTITY_API_URL_ID, pedidoRepuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pedidoRepuesto.getId().intValue()))
            .andExpect(jsonPath("$.fechaCreacion").value(DEFAULT_FECHA_CREACION.toString()))
            .andExpect(jsonPath("$.fechaPedido").value(DEFAULT_FECHA_PEDIDO.toString()))
            .andExpect(jsonPath("$.fechaRecibo").value(DEFAULT_FECHA_RECIBO.toString()));
    }

    @Test
    @Transactional
    void getPedidoRepuestosByIdFiltering() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        Long id = pedidoRepuesto.getId();

        defaultPedidoRepuestoShouldBeFound("id.equals=" + id);
        defaultPedidoRepuestoShouldNotBeFound("id.notEquals=" + id);

        defaultPedidoRepuestoShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultPedidoRepuestoShouldNotBeFound("id.greaterThan=" + id);

        defaultPedidoRepuestoShouldBeFound("id.lessThanOrEqual=" + id);
        defaultPedidoRepuestoShouldNotBeFound("id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaCreacionIsEqualToSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaCreacion equals to DEFAULT_FECHA_CREACION
        defaultPedidoRepuestoShouldBeFound("fechaCreacion.equals=" + DEFAULT_FECHA_CREACION);

        // Get all the pedidoRepuestoList where fechaCreacion equals to UPDATED_FECHA_CREACION
        defaultPedidoRepuestoShouldNotBeFound("fechaCreacion.equals=" + UPDATED_FECHA_CREACION);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaCreacionIsNotEqualToSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaCreacion not equals to DEFAULT_FECHA_CREACION
        defaultPedidoRepuestoShouldNotBeFound("fechaCreacion.notEquals=" + DEFAULT_FECHA_CREACION);

        // Get all the pedidoRepuestoList where fechaCreacion not equals to UPDATED_FECHA_CREACION
        defaultPedidoRepuestoShouldBeFound("fechaCreacion.notEquals=" + UPDATED_FECHA_CREACION);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaCreacionIsInShouldWork() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaCreacion in DEFAULT_FECHA_CREACION or UPDATED_FECHA_CREACION
        defaultPedidoRepuestoShouldBeFound("fechaCreacion.in=" + DEFAULT_FECHA_CREACION + "," + UPDATED_FECHA_CREACION);

        // Get all the pedidoRepuestoList where fechaCreacion equals to UPDATED_FECHA_CREACION
        defaultPedidoRepuestoShouldNotBeFound("fechaCreacion.in=" + UPDATED_FECHA_CREACION);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaCreacionIsNullOrNotNull() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaCreacion is not null
        defaultPedidoRepuestoShouldBeFound("fechaCreacion.specified=true");

        // Get all the pedidoRepuestoList where fechaCreacion is null
        defaultPedidoRepuestoShouldNotBeFound("fechaCreacion.specified=false");
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaCreacionIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaCreacion is greater than or equal to DEFAULT_FECHA_CREACION
        defaultPedidoRepuestoShouldBeFound("fechaCreacion.greaterThanOrEqual=" + DEFAULT_FECHA_CREACION);

        // Get all the pedidoRepuestoList where fechaCreacion is greater than or equal to UPDATED_FECHA_CREACION
        defaultPedidoRepuestoShouldNotBeFound("fechaCreacion.greaterThanOrEqual=" + UPDATED_FECHA_CREACION);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaCreacionIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaCreacion is less than or equal to DEFAULT_FECHA_CREACION
        defaultPedidoRepuestoShouldBeFound("fechaCreacion.lessThanOrEqual=" + DEFAULT_FECHA_CREACION);

        // Get all the pedidoRepuestoList where fechaCreacion is less than or equal to SMALLER_FECHA_CREACION
        defaultPedidoRepuestoShouldNotBeFound("fechaCreacion.lessThanOrEqual=" + SMALLER_FECHA_CREACION);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaCreacionIsLessThanSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaCreacion is less than DEFAULT_FECHA_CREACION
        defaultPedidoRepuestoShouldNotBeFound("fechaCreacion.lessThan=" + DEFAULT_FECHA_CREACION);

        // Get all the pedidoRepuestoList where fechaCreacion is less than UPDATED_FECHA_CREACION
        defaultPedidoRepuestoShouldBeFound("fechaCreacion.lessThan=" + UPDATED_FECHA_CREACION);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaCreacionIsGreaterThanSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaCreacion is greater than DEFAULT_FECHA_CREACION
        defaultPedidoRepuestoShouldNotBeFound("fechaCreacion.greaterThan=" + DEFAULT_FECHA_CREACION);

        // Get all the pedidoRepuestoList where fechaCreacion is greater than SMALLER_FECHA_CREACION
        defaultPedidoRepuestoShouldBeFound("fechaCreacion.greaterThan=" + SMALLER_FECHA_CREACION);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaPedidoIsEqualToSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaPedido equals to DEFAULT_FECHA_PEDIDO
        defaultPedidoRepuestoShouldBeFound("fechaPedido.equals=" + DEFAULT_FECHA_PEDIDO);

        // Get all the pedidoRepuestoList where fechaPedido equals to UPDATED_FECHA_PEDIDO
        defaultPedidoRepuestoShouldNotBeFound("fechaPedido.equals=" + UPDATED_FECHA_PEDIDO);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaPedidoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaPedido not equals to DEFAULT_FECHA_PEDIDO
        defaultPedidoRepuestoShouldNotBeFound("fechaPedido.notEquals=" + DEFAULT_FECHA_PEDIDO);

        // Get all the pedidoRepuestoList where fechaPedido not equals to UPDATED_FECHA_PEDIDO
        defaultPedidoRepuestoShouldBeFound("fechaPedido.notEquals=" + UPDATED_FECHA_PEDIDO);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaPedidoIsInShouldWork() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaPedido in DEFAULT_FECHA_PEDIDO or UPDATED_FECHA_PEDIDO
        defaultPedidoRepuestoShouldBeFound("fechaPedido.in=" + DEFAULT_FECHA_PEDIDO + "," + UPDATED_FECHA_PEDIDO);

        // Get all the pedidoRepuestoList where fechaPedido equals to UPDATED_FECHA_PEDIDO
        defaultPedidoRepuestoShouldNotBeFound("fechaPedido.in=" + UPDATED_FECHA_PEDIDO);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaPedidoIsNullOrNotNull() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaPedido is not null
        defaultPedidoRepuestoShouldBeFound("fechaPedido.specified=true");

        // Get all the pedidoRepuestoList where fechaPedido is null
        defaultPedidoRepuestoShouldNotBeFound("fechaPedido.specified=false");
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaPedidoIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaPedido is greater than or equal to DEFAULT_FECHA_PEDIDO
        defaultPedidoRepuestoShouldBeFound("fechaPedido.greaterThanOrEqual=" + DEFAULT_FECHA_PEDIDO);

        // Get all the pedidoRepuestoList where fechaPedido is greater than or equal to UPDATED_FECHA_PEDIDO
        defaultPedidoRepuestoShouldNotBeFound("fechaPedido.greaterThanOrEqual=" + UPDATED_FECHA_PEDIDO);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaPedidoIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaPedido is less than or equal to DEFAULT_FECHA_PEDIDO
        defaultPedidoRepuestoShouldBeFound("fechaPedido.lessThanOrEqual=" + DEFAULT_FECHA_PEDIDO);

        // Get all the pedidoRepuestoList where fechaPedido is less than or equal to SMALLER_FECHA_PEDIDO
        defaultPedidoRepuestoShouldNotBeFound("fechaPedido.lessThanOrEqual=" + SMALLER_FECHA_PEDIDO);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaPedidoIsLessThanSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaPedido is less than DEFAULT_FECHA_PEDIDO
        defaultPedidoRepuestoShouldNotBeFound("fechaPedido.lessThan=" + DEFAULT_FECHA_PEDIDO);

        // Get all the pedidoRepuestoList where fechaPedido is less than UPDATED_FECHA_PEDIDO
        defaultPedidoRepuestoShouldBeFound("fechaPedido.lessThan=" + UPDATED_FECHA_PEDIDO);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaPedidoIsGreaterThanSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaPedido is greater than DEFAULT_FECHA_PEDIDO
        defaultPedidoRepuestoShouldNotBeFound("fechaPedido.greaterThan=" + DEFAULT_FECHA_PEDIDO);

        // Get all the pedidoRepuestoList where fechaPedido is greater than SMALLER_FECHA_PEDIDO
        defaultPedidoRepuestoShouldBeFound("fechaPedido.greaterThan=" + SMALLER_FECHA_PEDIDO);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaReciboIsEqualToSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaRecibo equals to DEFAULT_FECHA_RECIBO
        defaultPedidoRepuestoShouldBeFound("fechaRecibo.equals=" + DEFAULT_FECHA_RECIBO);

        // Get all the pedidoRepuestoList where fechaRecibo equals to UPDATED_FECHA_RECIBO
        defaultPedidoRepuestoShouldNotBeFound("fechaRecibo.equals=" + UPDATED_FECHA_RECIBO);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaReciboIsNotEqualToSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaRecibo not equals to DEFAULT_FECHA_RECIBO
        defaultPedidoRepuestoShouldNotBeFound("fechaRecibo.notEquals=" + DEFAULT_FECHA_RECIBO);

        // Get all the pedidoRepuestoList where fechaRecibo not equals to UPDATED_FECHA_RECIBO
        defaultPedidoRepuestoShouldBeFound("fechaRecibo.notEquals=" + UPDATED_FECHA_RECIBO);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaReciboIsInShouldWork() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaRecibo in DEFAULT_FECHA_RECIBO or UPDATED_FECHA_RECIBO
        defaultPedidoRepuestoShouldBeFound("fechaRecibo.in=" + DEFAULT_FECHA_RECIBO + "," + UPDATED_FECHA_RECIBO);

        // Get all the pedidoRepuestoList where fechaRecibo equals to UPDATED_FECHA_RECIBO
        defaultPedidoRepuestoShouldNotBeFound("fechaRecibo.in=" + UPDATED_FECHA_RECIBO);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaReciboIsNullOrNotNull() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaRecibo is not null
        defaultPedidoRepuestoShouldBeFound("fechaRecibo.specified=true");

        // Get all the pedidoRepuestoList where fechaRecibo is null
        defaultPedidoRepuestoShouldNotBeFound("fechaRecibo.specified=false");
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaReciboIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaRecibo is greater than or equal to DEFAULT_FECHA_RECIBO
        defaultPedidoRepuestoShouldBeFound("fechaRecibo.greaterThanOrEqual=" + DEFAULT_FECHA_RECIBO);

        // Get all the pedidoRepuestoList where fechaRecibo is greater than or equal to UPDATED_FECHA_RECIBO
        defaultPedidoRepuestoShouldNotBeFound("fechaRecibo.greaterThanOrEqual=" + UPDATED_FECHA_RECIBO);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaReciboIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaRecibo is less than or equal to DEFAULT_FECHA_RECIBO
        defaultPedidoRepuestoShouldBeFound("fechaRecibo.lessThanOrEqual=" + DEFAULT_FECHA_RECIBO);

        // Get all the pedidoRepuestoList where fechaRecibo is less than or equal to SMALLER_FECHA_RECIBO
        defaultPedidoRepuestoShouldNotBeFound("fechaRecibo.lessThanOrEqual=" + SMALLER_FECHA_RECIBO);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaReciboIsLessThanSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaRecibo is less than DEFAULT_FECHA_RECIBO
        defaultPedidoRepuestoShouldNotBeFound("fechaRecibo.lessThan=" + DEFAULT_FECHA_RECIBO);

        // Get all the pedidoRepuestoList where fechaRecibo is less than UPDATED_FECHA_RECIBO
        defaultPedidoRepuestoShouldBeFound("fechaRecibo.lessThan=" + UPDATED_FECHA_RECIBO);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByFechaReciboIsGreaterThanSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaRecibo is greater than DEFAULT_FECHA_RECIBO
        defaultPedidoRepuestoShouldNotBeFound("fechaRecibo.greaterThan=" + DEFAULT_FECHA_RECIBO);

        // Get all the pedidoRepuestoList where fechaRecibo is greater than SMALLER_FECHA_RECIBO
        defaultPedidoRepuestoShouldBeFound("fechaRecibo.greaterThan=" + SMALLER_FECHA_RECIBO);
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByEstadoPedidoRepuestoIsEqualToSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);
        EstadoPedidoRepuesto estadoPedidoRepuesto = EstadoPedidoRepuestoResourceIT.createEntity(em);
        em.persist(estadoPedidoRepuesto);
        em.flush();
        pedidoRepuesto.setEstadoPedidoRepuesto(estadoPedidoRepuesto);
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);
        Long estadoPedidoRepuestoId = estadoPedidoRepuesto.getId();

        // Get all the pedidoRepuestoList where estadoPedidoRepuesto equals to estadoPedidoRepuestoId
        defaultPedidoRepuestoShouldBeFound("estadoPedidoRepuestoId.equals=" + estadoPedidoRepuestoId);

        // Get all the pedidoRepuestoList where estadoPedidoRepuesto equals to (estadoPedidoRepuestoId + 1)
        defaultPedidoRepuestoShouldNotBeFound("estadoPedidoRepuestoId.equals=" + (estadoPedidoRepuestoId + 1));
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByPresupuestoIsEqualToSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);
        Presupuesto presupuesto = PresupuestoResourceIT.createEntity(em);
        em.persist(presupuesto);
        em.flush();
        pedidoRepuesto.setPresupuesto(presupuesto);
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);
        Long presupuestoId = presupuesto.getId();

        // Get all the pedidoRepuestoList where presupuesto equals to presupuestoId
        defaultPedidoRepuestoShouldBeFound("presupuestoId.equals=" + presupuestoId);

        // Get all the pedidoRepuestoList where presupuesto equals to (presupuestoId + 1)
        defaultPedidoRepuestoShouldNotBeFound("presupuestoId.equals=" + (presupuestoId + 1));
    }

    @Test
    @Transactional
    void getAllPedidoRepuestosByDocumentTypeIsEqualToSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);
        DocumentationType documentType = DocumentationTypeResourceIT.createEntity(em);
        em.persist(documentType);
        em.flush();
        pedidoRepuesto.setDocumentType(documentType);
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);
        Long documentTypeId = documentType.getId();

        // Get all the pedidoRepuestoList where documentType equals to documentTypeId
        defaultPedidoRepuestoShouldBeFound("documentTypeId.equals=" + documentTypeId);

        // Get all the pedidoRepuestoList where documentType equals to (documentTypeId + 1)
        defaultPedidoRepuestoShouldNotBeFound("documentTypeId.equals=" + (documentTypeId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultPedidoRepuestoShouldBeFound(String filter) throws Exception {
        restPedidoRepuestoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pedidoRepuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].fechaPedido").value(hasItem(DEFAULT_FECHA_PEDIDO.toString())))
            .andExpect(jsonPath("$.[*].fechaRecibo").value(hasItem(DEFAULT_FECHA_RECIBO.toString())));

        // Check, that the count call also returns 1
        restPedidoRepuestoMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultPedidoRepuestoShouldNotBeFound(String filter) throws Exception {
        restPedidoRepuestoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restPedidoRepuestoMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingPedidoRepuesto() throws Exception {
        // Get the pedidoRepuesto
        restPedidoRepuestoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPedidoRepuesto() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        int databaseSizeBeforeUpdate = pedidoRepuestoRepository.findAll().size();

        // Update the pedidoRepuesto
        PedidoRepuesto updatedPedidoRepuesto = pedidoRepuestoRepository.findById(pedidoRepuesto.getId()).get();
        // Disconnect from session so that the updates on updatedPedidoRepuesto are not directly saved in db
        em.detach(updatedPedidoRepuesto);
        updatedPedidoRepuesto.fechaCreacion(UPDATED_FECHA_CREACION).fechaPedido(UPDATED_FECHA_PEDIDO).fechaRecibo(UPDATED_FECHA_RECIBO);

        restPedidoRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPedidoRepuesto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPedidoRepuesto))
            )
            .andExpect(status().isOk());

        // Validate the PedidoRepuesto in the database
        List<PedidoRepuesto> pedidoRepuestoList = pedidoRepuestoRepository.findAll();
        assertThat(pedidoRepuestoList).hasSize(databaseSizeBeforeUpdate);
        PedidoRepuesto testPedidoRepuesto = pedidoRepuestoList.get(pedidoRepuestoList.size() - 1);
        assertThat(testPedidoRepuesto.getFechaCreacion()).isEqualTo(UPDATED_FECHA_CREACION);
        assertThat(testPedidoRepuesto.getFechaPedido()).isEqualTo(UPDATED_FECHA_PEDIDO);
        assertThat(testPedidoRepuesto.getFechaRecibo()).isEqualTo(UPDATED_FECHA_RECIBO);
    }

    @Test
    @Transactional
    void putNonExistingPedidoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = pedidoRepuestoRepository.findAll().size();
        pedidoRepuesto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPedidoRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, pedidoRepuesto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pedidoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the PedidoRepuesto in the database
        List<PedidoRepuesto> pedidoRepuestoList = pedidoRepuestoRepository.findAll();
        assertThat(pedidoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPedidoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = pedidoRepuestoRepository.findAll().size();
        pedidoRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPedidoRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pedidoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the PedidoRepuesto in the database
        List<PedidoRepuesto> pedidoRepuestoList = pedidoRepuestoRepository.findAll();
        assertThat(pedidoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPedidoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = pedidoRepuestoRepository.findAll().size();
        pedidoRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPedidoRepuestoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pedidoRepuesto)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the PedidoRepuesto in the database
        List<PedidoRepuesto> pedidoRepuestoList = pedidoRepuestoRepository.findAll();
        assertThat(pedidoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePedidoRepuestoWithPatch() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        int databaseSizeBeforeUpdate = pedidoRepuestoRepository.findAll().size();

        // Update the pedidoRepuesto using partial update
        PedidoRepuesto partialUpdatedPedidoRepuesto = new PedidoRepuesto();
        partialUpdatedPedidoRepuesto.setId(pedidoRepuesto.getId());

        partialUpdatedPedidoRepuesto.fechaRecibo(UPDATED_FECHA_RECIBO);

        restPedidoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPedidoRepuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPedidoRepuesto))
            )
            .andExpect(status().isOk());

        // Validate the PedidoRepuesto in the database
        List<PedidoRepuesto> pedidoRepuestoList = pedidoRepuestoRepository.findAll();
        assertThat(pedidoRepuestoList).hasSize(databaseSizeBeforeUpdate);
        PedidoRepuesto testPedidoRepuesto = pedidoRepuestoList.get(pedidoRepuestoList.size() - 1);
        assertThat(testPedidoRepuesto.getFechaCreacion()).isEqualTo(DEFAULT_FECHA_CREACION);
        assertThat(testPedidoRepuesto.getFechaPedido()).isEqualTo(DEFAULT_FECHA_PEDIDO);
        assertThat(testPedidoRepuesto.getFechaRecibo()).isEqualTo(UPDATED_FECHA_RECIBO);
    }

    @Test
    @Transactional
    void fullUpdatePedidoRepuestoWithPatch() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        int databaseSizeBeforeUpdate = pedidoRepuestoRepository.findAll().size();

        // Update the pedidoRepuesto using partial update
        PedidoRepuesto partialUpdatedPedidoRepuesto = new PedidoRepuesto();
        partialUpdatedPedidoRepuesto.setId(pedidoRepuesto.getId());

        partialUpdatedPedidoRepuesto
            .fechaCreacion(UPDATED_FECHA_CREACION)
            .fechaPedido(UPDATED_FECHA_PEDIDO)
            .fechaRecibo(UPDATED_FECHA_RECIBO);

        restPedidoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPedidoRepuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPedidoRepuesto))
            )
            .andExpect(status().isOk());

        // Validate the PedidoRepuesto in the database
        List<PedidoRepuesto> pedidoRepuestoList = pedidoRepuestoRepository.findAll();
        assertThat(pedidoRepuestoList).hasSize(databaseSizeBeforeUpdate);
        PedidoRepuesto testPedidoRepuesto = pedidoRepuestoList.get(pedidoRepuestoList.size() - 1);
        assertThat(testPedidoRepuesto.getFechaCreacion()).isEqualTo(UPDATED_FECHA_CREACION);
        assertThat(testPedidoRepuesto.getFechaPedido()).isEqualTo(UPDATED_FECHA_PEDIDO);
        assertThat(testPedidoRepuesto.getFechaRecibo()).isEqualTo(UPDATED_FECHA_RECIBO);
    }

    @Test
    @Transactional
    void patchNonExistingPedidoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = pedidoRepuestoRepository.findAll().size();
        pedidoRepuesto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPedidoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, pedidoRepuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pedidoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the PedidoRepuesto in the database
        List<PedidoRepuesto> pedidoRepuestoList = pedidoRepuestoRepository.findAll();
        assertThat(pedidoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPedidoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = pedidoRepuestoRepository.findAll().size();
        pedidoRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPedidoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pedidoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the PedidoRepuesto in the database
        List<PedidoRepuesto> pedidoRepuestoList = pedidoRepuestoRepository.findAll();
        assertThat(pedidoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPedidoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = pedidoRepuestoRepository.findAll().size();
        pedidoRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPedidoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(pedidoRepuesto))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PedidoRepuesto in the database
        List<PedidoRepuesto> pedidoRepuestoList = pedidoRepuestoRepository.findAll();
        assertThat(pedidoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePedidoRepuesto() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        int databaseSizeBeforeDelete = pedidoRepuestoRepository.findAll().size();

        // Delete the pedidoRepuesto
        restPedidoRepuestoMockMvc
            .perform(delete(ENTITY_API_URL_ID, pedidoRepuesto.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PedidoRepuesto> pedidoRepuestoList = pedidoRepuestoRepository.findAll();
        assertThat(pedidoRepuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
