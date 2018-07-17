package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.DetallePedido;
import soldimet.domain.DetallePresupuesto;
import soldimet.repository.DetallePedidoRepository;
import soldimet.service.DetallePedidoService;
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
 * Test class for the DetallePedidoResource REST controller.
 *
 * @see DetallePedidoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class DetallePedidoResourceIntTest {

    @Autowired
    private DetallePedidoRepository detallePedidoRepository;

    @Autowired
    private DetallePedidoService detallePedidoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDetallePedidoMockMvc;

    private DetallePedido detallePedido;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DetallePedidoResource detallePedidoResource = new DetallePedidoResource(detallePedidoService);
        this.restDetallePedidoMockMvc = MockMvcBuilders.standaloneSetup(detallePedidoResource)
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
    public static DetallePedido createEntity(EntityManager em) {
        DetallePedido detallePedido = new DetallePedido();
        // Add required entity
        DetallePresupuesto detallePresupuesto = DetallePresupuestoResourceIntTest.createEntity(em);
        em.persist(detallePresupuesto);
        em.flush();
        detallePedido.setDetallePresupuesto(detallePresupuesto);
        return detallePedido;
    }

    @Before
    public void initTest() {
        detallePedido = createEntity(em);
    }

    @Test
    @Transactional
    public void createDetallePedido() throws Exception {
        int databaseSizeBeforeCreate = detallePedidoRepository.findAll().size();

        // Create the DetallePedido
        restDetallePedidoMockMvc.perform(post("/api/detalle-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detallePedido)))
            .andExpect(status().isCreated());

        // Validate the DetallePedido in the database
        List<DetallePedido> detallePedidoList = detallePedidoRepository.findAll();
        assertThat(detallePedidoList).hasSize(databaseSizeBeforeCreate + 1);
        DetallePedido testDetallePedido = detallePedidoList.get(detallePedidoList.size() - 1);
    }

    @Test
    @Transactional
    public void createDetallePedidoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = detallePedidoRepository.findAll().size();

        // Create the DetallePedido with an existing ID
        detallePedido.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDetallePedidoMockMvc.perform(post("/api/detalle-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detallePedido)))
            .andExpect(status().isBadRequest());

        // Validate the DetallePedido in the database
        List<DetallePedido> detallePedidoList = detallePedidoRepository.findAll();
        assertThat(detallePedidoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDetallePedidos() throws Exception {
        // Initialize the database
        detallePedidoRepository.saveAndFlush(detallePedido);

        // Get all the detallePedidoList
        restDetallePedidoMockMvc.perform(get("/api/detalle-pedidos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(detallePedido.getId().intValue())));
    }

    @Test
    @Transactional
    public void getDetallePedido() throws Exception {
        // Initialize the database
        detallePedidoRepository.saveAndFlush(detallePedido);

        // Get the detallePedido
        restDetallePedidoMockMvc.perform(get("/api/detalle-pedidos/{id}", detallePedido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(detallePedido.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDetallePedido() throws Exception {
        // Get the detallePedido
        restDetallePedidoMockMvc.perform(get("/api/detalle-pedidos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDetallePedido() throws Exception {
        // Initialize the database
        detallePedidoService.save(detallePedido);

        int databaseSizeBeforeUpdate = detallePedidoRepository.findAll().size();

        // Update the detallePedido
        DetallePedido updatedDetallePedido = detallePedidoRepository.findOne(detallePedido.getId());

        restDetallePedidoMockMvc.perform(put("/api/detalle-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDetallePedido)))
            .andExpect(status().isOk());

        // Validate the DetallePedido in the database
        List<DetallePedido> detallePedidoList = detallePedidoRepository.findAll();
        assertThat(detallePedidoList).hasSize(databaseSizeBeforeUpdate);
        DetallePedido testDetallePedido = detallePedidoList.get(detallePedidoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingDetallePedido() throws Exception {
        int databaseSizeBeforeUpdate = detallePedidoRepository.findAll().size();

        // Create the DetallePedido

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDetallePedidoMockMvc.perform(put("/api/detalle-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detallePedido)))
            .andExpect(status().isCreated());

        // Validate the DetallePedido in the database
        List<DetallePedido> detallePedidoList = detallePedidoRepository.findAll();
        assertThat(detallePedidoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDetallePedido() throws Exception {
        // Initialize the database
        detallePedidoService.save(detallePedido);

        int databaseSizeBeforeDelete = detallePedidoRepository.findAll().size();

        // Get the detallePedido
        restDetallePedidoMockMvc.perform(delete("/api/detalle-pedidos/{id}", detallePedido.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DetallePedido> detallePedidoList = detallePedidoRepository.findAll();
        assertThat(detallePedidoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DetallePedido.class);
        DetallePedido detallePedido1 = new DetallePedido();
        detallePedido1.setId(1L);
        DetallePedido detallePedido2 = new DetallePedido();
        detallePedido2.setId(detallePedido1.getId());
        assertThat(detallePedido1).isEqualTo(detallePedido2);
        detallePedido2.setId(2L);
        assertThat(detallePedido1).isNotEqualTo(detallePedido2);
        detallePedido1.setId(null);
        assertThat(detallePedido1).isNotEqualTo(detallePedido2);
    }
}
