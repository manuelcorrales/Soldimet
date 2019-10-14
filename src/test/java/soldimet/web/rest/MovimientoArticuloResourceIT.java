package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.MovimientoArticulo;
import soldimet.domain.Articulo;
import soldimet.domain.Movimiento;
import soldimet.repository.MovimientoArticuloRepository;
import soldimet.service.MovimientoArticuloService;
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
 * Integration tests for the {@link MovimientoArticuloResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class MovimientoArticuloResourceIT {

    private static final Integer DEFAULT_CANTIDAD = 1;
    private static final Integer UPDATED_CANTIDAD = 2;
    private static final Integer SMALLER_CANTIDAD = 1 - 1;

    @Autowired
    private MovimientoArticuloRepository movimientoArticuloRepository;

    @Autowired
    private MovimientoArticuloService movimientoArticuloService;

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

    private MockMvc restMovimientoArticuloMockMvc;

    private MovimientoArticulo movimientoArticulo;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MovimientoArticuloResource movimientoArticuloResource = new MovimientoArticuloResource(movimientoArticuloService);
        this.restMovimientoArticuloMockMvc = MockMvcBuilders.standaloneSetup(movimientoArticuloResource)
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
    public static MovimientoArticulo createEntity(EntityManager em) {
        MovimientoArticulo movimientoArticulo = new MovimientoArticulo()
            .cantidad(DEFAULT_CANTIDAD);
        // Add required entity
        Articulo articulo;
        if (TestUtil.findAll(em, Articulo.class).isEmpty()) {
            articulo = ArticuloResourceIT.createEntity(em);
            em.persist(articulo);
            em.flush();
        } else {
            articulo = TestUtil.findAll(em, Articulo.class).get(0);
        }
        movimientoArticulo.setArticulo(articulo);
        // Add required entity
        Movimiento movimiento;
        if (TestUtil.findAll(em, Movimiento.class).isEmpty()) {
            movimiento = MovimientoResourceIT.createEntity(em);
            em.persist(movimiento);
            em.flush();
        } else {
            movimiento = TestUtil.findAll(em, Movimiento.class).get(0);
        }
        movimientoArticulo.setMovimiento(movimiento);
        return movimientoArticulo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MovimientoArticulo createUpdatedEntity(EntityManager em) {
        MovimientoArticulo movimientoArticulo = new MovimientoArticulo()
            .cantidad(UPDATED_CANTIDAD);
        // Add required entity
        Articulo articulo;
        if (TestUtil.findAll(em, Articulo.class).isEmpty()) {
            articulo = ArticuloResourceIT.createUpdatedEntity(em);
            em.persist(articulo);
            em.flush();
        } else {
            articulo = TestUtil.findAll(em, Articulo.class).get(0);
        }
        movimientoArticulo.setArticulo(articulo);
        // Add required entity
        Movimiento movimiento;
        if (TestUtil.findAll(em, Movimiento.class).isEmpty()) {
            movimiento = MovimientoResourceIT.createUpdatedEntity(em);
            em.persist(movimiento);
            em.flush();
        } else {
            movimiento = TestUtil.findAll(em, Movimiento.class).get(0);
        }
        movimientoArticulo.setMovimiento(movimiento);
        return movimientoArticulo;
    }

    @BeforeEach
    public void initTest() {
        movimientoArticulo = createEntity(em);
    }

    @Test
    @Transactional
    public void createMovimientoArticulo() throws Exception {
        int databaseSizeBeforeCreate = movimientoArticuloRepository.findAll().size();

        // Create the MovimientoArticulo
        restMovimientoArticuloMockMvc.perform(post("/api/movimiento-articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movimientoArticulo)))
            .andExpect(status().isCreated());

        // Validate the MovimientoArticulo in the database
        List<MovimientoArticulo> movimientoArticuloList = movimientoArticuloRepository.findAll();
        assertThat(movimientoArticuloList).hasSize(databaseSizeBeforeCreate + 1);
        MovimientoArticulo testMovimientoArticulo = movimientoArticuloList.get(movimientoArticuloList.size() - 1);
        assertThat(testMovimientoArticulo.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
    }

    @Test
    @Transactional
    public void createMovimientoArticuloWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = movimientoArticuloRepository.findAll().size();

        // Create the MovimientoArticulo with an existing ID
        movimientoArticulo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMovimientoArticuloMockMvc.perform(post("/api/movimiento-articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movimientoArticulo)))
            .andExpect(status().isBadRequest());

        // Validate the MovimientoArticulo in the database
        List<MovimientoArticulo> movimientoArticuloList = movimientoArticuloRepository.findAll();
        assertThat(movimientoArticuloList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCantidadIsRequired() throws Exception {
        int databaseSizeBeforeTest = movimientoArticuloRepository.findAll().size();
        // set the field null
        movimientoArticulo.setCantidad(null);

        // Create the MovimientoArticulo, which fails.

        restMovimientoArticuloMockMvc.perform(post("/api/movimiento-articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movimientoArticulo)))
            .andExpect(status().isBadRequest());

        List<MovimientoArticulo> movimientoArticuloList = movimientoArticuloRepository.findAll();
        assertThat(movimientoArticuloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMovimientoArticulos() throws Exception {
        // Initialize the database
        movimientoArticuloRepository.saveAndFlush(movimientoArticulo);

        // Get all the movimientoArticuloList
        restMovimientoArticuloMockMvc.perform(get("/api/movimiento-articulos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(movimientoArticulo.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD)));
    }
    
    @Test
    @Transactional
    public void getMovimientoArticulo() throws Exception {
        // Initialize the database
        movimientoArticuloRepository.saveAndFlush(movimientoArticulo);

        // Get the movimientoArticulo
        restMovimientoArticuloMockMvc.perform(get("/api/movimiento-articulos/{id}", movimientoArticulo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(movimientoArticulo.getId().intValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD));
    }

    @Test
    @Transactional
    public void getNonExistingMovimientoArticulo() throws Exception {
        // Get the movimientoArticulo
        restMovimientoArticuloMockMvc.perform(get("/api/movimiento-articulos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMovimientoArticulo() throws Exception {
        // Initialize the database
        movimientoArticuloService.save(movimientoArticulo);

        int databaseSizeBeforeUpdate = movimientoArticuloRepository.findAll().size();

        // Update the movimientoArticulo
        MovimientoArticulo updatedMovimientoArticulo = movimientoArticuloRepository.findById(movimientoArticulo.getId()).get();
        // Disconnect from session so that the updates on updatedMovimientoArticulo are not directly saved in db
        em.detach(updatedMovimientoArticulo);
        updatedMovimientoArticulo
            .cantidad(UPDATED_CANTIDAD);

        restMovimientoArticuloMockMvc.perform(put("/api/movimiento-articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMovimientoArticulo)))
            .andExpect(status().isOk());

        // Validate the MovimientoArticulo in the database
        List<MovimientoArticulo> movimientoArticuloList = movimientoArticuloRepository.findAll();
        assertThat(movimientoArticuloList).hasSize(databaseSizeBeforeUpdate);
        MovimientoArticulo testMovimientoArticulo = movimientoArticuloList.get(movimientoArticuloList.size() - 1);
        assertThat(testMovimientoArticulo.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
    }

    @Test
    @Transactional
    public void updateNonExistingMovimientoArticulo() throws Exception {
        int databaseSizeBeforeUpdate = movimientoArticuloRepository.findAll().size();

        // Create the MovimientoArticulo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMovimientoArticuloMockMvc.perform(put("/api/movimiento-articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movimientoArticulo)))
            .andExpect(status().isBadRequest());

        // Validate the MovimientoArticulo in the database
        List<MovimientoArticulo> movimientoArticuloList = movimientoArticuloRepository.findAll();
        assertThat(movimientoArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMovimientoArticulo() throws Exception {
        // Initialize the database
        movimientoArticuloService.save(movimientoArticulo);

        int databaseSizeBeforeDelete = movimientoArticuloRepository.findAll().size();

        // Delete the movimientoArticulo
        restMovimientoArticuloMockMvc.perform(delete("/api/movimiento-articulos/{id}", movimientoArticulo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MovimientoArticulo> movimientoArticuloList = movimientoArticuloRepository.findAll();
        assertThat(movimientoArticuloList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MovimientoArticulo.class);
        MovimientoArticulo movimientoArticulo1 = new MovimientoArticulo();
        movimientoArticulo1.setId(1L);
        MovimientoArticulo movimientoArticulo2 = new MovimientoArticulo();
        movimientoArticulo2.setId(movimientoArticulo1.getId());
        assertThat(movimientoArticulo1).isEqualTo(movimientoArticulo2);
        movimientoArticulo2.setId(2L);
        assertThat(movimientoArticulo1).isNotEqualTo(movimientoArticulo2);
        movimientoArticulo1.setId(null);
        assertThat(movimientoArticulo1).isNotEqualTo(movimientoArticulo2);
    }
}
