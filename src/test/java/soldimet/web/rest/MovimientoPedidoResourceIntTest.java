package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.MovimientoPedido;
import soldimet.domain.PedidoRepuesto;
import soldimet.domain.Movimiento;
import soldimet.repository.MovimientoPedidoRepository;
import soldimet.service.MovimientoPedidoService;
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
 * Test class for the MovimientoPedidoResource REST controller.
 *
 * @see MovimientoPedidoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class MovimientoPedidoResourceIntTest {

    @Autowired
    private MovimientoPedidoRepository movimientoPedidoRepository;

    @Autowired
    private MovimientoPedidoService movimientoPedidoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMovimientoPedidoMockMvc;

    private MovimientoPedido movimientoPedido;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MovimientoPedidoResource movimientoPedidoResource = new MovimientoPedidoResource(movimientoPedidoService);
        this.restMovimientoPedidoMockMvc = MockMvcBuilders.standaloneSetup(movimientoPedidoResource)
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
    public static MovimientoPedido createEntity(EntityManager em) {
        MovimientoPedido movimientoPedido = new MovimientoPedido();
        // Add required entity
        PedidoRepuesto pedidoRepuesto = PedidoRepuestoResourceIntTest.createEntity(em);
        em.persist(pedidoRepuesto);
        em.flush();
        movimientoPedido.setPedidoRepuesto(pedidoRepuesto);
        // Add required entity
        Movimiento movimiento = MovimientoResourceIntTest.createEntity(em);
        em.persist(movimiento);
        em.flush();
        movimientoPedido.setMovimiento(movimiento);
        return movimientoPedido;
    }

    @Before
    public void initTest() {
        movimientoPedido = createEntity(em);
    }

    @Test
    @Transactional
    public void createMovimientoPedido() throws Exception {
        int databaseSizeBeforeCreate = movimientoPedidoRepository.findAll().size();

        // Create the MovimientoPedido
        restMovimientoPedidoMockMvc.perform(post("/api/movimiento-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movimientoPedido)))
            .andExpect(status().isCreated());

        // Validate the MovimientoPedido in the database
        List<MovimientoPedido> movimientoPedidoList = movimientoPedidoRepository.findAll();
        assertThat(movimientoPedidoList).hasSize(databaseSizeBeforeCreate + 1);
        MovimientoPedido testMovimientoPedido = movimientoPedidoList.get(movimientoPedidoList.size() - 1);
    }

    @Test
    @Transactional
    public void createMovimientoPedidoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = movimientoPedidoRepository.findAll().size();

        // Create the MovimientoPedido with an existing ID
        movimientoPedido.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMovimientoPedidoMockMvc.perform(post("/api/movimiento-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movimientoPedido)))
            .andExpect(status().isBadRequest());

        // Validate the MovimientoPedido in the database
        List<MovimientoPedido> movimientoPedidoList = movimientoPedidoRepository.findAll();
        assertThat(movimientoPedidoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMovimientoPedidos() throws Exception {
        // Initialize the database
        movimientoPedidoRepository.saveAndFlush(movimientoPedido);

        // Get all the movimientoPedidoList
        restMovimientoPedidoMockMvc.perform(get("/api/movimiento-pedidos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(movimientoPedido.getId().intValue())));
    }

    @Test
    @Transactional
    public void getMovimientoPedido() throws Exception {
        // Initialize the database
        movimientoPedidoRepository.saveAndFlush(movimientoPedido);

        // Get the movimientoPedido
        restMovimientoPedidoMockMvc.perform(get("/api/movimiento-pedidos/{id}", movimientoPedido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(movimientoPedido.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMovimientoPedido() throws Exception {
        // Get the movimientoPedido
        restMovimientoPedidoMockMvc.perform(get("/api/movimiento-pedidos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMovimientoPedido() throws Exception {
        // Initialize the database
        movimientoPedidoService.save(movimientoPedido);

        int databaseSizeBeforeUpdate = movimientoPedidoRepository.findAll().size();

        // Update the movimientoPedido
        MovimientoPedido updatedMovimientoPedido = movimientoPedidoRepository.findOne(movimientoPedido.getId());

        restMovimientoPedidoMockMvc.perform(put("/api/movimiento-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMovimientoPedido)))
            .andExpect(status().isOk());

        // Validate the MovimientoPedido in the database
        List<MovimientoPedido> movimientoPedidoList = movimientoPedidoRepository.findAll();
        assertThat(movimientoPedidoList).hasSize(databaseSizeBeforeUpdate);
        MovimientoPedido testMovimientoPedido = movimientoPedidoList.get(movimientoPedidoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingMovimientoPedido() throws Exception {
        int databaseSizeBeforeUpdate = movimientoPedidoRepository.findAll().size();

        // Create the MovimientoPedido

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMovimientoPedidoMockMvc.perform(put("/api/movimiento-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movimientoPedido)))
            .andExpect(status().isCreated());

        // Validate the MovimientoPedido in the database
        List<MovimientoPedido> movimientoPedidoList = movimientoPedidoRepository.findAll();
        assertThat(movimientoPedidoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMovimientoPedido() throws Exception {
        // Initialize the database
        movimientoPedidoService.save(movimientoPedido);

        int databaseSizeBeforeDelete = movimientoPedidoRepository.findAll().size();

        // Get the movimientoPedido
        restMovimientoPedidoMockMvc.perform(delete("/api/movimiento-pedidos/{id}", movimientoPedido.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MovimientoPedido> movimientoPedidoList = movimientoPedidoRepository.findAll();
        assertThat(movimientoPedidoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MovimientoPedido.class);
        MovimientoPedido movimientoPedido1 = new MovimientoPedido();
        movimientoPedido1.setId(1L);
        MovimientoPedido movimientoPedido2 = new MovimientoPedido();
        movimientoPedido2.setId(movimientoPedido1.getId());
        assertThat(movimientoPedido1).isEqualTo(movimientoPedido2);
        movimientoPedido2.setId(2L);
        assertThat(movimientoPedido1).isNotEqualTo(movimientoPedido2);
        movimientoPedido1.setId(null);
        assertThat(movimientoPedido1).isNotEqualTo(movimientoPedido2);
    }
}
