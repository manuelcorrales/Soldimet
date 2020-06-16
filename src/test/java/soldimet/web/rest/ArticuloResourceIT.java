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
 * Integration tests for the {@link ArticuloResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class ArticuloResourceIT {

    private static final String DEFAULT_CODIGO_ARTICULO_PROVEEDOR = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO_ARTICULO_PROVEEDOR = "BBBBBBBBBB";

    private static final Float DEFAULT_VALOR = 1F;
    private static final Float UPDATED_VALOR = 2F;
    private static final Float SMALLER_VALOR = 1F - 1F;

    private static final LocalDate DEFAULT_FECHA_COSTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_COSTO = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA_COSTO = LocalDate.ofEpochDay(-1L);

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

    @Autowired
    private Validator validator;

    private MockMvc restArticuloMockMvc;

    private Articulo articulo;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ArticuloResource articuloResource = new ArticuloResource(articuloService, articuloQueryService);
        this.restArticuloMockMvc = MockMvcBuilders.standaloneSetup(articuloResource)
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
    public static Articulo createEntity(EntityManager em) {
        Articulo articulo = new Articulo()
            .codigoArticuloProveedor(DEFAULT_CODIGO_ARTICULO_PROVEEDOR)
            .valor(DEFAULT_VALOR)
            .fechaCosto(DEFAULT_FECHA_COSTO);
        // Add required entity
        EstadoArticulo estadoArticulo;
        if (TestUtil.findAll(em, EstadoArticulo.class).isEmpty()) {
            estadoArticulo = EstadoArticuloResourceIT.createEntity(em);
            em.persist(estadoArticulo);
            em.flush();
        } else {
            estadoArticulo = TestUtil.findAll(em, EstadoArticulo.class).get(0);
        }
        articulo.setEstado(estadoArticulo);
        // Add required entity
        TipoRepuesto tipoRepuesto;
        if (TestUtil.findAll(em, TipoRepuesto.class).isEmpty()) {
            tipoRepuesto = TipoRepuestoResourceIT.createEntity(em);
            em.persist(tipoRepuesto);
            em.flush();
        } else {
            tipoRepuesto = TestUtil.findAll(em, TipoRepuesto.class).get(0);
        }
        articulo.setTipoRepuesto(tipoRepuesto);
        return articulo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Articulo createUpdatedEntity(EntityManager em) {
        Articulo articulo = new Articulo()
            .codigoArticuloProveedor(UPDATED_CODIGO_ARTICULO_PROVEEDOR)
            .valor(UPDATED_VALOR)
            .fechaCosto(UPDATED_FECHA_COSTO);
        // Add required entity
        EstadoArticulo estadoArticulo;
        if (TestUtil.findAll(em, EstadoArticulo.class).isEmpty()) {
            estadoArticulo = EstadoArticuloResourceIT.createUpdatedEntity(em);
            em.persist(estadoArticulo);
            em.flush();
        } else {
            estadoArticulo = TestUtil.findAll(em, EstadoArticulo.class).get(0);
        }
        articulo.setEstado(estadoArticulo);
        // Add required entity
        TipoRepuesto tipoRepuesto;
        if (TestUtil.findAll(em, TipoRepuesto.class).isEmpty()) {
            tipoRepuesto = TipoRepuestoResourceIT.createUpdatedEntity(em);
            em.persist(tipoRepuesto);
            em.flush();
        } else {
            tipoRepuesto = TestUtil.findAll(em, TipoRepuesto.class).get(0);
        }
        articulo.setTipoRepuesto(tipoRepuesto);
        return articulo;
    }

    @BeforeEach
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
        assertThat(testArticulo.getCodigoArticuloProveedor()).isEqualTo(DEFAULT_CODIGO_ARTICULO_PROVEEDOR);
        assertThat(testArticulo.getValor()).isEqualTo(DEFAULT_VALOR);
        assertThat(testArticulo.getFechaCosto()).isEqualTo(DEFAULT_FECHA_COSTO);
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
    public void checkValorIsRequired() throws Exception {
        int databaseSizeBeforeTest = articuloRepository.findAll().size();
        // set the field null
        articulo.setValor(null);

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
            .andExpect(jsonPath("$.[*].codigoArticuloProveedor").value(hasItem(DEFAULT_CODIGO_ARTICULO_PROVEEDOR.toString())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.doubleValue())))
            .andExpect(jsonPath("$.[*].fechaCosto").value(hasItem(DEFAULT_FECHA_COSTO.toString())));
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
            .andExpect(jsonPath("$.codigoArticuloProveedor").value(DEFAULT_CODIGO_ARTICULO_PROVEEDOR.toString()))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.doubleValue()))
            .andExpect(jsonPath("$.fechaCosto").value(DEFAULT_FECHA_COSTO.toString()));
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

    @Test
    @Transactional
    public void getAllArticulosByValorIsEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where valor equals to DEFAULT_VALOR
        defaultArticuloShouldBeFound("valor.equals=" + DEFAULT_VALOR);

        // Get all the articuloList where valor equals to UPDATED_VALOR
        defaultArticuloShouldNotBeFound("valor.equals=" + UPDATED_VALOR);
    }

    @Test
    @Transactional
    public void getAllArticulosByValorIsInShouldWork() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where valor in DEFAULT_VALOR or UPDATED_VALOR
        defaultArticuloShouldBeFound("valor.in=" + DEFAULT_VALOR + "," + UPDATED_VALOR);

        // Get all the articuloList where valor equals to UPDATED_VALOR
        defaultArticuloShouldNotBeFound("valor.in=" + UPDATED_VALOR);
    }

    @Test
    @Transactional
    public void getAllArticulosByValorIsNullOrNotNull() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where valor is not null
        defaultArticuloShouldBeFound("valor.specified=true");

        // Get all the articuloList where valor is null
        defaultArticuloShouldNotBeFound("valor.specified=false");
    }

    @Test
    @Transactional
    public void getAllArticulosByValorIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where valor is greater than or equal to DEFAULT_VALOR
        defaultArticuloShouldBeFound("valor.greaterThanOrEqual=" + DEFAULT_VALOR);

        // Get all the articuloList where valor is greater than or equal to UPDATED_VALOR
        defaultArticuloShouldNotBeFound("valor.greaterThanOrEqual=" + UPDATED_VALOR);
    }

    @Test
    @Transactional
    public void getAllArticulosByValorIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where valor is less than or equal to DEFAULT_VALOR
        defaultArticuloShouldBeFound("valor.lessThanOrEqual=" + DEFAULT_VALOR);

        // Get all the articuloList where valor is less than or equal to SMALLER_VALOR
        defaultArticuloShouldNotBeFound("valor.lessThanOrEqual=" + SMALLER_VALOR);
    }

    @Test
    @Transactional
    public void getAllArticulosByValorIsLessThanSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where valor is less than DEFAULT_VALOR
        defaultArticuloShouldNotBeFound("valor.lessThan=" + DEFAULT_VALOR);

        // Get all the articuloList where valor is less than UPDATED_VALOR
        defaultArticuloShouldBeFound("valor.lessThan=" + UPDATED_VALOR);
    }

    @Test
    @Transactional
    public void getAllArticulosByValorIsGreaterThanSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where valor is greater than DEFAULT_VALOR
        defaultArticuloShouldNotBeFound("valor.greaterThan=" + DEFAULT_VALOR);

        // Get all the articuloList where valor is greater than SMALLER_VALOR
        defaultArticuloShouldBeFound("valor.greaterThan=" + SMALLER_VALOR);
    }


    @Test
    @Transactional
    public void getAllArticulosByFechaCostoIsEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCosto equals to DEFAULT_FECHA_COSTO
        defaultArticuloShouldBeFound("fechaCosto.equals=" + DEFAULT_FECHA_COSTO);

        // Get all the articuloList where fechaCosto equals to UPDATED_FECHA_COSTO
        defaultArticuloShouldNotBeFound("fechaCosto.equals=" + UPDATED_FECHA_COSTO);
    }

    @Test
    @Transactional
    public void getAllArticulosByFechaCostoIsInShouldWork() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCosto in DEFAULT_FECHA_COSTO or UPDATED_FECHA_COSTO
        defaultArticuloShouldBeFound("fechaCosto.in=" + DEFAULT_FECHA_COSTO + "," + UPDATED_FECHA_COSTO);

        // Get all the articuloList where fechaCosto equals to UPDATED_FECHA_COSTO
        defaultArticuloShouldNotBeFound("fechaCosto.in=" + UPDATED_FECHA_COSTO);
    }

    @Test
    @Transactional
    public void getAllArticulosByFechaCostoIsNullOrNotNull() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCosto is not null
        defaultArticuloShouldBeFound("fechaCosto.specified=true");

        // Get all the articuloList where fechaCosto is null
        defaultArticuloShouldNotBeFound("fechaCosto.specified=false");
    }

    @Test
    @Transactional
    public void getAllArticulosByFechaCostoIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCosto is greater than or equal to DEFAULT_FECHA_COSTO
        defaultArticuloShouldBeFound("fechaCosto.greaterThanOrEqual=" + DEFAULT_FECHA_COSTO);

        // Get all the articuloList where fechaCosto is greater than or equal to UPDATED_FECHA_COSTO
        defaultArticuloShouldNotBeFound("fechaCosto.greaterThanOrEqual=" + UPDATED_FECHA_COSTO);
    }

    @Test
    @Transactional
    public void getAllArticulosByFechaCostoIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCosto is less than or equal to DEFAULT_FECHA_COSTO
        defaultArticuloShouldBeFound("fechaCosto.lessThanOrEqual=" + DEFAULT_FECHA_COSTO);

        // Get all the articuloList where fechaCosto is less than or equal to SMALLER_FECHA_COSTO
        defaultArticuloShouldNotBeFound("fechaCosto.lessThanOrEqual=" + SMALLER_FECHA_COSTO);
    }

    @Test
    @Transactional
    public void getAllArticulosByFechaCostoIsLessThanSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCosto is less than DEFAULT_FECHA_COSTO
        defaultArticuloShouldNotBeFound("fechaCosto.lessThan=" + DEFAULT_FECHA_COSTO);

        // Get all the articuloList where fechaCosto is less than UPDATED_FECHA_COSTO
        defaultArticuloShouldBeFound("fechaCosto.lessThan=" + UPDATED_FECHA_COSTO);
    }

    @Test
    @Transactional
    public void getAllArticulosByFechaCostoIsGreaterThanSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCosto is greater than DEFAULT_FECHA_COSTO
        defaultArticuloShouldNotBeFound("fechaCosto.greaterThan=" + DEFAULT_FECHA_COSTO);

        // Get all the articuloList where fechaCosto is greater than SMALLER_FECHA_COSTO
        defaultArticuloShouldBeFound("fechaCosto.greaterThan=" + SMALLER_FECHA_COSTO);
    }


    @Test
    @Transactional
    public void getAllArticulosByEstadoIsEqualToSomething() throws Exception {
        // Get already existing entity
        EstadoArticulo estado = articulo.getEstado();
        articuloRepository.saveAndFlush(articulo);
        Long estadoId = estado.getId();

        // Get all the articuloList where estado equals to estadoId
        defaultArticuloShouldBeFound("estadoId.equals=" + estadoId);

        // Get all the articuloList where estado equals to estadoId + 1
        defaultArticuloShouldNotBeFound("estadoId.equals=" + (estadoId + 1));
    }


    @Test
    @Transactional
    public void getAllArticulosByMarcaIsEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);
        Marca marca = MarcaResourceIT.createEntity(em);
        em.persist(marca);
        em.flush();
        articulo.setMarca(marca);
        articuloRepository.saveAndFlush(articulo);
        Long marcaId = marca.getId();

        // Get all the articuloList where marca equals to marcaId
        defaultArticuloShouldBeFound("marcaId.equals=" + marcaId);

        // Get all the articuloList where marca equals to marcaId + 1
        defaultArticuloShouldNotBeFound("marcaId.equals=" + (marcaId + 1));
    }


    @Test
    @Transactional
    public void getAllArticulosByTipoRepuestoIsEqualToSomething() throws Exception {
        // Get already existing entity
        TipoRepuesto tipoRepuesto = articulo.getTipoRepuesto();
        articuloRepository.saveAndFlush(articulo);
        Long tipoRepuestoId = tipoRepuesto.getId();

        // Get all the articuloList where tipoRepuesto equals to tipoRepuestoId
        defaultArticuloShouldBeFound("tipoRepuestoId.equals=" + tipoRepuestoId);

        // Get all the articuloList where tipoRepuesto equals to tipoRepuestoId + 1
        defaultArticuloShouldNotBeFound("tipoRepuestoId.equals=" + (tipoRepuestoId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultArticuloShouldBeFound(String filter) throws Exception {
        restArticuloMockMvc.perform(get("/api/articulos?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(articulo.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigoArticuloProveedor").value(hasItem(DEFAULT_CODIGO_ARTICULO_PROVEEDOR)))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.doubleValue())))
            .andExpect(jsonPath("$.[*].fechaCosto").value(hasItem(DEFAULT_FECHA_COSTO.toString())));

        // Check, that the count call also returns 1
        restArticuloMockMvc.perform(get("/api/articulos/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultArticuloShouldNotBeFound(String filter) throws Exception {
        restArticuloMockMvc.perform(get("/api/articulos?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restArticuloMockMvc.perform(get("/api/articulos/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
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
        Articulo updatedArticulo = articuloRepository.findById(articulo.getId()).get();
        // Disconnect from session so that the updates on updatedArticulo are not directly saved in db
        em.detach(updatedArticulo);
        updatedArticulo
            .codigoArticuloProveedor(UPDATED_CODIGO_ARTICULO_PROVEEDOR)
            .valor(UPDATED_VALOR)
            .fechaCosto(UPDATED_FECHA_COSTO);

        restArticuloMockMvc.perform(put("/api/articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedArticulo)))
            .andExpect(status().isOk());

        // Validate the Articulo in the database
        List<Articulo> articuloList = articuloRepository.findAll();
        assertThat(articuloList).hasSize(databaseSizeBeforeUpdate);
        Articulo testArticulo = articuloList.get(articuloList.size() - 1);
        assertThat(testArticulo.getCodigoArticuloProveedor()).isEqualTo(UPDATED_CODIGO_ARTICULO_PROVEEDOR);
        assertThat(testArticulo.getValor()).isEqualTo(UPDATED_VALOR);
        assertThat(testArticulo.getFechaCosto()).isEqualTo(UPDATED_FECHA_COSTO);
    }

    @Test
    @Transactional
    public void updateNonExistingArticulo() throws Exception {
        int databaseSizeBeforeUpdate = articuloRepository.findAll().size();

        // Create the Articulo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArticuloMockMvc.perform(put("/api/articulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articulo)))
            .andExpect(status().isBadRequest());

        // Validate the Articulo in the database
        List<Articulo> articuloList = articuloRepository.findAll();
        assertThat(articuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteArticulo() throws Exception {
        // Initialize the database
        articuloService.save(articulo);

        int databaseSizeBeforeDelete = articuloRepository.findAll().size();

        // Delete the articulo
        restArticuloMockMvc.perform(delete("/api/articulos/{id}", articulo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
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
