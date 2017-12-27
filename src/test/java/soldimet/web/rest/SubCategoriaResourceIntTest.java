package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.SubCategoria;
import soldimet.repository.SubCategoriaRepository;
import soldimet.service.SubCategoriaService;
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
 * Test class for the SubCategoriaResource REST controller.
 *
 * @see SubCategoriaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class SubCategoriaResourceIntTest {

    private static final String DEFAULT_NOMBRE_SUB_CATEGORIA = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_SUB_CATEGORIA = "BBBBBBBBBB";

    @Autowired
    private SubCategoriaRepository subCategoriaRepository;

    @Autowired
    private SubCategoriaService subCategoriaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSubCategoriaMockMvc;

    private SubCategoria subCategoria;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubCategoriaResource subCategoriaResource = new SubCategoriaResource(subCategoriaService);
        this.restSubCategoriaMockMvc = MockMvcBuilders.standaloneSetup(subCategoriaResource)
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
    public static SubCategoria createEntity(EntityManager em) {
        SubCategoria subCategoria = new SubCategoria()
            .nombreSubCategoria(DEFAULT_NOMBRE_SUB_CATEGORIA);
        return subCategoria;
    }

    @Before
    public void initTest() {
        subCategoria = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubCategoria() throws Exception {
        int databaseSizeBeforeCreate = subCategoriaRepository.findAll().size();

        // Create the SubCategoria
        restSubCategoriaMockMvc.perform(post("/api/sub-categorias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subCategoria)))
            .andExpect(status().isCreated());

        // Validate the SubCategoria in the database
        List<SubCategoria> subCategoriaList = subCategoriaRepository.findAll();
        assertThat(subCategoriaList).hasSize(databaseSizeBeforeCreate + 1);
        SubCategoria testSubCategoria = subCategoriaList.get(subCategoriaList.size() - 1);
        assertThat(testSubCategoria.getNombreSubCategoria()).isEqualTo(DEFAULT_NOMBRE_SUB_CATEGORIA);
    }

    @Test
    @Transactional
    public void createSubCategoriaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subCategoriaRepository.findAll().size();

        // Create the SubCategoria with an existing ID
        subCategoria.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubCategoriaMockMvc.perform(post("/api/sub-categorias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subCategoria)))
            .andExpect(status().isBadRequest());

        // Validate the SubCategoria in the database
        List<SubCategoria> subCategoriaList = subCategoriaRepository.findAll();
        assertThat(subCategoriaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreSubCategoriaIsRequired() throws Exception {
        int databaseSizeBeforeTest = subCategoriaRepository.findAll().size();
        // set the field null
        subCategoria.setNombreSubCategoria(null);

        // Create the SubCategoria, which fails.

        restSubCategoriaMockMvc.perform(post("/api/sub-categorias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subCategoria)))
            .andExpect(status().isBadRequest());

        List<SubCategoria> subCategoriaList = subCategoriaRepository.findAll();
        assertThat(subCategoriaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSubCategorias() throws Exception {
        // Initialize the database
        subCategoriaRepository.saveAndFlush(subCategoria);

        // Get all the subCategoriaList
        restSubCategoriaMockMvc.perform(get("/api/sub-categorias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subCategoria.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreSubCategoria").value(hasItem(DEFAULT_NOMBRE_SUB_CATEGORIA.toString())));
    }

    @Test
    @Transactional
    public void getSubCategoria() throws Exception {
        // Initialize the database
        subCategoriaRepository.saveAndFlush(subCategoria);

        // Get the subCategoria
        restSubCategoriaMockMvc.perform(get("/api/sub-categorias/{id}", subCategoria.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subCategoria.getId().intValue()))
            .andExpect(jsonPath("$.nombreSubCategoria").value(DEFAULT_NOMBRE_SUB_CATEGORIA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSubCategoria() throws Exception {
        // Get the subCategoria
        restSubCategoriaMockMvc.perform(get("/api/sub-categorias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubCategoria() throws Exception {
        // Initialize the database
        subCategoriaService.save(subCategoria);

        int databaseSizeBeforeUpdate = subCategoriaRepository.findAll().size();

        // Update the subCategoria
        SubCategoria updatedSubCategoria = subCategoriaRepository.findOne(subCategoria.getId());
        updatedSubCategoria
            .nombreSubCategoria(UPDATED_NOMBRE_SUB_CATEGORIA);

        restSubCategoriaMockMvc.perform(put("/api/sub-categorias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSubCategoria)))
            .andExpect(status().isOk());

        // Validate the SubCategoria in the database
        List<SubCategoria> subCategoriaList = subCategoriaRepository.findAll();
        assertThat(subCategoriaList).hasSize(databaseSizeBeforeUpdate);
        SubCategoria testSubCategoria = subCategoriaList.get(subCategoriaList.size() - 1);
        assertThat(testSubCategoria.getNombreSubCategoria()).isEqualTo(UPDATED_NOMBRE_SUB_CATEGORIA);
    }

    @Test
    @Transactional
    public void updateNonExistingSubCategoria() throws Exception {
        int databaseSizeBeforeUpdate = subCategoriaRepository.findAll().size();

        // Create the SubCategoria

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSubCategoriaMockMvc.perform(put("/api/sub-categorias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subCategoria)))
            .andExpect(status().isCreated());

        // Validate the SubCategoria in the database
        List<SubCategoria> subCategoriaList = subCategoriaRepository.findAll();
        assertThat(subCategoriaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSubCategoria() throws Exception {
        // Initialize the database
        subCategoriaService.save(subCategoria);

        int databaseSizeBeforeDelete = subCategoriaRepository.findAll().size();

        // Get the subCategoria
        restSubCategoriaMockMvc.perform(delete("/api/sub-categorias/{id}", subCategoria.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SubCategoria> subCategoriaList = subCategoriaRepository.findAll();
        assertThat(subCategoriaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubCategoria.class);
        SubCategoria subCategoria1 = new SubCategoria();
        subCategoria1.setId(1L);
        SubCategoria subCategoria2 = new SubCategoria();
        subCategoria2.setId(subCategoria1.getId());
        assertThat(subCategoria1).isEqualTo(subCategoria2);
        subCategoria2.setId(2L);
        assertThat(subCategoria1).isNotEqualTo(subCategoria2);
        subCategoria1.setId(null);
        assertThat(subCategoria1).isNotEqualTo(subCategoria2);
    }
}
