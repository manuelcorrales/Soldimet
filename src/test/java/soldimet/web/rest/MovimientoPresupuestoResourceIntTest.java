package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.MovimientoPresupuesto;
import soldimet.domain.Presupuesto;
import soldimet.domain.Movimiento;
import soldimet.repository.MovimientoPresupuestoRepository;
import soldimet.service.MovimientoPresupuestoService;
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


import static soldimet.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MovimientoPresupuestoResource REST controller.
 *
 * @see MovimientoPresupuestoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class MovimientoPresupuestoResourceIntTest {

    @Autowired
    private MovimientoPresupuestoRepository movimientoPresupuestoRepository;

    

    @Autowired
    private MovimientoPresupuestoService movimientoPresupuestoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMovimientoPresupuestoMockMvc;

    private MovimientoPresupuesto movimientoPresupuesto;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MovimientoPresupuestoResource movimientoPresupuestoResource = new MovimientoPresupuestoResource(movimientoPresupuestoService);
        this.restMovimientoPresupuestoMockMvc = MockMvcBuilders.standaloneSetup(movimientoPresupuestoResource)
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
    public static MovimientoPresupuesto createEntity(EntityManager em) {
        MovimientoPresupuesto movimientoPresupuesto = new MovimientoPresupuesto();
        // Add required entity
        Presupuesto presupuesto = PresupuestoResourceIntTest.createEntity(em);
        em.persist(presupuesto);
        em.flush();
        movimientoPresupuesto.setPresupuesto(presupuesto);
        // Add required entity
        Movimiento movimiento = MovimientoResourceIntTest.createEntity(em);
        em.persist(movimiento);
        em.flush();
        movimientoPresupuesto.setMovimiento(movimiento);
        return movimientoPresupuesto;
    }

    @Before
    public void initTest() {
        movimientoPresupuesto = createEntity(em);
    }

    @Test
    @Transactional
    public void createMovimientoPresupuesto() throws Exception {
        int databaseSizeBeforeCreate = movimientoPresupuestoRepository.findAll().size();

        // Create the MovimientoPresupuesto
        restMovimientoPresupuestoMockMvc.perform(post("/api/movimiento-presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movimientoPresupuesto)))
            .andExpect(status().isCreated());

        // Validate the MovimientoPresupuesto in the database
        List<MovimientoPresupuesto> movimientoPresupuestoList = movimientoPresupuestoRepository.findAll();
        assertThat(movimientoPresupuestoList).hasSize(databaseSizeBeforeCreate + 1);
        MovimientoPresupuesto testMovimientoPresupuesto = movimientoPresupuestoList.get(movimientoPresupuestoList.size() - 1);
    }

    @Test
    @Transactional
    public void createMovimientoPresupuestoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = movimientoPresupuestoRepository.findAll().size();

        // Create the MovimientoPresupuesto with an existing ID
        movimientoPresupuesto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMovimientoPresupuestoMockMvc.perform(post("/api/movimiento-presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movimientoPresupuesto)))
            .andExpect(status().isBadRequest());

        // Validate the MovimientoPresupuesto in the database
        List<MovimientoPresupuesto> movimientoPresupuestoList = movimientoPresupuestoRepository.findAll();
        assertThat(movimientoPresupuestoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMovimientoPresupuestos() throws Exception {
        // Initialize the database
        movimientoPresupuestoRepository.saveAndFlush(movimientoPresupuesto);

        // Get all the movimientoPresupuestoList
        restMovimientoPresupuestoMockMvc.perform(get("/api/movimiento-presupuestos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(movimientoPresupuesto.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getMovimientoPresupuesto() throws Exception {
        // Initialize the database
        movimientoPresupuestoRepository.saveAndFlush(movimientoPresupuesto);

        // Get the movimientoPresupuesto
        restMovimientoPresupuestoMockMvc.perform(get("/api/movimiento-presupuestos/{id}", movimientoPresupuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(movimientoPresupuesto.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingMovimientoPresupuesto() throws Exception {
        // Get the movimientoPresupuesto
        restMovimientoPresupuestoMockMvc.perform(get("/api/movimiento-presupuestos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMovimientoPresupuesto() throws Exception {
        // Initialize the database
        movimientoPresupuestoService.save(movimientoPresupuesto);

        int databaseSizeBeforeUpdate = movimientoPresupuestoRepository.findAll().size();

        // Update the movimientoPresupuesto
        MovimientoPresupuesto updatedMovimientoPresupuesto = movimientoPresupuestoRepository.findById(movimientoPresupuesto.getId()).get();
        // Disconnect from session so that the updates on updatedMovimientoPresupuesto are not directly saved in db
        em.detach(updatedMovimientoPresupuesto);

        restMovimientoPresupuestoMockMvc.perform(put("/api/movimiento-presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMovimientoPresupuesto)))
            .andExpect(status().isOk());

        // Validate the MovimientoPresupuesto in the database
        List<MovimientoPresupuesto> movimientoPresupuestoList = movimientoPresupuestoRepository.findAll();
        assertThat(movimientoPresupuestoList).hasSize(databaseSizeBeforeUpdate);
        MovimientoPresupuesto testMovimientoPresupuesto = movimientoPresupuestoList.get(movimientoPresupuestoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingMovimientoPresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = movimientoPresupuestoRepository.findAll().size();

        // Create the MovimientoPresupuesto

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMovimientoPresupuestoMockMvc.perform(put("/api/movimiento-presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movimientoPresupuesto)))
            .andExpect(status().isBadRequest());

        // Validate the MovimientoPresupuesto in the database
        List<MovimientoPresupuesto> movimientoPresupuestoList = movimientoPresupuestoRepository.findAll();
        assertThat(movimientoPresupuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMovimientoPresupuesto() throws Exception {
        // Initialize the database
        movimientoPresupuestoService.save(movimientoPresupuesto);

        int databaseSizeBeforeDelete = movimientoPresupuestoRepository.findAll().size();

        // Get the movimientoPresupuesto
        restMovimientoPresupuestoMockMvc.perform(delete("/api/movimiento-presupuestos/{id}", movimientoPresupuesto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MovimientoPresupuesto> movimientoPresupuestoList = movimientoPresupuestoRepository.findAll();
        assertThat(movimientoPresupuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MovimientoPresupuesto.class);
        MovimientoPresupuesto movimientoPresupuesto1 = new MovimientoPresupuesto();
        movimientoPresupuesto1.setId(1L);
        MovimientoPresupuesto movimientoPresupuesto2 = new MovimientoPresupuesto();
        movimientoPresupuesto2.setId(movimientoPresupuesto1.getId());
        assertThat(movimientoPresupuesto1).isEqualTo(movimientoPresupuesto2);
        movimientoPresupuesto2.setId(2L);
        assertThat(movimientoPresupuesto1).isNotEqualTo(movimientoPresupuesto2);
        movimientoPresupuesto1.setId(null);
        assertThat(movimientoPresupuesto1).isNotEqualTo(movimientoPresupuesto2);
    }
}
