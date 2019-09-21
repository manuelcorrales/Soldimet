package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.ListaPrecioRectificacionCRAM;
import soldimet.domain.CostoOperacion;
import soldimet.repository.ListaPrecioRectificacionCRAMRepository;
import soldimet.service.ListaPrecioRectificacionCRAMService;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static soldimet.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ListaPrecioRectificacionCRAMResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class ListaPrecioRectificacionCRAMResourceIT {

    private static final LocalDate DEFAULT_FECHA_VIGENCIA_DESDE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_VIGENCIA_DESDE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA_VIGENCIA_DESDE = LocalDate.ofEpochDay(-1L);

    private static final LocalDate DEFAULT_FECHA_VIGENCIA_HASTA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_VIGENCIA_HASTA = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA_VIGENCIA_HASTA = LocalDate.ofEpochDay(-1L);

    private static final Integer DEFAULT_NUMERO_GRUPO = 1;
    private static final Integer UPDATED_NUMERO_GRUPO = 2;
    private static final Integer SMALLER_NUMERO_GRUPO = 1 - 1;

    @Autowired
    private ListaPrecioRectificacionCRAMRepository listaPrecioRectificacionCRAMRepository;

    @Autowired
    private ListaPrecioRectificacionCRAMService listaPrecioRectificacionCRAMService;

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

    private MockMvc restListaPrecioRectificacionCRAMMockMvc;

    private ListaPrecioRectificacionCRAM listaPrecioRectificacionCRAM;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ListaPrecioRectificacionCRAMResource listaPrecioRectificacionCRAMResource = new ListaPrecioRectificacionCRAMResource(listaPrecioRectificacionCRAMService);
        this.restListaPrecioRectificacionCRAMMockMvc = MockMvcBuilders.standaloneSetup(listaPrecioRectificacionCRAMResource)
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
    public static ListaPrecioRectificacionCRAM createEntity(EntityManager em) {
        ListaPrecioRectificacionCRAM listaPrecioRectificacionCRAM = new ListaPrecioRectificacionCRAM()
            .fechaVigenciaDesde(DEFAULT_FECHA_VIGENCIA_DESDE)
            .fechaVigenciaHasta(DEFAULT_FECHA_VIGENCIA_HASTA)
            .numeroGrupo(DEFAULT_NUMERO_GRUPO);
        // Add required entity
        CostoOperacion costoOperacion;
        if (TestUtil.findAll(em, CostoOperacion.class).isEmpty()) {
            costoOperacion = CostoOperacionResourceIT.createEntity(em);
            em.persist(costoOperacion);
            em.flush();
        } else {
            costoOperacion = TestUtil.findAll(em, CostoOperacion.class).get(0);
        }
        listaPrecioRectificacionCRAM.setCostoOperacion(costoOperacion);
        return listaPrecioRectificacionCRAM;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ListaPrecioRectificacionCRAM createUpdatedEntity(EntityManager em) {
        ListaPrecioRectificacionCRAM listaPrecioRectificacionCRAM = new ListaPrecioRectificacionCRAM()
            .fechaVigenciaDesde(UPDATED_FECHA_VIGENCIA_DESDE)
            .fechaVigenciaHasta(UPDATED_FECHA_VIGENCIA_HASTA)
            .numeroGrupo(UPDATED_NUMERO_GRUPO);
        // Add required entity
        CostoOperacion costoOperacion;
        if (TestUtil.findAll(em, CostoOperacion.class).isEmpty()) {
            costoOperacion = CostoOperacionResourceIT.createUpdatedEntity(em);
            em.persist(costoOperacion);
            em.flush();
        } else {
            costoOperacion = TestUtil.findAll(em, CostoOperacion.class).get(0);
        }
        listaPrecioRectificacionCRAM.setCostoOperacion(costoOperacion);
        return listaPrecioRectificacionCRAM;
    }

    @BeforeEach
    public void initTest() {
        listaPrecioRectificacionCRAM = createEntity(em);
    }

    @Test
    @Transactional
    public void createListaPrecioRectificacionCRAM() throws Exception {
        int databaseSizeBeforeCreate = listaPrecioRectificacionCRAMRepository.findAll().size();

        // Create the ListaPrecioRectificacionCRAM
        restListaPrecioRectificacionCRAMMockMvc.perform(post("/api/lista-precio-rectificacion-crams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listaPrecioRectificacionCRAM)))
            .andExpect(status().isCreated());

        // Validate the ListaPrecioRectificacionCRAM in the database
        List<ListaPrecioRectificacionCRAM> listaPrecioRectificacionCRAMList = listaPrecioRectificacionCRAMRepository.findAll();
        assertThat(listaPrecioRectificacionCRAMList).hasSize(databaseSizeBeforeCreate + 1);
        ListaPrecioRectificacionCRAM testListaPrecioRectificacionCRAM = listaPrecioRectificacionCRAMList.get(listaPrecioRectificacionCRAMList.size() - 1);
        assertThat(testListaPrecioRectificacionCRAM.getFechaVigenciaDesde()).isEqualTo(DEFAULT_FECHA_VIGENCIA_DESDE);
        assertThat(testListaPrecioRectificacionCRAM.getFechaVigenciaHasta()).isEqualTo(DEFAULT_FECHA_VIGENCIA_HASTA);
        assertThat(testListaPrecioRectificacionCRAM.getNumeroGrupo()).isEqualTo(DEFAULT_NUMERO_GRUPO);
    }

    @Test
    @Transactional
    public void createListaPrecioRectificacionCRAMWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = listaPrecioRectificacionCRAMRepository.findAll().size();

        // Create the ListaPrecioRectificacionCRAM with an existing ID
        listaPrecioRectificacionCRAM.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restListaPrecioRectificacionCRAMMockMvc.perform(post("/api/lista-precio-rectificacion-crams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listaPrecioRectificacionCRAM)))
            .andExpect(status().isBadRequest());

        // Validate the ListaPrecioRectificacionCRAM in the database
        List<ListaPrecioRectificacionCRAM> listaPrecioRectificacionCRAMList = listaPrecioRectificacionCRAMRepository.findAll();
        assertThat(listaPrecioRectificacionCRAMList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFechaVigenciaDesdeIsRequired() throws Exception {
        int databaseSizeBeforeTest = listaPrecioRectificacionCRAMRepository.findAll().size();
        // set the field null
        listaPrecioRectificacionCRAM.setFechaVigenciaDesde(null);

        // Create the ListaPrecioRectificacionCRAM, which fails.

        restListaPrecioRectificacionCRAMMockMvc.perform(post("/api/lista-precio-rectificacion-crams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listaPrecioRectificacionCRAM)))
            .andExpect(status().isBadRequest());

        List<ListaPrecioRectificacionCRAM> listaPrecioRectificacionCRAMList = listaPrecioRectificacionCRAMRepository.findAll();
        assertThat(listaPrecioRectificacionCRAMList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumeroGrupoIsRequired() throws Exception {
        int databaseSizeBeforeTest = listaPrecioRectificacionCRAMRepository.findAll().size();
        // set the field null
        listaPrecioRectificacionCRAM.setNumeroGrupo(null);

        // Create the ListaPrecioRectificacionCRAM, which fails.

        restListaPrecioRectificacionCRAMMockMvc.perform(post("/api/lista-precio-rectificacion-crams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listaPrecioRectificacionCRAM)))
            .andExpect(status().isBadRequest());

        List<ListaPrecioRectificacionCRAM> listaPrecioRectificacionCRAMList = listaPrecioRectificacionCRAMRepository.findAll();
        assertThat(listaPrecioRectificacionCRAMList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllListaPrecioRectificacionCRAMS() throws Exception {
        // Initialize the database
        listaPrecioRectificacionCRAMRepository.saveAndFlush(listaPrecioRectificacionCRAM);

        // Get all the listaPrecioRectificacionCRAMList
        restListaPrecioRectificacionCRAMMockMvc.perform(get("/api/lista-precio-rectificacion-crams?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(listaPrecioRectificacionCRAM.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaVigenciaDesde").value(hasItem(DEFAULT_FECHA_VIGENCIA_DESDE.toString())))
            .andExpect(jsonPath("$.[*].fechaVigenciaHasta").value(hasItem(DEFAULT_FECHA_VIGENCIA_HASTA.toString())))
            .andExpect(jsonPath("$.[*].numeroGrupo").value(hasItem(DEFAULT_NUMERO_GRUPO)));
    }
    
    @Test
    @Transactional
    public void getListaPrecioRectificacionCRAM() throws Exception {
        // Initialize the database
        listaPrecioRectificacionCRAMRepository.saveAndFlush(listaPrecioRectificacionCRAM);

        // Get the listaPrecioRectificacionCRAM
        restListaPrecioRectificacionCRAMMockMvc.perform(get("/api/lista-precio-rectificacion-crams/{id}", listaPrecioRectificacionCRAM.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(listaPrecioRectificacionCRAM.getId().intValue()))
            .andExpect(jsonPath("$.fechaVigenciaDesde").value(DEFAULT_FECHA_VIGENCIA_DESDE.toString()))
            .andExpect(jsonPath("$.fechaVigenciaHasta").value(DEFAULT_FECHA_VIGENCIA_HASTA.toString()))
            .andExpect(jsonPath("$.numeroGrupo").value(DEFAULT_NUMERO_GRUPO));
    }

    @Test
    @Transactional
    public void getNonExistingListaPrecioRectificacionCRAM() throws Exception {
        // Get the listaPrecioRectificacionCRAM
        restListaPrecioRectificacionCRAMMockMvc.perform(get("/api/lista-precio-rectificacion-crams/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateListaPrecioRectificacionCRAM() throws Exception {
        // Initialize the database
        listaPrecioRectificacionCRAMService.save(listaPrecioRectificacionCRAM);

        int databaseSizeBeforeUpdate = listaPrecioRectificacionCRAMRepository.findAll().size();

        // Update the listaPrecioRectificacionCRAM
        ListaPrecioRectificacionCRAM updatedListaPrecioRectificacionCRAM = listaPrecioRectificacionCRAMRepository.findById(listaPrecioRectificacionCRAM.getId()).get();
        // Disconnect from session so that the updates on updatedListaPrecioRectificacionCRAM are not directly saved in db
        em.detach(updatedListaPrecioRectificacionCRAM);
        updatedListaPrecioRectificacionCRAM
            .fechaVigenciaDesde(UPDATED_FECHA_VIGENCIA_DESDE)
            .fechaVigenciaHasta(UPDATED_FECHA_VIGENCIA_HASTA)
            .numeroGrupo(UPDATED_NUMERO_GRUPO);

        restListaPrecioRectificacionCRAMMockMvc.perform(put("/api/lista-precio-rectificacion-crams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedListaPrecioRectificacionCRAM)))
            .andExpect(status().isOk());

        // Validate the ListaPrecioRectificacionCRAM in the database
        List<ListaPrecioRectificacionCRAM> listaPrecioRectificacionCRAMList = listaPrecioRectificacionCRAMRepository.findAll();
        assertThat(listaPrecioRectificacionCRAMList).hasSize(databaseSizeBeforeUpdate);
        ListaPrecioRectificacionCRAM testListaPrecioRectificacionCRAM = listaPrecioRectificacionCRAMList.get(listaPrecioRectificacionCRAMList.size() - 1);
        assertThat(testListaPrecioRectificacionCRAM.getFechaVigenciaDesde()).isEqualTo(UPDATED_FECHA_VIGENCIA_DESDE);
        assertThat(testListaPrecioRectificacionCRAM.getFechaVigenciaHasta()).isEqualTo(UPDATED_FECHA_VIGENCIA_HASTA);
        assertThat(testListaPrecioRectificacionCRAM.getNumeroGrupo()).isEqualTo(UPDATED_NUMERO_GRUPO);
    }

    @Test
    @Transactional
    public void updateNonExistingListaPrecioRectificacionCRAM() throws Exception {
        int databaseSizeBeforeUpdate = listaPrecioRectificacionCRAMRepository.findAll().size();

        // Create the ListaPrecioRectificacionCRAM

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restListaPrecioRectificacionCRAMMockMvc.perform(put("/api/lista-precio-rectificacion-crams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listaPrecioRectificacionCRAM)))
            .andExpect(status().isBadRequest());

        // Validate the ListaPrecioRectificacionCRAM in the database
        List<ListaPrecioRectificacionCRAM> listaPrecioRectificacionCRAMList = listaPrecioRectificacionCRAMRepository.findAll();
        assertThat(listaPrecioRectificacionCRAMList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteListaPrecioRectificacionCRAM() throws Exception {
        // Initialize the database
        listaPrecioRectificacionCRAMService.save(listaPrecioRectificacionCRAM);

        int databaseSizeBeforeDelete = listaPrecioRectificacionCRAMRepository.findAll().size();

        // Delete the listaPrecioRectificacionCRAM
        restListaPrecioRectificacionCRAMMockMvc.perform(delete("/api/lista-precio-rectificacion-crams/{id}", listaPrecioRectificacionCRAM.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ListaPrecioRectificacionCRAM> listaPrecioRectificacionCRAMList = listaPrecioRectificacionCRAMRepository.findAll();
        assertThat(listaPrecioRectificacionCRAMList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ListaPrecioRectificacionCRAM.class);
        ListaPrecioRectificacionCRAM listaPrecioRectificacionCRAM1 = new ListaPrecioRectificacionCRAM();
        listaPrecioRectificacionCRAM1.setId(1L);
        ListaPrecioRectificacionCRAM listaPrecioRectificacionCRAM2 = new ListaPrecioRectificacionCRAM();
        listaPrecioRectificacionCRAM2.setId(listaPrecioRectificacionCRAM1.getId());
        assertThat(listaPrecioRectificacionCRAM1).isEqualTo(listaPrecioRectificacionCRAM2);
        listaPrecioRectificacionCRAM2.setId(2L);
        assertThat(listaPrecioRectificacionCRAM1).isNotEqualTo(listaPrecioRectificacionCRAM2);
        listaPrecioRectificacionCRAM1.setId(null);
        assertThat(listaPrecioRectificacionCRAM1).isNotEqualTo(listaPrecioRectificacionCRAM2);
    }
}
