package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.Articulo;
import soldimet.domain.EstadoArticulo;
import soldimet.domain.Marca;
import soldimet.domain.TipoRepuesto;
import soldimet.repository.ArticuloRepository;
import soldimet.service.ArticuloService;
import soldimet.web.rest.errors.ExceptionTranslator;
import soldimet.service.dto.ArticuloCriteria;
import soldimet.service.ArticuloQueryService;

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
 * Test class for the ArticuloResource REST controller.
 *
 * @see ArticuloResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class ArticuloResourceIntTest {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_CODIGO_ARTICULO_PROVEEDOR = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO_ARTICULO_PROVEEDOR = "BBBBBBBBBB";

    @Autowired
    private ArticuloRepository articuloRepository;

    @Autowired
    private ArticuloService articuloService;

    @Autowired
    private ArticuloQueryService articuloQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restArticuloMockMvc;

    private Articulo articulo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ArticuloResource articuloResource = new ArticuloResource(articuloService, articuloQueryService);
        this.restArticuloMockMvc = MockMvcBuilders.standaloneSetup(articuloResource)
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
    public static Articulo createEntity(EntityManager em) {
        Articulo articulo = new Articulo()
            .descripcion(DEFAULT_DESCRIPCION)
            .codigoArticuloProveedor(DEFAULT_CODIGO_ARTICULO_PROVEEDOR);
        // Add required entity
        EstadoArticulo estado = EstadoArticuloResourceIntTest.createEntity(em);
        em.persist(estado);
        em.flush();
        articulo.setEstado(estado);
        // Add required entity
        Marca marca = MarcaResourceIntTest.createEntity(em);
        em.persist(marca);
        em.flush();
        articulo.setMarca(marca);
        // Add required entity
        TipoRepuesto tipoRepuesto = TipoRepuestoResourceIntTest.createEntity(em);
        em.persist(tipoRepuesto);
        em.flush();
        articulo.setTipoRepuesto(tipoRepuesto);
        return articulo;
    }

    @Before
    public void initTest() {
        articulo = createEntity(em);
    }

    @Test
    @Transactional
    public void createArticulo() throws Exception {
        int databaseSizeBeforeCreate = articuloRepository.findAll().size();

        // Create the Articulo
        restArticuloMockMvc.perform(post("/api/articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articulo)))
            .andExpect(status().isCreated());

        // Validate the Articulo in the database
        List<Articulo> articuloList = articuloRepository.findAll();
        assertThat(articuloList).hasSize(databaseSizeBeforeCreate + 1);
        Articulo testArticulo = articuloList.get(articuloList.size() - 1);
        assertThat(testArticulo.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testArticulo.getCodigoArticuloProveedor()).isEqualTo(DEFAULT_CODIGO_ARTICULO_PROVEEDOR);
    }

    @Test
    @Transactional
    public void createArticuloWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = articuloRepository.findAll().size();

        // Create the Articulo with an existing ID
        articulo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArticuloMockMvc.perform(post("/api/articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articulo)))
            .andExpect(status().isBadRequest());

        // Validate the Articulo in the database
        List<Articulo> articuloList = articuloRepository.findAll();
        assertThat(articuloList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = articuloRepository.findAll().size();
        // set the field null
        articulo.setDescripcion(null);

        // Create the Articulo, which fails.

        restArticuloMockMvc.perform(post("/api/articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articulo)))
            .andExpect(status().isBadRequest());

        List<Articulo> articuloList = articuloRepository.findAll();
        assertThat(articuloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllArticulos() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList
        restArticuloMockMvc.perform(get("/api/articulos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(articulo.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].codigoArticuloProveedor").value(hasItem(DEFAULT_CODIGO_ARTICULO_PROVEEDOR.toString())));
    }

    @Test
    @Transactional
    public void getArticulo() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get the articulo
        restArticuloMockMvc.perform(get("/api/articulos/{id}", articulo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(articulo.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.codigoArticuloProveedor").value(DEFAULT_CODIGO_ARTICULO_PROVEEDOR.toString()));
    }

    @Test
    @Transactional
    public void getAllArticulosByDescripcionIsEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where descripcion equals to DEFAULT_DESCRIPCION
        defaultArticuloShouldBeFound("descripcion.equals=" + DEFAULT_DESCRIPCION);

        // Get all the articuloList where descripcion equals to UPDATED_DESCRIPCION
        defaultArticuloShouldNotBeFound("descripcion.equals=" + UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void getAllArticulosByDescripcionIsInShouldWork() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where descripcion in DEFAULT_DESCRIPCION or UPDATED_DESCRIPCION
        defaultArticuloShouldBeFound("descripcion.in=" + DEFAULT_DESCRIPCION + "," + UPDATED_DESCRIPCION);

        // Get all the articuloList where descripcion equals to UPDATED_DESCRIPCION
        defaultArticuloShouldNotBeFound("descripcion.in=" + UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void getAllArticulosByDescripcionIsNullOrNotNull() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where descripcion is not null
        defaultArticuloShouldBeFound("descripcion.specified=true");

        // Get all the articuloList where descripcion is null
        defaultArticuloShouldNotBeFound("descripcion.specified=false");
    }

    @Test
    @Transactional
    public void getAllArticulosByCodigoArticuloProveedorIsEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where codigoArticuloProveedor equals to DEFAULT_CODIGO_ARTICULO_PROVEEDOR
        defaultArticuloShouldBeFound("codigoArticuloProveedor.equals=" + DEFAULT_CODIGO_ARTICULO_PROVEEDOR);

        // Get all the articuloList where codigoArticuloProveedor equals to UPDATED_CODIGO_ARTICULO_PROVEEDOR
        defaultArticuloShouldNotBeFound("codigoArticuloProveedor.equals=" + UPDATED_CODIGO_ARTICULO_PROVEEDOR);
    }

    @Test
    @Transactional
    public void getAllArticulosByCodigoArticuloProveedorIsInShouldWork() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where codigoArticuloProveedor in DEFAULT_CODIGO_ARTICULO_PROVEEDOR or UPDATED_CODIGO_ARTICULO_PROVEEDOR
        defaultArticuloShouldBeFound("codigoArticuloProveedor.in=" + DEFAULT_CODIGO_ARTICULO_PROVEEDOR + "," + UPDATED_CODIGO_ARTICULO_PROVEEDOR);

        // Get all the articuloList where codigoArticuloProveedor equals to UPDATED_CODIGO_ARTICULO_PROVEEDOR
        defaultArticuloShouldNotBeFound("codigoArticuloProveedor.in=" + UPDATED_CODIGO_ARTICULO_PROVEEDOR);
    }

    @Test
    @Transactional
    public void getAllArticulosByCodigoArticuloProveedorIsNullOrNotNull() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where codigoArticuloProveedor is not null
        defaultArticuloShouldBeFound("codigoArticuloProveedor.specified=true");

        // Get all the articuloList where codigoArticuloProveedor is null
        defaultArticuloShouldNotBeFound("codigoArticuloProveedor.specified=false");
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultArticuloShouldBeFound(String filter) throws Exception {
        restArticuloMockMvc.perform(get("/api/articulos?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(articulo.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].codigoArticuloProveedor").value(hasItem(DEFAULT_CODIGO_ARTICULO_PROVEEDOR.toString())));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultArticuloShouldNotBeFound(String filter) throws Exception {
        restArticuloMockMvc.perform(get("/api/articulos?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());
    }


    @Test
    @Transactional
    public void getNonExistingArticulo() throws Exception {
        // Get the articulo
        restArticuloMockMvc.perform(get("/api/articulos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArticulo() throws Exception {
        // Initialize the database
        articuloService.save(articulo);

        int databaseSizeBeforeUpdate = articuloRepository.findAll().size();

        // Update the articulo
        Articulo updatedArticulo = articuloRepository.findOne(articulo.getId());
        updatedArticulo
            .descripcion(UPDATED_DESCRIPCION)
            .codigoArticuloProveedor(UPDATED_CODIGO_ARTICULO_PROVEEDOR);

        restArticuloMockMvc.perform(put("/api/articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedArticulo)))
            .andExpect(status().isOk());

        // Validate the Articulo in the database
        List<Articulo> articuloList = articuloRepository.findAll();
        assertThat(articuloList).hasSize(databaseSizeBeforeUpdate);
        Articulo testArticulo = articuloList.get(articuloList.size() - 1);
        assertThat(testArticulo.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testArticulo.getCodigoArticuloProveedor()).isEqualTo(UPDATED_CODIGO_ARTICULO_PROVEEDOR);
    }

    @Test
    @Transactional
    public void updateNonExistingArticulo() throws Exception {
        int databaseSizeBeforeUpdate = articuloRepository.findAll().size();

        // Create the Articulo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restArticuloMockMvc.perform(put("/api/articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articulo)))
            .andExpect(status().isCreated());

        // Validate the Articulo in the database
        List<Articulo> articuloList = articuloRepository.findAll();
        assertThat(articuloList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteArticulo() throws Exception {
        // Initialize the database
        articuloService.save(articulo);

        int databaseSizeBeforeDelete = articuloRepository.findAll().size();

        // Get the articulo
        restArticuloMockMvc.perform(delete("/api/articulos/{id}", articulo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Articulo> articuloList = articuloRepository.findAll();
        assertThat(articuloList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Articulo.class);
        Articulo articulo1 = new Articulo();
        articulo1.setId(1L);
        Articulo articulo2 = new Articulo();
        articulo2.setId(articulo1.getId());
        assertThat(articulo1).isEqualTo(articulo2);
        articulo2.setId(2L);
        assertThat(articulo1).isNotEqualTo(articulo2);
        articulo1.setId(null);
        assertThat(articulo1).isNotEqualTo(articulo2);
    }
}
