package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.EstadoPedidoRepuesto;
import soldimet.repository.EstadoPedidoRepuestoRepository;
import soldimet.service.EstadoPedidoRepuestoService;
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
 * Test class for the EstadoPedidoRepuestoResource REST controller.
 *
 * @see EstadoPedidoRepuestoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class EstadoPedidoRepuestoResourceIntTest {

    private static final String DEFAULT_NOMBRE_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_ESTADO = "BBBBBBBBBB";

    @Autowired
    private EstadoPedidoRepuestoRepository estadoPedidoRepuestoRepository;

    @Autowired
    private EstadoPedidoRepuestoService estadoPedidoRepuestoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEstadoPedidoRepuestoMockMvc;

    private EstadoPedidoRepuesto estadoPedidoRepuesto;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EstadoPedidoRepuestoResource estadoPedidoRepuestoResource = new EstadoPedidoRepuestoResource(estadoPedidoRepuestoService);
        this.restEstadoPedidoRepuestoMockMvc = MockMvcBuilders.standaloneSetup(estadoPedidoRepuestoResource)
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
    public static EstadoPedidoRepuesto createEntity(EntityManager em) {
        EstadoPedidoRepuesto estadoPedidoRepuesto = new EstadoPedidoRepuesto()
            .nombreEstado(DEFAULT_NOMBRE_ESTADO);
        return estadoPedidoRepuesto;
    }

    @Before
    public void initTest() {
        estadoPedidoRepuesto = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstadoPedidoRepuesto() throws Exception {
        int databaseSizeBeforeCreate = estadoPedidoRepuestoRepository.findAll().size();

        // Create the EstadoPedidoRepuesto
        restEstadoPedidoRepuestoMockMvc.perform(post("/api/estado-pedido-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoPedidoRepuesto)))
            .andExpect(status().isCreated());

        // Validate the EstadoPedidoRepuesto in the database
        List<EstadoPedidoRepuesto> estadoPedidoRepuestoList = estadoPedidoRepuestoRepository.findAll();
        assertThat(estadoPedidoRepuestoList).hasSize(databaseSizeBeforeCreate + 1);
        EstadoPedidoRepuesto testEstadoPedidoRepuesto = estadoPedidoRepuestoList.get(estadoPedidoRepuestoList.size() - 1);
        assertThat(testEstadoPedidoRepuesto.getNombreEstado()).isEqualTo(DEFAULT_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    public void createEstadoPedidoRepuestoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estadoPedidoRepuestoRepository.findAll().size();

        // Create the EstadoPedidoRepuesto with an existing ID
        estadoPedidoRepuesto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadoPedidoRepuestoMockMvc.perform(post("/api/estado-pedido-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoPedidoRepuesto)))
            .andExpect(status().isBadRequest());

        // Validate the EstadoPedidoRepuesto in the database
        List<EstadoPedidoRepuesto> estadoPedidoRepuestoList = estadoPedidoRepuestoRepository.findAll();
        assertThat(estadoPedidoRepuestoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = estadoPedidoRepuestoRepository.findAll().size();
        // set the field null
        estadoPedidoRepuesto.setNombreEstado(null);

        // Create the EstadoPedidoRepuesto, which fails.

        restEstadoPedidoRepuestoMockMvc.perform(post("/api/estado-pedido-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoPedidoRepuesto)))
            .andExpect(status().isBadRequest());

        List<EstadoPedidoRepuesto> estadoPedidoRepuestoList = estadoPedidoRepuestoRepository.findAll();
        assertThat(estadoPedidoRepuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEstadoPedidoRepuestos() throws Exception {
        // Initialize the database
        estadoPedidoRepuestoRepository.saveAndFlush(estadoPedidoRepuesto);

        // Get all the estadoPedidoRepuestoList
        restEstadoPedidoRepuestoMockMvc.perform(get("/api/estado-pedido-repuestos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadoPedidoRepuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreEstado").value(hasItem(DEFAULT_NOMBRE_ESTADO.toString())));
    }

    @Test
    @Transactional
    public void getEstadoPedidoRepuesto() throws Exception {
        // Initialize the database
        estadoPedidoRepuestoRepository.saveAndFlush(estadoPedidoRepuesto);

        // Get the estadoPedidoRepuesto
        restEstadoPedidoRepuestoMockMvc.perform(get("/api/estado-pedido-repuestos/{id}", estadoPedidoRepuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(estadoPedidoRepuesto.getId().intValue()))
            .andExpect(jsonPath("$.nombreEstado").value(DEFAULT_NOMBRE_ESTADO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEstadoPedidoRepuesto() throws Exception {
        // Get the estadoPedidoRepuesto
        restEstadoPedidoRepuestoMockMvc.perform(get("/api/estado-pedido-repuestos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstadoPedidoRepuesto() throws Exception {
        // Initialize the database
        estadoPedidoRepuestoService.save(estadoPedidoRepuesto);

        int databaseSizeBeforeUpdate = estadoPedidoRepuestoRepository.findAll().size();

        // Update the estadoPedidoRepuesto
        EstadoPedidoRepuesto updatedEstadoPedidoRepuesto = estadoPedidoRepuestoRepository.findOne(estadoPedidoRepuesto.getId());
        updatedEstadoPedidoRepuesto
            .nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoPedidoRepuestoMockMvc.perform(put("/api/estado-pedido-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstadoPedidoRepuesto)))
            .andExpect(status().isOk());

        // Validate the EstadoPedidoRepuesto in the database
        List<EstadoPedidoRepuesto> estadoPedidoRepuestoList = estadoPedidoRepuestoRepository.findAll();
        assertThat(estadoPedidoRepuestoList).hasSize(databaseSizeBeforeUpdate);
        EstadoPedidoRepuesto testEstadoPedidoRepuesto = estadoPedidoRepuestoList.get(estadoPedidoRepuestoList.size() - 1);
        assertThat(testEstadoPedidoRepuesto.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingEstadoPedidoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = estadoPedidoRepuestoRepository.findAll().size();

        // Create the EstadoPedidoRepuesto

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEstadoPedidoRepuestoMockMvc.perform(put("/api/estado-pedido-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoPedidoRepuesto)))
            .andExpect(status().isCreated());

        // Validate the EstadoPedidoRepuesto in the database
        List<EstadoPedidoRepuesto> estadoPedidoRepuestoList = estadoPedidoRepuestoRepository.findAll();
        assertThat(estadoPedidoRepuestoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEstadoPedidoRepuesto() throws Exception {
        // Initialize the database
        estadoPedidoRepuestoService.save(estadoPedidoRepuesto);

        int databaseSizeBeforeDelete = estadoPedidoRepuestoRepository.findAll().size();

        // Get the estadoPedidoRepuesto
        restEstadoPedidoRepuestoMockMvc.perform(delete("/api/estado-pedido-repuestos/{id}", estadoPedidoRepuesto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EstadoPedidoRepuesto> estadoPedidoRepuestoList = estadoPedidoRepuestoRepository.findAll();
        assertThat(estadoPedidoRepuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstadoPedidoRepuesto.class);
        EstadoPedidoRepuesto estadoPedidoRepuesto1 = new EstadoPedidoRepuesto();
        estadoPedidoRepuesto1.setId(1L);
        EstadoPedidoRepuesto estadoPedidoRepuesto2 = new EstadoPedidoRepuesto();
        estadoPedidoRepuesto2.setId(estadoPedidoRepuesto1.getId());
        assertThat(estadoPedidoRepuesto1).isEqualTo(estadoPedidoRepuesto2);
        estadoPedidoRepuesto2.setId(2L);
        assertThat(estadoPedidoRepuesto1).isNotEqualTo(estadoPedidoRepuesto2);
        estadoPedidoRepuesto1.setId(null);
        assertThat(estadoPedidoRepuesto1).isNotEqualTo(estadoPedidoRepuesto2);
    }
}
