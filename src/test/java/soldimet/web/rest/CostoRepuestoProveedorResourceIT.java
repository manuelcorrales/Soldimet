package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.CostoRepuestoProveedor;
import soldimet.domain.TipoRepuesto;
import soldimet.domain.Aplicacion;
import soldimet.domain.Cilindrada;
import soldimet.repository.CostoRepuestoProveedorRepository;
import soldimet.service.CostoRepuestoProveedorService;
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
 * Integration tests for the {@link CostoRepuestoProveedorResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class CostoRepuestoProveedorResourceIT {

    @Autowired
    private CostoRepuestoProveedorRepository costoRepuestoProveedorRepository;

    @Autowired
    private CostoRepuestoProveedorService costoRepuestoProveedorService;

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

    private MockMvc restCostoRepuestoProveedorMockMvc;

    private CostoRepuestoProveedor costoRepuestoProveedor;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CostoRepuestoProveedorResource costoRepuestoProveedorResource = new CostoRepuestoProveedorResource(costoRepuestoProveedorService);
        this.restCostoRepuestoProveedorMockMvc = MockMvcBuilders.standaloneSetup(costoRepuestoProveedorResource)
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
    public static CostoRepuestoProveedor createEntity(EntityManager em) {
        CostoRepuestoProveedor costoRepuestoProveedor = new CostoRepuestoProveedor();
        // Add required entity
        TipoRepuesto tipoRepuesto;
        if (TestUtil.findAll(em, TipoRepuesto.class).isEmpty()) {
            tipoRepuesto = TipoRepuestoResourceIT.createEntity(em);
            em.persist(tipoRepuesto);
            em.flush();
        } else {
            tipoRepuesto = TestUtil.findAll(em, TipoRepuesto.class).get(0);
        }
        costoRepuestoProveedor.setTipoRepuesto(tipoRepuesto);
        // Add required entity
        Aplicacion aplicacion;
        if (TestUtil.findAll(em, Aplicacion.class).isEmpty()) {
            aplicacion = AplicacionResourceIT.createEntity(em);
            em.persist(aplicacion);
            em.flush();
        } else {
            aplicacion = TestUtil.findAll(em, Aplicacion.class).get(0);
        }
        costoRepuestoProveedor.setAplicacion(aplicacion);
        // Add required entity
        Cilindrada cilindrada;
        if (TestUtil.findAll(em, Cilindrada.class).isEmpty()) {
            cilindrada = CilindradaResourceIT.createEntity(em);
            em.persist(cilindrada);
            em.flush();
        } else {
            cilindrada = TestUtil.findAll(em, Cilindrada.class).get(0);
        }
        costoRepuestoProveedor.setCilindrada(cilindrada);
        return costoRepuestoProveedor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CostoRepuestoProveedor createUpdatedEntity(EntityManager em) {
        CostoRepuestoProveedor costoRepuestoProveedor = new CostoRepuestoProveedor();
        // Add required entity
        TipoRepuesto tipoRepuesto;
        if (TestUtil.findAll(em, TipoRepuesto.class).isEmpty()) {
            tipoRepuesto = TipoRepuestoResourceIT.createUpdatedEntity(em);
            em.persist(tipoRepuesto);
            em.flush();
        } else {
            tipoRepuesto = TestUtil.findAll(em, TipoRepuesto.class).get(0);
        }
        costoRepuestoProveedor.setTipoRepuesto(tipoRepuesto);
        // Add required entity
        Aplicacion aplicacion;
        if (TestUtil.findAll(em, Aplicacion.class).isEmpty()) {
            aplicacion = AplicacionResourceIT.createUpdatedEntity(em);
            em.persist(aplicacion);
            em.flush();
        } else {
            aplicacion = TestUtil.findAll(em, Aplicacion.class).get(0);
        }
        costoRepuestoProveedor.setAplicacion(aplicacion);
        // Add required entity
        Cilindrada cilindrada;
        if (TestUtil.findAll(em, Cilindrada.class).isEmpty()) {
            cilindrada = CilindradaResourceIT.createUpdatedEntity(em);
            em.persist(cilindrada);
            em.flush();
        } else {
            cilindrada = TestUtil.findAll(em, Cilindrada.class).get(0);
        }
        costoRepuestoProveedor.setCilindrada(cilindrada);
        return costoRepuestoProveedor;
    }

    @BeforeEach
    public void initTest() {
        costoRepuestoProveedor = createEntity(em);
    }

    @Test
    @Transactional
    public void createCostoRepuestoProveedor() throws Exception {
        int databaseSizeBeforeCreate = costoRepuestoProveedorRepository.findAll().size();

        // Create the CostoRepuestoProveedor
        restCostoRepuestoProveedorMockMvc.perform(post("/api/costo-repuesto-proveedors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(costoRepuestoProveedor)))
            .andExpect(status().isCreated());

        // Validate the CostoRepuestoProveedor in the database
        List<CostoRepuestoProveedor> costoRepuestoProveedorList = costoRepuestoProveedorRepository.findAll();
        assertThat(costoRepuestoProveedorList).hasSize(databaseSizeBeforeCreate + 1);
        CostoRepuestoProveedor testCostoRepuestoProveedor = costoRepuestoProveedorList.get(costoRepuestoProveedorList.size() - 1);
    }

    @Test
    @Transactional
    public void createCostoRepuestoProveedorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = costoRepuestoProveedorRepository.findAll().size();

        // Create the CostoRepuestoProveedor with an existing ID
        costoRepuestoProveedor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCostoRepuestoProveedorMockMvc.perform(post("/api/costo-repuesto-proveedors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(costoRepuestoProveedor)))
            .andExpect(status().isBadRequest());

        // Validate the CostoRepuestoProveedor in the database
        List<CostoRepuestoProveedor> costoRepuestoProveedorList = costoRepuestoProveedorRepository.findAll();
        assertThat(costoRepuestoProveedorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCostoRepuestoProveedors() throws Exception {
        // Initialize the database
        costoRepuestoProveedorRepository.saveAndFlush(costoRepuestoProveedor);

        // Get all the costoRepuestoProveedorList
        restCostoRepuestoProveedorMockMvc.perform(get("/api/costo-repuesto-proveedors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(costoRepuestoProveedor.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getCostoRepuestoProveedor() throws Exception {
        // Initialize the database
        costoRepuestoProveedorRepository.saveAndFlush(costoRepuestoProveedor);

        // Get the costoRepuestoProveedor
        restCostoRepuestoProveedorMockMvc.perform(get("/api/costo-repuesto-proveedors/{id}", costoRepuestoProveedor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(costoRepuestoProveedor.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCostoRepuestoProveedor() throws Exception {
        // Get the costoRepuestoProveedor
        restCostoRepuestoProveedorMockMvc.perform(get("/api/costo-repuesto-proveedors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCostoRepuestoProveedor() throws Exception {
        // Initialize the database
        costoRepuestoProveedorService.save(costoRepuestoProveedor);

        int databaseSizeBeforeUpdate = costoRepuestoProveedorRepository.findAll().size();

        // Update the costoRepuestoProveedor
        CostoRepuestoProveedor updatedCostoRepuestoProveedor = costoRepuestoProveedorRepository.findById(costoRepuestoProveedor.getId()).get();
        // Disconnect from session so that the updates on updatedCostoRepuestoProveedor are not directly saved in db
        em.detach(updatedCostoRepuestoProveedor);

        restCostoRepuestoProveedorMockMvc.perform(put("/api/costo-repuesto-proveedors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCostoRepuestoProveedor)))
            .andExpect(status().isOk());

        // Validate the CostoRepuestoProveedor in the database
        List<CostoRepuestoProveedor> costoRepuestoProveedorList = costoRepuestoProveedorRepository.findAll();
        assertThat(costoRepuestoProveedorList).hasSize(databaseSizeBeforeUpdate);
        CostoRepuestoProveedor testCostoRepuestoProveedor = costoRepuestoProveedorList.get(costoRepuestoProveedorList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingCostoRepuestoProveedor() throws Exception {
        int databaseSizeBeforeUpdate = costoRepuestoProveedorRepository.findAll().size();

        // Create the CostoRepuestoProveedor

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCostoRepuestoProveedorMockMvc.perform(put("/api/costo-repuesto-proveedors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(costoRepuestoProveedor)))
            .andExpect(status().isBadRequest());

        // Validate the CostoRepuestoProveedor in the database
        List<CostoRepuestoProveedor> costoRepuestoProveedorList = costoRepuestoProveedorRepository.findAll();
        assertThat(costoRepuestoProveedorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCostoRepuestoProveedor() throws Exception {
        // Initialize the database
        costoRepuestoProveedorService.save(costoRepuestoProveedor);

        int databaseSizeBeforeDelete = costoRepuestoProveedorRepository.findAll().size();

        // Delete the costoRepuestoProveedor
        restCostoRepuestoProveedorMockMvc.perform(delete("/api/costo-repuesto-proveedors/{id}", costoRepuestoProveedor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CostoRepuestoProveedor> costoRepuestoProveedorList = costoRepuestoProveedorRepository.findAll();
        assertThat(costoRepuestoProveedorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CostoRepuestoProveedor.class);
        CostoRepuestoProveedor costoRepuestoProveedor1 = new CostoRepuestoProveedor();
        costoRepuestoProveedor1.setId(1L);
        CostoRepuestoProveedor costoRepuestoProveedor2 = new CostoRepuestoProveedor();
        costoRepuestoProveedor2.setId(costoRepuestoProveedor1.getId());
        assertThat(costoRepuestoProveedor1).isEqualTo(costoRepuestoProveedor2);
        costoRepuestoProveedor2.setId(2L);
        assertThat(costoRepuestoProveedor1).isNotEqualTo(costoRepuestoProveedor2);
        costoRepuestoProveedor1.setId(null);
        assertThat(costoRepuestoProveedor1).isNotEqualTo(costoRepuestoProveedor2);
    }
}
