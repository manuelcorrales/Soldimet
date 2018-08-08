package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.ListaPrecioDesdeHasta;
import soldimet.repository.ListaPrecioDesdeHastaRepository;
import soldimet.service.ListaPrecioDesdeHastaService;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static soldimet.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ListaPrecioDesdeHastaResource REST controller.
 *
 * @see ListaPrecioDesdeHastaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class ListaPrecioDesdeHastaResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_DESDE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_DESDE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_HASTA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_HASTA = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ListaPrecioDesdeHastaRepository listaPrecioDesdeHastaRepository;

    

    @Autowired
    private ListaPrecioDesdeHastaService listaPrecioDesdeHastaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restListaPrecioDesdeHastaMockMvc;

    private ListaPrecioDesdeHasta listaPrecioDesdeHasta;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ListaPrecioDesdeHastaResource listaPrecioDesdeHastaResource = new ListaPrecioDesdeHastaResource(listaPrecioDesdeHastaService);
        this.restListaPrecioDesdeHastaMockMvc = MockMvcBuilders.standaloneSetup(listaPrecioDesdeHastaResource)
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
    public static ListaPrecioDesdeHasta createEntity(EntityManager em) {
        ListaPrecioDesdeHasta listaPrecioDesdeHasta = new ListaPrecioDesdeHasta()
            .fechaDesde(DEFAULT_FECHA_DESDE)
            .fechaHasta(DEFAULT_FECHA_HASTA);
        return listaPrecioDesdeHasta;
    }

    @Before
    public void initTest() {
        listaPrecioDesdeHasta = createEntity(em);
    }

    @Test
    @Transactional
    public void createListaPrecioDesdeHasta() throws Exception {
        int databaseSizeBeforeCreate = listaPrecioDesdeHastaRepository.findAll().size();

        // Create the ListaPrecioDesdeHasta
        restListaPrecioDesdeHastaMockMvc.perform(post("/api/lista-precio-desde-hastas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listaPrecioDesdeHasta)))
            .andExpect(status().isCreated());

        // Validate the ListaPrecioDesdeHasta in the database
        List<ListaPrecioDesdeHasta> listaPrecioDesdeHastaList = listaPrecioDesdeHastaRepository.findAll();
        assertThat(listaPrecioDesdeHastaList).hasSize(databaseSizeBeforeCreate + 1);
        ListaPrecioDesdeHasta testListaPrecioDesdeHasta = listaPrecioDesdeHastaList.get(listaPrecioDesdeHastaList.size() - 1);
        assertThat(testListaPrecioDesdeHasta.getFechaDesde()).isEqualTo(DEFAULT_FECHA_DESDE);
        assertThat(testListaPrecioDesdeHasta.getFechaHasta()).isEqualTo(DEFAULT_FECHA_HASTA);
    }

    @Test
    @Transactional
    public void createListaPrecioDesdeHastaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = listaPrecioDesdeHastaRepository.findAll().size();

        // Create the ListaPrecioDesdeHasta with an existing ID
        listaPrecioDesdeHasta.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restListaPrecioDesdeHastaMockMvc.perform(post("/api/lista-precio-desde-hastas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listaPrecioDesdeHasta)))
            .andExpect(status().isBadRequest());

        // Validate the ListaPrecioDesdeHasta in the database
        List<ListaPrecioDesdeHasta> listaPrecioDesdeHastaList = listaPrecioDesdeHastaRepository.findAll();
        assertThat(listaPrecioDesdeHastaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFechaDesdeIsRequired() throws Exception {
        int databaseSizeBeforeTest = listaPrecioDesdeHastaRepository.findAll().size();
        // set the field null
        listaPrecioDesdeHasta.setFechaDesde(null);

        // Create the ListaPrecioDesdeHasta, which fails.

        restListaPrecioDesdeHastaMockMvc.perform(post("/api/lista-precio-desde-hastas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listaPrecioDesdeHasta)))
            .andExpect(status().isBadRequest());

        List<ListaPrecioDesdeHasta> listaPrecioDesdeHastaList = listaPrecioDesdeHastaRepository.findAll();
        assertThat(listaPrecioDesdeHastaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllListaPrecioDesdeHastas() throws Exception {
        // Initialize the database
        listaPrecioDesdeHastaRepository.saveAndFlush(listaPrecioDesdeHasta);

        // Get all the listaPrecioDesdeHastaList
        restListaPrecioDesdeHastaMockMvc.perform(get("/api/lista-precio-desde-hastas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(listaPrecioDesdeHasta.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaDesde").value(hasItem(DEFAULT_FECHA_DESDE.toString())))
            .andExpect(jsonPath("$.[*].fechaHasta").value(hasItem(DEFAULT_FECHA_HASTA.toString())));
    }
    

    @Test
    @Transactional
    public void getListaPrecioDesdeHasta() throws Exception {
        // Initialize the database
        listaPrecioDesdeHastaRepository.saveAndFlush(listaPrecioDesdeHasta);

        // Get the listaPrecioDesdeHasta
        restListaPrecioDesdeHastaMockMvc.perform(get("/api/lista-precio-desde-hastas/{id}", listaPrecioDesdeHasta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(listaPrecioDesdeHasta.getId().intValue()))
            .andExpect(jsonPath("$.fechaDesde").value(DEFAULT_FECHA_DESDE.toString()))
            .andExpect(jsonPath("$.fechaHasta").value(DEFAULT_FECHA_HASTA.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingListaPrecioDesdeHasta() throws Exception {
        // Get the listaPrecioDesdeHasta
        restListaPrecioDesdeHastaMockMvc.perform(get("/api/lista-precio-desde-hastas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateListaPrecioDesdeHasta() throws Exception {
        // Initialize the database
        listaPrecioDesdeHastaService.save(listaPrecioDesdeHasta);

        int databaseSizeBeforeUpdate = listaPrecioDesdeHastaRepository.findAll().size();

        // Update the listaPrecioDesdeHasta
        ListaPrecioDesdeHasta updatedListaPrecioDesdeHasta = listaPrecioDesdeHastaRepository.findById(listaPrecioDesdeHasta.getId()).get();
        // Disconnect from session so that the updates on updatedListaPrecioDesdeHasta are not directly saved in db
        em.detach(updatedListaPrecioDesdeHasta);
        updatedListaPrecioDesdeHasta
            .fechaDesde(UPDATED_FECHA_DESDE)
            .fechaHasta(UPDATED_FECHA_HASTA);

        restListaPrecioDesdeHastaMockMvc.perform(put("/api/lista-precio-desde-hastas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedListaPrecioDesdeHasta)))
            .andExpect(status().isOk());

        // Validate the ListaPrecioDesdeHasta in the database
        List<ListaPrecioDesdeHasta> listaPrecioDesdeHastaList = listaPrecioDesdeHastaRepository.findAll();
        assertThat(listaPrecioDesdeHastaList).hasSize(databaseSizeBeforeUpdate);
        ListaPrecioDesdeHasta testListaPrecioDesdeHasta = listaPrecioDesdeHastaList.get(listaPrecioDesdeHastaList.size() - 1);
        assertThat(testListaPrecioDesdeHasta.getFechaDesde()).isEqualTo(UPDATED_FECHA_DESDE);
        assertThat(testListaPrecioDesdeHasta.getFechaHasta()).isEqualTo(UPDATED_FECHA_HASTA);
    }

    @Test
    @Transactional
    public void updateNonExistingListaPrecioDesdeHasta() throws Exception {
        int databaseSizeBeforeUpdate = listaPrecioDesdeHastaRepository.findAll().size();

        // Create the ListaPrecioDesdeHasta

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restListaPrecioDesdeHastaMockMvc.perform(put("/api/lista-precio-desde-hastas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listaPrecioDesdeHasta)))
            .andExpect(status().isBadRequest());

        // Validate the ListaPrecioDesdeHasta in the database
        List<ListaPrecioDesdeHasta> listaPrecioDesdeHastaList = listaPrecioDesdeHastaRepository.findAll();
        assertThat(listaPrecioDesdeHastaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteListaPrecioDesdeHasta() throws Exception {
        // Initialize the database
        listaPrecioDesdeHastaService.save(listaPrecioDesdeHasta);

        int databaseSizeBeforeDelete = listaPrecioDesdeHastaRepository.findAll().size();

        // Get the listaPrecioDesdeHasta
        restListaPrecioDesdeHastaMockMvc.perform(delete("/api/lista-precio-desde-hastas/{id}", listaPrecioDesdeHasta.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ListaPrecioDesdeHasta> listaPrecioDesdeHastaList = listaPrecioDesdeHastaRepository.findAll();
        assertThat(listaPrecioDesdeHastaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ListaPrecioDesdeHasta.class);
        ListaPrecioDesdeHasta listaPrecioDesdeHasta1 = new ListaPrecioDesdeHasta();
        listaPrecioDesdeHasta1.setId(1L);
        ListaPrecioDesdeHasta listaPrecioDesdeHasta2 = new ListaPrecioDesdeHasta();
        listaPrecioDesdeHasta2.setId(listaPrecioDesdeHasta1.getId());
        assertThat(listaPrecioDesdeHasta1).isEqualTo(listaPrecioDesdeHasta2);
        listaPrecioDesdeHasta2.setId(2L);
        assertThat(listaPrecioDesdeHasta1).isNotEqualTo(listaPrecioDesdeHasta2);
        listaPrecioDesdeHasta1.setId(null);
        assertThat(listaPrecioDesdeHasta1).isNotEqualTo(listaPrecioDesdeHasta2);
    }
}
