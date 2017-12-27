package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.PedidoRepuesto;
import soldimet.domain.EstadoPedidoRepuesto;
import soldimet.domain.Presupuesto;
import soldimet.repository.PedidoRepuestoRepository;
import soldimet.service.PedidoRepuestoService;
import soldimet.web.rest.errors.ExceptionTranslator;
import soldimet.service.dto.PedidoRepuestoCriteria;
import soldimet.service.PedidoRepuestoQueryService;

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
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PedidoRepuestoResource REST controller.
 *
 * @see PedidoRepuestoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class PedidoRepuestoResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_CREACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CREACION = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_PEDIDO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_PEDIDO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_RECIBO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_RECIBO = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private PedidoRepuestoRepository pedidoRepuestoRepository;

    @Autowired
    private PedidoRepuestoService pedidoRepuestoService;

    @Autowired
    private PedidoRepuestoQueryService pedidoRepuestoQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPedidoRepuestoMockMvc;

    private PedidoRepuesto pedidoRepuesto;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PedidoRepuestoResource pedidoRepuestoResource = new PedidoRepuestoResource(pedidoRepuestoService, pedidoRepuestoQueryService);
        this.restPedidoRepuestoMockMvc = MockMvcBuilders.standaloneSetup(pedidoRepuestoResource)
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
    public static PedidoRepuesto createEntity(EntityManager em) {
        PedidoRepuesto pedidoRepuesto = new PedidoRepuesto()
            .fechaCreacion(DEFAULT_FECHA_CREACION)
            .fechaPedido(DEFAULT_FECHA_PEDIDO)
            .fechaRecibo(DEFAULT_FECHA_RECIBO);
        // Add required entity
        EstadoPedidoRepuesto estadoPedidoRepuesto = EstadoPedidoRepuestoResourceIntTest.createEntity(em);
        em.persist(estadoPedidoRepuesto);
        em.flush();
        pedidoRepuesto.setEstadoPedidoRepuesto(estadoPedidoRepuesto);
        // Add required entity
        Presupuesto presupuesto = PresupuestoResourceIntTest.createEntity(em);
        em.persist(presupuesto);
        em.flush();
        pedidoRepuesto.setPresupuesto(presupuesto);
        return pedidoRepuesto;
    }

    @Before
    public void initTest() {
        pedidoRepuesto = createEntity(em);
    }

    @Test
    @Transactional
    public void createPedidoRepuesto() throws Exception {
        int databaseSizeBeforeCreate = pedidoRepuestoRepository.findAll().size();

        // Create the PedidoRepuesto
        restPedidoRepuestoMockMvc.perform(post("/api/pedido-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pedidoRepuesto)))
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
    public void createPedidoRepuestoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pedidoRepuestoRepository.findAll().size();

        // Create the PedidoRepuesto with an existing ID
        pedidoRepuesto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPedidoRepuestoMockMvc.perform(post("/api/pedido-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pedidoRepuesto)))
            .andExpect(status().isBadRequest());

        // Validate the PedidoRepuesto in the database
        List<PedidoRepuesto> pedidoRepuestoList = pedidoRepuestoRepository.findAll();
        assertThat(pedidoRepuestoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFechaCreacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = pedidoRepuestoRepository.findAll().size();
        // set the field null
        pedidoRepuesto.setFechaCreacion(null);

        // Create the PedidoRepuesto, which fails.

        restPedidoRepuestoMockMvc.perform(post("/api/pedido-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pedidoRepuesto)))
            .andExpect(status().isBadRequest());

        List<PedidoRepuesto> pedidoRepuestoList = pedidoRepuestoRepository.findAll();
        assertThat(pedidoRepuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPedidoRepuestos() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList
        restPedidoRepuestoMockMvc.perform(get("/api/pedido-repuestos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pedidoRepuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].fechaPedido").value(hasItem(DEFAULT_FECHA_PEDIDO.toString())))
            .andExpect(jsonPath("$.[*].fechaRecibo").value(hasItem(DEFAULT_FECHA_RECIBO.toString())));
    }

    @Test
    @Transactional
    public void getPedidoRepuesto() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get the pedidoRepuesto
        restPedidoRepuestoMockMvc.perform(get("/api/pedido-repuestos/{id}", pedidoRepuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pedidoRepuesto.getId().intValue()))
            .andExpect(jsonPath("$.fechaCreacion").value(DEFAULT_FECHA_CREACION.toString()))
            .andExpect(jsonPath("$.fechaPedido").value(DEFAULT_FECHA_PEDIDO.toString()))
            .andExpect(jsonPath("$.fechaRecibo").value(DEFAULT_FECHA_RECIBO.toString()));
    }

    @Test
    @Transactional
    public void getAllPedidoRepuestosByFechaCreacionIsEqualToSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaCreacion equals to DEFAULT_FECHA_CREACION
        defaultPedidoRepuestoShouldBeFound("fechaCreacion.equals=" + DEFAULT_FECHA_CREACION);

        // Get all the pedidoRepuestoList where fechaCreacion equals to UPDATED_FECHA_CREACION
        defaultPedidoRepuestoShouldNotBeFound("fechaCreacion.equals=" + UPDATED_FECHA_CREACION);
    }

    @Test
    @Transactional
    public void getAllPedidoRepuestosByFechaCreacionIsInShouldWork() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaCreacion in DEFAULT_FECHA_CREACION or UPDATED_FECHA_CREACION
        defaultPedidoRepuestoShouldBeFound("fechaCreacion.in=" + DEFAULT_FECHA_CREACION + "," + UPDATED_FECHA_CREACION);

        // Get all the pedidoRepuestoList where fechaCreacion equals to UPDATED_FECHA_CREACION
        defaultPedidoRepuestoShouldNotBeFound("fechaCreacion.in=" + UPDATED_FECHA_CREACION);
    }

    @Test
    @Transactional
    public void getAllPedidoRepuestosByFechaCreacionIsNullOrNotNull() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaCreacion is not null
        defaultPedidoRepuestoShouldBeFound("fechaCreacion.specified=true");

        // Get all the pedidoRepuestoList where fechaCreacion is null
        defaultPedidoRepuestoShouldNotBeFound("fechaCreacion.specified=false");
    }

    @Test
    @Transactional
    public void getAllPedidoRepuestosByFechaCreacionIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaCreacion greater than or equals to DEFAULT_FECHA_CREACION
        defaultPedidoRepuestoShouldBeFound("fechaCreacion.greaterOrEqualThan=" + DEFAULT_FECHA_CREACION);

        // Get all the pedidoRepuestoList where fechaCreacion greater than or equals to UPDATED_FECHA_CREACION
        defaultPedidoRepuestoShouldNotBeFound("fechaCreacion.greaterOrEqualThan=" + UPDATED_FECHA_CREACION);
    }

    @Test
    @Transactional
    public void getAllPedidoRepuestosByFechaCreacionIsLessThanSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaCreacion less than or equals to DEFAULT_FECHA_CREACION
        defaultPedidoRepuestoShouldNotBeFound("fechaCreacion.lessThan=" + DEFAULT_FECHA_CREACION);

        // Get all the pedidoRepuestoList where fechaCreacion less than or equals to UPDATED_FECHA_CREACION
        defaultPedidoRepuestoShouldBeFound("fechaCreacion.lessThan=" + UPDATED_FECHA_CREACION);
    }


    @Test
    @Transactional
    public void getAllPedidoRepuestosByFechaPedidoIsEqualToSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaPedido equals to DEFAULT_FECHA_PEDIDO
        defaultPedidoRepuestoShouldBeFound("fechaPedido.equals=" + DEFAULT_FECHA_PEDIDO);

        // Get all the pedidoRepuestoList where fechaPedido equals to UPDATED_FECHA_PEDIDO
        defaultPedidoRepuestoShouldNotBeFound("fechaPedido.equals=" + UPDATED_FECHA_PEDIDO);
    }

    @Test
    @Transactional
    public void getAllPedidoRepuestosByFechaPedidoIsInShouldWork() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaPedido in DEFAULT_FECHA_PEDIDO or UPDATED_FECHA_PEDIDO
        defaultPedidoRepuestoShouldBeFound("fechaPedido.in=" + DEFAULT_FECHA_PEDIDO + "," + UPDATED_FECHA_PEDIDO);

        // Get all the pedidoRepuestoList where fechaPedido equals to UPDATED_FECHA_PEDIDO
        defaultPedidoRepuestoShouldNotBeFound("fechaPedido.in=" + UPDATED_FECHA_PEDIDO);
    }

    @Test
    @Transactional
    public void getAllPedidoRepuestosByFechaPedidoIsNullOrNotNull() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaPedido is not null
        defaultPedidoRepuestoShouldBeFound("fechaPedido.specified=true");

        // Get all the pedidoRepuestoList where fechaPedido is null
        defaultPedidoRepuestoShouldNotBeFound("fechaPedido.specified=false");
    }

    @Test
    @Transactional
    public void getAllPedidoRepuestosByFechaPedidoIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaPedido greater than or equals to DEFAULT_FECHA_PEDIDO
        defaultPedidoRepuestoShouldBeFound("fechaPedido.greaterOrEqualThan=" + DEFAULT_FECHA_PEDIDO);

        // Get all the pedidoRepuestoList where fechaPedido greater than or equals to UPDATED_FECHA_PEDIDO
        defaultPedidoRepuestoShouldNotBeFound("fechaPedido.greaterOrEqualThan=" + UPDATED_FECHA_PEDIDO);
    }

    @Test
    @Transactional
    public void getAllPedidoRepuestosByFechaPedidoIsLessThanSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaPedido less than or equals to DEFAULT_FECHA_PEDIDO
        defaultPedidoRepuestoShouldNotBeFound("fechaPedido.lessThan=" + DEFAULT_FECHA_PEDIDO);

        // Get all the pedidoRepuestoList where fechaPedido less than or equals to UPDATED_FECHA_PEDIDO
        defaultPedidoRepuestoShouldBeFound("fechaPedido.lessThan=" + UPDATED_FECHA_PEDIDO);
    }


    @Test
    @Transactional
    public void getAllPedidoRepuestosByFechaReciboIsEqualToSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaRecibo equals to DEFAULT_FECHA_RECIBO
        defaultPedidoRepuestoShouldBeFound("fechaRecibo.equals=" + DEFAULT_FECHA_RECIBO);

        // Get all the pedidoRepuestoList where fechaRecibo equals to UPDATED_FECHA_RECIBO
        defaultPedidoRepuestoShouldNotBeFound("fechaRecibo.equals=" + UPDATED_FECHA_RECIBO);
    }

    @Test
    @Transactional
    public void getAllPedidoRepuestosByFechaReciboIsInShouldWork() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaRecibo in DEFAULT_FECHA_RECIBO or UPDATED_FECHA_RECIBO
        defaultPedidoRepuestoShouldBeFound("fechaRecibo.in=" + DEFAULT_FECHA_RECIBO + "," + UPDATED_FECHA_RECIBO);

        // Get all the pedidoRepuestoList where fechaRecibo equals to UPDATED_FECHA_RECIBO
        defaultPedidoRepuestoShouldNotBeFound("fechaRecibo.in=" + UPDATED_FECHA_RECIBO);
    }

    @Test
    @Transactional
    public void getAllPedidoRepuestosByFechaReciboIsNullOrNotNull() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaRecibo is not null
        defaultPedidoRepuestoShouldBeFound("fechaRecibo.specified=true");

        // Get all the pedidoRepuestoList where fechaRecibo is null
        defaultPedidoRepuestoShouldNotBeFound("fechaRecibo.specified=false");
    }

    @Test
    @Transactional
    public void getAllPedidoRepuestosByFechaReciboIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaRecibo greater than or equals to DEFAULT_FECHA_RECIBO
        defaultPedidoRepuestoShouldBeFound("fechaRecibo.greaterOrEqualThan=" + DEFAULT_FECHA_RECIBO);

        // Get all the pedidoRepuestoList where fechaRecibo greater than or equals to UPDATED_FECHA_RECIBO
        defaultPedidoRepuestoShouldNotBeFound("fechaRecibo.greaterOrEqualThan=" + UPDATED_FECHA_RECIBO);
    }

    @Test
    @Transactional
    public void getAllPedidoRepuestosByFechaReciboIsLessThanSomething() throws Exception {
        // Initialize the database
        pedidoRepuestoRepository.saveAndFlush(pedidoRepuesto);

        // Get all the pedidoRepuestoList where fechaRecibo less than or equals to DEFAULT_FECHA_RECIBO
        defaultPedidoRepuestoShouldNotBeFound("fechaRecibo.lessThan=" + DEFAULT_FECHA_RECIBO);

        // Get all the pedidoRepuestoList where fechaRecibo less than or equals to UPDATED_FECHA_RECIBO
        defaultPedidoRepuestoShouldBeFound("fechaRecibo.lessThan=" + UPDATED_FECHA_RECIBO);
    }


    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultPedidoRepuestoShouldBeFound(String filter) throws Exception {
        restPedidoRepuestoMockMvc.perform(get("/api/pedido-repuestos?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pedidoRepuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].fechaPedido").value(hasItem(DEFAULT_FECHA_PEDIDO.toString())))
            .andExpect(jsonPath("$.[*].fechaRecibo").value(hasItem(DEFAULT_FECHA_RECIBO.toString())));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultPedidoRepuestoShouldNotBeFound(String filter) throws Exception {
        restPedidoRepuestoMockMvc.perform(get("/api/pedido-repuestos?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());
    }


    @Test
    @Transactional
    public void getNonExistingPedidoRepuesto() throws Exception {
        // Get the pedidoRepuesto
        restPedidoRepuestoMockMvc.perform(get("/api/pedido-repuestos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePedidoRepuesto() throws Exception {
        // Initialize the database
        pedidoRepuestoService.save(pedidoRepuesto);

        int databaseSizeBeforeUpdate = pedidoRepuestoRepository.findAll().size();

        // Update the pedidoRepuesto
        PedidoRepuesto updatedPedidoRepuesto = pedidoRepuestoRepository.findOne(pedidoRepuesto.getId());
        updatedPedidoRepuesto
            .fechaCreacion(UPDATED_FECHA_CREACION)
            .fechaPedido(UPDATED_FECHA_PEDIDO)
            .fechaRecibo(UPDATED_FECHA_RECIBO);

        restPedidoRepuestoMockMvc.perform(put("/api/pedido-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPedidoRepuesto)))
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
    public void updateNonExistingPedidoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = pedidoRepuestoRepository.findAll().size();

        // Create the PedidoRepuesto

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPedidoRepuestoMockMvc.perform(put("/api/pedido-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pedidoRepuesto)))
            .andExpect(status().isCreated());

        // Validate the PedidoRepuesto in the database
        List<PedidoRepuesto> pedidoRepuestoList = pedidoRepuestoRepository.findAll();
        assertThat(pedidoRepuestoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePedidoRepuesto() throws Exception {
        // Initialize the database
        pedidoRepuestoService.save(pedidoRepuesto);

        int databaseSizeBeforeDelete = pedidoRepuestoRepository.findAll().size();

        // Get the pedidoRepuesto
        restPedidoRepuestoMockMvc.perform(delete("/api/pedido-repuestos/{id}", pedidoRepuesto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PedidoRepuesto> pedidoRepuestoList = pedidoRepuestoRepository.findAll();
        assertThat(pedidoRepuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PedidoRepuesto.class);
        PedidoRepuesto pedidoRepuesto1 = new PedidoRepuesto();
        pedidoRepuesto1.setId(1L);
        PedidoRepuesto pedidoRepuesto2 = new PedidoRepuesto();
        pedidoRepuesto2.setId(pedidoRepuesto1.getId());
        assertThat(pedidoRepuesto1).isEqualTo(pedidoRepuesto2);
        pedidoRepuesto2.setId(2L);
        assertThat(pedidoRepuesto1).isNotEqualTo(pedidoRepuesto2);
        pedidoRepuesto1.setId(null);
        assertThat(pedidoRepuesto1).isNotEqualTo(pedidoRepuesto2);
    }
}
