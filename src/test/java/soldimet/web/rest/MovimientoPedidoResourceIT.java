package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.MovimientoPedido;
import soldimet.domain.PedidoRepuesto;
import soldimet.domain.Movimiento;
import soldimet.repository.MovimientoPedidoRepository;
import soldimet.service.MovimientoPedidoService;
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
 * Integration tests for the {@link MovimientoPedidoResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class MovimientoPedidoResourceIT {

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

    @Autowired
    private Validator validator;

    private MockMvc restMovimientoPedidoMockMvc;

    private MovimientoPedido movimientoPedido;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MovimientoPedidoResource movimientoPedidoResource = new MovimientoPedidoResource(movimientoPedidoService);
        this.restMovimientoPedidoMockMvc = MockMvcBuilders.standaloneSetup(movimientoPedidoResource)
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
    public static MovimientoPedido createEntity(EntityManager em) {
        MovimientoPedido movimientoPedido = new MovimientoPedido();
        // Add required entity
        PedidoRepuesto pedidoRepuesto;
        if (TestUtil.findAll(em, PedidoRepuesto.class).isEmpty()) {
            pedidoRepuesto = PedidoRepuestoResourceIT.createEntity(em);
            em.persist(pedidoRepuesto);
            em.flush();
        } else {
            pedidoRepuesto = TestUtil.findAll(em, PedidoRepuesto.class).get(0);
        }
        movimientoPedido.setPedidoRepuesto(pedidoRepuesto);
        // Add required entity
        Movimiento movimiento;
        if (TestUtil.findAll(em, Movimiento.class).isEmpty()) {
            movimiento = MovimientoResourceIT.createEntity(em);
            em.persist(movimiento);
            em.flush();
        } else {
            movimiento = TestUtil.findAll(em, Movimiento.class).get(0);
        }
        movimientoPedido.setMovimiento(movimiento);
        return movimientoPedido;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MovimientoPedido createUpdatedEntity(EntityManager em) {
        MovimientoPedido movimientoPedido = new MovimientoPedido();
        // Add required entity
        PedidoRepuesto pedidoRepuesto;
        if (TestUtil.findAll(em, PedidoRepuesto.class).isEmpty()) {
            pedidoRepuesto = PedidoRepuestoResourceIT.createUpdatedEntity(em);
            em.persist(pedidoRepuesto);
            em.flush();
        } else {
            pedidoRepuesto = TestUtil.findAll(em, PedidoRepuesto.class).get(0);
        }
        movimientoPedido.setPedidoRepuesto(pedidoRepuesto);
        // Add required entity
        Movimiento movimiento;
        if (TestUtil.findAll(em, Movimiento.class).isEmpty()) {
            movimiento = MovimientoResourceIT.createUpdatedEntity(em);
            em.persist(movimiento);
            em.flush();
        } else {
            movimiento = TestUtil.findAll(em, Movimiento.class).get(0);
        }
        movimientoPedido.setMovimiento(movimiento);
        return movimientoPedido;
    }

    @BeforeEach
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
        MovimientoPedido updatedMovimientoPedido = movimientoPedidoRepository.findById(movimientoPedido.getId()).get();
        // Disconnect from session so that the updates on updatedMovimientoPedido are not directly saved in db
        em.detach(updatedMovimientoPedido);

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

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMovimientoPedidoMockMvc.perform(put("/api/movimiento-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movimientoPedido)))
            .andExpect(status().isBadRequest());

        // Validate the MovimientoPedido in the database
        List<MovimientoPedido> movimientoPedidoList = movimientoPedidoRepository.findAll();
        assertThat(movimientoPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMovimientoPedido() throws Exception {
        // Initialize the database
        movimientoPedidoService.save(movimientoPedido);

        int databaseSizeBeforeDelete = movimientoPedidoRepository.findAll().size();

        // Delete the movimientoPedido
        restMovimientoPedidoMockMvc.perform(delete("/api/movimiento-pedidos/{id}", movimientoPedido.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
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
