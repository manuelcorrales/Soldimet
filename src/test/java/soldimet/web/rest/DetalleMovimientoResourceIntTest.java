package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.DetalleMovimiento;
import soldimet.domain.TipoDetalleMovimiento;
import soldimet.repository.DetalleMovimientoRepository;
import soldimet.service.DetalleMovimientoService;
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
 * Test class for the DetalleMovimientoResource REST controller.
 *
 * @see DetalleMovimientoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class DetalleMovimientoResourceIntTest {

    @Autowired
    private DetalleMovimientoRepository detalleMovimientoRepository;

    @Autowired
    private DetalleMovimientoService detalleMovimientoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDetalleMovimientoMockMvc;

    private DetalleMovimiento detalleMovimiento;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DetalleMovimientoResource detalleMovimientoResource = new DetalleMovimientoResource(detalleMovimientoService);
        this.restDetalleMovimientoMockMvc = MockMvcBuilders.standaloneSetup(detalleMovimientoResource)
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
    public static DetalleMovimiento createEntity(EntityManager em) {
        DetalleMovimiento detalleMovimiento = new DetalleMovimiento();
        // Add required entity
        TipoDetalleMovimiento tipoDetalleMovimiento = TipoDetalleMovimientoResourceIntTest.createEntity(em);
        em.persist(tipoDetalleMovimiento);
        em.flush();
        detalleMovimiento.setTipoDetalleMovimiento(tipoDetalleMovimiento);
        return detalleMovimiento;
    }

    @Before
    public void initTest() {
        detalleMovimiento = createEntity(em);
    }

    @Test
    @Transactional
    public void createDetalleMovimiento() throws Exception {
        int databaseSizeBeforeCreate = detalleMovimientoRepository.findAll().size();

        // Create the DetalleMovimiento
        restDetalleMovimientoMockMvc.perform(post("/api/detalle-movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detalleMovimiento)))
            .andExpect(status().isCreated());

        // Validate the DetalleMovimiento in the database
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeCreate + 1);
        DetalleMovimiento testDetalleMovimiento = detalleMovimientoList.get(detalleMovimientoList.size() - 1);
    }

    @Test
    @Transactional
    public void createDetalleMovimientoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = detalleMovimientoRepository.findAll().size();

        // Create the DetalleMovimiento with an existing ID
        detalleMovimiento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDetalleMovimientoMockMvc.perform(post("/api/detalle-movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detalleMovimiento)))
            .andExpect(status().isBadRequest());

        // Validate the DetalleMovimiento in the database
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDetalleMovimientos() throws Exception {
        // Initialize the database
        detalleMovimientoRepository.saveAndFlush(detalleMovimiento);

        // Get all the detalleMovimientoList
        restDetalleMovimientoMockMvc.perform(get("/api/detalle-movimientos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(detalleMovimiento.getId().intValue())));
    }

    @Test
    @Transactional
    public void getDetalleMovimiento() throws Exception {
        // Initialize the database
        detalleMovimientoRepository.saveAndFlush(detalleMovimiento);

        // Get the detalleMovimiento
        restDetalleMovimientoMockMvc.perform(get("/api/detalle-movimientos/{id}", detalleMovimiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(detalleMovimiento.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDetalleMovimiento() throws Exception {
        // Get the detalleMovimiento
        restDetalleMovimientoMockMvc.perform(get("/api/detalle-movimientos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDetalleMovimiento() throws Exception {
        // Initialize the database
        detalleMovimientoService.save(detalleMovimiento);

        int databaseSizeBeforeUpdate = detalleMovimientoRepository.findAll().size();

        // Update the detalleMovimiento
        DetalleMovimiento updatedDetalleMovimiento = detalleMovimientoRepository.findOne(detalleMovimiento.getId());

        restDetalleMovimientoMockMvc.perform(put("/api/detalle-movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDetalleMovimiento)))
            .andExpect(status().isOk());

        // Validate the DetalleMovimiento in the database
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
        DetalleMovimiento testDetalleMovimiento = detalleMovimientoList.get(detalleMovimientoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingDetalleMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = detalleMovimientoRepository.findAll().size();

        // Create the DetalleMovimiento

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDetalleMovimientoMockMvc.perform(put("/api/detalle-movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detalleMovimiento)))
            .andExpect(status().isCreated());

        // Validate the DetalleMovimiento in the database
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDetalleMovimiento() throws Exception {
        // Initialize the database
        detalleMovimientoService.save(detalleMovimiento);

        int databaseSizeBeforeDelete = detalleMovimientoRepository.findAll().size();

        // Get the detalleMovimiento
        restDetalleMovimientoMockMvc.perform(delete("/api/detalle-movimientos/{id}", detalleMovimiento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DetalleMovimiento.class);
        DetalleMovimiento detalleMovimiento1 = new DetalleMovimiento();
        detalleMovimiento1.setId(1L);
        DetalleMovimiento detalleMovimiento2 = new DetalleMovimiento();
        detalleMovimiento2.setId(detalleMovimiento1.getId());
        assertThat(detalleMovimiento1).isEqualTo(detalleMovimiento2);
        detalleMovimiento2.setId(2L);
        assertThat(detalleMovimiento1).isNotEqualTo(detalleMovimiento2);
        detalleMovimiento1.setId(null);
        assertThat(detalleMovimiento1).isNotEqualTo(detalleMovimiento2);
    }
}
