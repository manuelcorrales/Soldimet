package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.EstadoDetallePedido;
import soldimet.repository.EstadoDetallePedidoRepository;
import soldimet.service.EstadoDetallePedidoService;
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
 * Test class for the EstadoDetallePedidoResource REST controller.
 *
 * @see EstadoDetallePedidoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class EstadoDetallePedidoResourceIntTest {

    private static final String DEFAULT_NOMBRE_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_ESTADO = "BBBBBBBBBB";

    @Autowired
    private EstadoDetallePedidoRepository estadoDetallePedidoRepository;

    

    @Autowired
    private EstadoDetallePedidoService estadoDetallePedidoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEstadoDetallePedidoMockMvc;

    private EstadoDetallePedido estadoDetallePedido;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EstadoDetallePedidoResource estadoDetallePedidoResource = new EstadoDetallePedidoResource(estadoDetallePedidoService);
        this.restEstadoDetallePedidoMockMvc = MockMvcBuilders.standaloneSetup(estadoDetallePedidoResource)
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
    public static EstadoDetallePedido createEntity(EntityManager em) {
        EstadoDetallePedido estadoDetallePedido = new EstadoDetallePedido()
            .nombreEstado(DEFAULT_NOMBRE_ESTADO);
        return estadoDetallePedido;
    }

    @Before
    public void initTest() {
        estadoDetallePedido = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstadoDetallePedido() throws Exception {
        int databaseSizeBeforeCreate = estadoDetallePedidoRepository.findAll().size();

        // Create the EstadoDetallePedido
        restEstadoDetallePedidoMockMvc.perform(post("/api/estado-detalle-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoDetallePedido)))
            .andExpect(status().isCreated());

        // Validate the EstadoDetallePedido in the database
        List<EstadoDetallePedido> estadoDetallePedidoList = estadoDetallePedidoRepository.findAll();
        assertThat(estadoDetallePedidoList).hasSize(databaseSizeBeforeCreate + 1);
        EstadoDetallePedido testEstadoDetallePedido = estadoDetallePedidoList.get(estadoDetallePedidoList.size() - 1);
        assertThat(testEstadoDetallePedido.getNombreEstado()).isEqualTo(DEFAULT_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    public void createEstadoDetallePedidoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estadoDetallePedidoRepository.findAll().size();

        // Create the EstadoDetallePedido with an existing ID
        estadoDetallePedido.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadoDetallePedidoMockMvc.perform(post("/api/estado-detalle-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoDetallePedido)))
            .andExpect(status().isBadRequest());

        // Validate the EstadoDetallePedido in the database
        List<EstadoDetallePedido> estadoDetallePedidoList = estadoDetallePedidoRepository.findAll();
        assertThat(estadoDetallePedidoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = estadoDetallePedidoRepository.findAll().size();
        // set the field null
        estadoDetallePedido.setNombreEstado(null);

        // Create the EstadoDetallePedido, which fails.

        restEstadoDetallePedidoMockMvc.perform(post("/api/estado-detalle-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoDetallePedido)))
            .andExpect(status().isBadRequest());

        List<EstadoDetallePedido> estadoDetallePedidoList = estadoDetallePedidoRepository.findAll();
        assertThat(estadoDetallePedidoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEstadoDetallePedidos() throws Exception {
        // Initialize the database
        estadoDetallePedidoRepository.saveAndFlush(estadoDetallePedido);

        // Get all the estadoDetallePedidoList
        restEstadoDetallePedidoMockMvc.perform(get("/api/estado-detalle-pedidos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadoDetallePedido.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreEstado").value(hasItem(DEFAULT_NOMBRE_ESTADO.toString())));
    }
    

    @Test
    @Transactional
    public void getEstadoDetallePedido() throws Exception {
        // Initialize the database
        estadoDetallePedidoRepository.saveAndFlush(estadoDetallePedido);

        // Get the estadoDetallePedido
        restEstadoDetallePedidoMockMvc.perform(get("/api/estado-detalle-pedidos/{id}", estadoDetallePedido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(estadoDetallePedido.getId().intValue()))
            .andExpect(jsonPath("$.nombreEstado").value(DEFAULT_NOMBRE_ESTADO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingEstadoDetallePedido() throws Exception {
        // Get the estadoDetallePedido
        restEstadoDetallePedidoMockMvc.perform(get("/api/estado-detalle-pedidos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstadoDetallePedido() throws Exception {
        // Initialize the database
        estadoDetallePedidoService.save(estadoDetallePedido);

        int databaseSizeBeforeUpdate = estadoDetallePedidoRepository.findAll().size();

        // Update the estadoDetallePedido
        EstadoDetallePedido updatedEstadoDetallePedido = estadoDetallePedidoRepository.findById(estadoDetallePedido.getId()).get();
        // Disconnect from session so that the updates on updatedEstadoDetallePedido are not directly saved in db
        em.detach(updatedEstadoDetallePedido);
        updatedEstadoDetallePedido
            .nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoDetallePedidoMockMvc.perform(put("/api/estado-detalle-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstadoDetallePedido)))
            .andExpect(status().isOk());

        // Validate the EstadoDetallePedido in the database
        List<EstadoDetallePedido> estadoDetallePedidoList = estadoDetallePedidoRepository.findAll();
        assertThat(estadoDetallePedidoList).hasSize(databaseSizeBeforeUpdate);
        EstadoDetallePedido testEstadoDetallePedido = estadoDetallePedidoList.get(estadoDetallePedidoList.size() - 1);
        assertThat(testEstadoDetallePedido.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingEstadoDetallePedido() throws Exception {
        int databaseSizeBeforeUpdate = estadoDetallePedidoRepository.findAll().size();

        // Create the EstadoDetallePedido

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEstadoDetallePedidoMockMvc.perform(put("/api/estado-detalle-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoDetallePedido)))
            .andExpect(status().isBadRequest());

        // Validate the EstadoDetallePedido in the database
        List<EstadoDetallePedido> estadoDetallePedidoList = estadoDetallePedidoRepository.findAll();
        assertThat(estadoDetallePedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEstadoDetallePedido() throws Exception {
        // Initialize the database
        estadoDetallePedidoService.save(estadoDetallePedido);

        int databaseSizeBeforeDelete = estadoDetallePedidoRepository.findAll().size();

        // Get the estadoDetallePedido
        restEstadoDetallePedidoMockMvc.perform(delete("/api/estado-detalle-pedidos/{id}", estadoDetallePedido.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EstadoDetallePedido> estadoDetallePedidoList = estadoDetallePedidoRepository.findAll();
        assertThat(estadoDetallePedidoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstadoDetallePedido.class);
        EstadoDetallePedido estadoDetallePedido1 = new EstadoDetallePedido();
        estadoDetallePedido1.setId(1L);
        EstadoDetallePedido estadoDetallePedido2 = new EstadoDetallePedido();
        estadoDetallePedido2.setId(estadoDetallePedido1.getId());
        assertThat(estadoDetallePedido1).isEqualTo(estadoDetallePedido2);
        estadoDetallePedido2.setId(2L);
        assertThat(estadoDetallePedido1).isNotEqualTo(estadoDetallePedido2);
        estadoDetallePedido1.setId(null);
        assertThat(estadoDetallePedido1).isNotEqualTo(estadoDetallePedido2);
    }
}
