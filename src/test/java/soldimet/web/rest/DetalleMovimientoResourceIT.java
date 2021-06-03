package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.DetalleMovimiento;
import soldimet.domain.TipoDetalleMovimiento;
import soldimet.repository.DetalleMovimientoRepository;
import soldimet.service.DetalleMovimientoService;
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
 * Integration tests for the {@link DetalleMovimientoResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class DetalleMovimientoResourceIT {

    private static final Float DEFAULT_VALOR_UNITARIO = 1F;
    private static final Float UPDATED_VALOR_UNITARIO = 2F;
    private static final Float SMALLER_VALOR_UNITARIO = 1F - 1F;

    private static final Integer DEFAULT_CANTIDAD = 0;
    private static final Integer UPDATED_CANTIDAD = 1;
    private static final Integer SMALLER_CANTIDAD = 0 - 1;

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

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

    @Autowired
    private Validator validator;

    private MockMvc restDetalleMovimientoMockMvc;

    private DetalleMovimiento detalleMovimiento;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DetalleMovimientoResource detalleMovimientoResource = new DetalleMovimientoResource(detalleMovimientoService);
        this.restDetalleMovimientoMockMvc = MockMvcBuilders.standaloneSetup(detalleMovimientoResource)
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
    public static DetalleMovimiento createEntity(EntityManager em) {
        DetalleMovimiento detalleMovimiento = new DetalleMovimiento()
            .valorUnitario(DEFAULT_VALOR_UNITARIO)
            .cantidad(DEFAULT_CANTIDAD)
            .descripcion(DEFAULT_DESCRIPCION);
        // Add required entity
        TipoDetalleMovimiento tipoDetalleMovimiento;
        if (TestUtil.findAll(em, TipoDetalleMovimiento.class).isEmpty()) {
            tipoDetalleMovimiento = TipoDetalleMovimientoResourceIT.createEntity(em);
            em.persist(tipoDetalleMovimiento);
            em.flush();
        } else {
            tipoDetalleMovimiento = TestUtil.findAll(em, TipoDetalleMovimiento.class).get(0);
        }
        detalleMovimiento.setTipoDetalleMovimiento(tipoDetalleMovimiento);
        return detalleMovimiento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetalleMovimiento createUpdatedEntity(EntityManager em) {
        DetalleMovimiento detalleMovimiento = new DetalleMovimiento()
            .valorUnitario(UPDATED_VALOR_UNITARIO)
            .cantidad(UPDATED_CANTIDAD)
            .descripcion(UPDATED_DESCRIPCION);
        // Add required entity
        TipoDetalleMovimiento tipoDetalleMovimiento;
        if (TestUtil.findAll(em, TipoDetalleMovimiento.class).isEmpty()) {
            tipoDetalleMovimiento = TipoDetalleMovimientoResourceIT.createUpdatedEntity(em);
            em.persist(tipoDetalleMovimiento);
            em.flush();
        } else {
            tipoDetalleMovimiento = TestUtil.findAll(em, TipoDetalleMovimiento.class).get(0);
        }
        detalleMovimiento.setTipoDetalleMovimiento(tipoDetalleMovimiento);
        return detalleMovimiento;
    }

    @BeforeEach
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
        assertThat(testDetalleMovimiento.getValorUnitario()).isEqualTo(DEFAULT_VALOR_UNITARIO);
        assertThat(testDetalleMovimiento.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
        assertThat(testDetalleMovimiento.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
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
    public void checkCantidadIsRequired() throws Exception {
        int databaseSizeBeforeTest = detalleMovimientoRepository.findAll().size();
        // set the field null
        detalleMovimiento.setCantidad(null);

        // Create the DetalleMovimiento, which fails.

        restDetalleMovimientoMockMvc.perform(post("/api/detalle-movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detalleMovimiento)))
            .andExpect(status().isBadRequest());

        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeTest);
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
            .andExpect(jsonPath("$.[*].id").value(hasItem(detalleMovimiento.getId().intValue())))
            .andExpect(jsonPath("$.[*].valorUnitario").value(hasItem(DEFAULT_VALOR_UNITARIO.doubleValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
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
            .andExpect(jsonPath("$.id").value(detalleMovimiento.getId().intValue()))
            .andExpect(jsonPath("$.valorUnitario").value(DEFAULT_VALOR_UNITARIO.doubleValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
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
        DetalleMovimiento updatedDetalleMovimiento = detalleMovimientoRepository.findById(detalleMovimiento.getId()).get();
        // Disconnect from session so that the updates on updatedDetalleMovimiento are not directly saved in db
        em.detach(updatedDetalleMovimiento);
        updatedDetalleMovimiento
            .valorUnitario(UPDATED_VALOR_UNITARIO)
            .cantidad(UPDATED_CANTIDAD)
            .descripcion(UPDATED_DESCRIPCION);

        restDetalleMovimientoMockMvc.perform(put("/api/detalle-movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDetalleMovimiento)))
            .andExpect(status().isOk());

        // Validate the DetalleMovimiento in the database
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
        DetalleMovimiento testDetalleMovimiento = detalleMovimientoList.get(detalleMovimientoList.size() - 1);
        assertThat(testDetalleMovimiento.getValorUnitario()).isEqualTo(UPDATED_VALOR_UNITARIO);
        assertThat(testDetalleMovimiento.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
        assertThat(testDetalleMovimiento.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingDetalleMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = detalleMovimientoRepository.findAll().size();

        // Create the DetalleMovimiento

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDetalleMovimientoMockMvc.perform(put("/api/detalle-movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detalleMovimiento)))
            .andExpect(status().isBadRequest());

        // Validate the DetalleMovimiento in the database
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDetalleMovimiento() throws Exception {
        // Initialize the database
        detalleMovimientoService.save(detalleMovimiento);

        int databaseSizeBeforeDelete = detalleMovimientoRepository.findAll().size();

        // Delete the detalleMovimiento
        restDetalleMovimientoMockMvc.perform(delete("/api/detalle-movimientos/{id}", detalleMovimiento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
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
