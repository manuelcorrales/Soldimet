package soldimet.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import soldimet.IntegrationTest;
import soldimet.domain.Articulo;
import soldimet.domain.EstadoArticulo;
import soldimet.domain.Marca;
import soldimet.domain.TipoRepuesto;
import soldimet.repository.ArticuloRepository;
import soldimet.service.criteria.ArticuloCriteria;

/**
 * Integration tests for the {@link ArticuloResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ArticuloResourceIT {

    private static final String DEFAULT_CODIGO_ARTICULO_PROVEEDOR = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO_ARTICULO_PROVEEDOR = "BBBBBBBBBB";

    private static final Float DEFAULT_VALOR = 1F;
    private static final Float UPDATED_VALOR = 2F;
    private static final Float SMALLER_VALOR = 1F - 1F;

    private static final LocalDate DEFAULT_FECHA_COSTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_COSTO = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA_COSTO = LocalDate.ofEpochDay(-1L);

    private static final Float DEFAULT_COSTO_PROVEEDOR = 1F;
    private static final Float UPDATED_COSTO_PROVEEDOR = 2F;
    private static final Float SMALLER_COSTO_PROVEEDOR = 1F - 1F;

    private static final LocalDate DEFAULT_FECHA_COSTO_PROVEEDOR = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_COSTO_PROVEEDOR = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA_COSTO_PROVEEDOR = LocalDate.ofEpochDay(-1L);

    private static final String ENTITY_API_URL = "/api/articulos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ArticuloRepository articuloRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restArticuloMockMvc;

    private Articulo articulo;

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
            .fechaCosto(DEFAULT_FECHA_COSTO)
            .costoProveedor(DEFAULT_COSTO_PROVEEDOR)
            .fechaCostoProveedor(DEFAULT_FECHA_COSTO_PROVEEDOR);
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
            .fechaCosto(UPDATED_FECHA_COSTO)
            .costoProveedor(UPDATED_COSTO_PROVEEDOR)
            .fechaCostoProveedor(UPDATED_FECHA_COSTO_PROVEEDOR);
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
    void createArticulo() throws Exception {
        int databaseSizeBeforeCreate = articuloRepository.findAll().size();
        // Create the Articulo
        restArticuloMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(articulo)))
            .andExpect(status().isCreated());

        // Validate the Articulo in the database
        List<Articulo> articuloList = articuloRepository.findAll();
        assertThat(articuloList).hasSize(databaseSizeBeforeCreate + 1);
        Articulo testArticulo = articuloList.get(articuloList.size() - 1);
        assertThat(testArticulo.getCodigoArticuloProveedor()).isEqualTo(DEFAULT_CODIGO_ARTICULO_PROVEEDOR);
        assertThat(testArticulo.getValor()).isEqualTo(DEFAULT_VALOR);
        assertThat(testArticulo.getFechaCosto()).isEqualTo(DEFAULT_FECHA_COSTO);
        assertThat(testArticulo.getCostoProveedor()).isEqualTo(DEFAULT_COSTO_PROVEEDOR);
        assertThat(testArticulo.getFechaCostoProveedor()).isEqualTo(DEFAULT_FECHA_COSTO_PROVEEDOR);
    }

    @Test
    @Transactional
    void createArticuloWithExistingId() throws Exception {
        // Create the Articulo with an existing ID
        articulo.setId(1L);

        int databaseSizeBeforeCreate = articuloRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restArticuloMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(articulo)))
            .andExpect(status().isBadRequest());

        // Validate the Articulo in the database
        List<Articulo> articuloList = articuloRepository.findAll();
        assertThat(articuloList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkValorIsRequired() throws Exception {
        int databaseSizeBeforeTest = articuloRepository.findAll().size();
        // set the field null
        articulo.setValor(null);

        // Create the Articulo, which fails.

        restArticuloMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(articulo)))
            .andExpect(status().isBadRequest());

        List<Articulo> articuloList = articuloRepository.findAll();
        assertThat(articuloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllArticulos() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList
        restArticuloMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(articulo.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigoArticuloProveedor").value(hasItem(DEFAULT_CODIGO_ARTICULO_PROVEEDOR)))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.doubleValue())))
            .andExpect(jsonPath("$.[*].fechaCosto").value(hasItem(DEFAULT_FECHA_COSTO.toString())))
            .andExpect(jsonPath("$.[*].costoProveedor").value(hasItem(DEFAULT_COSTO_PROVEEDOR.doubleValue())))
            .andExpect(jsonPath("$.[*].fechaCostoProveedor").value(hasItem(DEFAULT_FECHA_COSTO_PROVEEDOR.toString())));
    }

    @Test
    @Transactional
    void getArticulo() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get the articulo
        restArticuloMockMvc
            .perform(get(ENTITY_API_URL_ID, articulo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(articulo.getId().intValue()))
            .andExpect(jsonPath("$.codigoArticuloProveedor").value(DEFAULT_CODIGO_ARTICULO_PROVEEDOR))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.doubleValue()))
            .andExpect(jsonPath("$.fechaCosto").value(DEFAULT_FECHA_COSTO.toString()))
            .andExpect(jsonPath("$.costoProveedor").value(DEFAULT_COSTO_PROVEEDOR.doubleValue()))
            .andExpect(jsonPath("$.fechaCostoProveedor").value(DEFAULT_FECHA_COSTO_PROVEEDOR.toString()));
    }

    @Test
    @Transactional
    void getArticulosByIdFiltering() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        Long id = articulo.getId();

        defaultArticuloShouldBeFound("id.equals=" + id);
        defaultArticuloShouldNotBeFound("id.notEquals=" + id);

        defaultArticuloShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultArticuloShouldNotBeFound("id.greaterThan=" + id);

        defaultArticuloShouldBeFound("id.lessThanOrEqual=" + id);
        defaultArticuloShouldNotBeFound("id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllArticulosByCodigoArticuloProveedorIsEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where codigoArticuloProveedor equals to DEFAULT_CODIGO_ARTICULO_PROVEEDOR
        defaultArticuloShouldBeFound("codigoArticuloProveedor.equals=" + DEFAULT_CODIGO_ARTICULO_PROVEEDOR);

        // Get all the articuloList where codigoArticuloProveedor equals to UPDATED_CODIGO_ARTICULO_PROVEEDOR
        defaultArticuloShouldNotBeFound("codigoArticuloProveedor.equals=" + UPDATED_CODIGO_ARTICULO_PROVEEDOR);
    }

    @Test
    @Transactional
    void getAllArticulosByCodigoArticuloProveedorIsNotEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where codigoArticuloProveedor not equals to DEFAULT_CODIGO_ARTICULO_PROVEEDOR
        defaultArticuloShouldNotBeFound("codigoArticuloProveedor.notEquals=" + DEFAULT_CODIGO_ARTICULO_PROVEEDOR);

        // Get all the articuloList where codigoArticuloProveedor not equals to UPDATED_CODIGO_ARTICULO_PROVEEDOR
        defaultArticuloShouldBeFound("codigoArticuloProveedor.notEquals=" + UPDATED_CODIGO_ARTICULO_PROVEEDOR);
    }

    @Test
    @Transactional
    void getAllArticulosByCodigoArticuloProveedorIsInShouldWork() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where codigoArticuloProveedor in DEFAULT_CODIGO_ARTICULO_PROVEEDOR or UPDATED_CODIGO_ARTICULO_PROVEEDOR
        defaultArticuloShouldBeFound(
            "codigoArticuloProveedor.in=" + DEFAULT_CODIGO_ARTICULO_PROVEEDOR + "," + UPDATED_CODIGO_ARTICULO_PROVEEDOR
        );

        // Get all the articuloList where codigoArticuloProveedor equals to UPDATED_CODIGO_ARTICULO_PROVEEDOR
        defaultArticuloShouldNotBeFound("codigoArticuloProveedor.in=" + UPDATED_CODIGO_ARTICULO_PROVEEDOR);
    }

    @Test
    @Transactional
    void getAllArticulosByCodigoArticuloProveedorIsNullOrNotNull() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where codigoArticuloProveedor is not null
        defaultArticuloShouldBeFound("codigoArticuloProveedor.specified=true");

        // Get all the articuloList where codigoArticuloProveedor is null
        defaultArticuloShouldNotBeFound("codigoArticuloProveedor.specified=false");
    }

    @Test
    @Transactional
    void getAllArticulosByCodigoArticuloProveedorContainsSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where codigoArticuloProveedor contains DEFAULT_CODIGO_ARTICULO_PROVEEDOR
        defaultArticuloShouldBeFound("codigoArticuloProveedor.contains=" + DEFAULT_CODIGO_ARTICULO_PROVEEDOR);

        // Get all the articuloList where codigoArticuloProveedor contains UPDATED_CODIGO_ARTICULO_PROVEEDOR
        defaultArticuloShouldNotBeFound("codigoArticuloProveedor.contains=" + UPDATED_CODIGO_ARTICULO_PROVEEDOR);
    }

    @Test
    @Transactional
    void getAllArticulosByCodigoArticuloProveedorNotContainsSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where codigoArticuloProveedor does not contain DEFAULT_CODIGO_ARTICULO_PROVEEDOR
        defaultArticuloShouldNotBeFound("codigoArticuloProveedor.doesNotContain=" + DEFAULT_CODIGO_ARTICULO_PROVEEDOR);

        // Get all the articuloList where codigoArticuloProveedor does not contain UPDATED_CODIGO_ARTICULO_PROVEEDOR
        defaultArticuloShouldBeFound("codigoArticuloProveedor.doesNotContain=" + UPDATED_CODIGO_ARTICULO_PROVEEDOR);
    }

    @Test
    @Transactional
    void getAllArticulosByValorIsEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where valor equals to DEFAULT_VALOR
        defaultArticuloShouldBeFound("valor.equals=" + DEFAULT_VALOR);

        // Get all the articuloList where valor equals to UPDATED_VALOR
        defaultArticuloShouldNotBeFound("valor.equals=" + UPDATED_VALOR);
    }

    @Test
    @Transactional
    void getAllArticulosByValorIsNotEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where valor not equals to DEFAULT_VALOR
        defaultArticuloShouldNotBeFound("valor.notEquals=" + DEFAULT_VALOR);

        // Get all the articuloList where valor not equals to UPDATED_VALOR
        defaultArticuloShouldBeFound("valor.notEquals=" + UPDATED_VALOR);
    }

    @Test
    @Transactional
    void getAllArticulosByValorIsInShouldWork() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where valor in DEFAULT_VALOR or UPDATED_VALOR
        defaultArticuloShouldBeFound("valor.in=" + DEFAULT_VALOR + "," + UPDATED_VALOR);

        // Get all the articuloList where valor equals to UPDATED_VALOR
        defaultArticuloShouldNotBeFound("valor.in=" + UPDATED_VALOR);
    }

    @Test
    @Transactional
    void getAllArticulosByValorIsNullOrNotNull() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where valor is not null
        defaultArticuloShouldBeFound("valor.specified=true");

        // Get all the articuloList where valor is null
        defaultArticuloShouldNotBeFound("valor.specified=false");
    }

    @Test
    @Transactional
    void getAllArticulosByValorIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where valor is greater than or equal to DEFAULT_VALOR
        defaultArticuloShouldBeFound("valor.greaterThanOrEqual=" + DEFAULT_VALOR);

        // Get all the articuloList where valor is greater than or equal to UPDATED_VALOR
        defaultArticuloShouldNotBeFound("valor.greaterThanOrEqual=" + UPDATED_VALOR);
    }

    @Test
    @Transactional
    void getAllArticulosByValorIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where valor is less than or equal to DEFAULT_VALOR
        defaultArticuloShouldBeFound("valor.lessThanOrEqual=" + DEFAULT_VALOR);

        // Get all the articuloList where valor is less than or equal to SMALLER_VALOR
        defaultArticuloShouldNotBeFound("valor.lessThanOrEqual=" + SMALLER_VALOR);
    }

    @Test
    @Transactional
    void getAllArticulosByValorIsLessThanSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where valor is less than DEFAULT_VALOR
        defaultArticuloShouldNotBeFound("valor.lessThan=" + DEFAULT_VALOR);

        // Get all the articuloList where valor is less than UPDATED_VALOR
        defaultArticuloShouldBeFound("valor.lessThan=" + UPDATED_VALOR);
    }

    @Test
    @Transactional
    void getAllArticulosByValorIsGreaterThanSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where valor is greater than DEFAULT_VALOR
        defaultArticuloShouldNotBeFound("valor.greaterThan=" + DEFAULT_VALOR);

        // Get all the articuloList where valor is greater than SMALLER_VALOR
        defaultArticuloShouldBeFound("valor.greaterThan=" + SMALLER_VALOR);
    }

    @Test
    @Transactional
    void getAllArticulosByFechaCostoIsEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCosto equals to DEFAULT_FECHA_COSTO
        defaultArticuloShouldBeFound("fechaCosto.equals=" + DEFAULT_FECHA_COSTO);

        // Get all the articuloList where fechaCosto equals to UPDATED_FECHA_COSTO
        defaultArticuloShouldNotBeFound("fechaCosto.equals=" + UPDATED_FECHA_COSTO);
    }

    @Test
    @Transactional
    void getAllArticulosByFechaCostoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCosto not equals to DEFAULT_FECHA_COSTO
        defaultArticuloShouldNotBeFound("fechaCosto.notEquals=" + DEFAULT_FECHA_COSTO);

        // Get all the articuloList where fechaCosto not equals to UPDATED_FECHA_COSTO
        defaultArticuloShouldBeFound("fechaCosto.notEquals=" + UPDATED_FECHA_COSTO);
    }

    @Test
    @Transactional
    void getAllArticulosByFechaCostoIsInShouldWork() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCosto in DEFAULT_FECHA_COSTO or UPDATED_FECHA_COSTO
        defaultArticuloShouldBeFound("fechaCosto.in=" + DEFAULT_FECHA_COSTO + "," + UPDATED_FECHA_COSTO);

        // Get all the articuloList where fechaCosto equals to UPDATED_FECHA_COSTO
        defaultArticuloShouldNotBeFound("fechaCosto.in=" + UPDATED_FECHA_COSTO);
    }

    @Test
    @Transactional
    void getAllArticulosByFechaCostoIsNullOrNotNull() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCosto is not null
        defaultArticuloShouldBeFound("fechaCosto.specified=true");

        // Get all the articuloList where fechaCosto is null
        defaultArticuloShouldNotBeFound("fechaCosto.specified=false");
    }

    @Test
    @Transactional
    void getAllArticulosByFechaCostoIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCosto is greater than or equal to DEFAULT_FECHA_COSTO
        defaultArticuloShouldBeFound("fechaCosto.greaterThanOrEqual=" + DEFAULT_FECHA_COSTO);

        // Get all the articuloList where fechaCosto is greater than or equal to UPDATED_FECHA_COSTO
        defaultArticuloShouldNotBeFound("fechaCosto.greaterThanOrEqual=" + UPDATED_FECHA_COSTO);
    }

    @Test
    @Transactional
    void getAllArticulosByFechaCostoIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCosto is less than or equal to DEFAULT_FECHA_COSTO
        defaultArticuloShouldBeFound("fechaCosto.lessThanOrEqual=" + DEFAULT_FECHA_COSTO);

        // Get all the articuloList where fechaCosto is less than or equal to SMALLER_FECHA_COSTO
        defaultArticuloShouldNotBeFound("fechaCosto.lessThanOrEqual=" + SMALLER_FECHA_COSTO);
    }

    @Test
    @Transactional
    void getAllArticulosByFechaCostoIsLessThanSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCosto is less than DEFAULT_FECHA_COSTO
        defaultArticuloShouldNotBeFound("fechaCosto.lessThan=" + DEFAULT_FECHA_COSTO);

        // Get all the articuloList where fechaCosto is less than UPDATED_FECHA_COSTO
        defaultArticuloShouldBeFound("fechaCosto.lessThan=" + UPDATED_FECHA_COSTO);
    }

    @Test
    @Transactional
    void getAllArticulosByFechaCostoIsGreaterThanSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCosto is greater than DEFAULT_FECHA_COSTO
        defaultArticuloShouldNotBeFound("fechaCosto.greaterThan=" + DEFAULT_FECHA_COSTO);

        // Get all the articuloList where fechaCosto is greater than SMALLER_FECHA_COSTO
        defaultArticuloShouldBeFound("fechaCosto.greaterThan=" + SMALLER_FECHA_COSTO);
    }

    @Test
    @Transactional
    void getAllArticulosByCostoProveedorIsEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where costoProveedor equals to DEFAULT_COSTO_PROVEEDOR
        defaultArticuloShouldBeFound("costoProveedor.equals=" + DEFAULT_COSTO_PROVEEDOR);

        // Get all the articuloList where costoProveedor equals to UPDATED_COSTO_PROVEEDOR
        defaultArticuloShouldNotBeFound("costoProveedor.equals=" + UPDATED_COSTO_PROVEEDOR);
    }

    @Test
    @Transactional
    void getAllArticulosByCostoProveedorIsNotEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where costoProveedor not equals to DEFAULT_COSTO_PROVEEDOR
        defaultArticuloShouldNotBeFound("costoProveedor.notEquals=" + DEFAULT_COSTO_PROVEEDOR);

        // Get all the articuloList where costoProveedor not equals to UPDATED_COSTO_PROVEEDOR
        defaultArticuloShouldBeFound("costoProveedor.notEquals=" + UPDATED_COSTO_PROVEEDOR);
    }

    @Test
    @Transactional
    void getAllArticulosByCostoProveedorIsInShouldWork() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where costoProveedor in DEFAULT_COSTO_PROVEEDOR or UPDATED_COSTO_PROVEEDOR
        defaultArticuloShouldBeFound("costoProveedor.in=" + DEFAULT_COSTO_PROVEEDOR + "," + UPDATED_COSTO_PROVEEDOR);

        // Get all the articuloList where costoProveedor equals to UPDATED_COSTO_PROVEEDOR
        defaultArticuloShouldNotBeFound("costoProveedor.in=" + UPDATED_COSTO_PROVEEDOR);
    }

    @Test
    @Transactional
    void getAllArticulosByCostoProveedorIsNullOrNotNull() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where costoProveedor is not null
        defaultArticuloShouldBeFound("costoProveedor.specified=true");

        // Get all the articuloList where costoProveedor is null
        defaultArticuloShouldNotBeFound("costoProveedor.specified=false");
    }

    @Test
    @Transactional
    void getAllArticulosByCostoProveedorIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where costoProveedor is greater than or equal to DEFAULT_COSTO_PROVEEDOR
        defaultArticuloShouldBeFound("costoProveedor.greaterThanOrEqual=" + DEFAULT_COSTO_PROVEEDOR);

        // Get all the articuloList where costoProveedor is greater than or equal to UPDATED_COSTO_PROVEEDOR
        defaultArticuloShouldNotBeFound("costoProveedor.greaterThanOrEqual=" + UPDATED_COSTO_PROVEEDOR);
    }

    @Test
    @Transactional
    void getAllArticulosByCostoProveedorIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where costoProveedor is less than or equal to DEFAULT_COSTO_PROVEEDOR
        defaultArticuloShouldBeFound("costoProveedor.lessThanOrEqual=" + DEFAULT_COSTO_PROVEEDOR);

        // Get all the articuloList where costoProveedor is less than or equal to SMALLER_COSTO_PROVEEDOR
        defaultArticuloShouldNotBeFound("costoProveedor.lessThanOrEqual=" + SMALLER_COSTO_PROVEEDOR);
    }

    @Test
    @Transactional
    void getAllArticulosByCostoProveedorIsLessThanSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where costoProveedor is less than DEFAULT_COSTO_PROVEEDOR
        defaultArticuloShouldNotBeFound("costoProveedor.lessThan=" + DEFAULT_COSTO_PROVEEDOR);

        // Get all the articuloList where costoProveedor is less than UPDATED_COSTO_PROVEEDOR
        defaultArticuloShouldBeFound("costoProveedor.lessThan=" + UPDATED_COSTO_PROVEEDOR);
    }

    @Test
    @Transactional
    void getAllArticulosByCostoProveedorIsGreaterThanSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where costoProveedor is greater than DEFAULT_COSTO_PROVEEDOR
        defaultArticuloShouldNotBeFound("costoProveedor.greaterThan=" + DEFAULT_COSTO_PROVEEDOR);

        // Get all the articuloList where costoProveedor is greater than SMALLER_COSTO_PROVEEDOR
        defaultArticuloShouldBeFound("costoProveedor.greaterThan=" + SMALLER_COSTO_PROVEEDOR);
    }

    @Test
    @Transactional
    void getAllArticulosByFechaCostoProveedorIsEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCostoProveedor equals to DEFAULT_FECHA_COSTO_PROVEEDOR
        defaultArticuloShouldBeFound("fechaCostoProveedor.equals=" + DEFAULT_FECHA_COSTO_PROVEEDOR);

        // Get all the articuloList where fechaCostoProveedor equals to UPDATED_FECHA_COSTO_PROVEEDOR
        defaultArticuloShouldNotBeFound("fechaCostoProveedor.equals=" + UPDATED_FECHA_COSTO_PROVEEDOR);
    }

    @Test
    @Transactional
    void getAllArticulosByFechaCostoProveedorIsNotEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCostoProveedor not equals to DEFAULT_FECHA_COSTO_PROVEEDOR
        defaultArticuloShouldNotBeFound("fechaCostoProveedor.notEquals=" + DEFAULT_FECHA_COSTO_PROVEEDOR);

        // Get all the articuloList where fechaCostoProveedor not equals to UPDATED_FECHA_COSTO_PROVEEDOR
        defaultArticuloShouldBeFound("fechaCostoProveedor.notEquals=" + UPDATED_FECHA_COSTO_PROVEEDOR);
    }

    @Test
    @Transactional
    void getAllArticulosByFechaCostoProveedorIsInShouldWork() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCostoProveedor in DEFAULT_FECHA_COSTO_PROVEEDOR or UPDATED_FECHA_COSTO_PROVEEDOR
        defaultArticuloShouldBeFound("fechaCostoProveedor.in=" + DEFAULT_FECHA_COSTO_PROVEEDOR + "," + UPDATED_FECHA_COSTO_PROVEEDOR);

        // Get all the articuloList where fechaCostoProveedor equals to UPDATED_FECHA_COSTO_PROVEEDOR
        defaultArticuloShouldNotBeFound("fechaCostoProveedor.in=" + UPDATED_FECHA_COSTO_PROVEEDOR);
    }

    @Test
    @Transactional
    void getAllArticulosByFechaCostoProveedorIsNullOrNotNull() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCostoProveedor is not null
        defaultArticuloShouldBeFound("fechaCostoProveedor.specified=true");

        // Get all the articuloList where fechaCostoProveedor is null
        defaultArticuloShouldNotBeFound("fechaCostoProveedor.specified=false");
    }

    @Test
    @Transactional
    void getAllArticulosByFechaCostoProveedorIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCostoProveedor is greater than or equal to DEFAULT_FECHA_COSTO_PROVEEDOR
        defaultArticuloShouldBeFound("fechaCostoProveedor.greaterThanOrEqual=" + DEFAULT_FECHA_COSTO_PROVEEDOR);

        // Get all the articuloList where fechaCostoProveedor is greater than or equal to UPDATED_FECHA_COSTO_PROVEEDOR
        defaultArticuloShouldNotBeFound("fechaCostoProveedor.greaterThanOrEqual=" + UPDATED_FECHA_COSTO_PROVEEDOR);
    }

    @Test
    @Transactional
    void getAllArticulosByFechaCostoProveedorIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCostoProveedor is less than or equal to DEFAULT_FECHA_COSTO_PROVEEDOR
        defaultArticuloShouldBeFound("fechaCostoProveedor.lessThanOrEqual=" + DEFAULT_FECHA_COSTO_PROVEEDOR);

        // Get all the articuloList where fechaCostoProveedor is less than or equal to SMALLER_FECHA_COSTO_PROVEEDOR
        defaultArticuloShouldNotBeFound("fechaCostoProveedor.lessThanOrEqual=" + SMALLER_FECHA_COSTO_PROVEEDOR);
    }

    @Test
    @Transactional
    void getAllArticulosByFechaCostoProveedorIsLessThanSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCostoProveedor is less than DEFAULT_FECHA_COSTO_PROVEEDOR
        defaultArticuloShouldNotBeFound("fechaCostoProveedor.lessThan=" + DEFAULT_FECHA_COSTO_PROVEEDOR);

        // Get all the articuloList where fechaCostoProveedor is less than UPDATED_FECHA_COSTO_PROVEEDOR
        defaultArticuloShouldBeFound("fechaCostoProveedor.lessThan=" + UPDATED_FECHA_COSTO_PROVEEDOR);
    }

    @Test
    @Transactional
    void getAllArticulosByFechaCostoProveedorIsGreaterThanSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        // Get all the articuloList where fechaCostoProveedor is greater than DEFAULT_FECHA_COSTO_PROVEEDOR
        defaultArticuloShouldNotBeFound("fechaCostoProveedor.greaterThan=" + DEFAULT_FECHA_COSTO_PROVEEDOR);

        // Get all the articuloList where fechaCostoProveedor is greater than SMALLER_FECHA_COSTO_PROVEEDOR
        defaultArticuloShouldBeFound("fechaCostoProveedor.greaterThan=" + SMALLER_FECHA_COSTO_PROVEEDOR);
    }

    @Test
    @Transactional
    void getAllArticulosByEstadoIsEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);
        EstadoArticulo estado = EstadoArticuloResourceIT.createEntity(em);
        em.persist(estado);
        em.flush();
        articulo.setEstado(estado);
        articuloRepository.saveAndFlush(articulo);
        Long estadoId = estado.getId();

        // Get all the articuloList where estado equals to estadoId
        defaultArticuloShouldBeFound("estadoId.equals=" + estadoId);

        // Get all the articuloList where estado equals to (estadoId + 1)
        defaultArticuloShouldNotBeFound("estadoId.equals=" + (estadoId + 1));
    }

    @Test
    @Transactional
    void getAllArticulosByMarcaIsEqualToSomething() throws Exception {
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

        // Get all the articuloList where marca equals to (marcaId + 1)
        defaultArticuloShouldNotBeFound("marcaId.equals=" + (marcaId + 1));
    }

    @Test
    @Transactional
    void getAllArticulosByTipoRepuestoIsEqualToSomething() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);
        TipoRepuesto tipoRepuesto = TipoRepuestoResourceIT.createEntity(em);
        em.persist(tipoRepuesto);
        em.flush();
        articulo.setTipoRepuesto(tipoRepuesto);
        articuloRepository.saveAndFlush(articulo);
        Long tipoRepuestoId = tipoRepuesto.getId();

        // Get all the articuloList where tipoRepuesto equals to tipoRepuestoId
        defaultArticuloShouldBeFound("tipoRepuestoId.equals=" + tipoRepuestoId);

        // Get all the articuloList where tipoRepuesto equals to (tipoRepuestoId + 1)
        defaultArticuloShouldNotBeFound("tipoRepuestoId.equals=" + (tipoRepuestoId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultArticuloShouldBeFound(String filter) throws Exception {
        restArticuloMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(articulo.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigoArticuloProveedor").value(hasItem(DEFAULT_CODIGO_ARTICULO_PROVEEDOR)))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.doubleValue())))
            .andExpect(jsonPath("$.[*].fechaCosto").value(hasItem(DEFAULT_FECHA_COSTO.toString())))
            .andExpect(jsonPath("$.[*].costoProveedor").value(hasItem(DEFAULT_COSTO_PROVEEDOR.doubleValue())))
            .andExpect(jsonPath("$.[*].fechaCostoProveedor").value(hasItem(DEFAULT_FECHA_COSTO_PROVEEDOR.toString())));

        // Check, that the count call also returns 1
        restArticuloMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultArticuloShouldNotBeFound(String filter) throws Exception {
        restArticuloMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restArticuloMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingArticulo() throws Exception {
        // Get the articulo
        restArticuloMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewArticulo() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        int databaseSizeBeforeUpdate = articuloRepository.findAll().size();

        // Update the articulo
        Articulo updatedArticulo = articuloRepository.findById(articulo.getId()).get();
        // Disconnect from session so that the updates on updatedArticulo are not directly saved in db
        em.detach(updatedArticulo);
        updatedArticulo
            .codigoArticuloProveedor(UPDATED_CODIGO_ARTICULO_PROVEEDOR)
            .valor(UPDATED_VALOR)
            .fechaCosto(UPDATED_FECHA_COSTO)
            .costoProveedor(UPDATED_COSTO_PROVEEDOR)
            .fechaCostoProveedor(UPDATED_FECHA_COSTO_PROVEEDOR);

        restArticuloMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedArticulo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedArticulo))
            )
            .andExpect(status().isOk());

        // Validate the Articulo in the database
        List<Articulo> articuloList = articuloRepository.findAll();
        assertThat(articuloList).hasSize(databaseSizeBeforeUpdate);
        Articulo testArticulo = articuloList.get(articuloList.size() - 1);
        assertThat(testArticulo.getCodigoArticuloProveedor()).isEqualTo(UPDATED_CODIGO_ARTICULO_PROVEEDOR);
        assertThat(testArticulo.getValor()).isEqualTo(UPDATED_VALOR);
        assertThat(testArticulo.getFechaCosto()).isEqualTo(UPDATED_FECHA_COSTO);
        assertThat(testArticulo.getCostoProveedor()).isEqualTo(UPDATED_COSTO_PROVEEDOR);
        assertThat(testArticulo.getFechaCostoProveedor()).isEqualTo(UPDATED_FECHA_COSTO_PROVEEDOR);
    }

    @Test
    @Transactional
    void putNonExistingArticulo() throws Exception {
        int databaseSizeBeforeUpdate = articuloRepository.findAll().size();
        articulo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArticuloMockMvc
            .perform(
                put(ENTITY_API_URL_ID, articulo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(articulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Articulo in the database
        List<Articulo> articuloList = articuloRepository.findAll();
        assertThat(articuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchArticulo() throws Exception {
        int databaseSizeBeforeUpdate = articuloRepository.findAll().size();
        articulo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restArticuloMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(articulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Articulo in the database
        List<Articulo> articuloList = articuloRepository.findAll();
        assertThat(articuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamArticulo() throws Exception {
        int databaseSizeBeforeUpdate = articuloRepository.findAll().size();
        articulo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restArticuloMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(articulo)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Articulo in the database
        List<Articulo> articuloList = articuloRepository.findAll();
        assertThat(articuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateArticuloWithPatch() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        int databaseSizeBeforeUpdate = articuloRepository.findAll().size();

        // Update the articulo using partial update
        Articulo partialUpdatedArticulo = new Articulo();
        partialUpdatedArticulo.setId(articulo.getId());

        partialUpdatedArticulo.valor(UPDATED_VALOR);

        restArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedArticulo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedArticulo))
            )
            .andExpect(status().isOk());

        // Validate the Articulo in the database
        List<Articulo> articuloList = articuloRepository.findAll();
        assertThat(articuloList).hasSize(databaseSizeBeforeUpdate);
        Articulo testArticulo = articuloList.get(articuloList.size() - 1);
        assertThat(testArticulo.getCodigoArticuloProveedor()).isEqualTo(DEFAULT_CODIGO_ARTICULO_PROVEEDOR);
        assertThat(testArticulo.getValor()).isEqualTo(UPDATED_VALOR);
        assertThat(testArticulo.getFechaCosto()).isEqualTo(DEFAULT_FECHA_COSTO);
        assertThat(testArticulo.getCostoProveedor()).isEqualTo(DEFAULT_COSTO_PROVEEDOR);
        assertThat(testArticulo.getFechaCostoProveedor()).isEqualTo(DEFAULT_FECHA_COSTO_PROVEEDOR);
    }

    @Test
    @Transactional
    void fullUpdateArticuloWithPatch() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        int databaseSizeBeforeUpdate = articuloRepository.findAll().size();

        // Update the articulo using partial update
        Articulo partialUpdatedArticulo = new Articulo();
        partialUpdatedArticulo.setId(articulo.getId());

        partialUpdatedArticulo
            .codigoArticuloProveedor(UPDATED_CODIGO_ARTICULO_PROVEEDOR)
            .valor(UPDATED_VALOR)
            .fechaCosto(UPDATED_FECHA_COSTO)
            .costoProveedor(UPDATED_COSTO_PROVEEDOR)
            .fechaCostoProveedor(UPDATED_FECHA_COSTO_PROVEEDOR);

        restArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedArticulo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedArticulo))
            )
            .andExpect(status().isOk());

        // Validate the Articulo in the database
        List<Articulo> articuloList = articuloRepository.findAll();
        assertThat(articuloList).hasSize(databaseSizeBeforeUpdate);
        Articulo testArticulo = articuloList.get(articuloList.size() - 1);
        assertThat(testArticulo.getCodigoArticuloProveedor()).isEqualTo(UPDATED_CODIGO_ARTICULO_PROVEEDOR);
        assertThat(testArticulo.getValor()).isEqualTo(UPDATED_VALOR);
        assertThat(testArticulo.getFechaCosto()).isEqualTo(UPDATED_FECHA_COSTO);
        assertThat(testArticulo.getCostoProveedor()).isEqualTo(UPDATED_COSTO_PROVEEDOR);
        assertThat(testArticulo.getFechaCostoProveedor()).isEqualTo(UPDATED_FECHA_COSTO_PROVEEDOR);
    }

    @Test
    @Transactional
    void patchNonExistingArticulo() throws Exception {
        int databaseSizeBeforeUpdate = articuloRepository.findAll().size();
        articulo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, articulo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(articulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Articulo in the database
        List<Articulo> articuloList = articuloRepository.findAll();
        assertThat(articuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchArticulo() throws Exception {
        int databaseSizeBeforeUpdate = articuloRepository.findAll().size();
        articulo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(articulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Articulo in the database
        List<Articulo> articuloList = articuloRepository.findAll();
        assertThat(articuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamArticulo() throws Exception {
        int databaseSizeBeforeUpdate = articuloRepository.findAll().size();
        articulo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restArticuloMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(articulo)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Articulo in the database
        List<Articulo> articuloList = articuloRepository.findAll();
        assertThat(articuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteArticulo() throws Exception {
        // Initialize the database
        articuloRepository.saveAndFlush(articulo);

        int databaseSizeBeforeDelete = articuloRepository.findAll().size();

        // Delete the articulo
        restArticuloMockMvc
            .perform(delete(ENTITY_API_URL_ID, articulo.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Articulo> articuloList = articuloRepository.findAll();
        assertThat(articuloList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
