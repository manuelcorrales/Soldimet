package soldimet.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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
import soldimet.domain.Cilindrada;
import soldimet.domain.CostoOperacion;
import soldimet.domain.Operacion;
import soldimet.domain.TipoParteMotor;
import soldimet.repository.CostoOperacionRepository;

/**
 * Integration tests for the {@link CostoOperacionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CostoOperacionResourceIT {

    private static final Float DEFAULT_COSTO_OPERACION = 0F;
    private static final Float UPDATED_COSTO_OPERACION = 1F;

    private static final String ENTITY_API_URL = "/api/costo-operacions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CostoOperacionRepository costoOperacionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCostoOperacionMockMvc;

    private CostoOperacion costoOperacion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CostoOperacion createEntity(EntityManager em) {
        CostoOperacion costoOperacion = new CostoOperacion().costoOperacion(DEFAULT_COSTO_OPERACION);
        // Add required entity
        Cilindrada cilindrada;
        if (TestUtil.findAll(em, Cilindrada.class).isEmpty()) {
            cilindrada = CilindradaResourceIT.createEntity(em);
            em.persist(cilindrada);
            em.flush();
        } else {
            cilindrada = TestUtil.findAll(em, Cilindrada.class).get(0);
        }
        costoOperacion.setCilindrada(cilindrada);
        // Add required entity
        Operacion operacion;
        if (TestUtil.findAll(em, Operacion.class).isEmpty()) {
            operacion = OperacionResourceIT.createEntity(em);
            em.persist(operacion);
            em.flush();
        } else {
            operacion = TestUtil.findAll(em, Operacion.class).get(0);
        }
        costoOperacion.setOperacion(operacion);
        // Add required entity
        TipoParteMotor tipoParteMotor;
        if (TestUtil.findAll(em, TipoParteMotor.class).isEmpty()) {
            tipoParteMotor = TipoParteMotorResourceIT.createEntity(em);
            em.persist(tipoParteMotor);
            em.flush();
        } else {
            tipoParteMotor = TestUtil.findAll(em, TipoParteMotor.class).get(0);
        }
        costoOperacion.setTipoParteMotor(tipoParteMotor);
        return costoOperacion;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CostoOperacion createUpdatedEntity(EntityManager em) {
        CostoOperacion costoOperacion = new CostoOperacion().costoOperacion(UPDATED_COSTO_OPERACION);
        // Add required entity
        Cilindrada cilindrada;
        if (TestUtil.findAll(em, Cilindrada.class).isEmpty()) {
            cilindrada = CilindradaResourceIT.createUpdatedEntity(em);
            em.persist(cilindrada);
            em.flush();
        } else {
            cilindrada = TestUtil.findAll(em, Cilindrada.class).get(0);
        }
        costoOperacion.setCilindrada(cilindrada);
        // Add required entity
        Operacion operacion;
        if (TestUtil.findAll(em, Operacion.class).isEmpty()) {
            operacion = OperacionResourceIT.createUpdatedEntity(em);
            em.persist(operacion);
            em.flush();
        } else {
            operacion = TestUtil.findAll(em, Operacion.class).get(0);
        }
        costoOperacion.setOperacion(operacion);
        // Add required entity
        TipoParteMotor tipoParteMotor;
        if (TestUtil.findAll(em, TipoParteMotor.class).isEmpty()) {
            tipoParteMotor = TipoParteMotorResourceIT.createUpdatedEntity(em);
            em.persist(tipoParteMotor);
            em.flush();
        } else {
            tipoParteMotor = TestUtil.findAll(em, TipoParteMotor.class).get(0);
        }
        costoOperacion.setTipoParteMotor(tipoParteMotor);
        return costoOperacion;
    }

    @BeforeEach
    public void initTest() {
        costoOperacion = createEntity(em);
    }

    @Test
    @Transactional
    void createCostoOperacion() throws Exception {
        int databaseSizeBeforeCreate = costoOperacionRepository.findAll().size();
        // Create the CostoOperacion
        restCostoOperacionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(costoOperacion))
            )
            .andExpect(status().isCreated());

        // Validate the CostoOperacion in the database
        List<CostoOperacion> costoOperacionList = costoOperacionRepository.findAll();
        assertThat(costoOperacionList).hasSize(databaseSizeBeforeCreate + 1);
        CostoOperacion testCostoOperacion = costoOperacionList.get(costoOperacionList.size() - 1);
        assertThat(testCostoOperacion.getCostoOperacion()).isEqualTo(DEFAULT_COSTO_OPERACION);
    }

    @Test
    @Transactional
    void createCostoOperacionWithExistingId() throws Exception {
        // Create the CostoOperacion with an existing ID
        costoOperacion.setId(1L);

        int databaseSizeBeforeCreate = costoOperacionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCostoOperacionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(costoOperacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the CostoOperacion in the database
        List<CostoOperacion> costoOperacionList = costoOperacionRepository.findAll();
        assertThat(costoOperacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkCostoOperacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = costoOperacionRepository.findAll().size();
        // set the field null
        costoOperacion.setCostoOperacion(null);

        // Create the CostoOperacion, which fails.

        restCostoOperacionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(costoOperacion))
            )
            .andExpect(status().isBadRequest());

        List<CostoOperacion> costoOperacionList = costoOperacionRepository.findAll();
        assertThat(costoOperacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCostoOperacions() throws Exception {
        // Initialize the database
        costoOperacionRepository.saveAndFlush(costoOperacion);

        // Get all the costoOperacionList
        restCostoOperacionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(costoOperacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].costoOperacion").value(hasItem(DEFAULT_COSTO_OPERACION.doubleValue())));
    }

    @Test
    @Transactional
    void getCostoOperacion() throws Exception {
        // Initialize the database
        costoOperacionRepository.saveAndFlush(costoOperacion);

        // Get the costoOperacion
        restCostoOperacionMockMvc
            .perform(get(ENTITY_API_URL_ID, costoOperacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(costoOperacion.getId().intValue()))
            .andExpect(jsonPath("$.costoOperacion").value(DEFAULT_COSTO_OPERACION.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingCostoOperacion() throws Exception {
        // Get the costoOperacion
        restCostoOperacionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCostoOperacion() throws Exception {
        // Initialize the database
        costoOperacionRepository.saveAndFlush(costoOperacion);

        int databaseSizeBeforeUpdate = costoOperacionRepository.findAll().size();

        // Update the costoOperacion
        CostoOperacion updatedCostoOperacion = costoOperacionRepository.findById(costoOperacion.getId()).get();
        // Disconnect from session so that the updates on updatedCostoOperacion are not directly saved in db
        em.detach(updatedCostoOperacion);
        updatedCostoOperacion.costoOperacion(UPDATED_COSTO_OPERACION);

        restCostoOperacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCostoOperacion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCostoOperacion))
            )
            .andExpect(status().isOk());

        // Validate the CostoOperacion in the database
        List<CostoOperacion> costoOperacionList = costoOperacionRepository.findAll();
        assertThat(costoOperacionList).hasSize(databaseSizeBeforeUpdate);
        CostoOperacion testCostoOperacion = costoOperacionList.get(costoOperacionList.size() - 1);
        assertThat(testCostoOperacion.getCostoOperacion()).isEqualTo(UPDATED_COSTO_OPERACION);
    }

    @Test
    @Transactional
    void putNonExistingCostoOperacion() throws Exception {
        int databaseSizeBeforeUpdate = costoOperacionRepository.findAll().size();
        costoOperacion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCostoOperacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, costoOperacion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(costoOperacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the CostoOperacion in the database
        List<CostoOperacion> costoOperacionList = costoOperacionRepository.findAll();
        assertThat(costoOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCostoOperacion() throws Exception {
        int databaseSizeBeforeUpdate = costoOperacionRepository.findAll().size();
        costoOperacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCostoOperacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(costoOperacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the CostoOperacion in the database
        List<CostoOperacion> costoOperacionList = costoOperacionRepository.findAll();
        assertThat(costoOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCostoOperacion() throws Exception {
        int databaseSizeBeforeUpdate = costoOperacionRepository.findAll().size();
        costoOperacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCostoOperacionMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(costoOperacion)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CostoOperacion in the database
        List<CostoOperacion> costoOperacionList = costoOperacionRepository.findAll();
        assertThat(costoOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCostoOperacionWithPatch() throws Exception {
        // Initialize the database
        costoOperacionRepository.saveAndFlush(costoOperacion);

        int databaseSizeBeforeUpdate = costoOperacionRepository.findAll().size();

        // Update the costoOperacion using partial update
        CostoOperacion partialUpdatedCostoOperacion = new CostoOperacion();
        partialUpdatedCostoOperacion.setId(costoOperacion.getId());

        partialUpdatedCostoOperacion.costoOperacion(UPDATED_COSTO_OPERACION);

        restCostoOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCostoOperacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCostoOperacion))
            )
            .andExpect(status().isOk());

        // Validate the CostoOperacion in the database
        List<CostoOperacion> costoOperacionList = costoOperacionRepository.findAll();
        assertThat(costoOperacionList).hasSize(databaseSizeBeforeUpdate);
        CostoOperacion testCostoOperacion = costoOperacionList.get(costoOperacionList.size() - 1);
        assertThat(testCostoOperacion.getCostoOperacion()).isEqualTo(UPDATED_COSTO_OPERACION);
    }

    @Test
    @Transactional
    void fullUpdateCostoOperacionWithPatch() throws Exception {
        // Initialize the database
        costoOperacionRepository.saveAndFlush(costoOperacion);

        int databaseSizeBeforeUpdate = costoOperacionRepository.findAll().size();

        // Update the costoOperacion using partial update
        CostoOperacion partialUpdatedCostoOperacion = new CostoOperacion();
        partialUpdatedCostoOperacion.setId(costoOperacion.getId());

        partialUpdatedCostoOperacion.costoOperacion(UPDATED_COSTO_OPERACION);

        restCostoOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCostoOperacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCostoOperacion))
            )
            .andExpect(status().isOk());

        // Validate the CostoOperacion in the database
        List<CostoOperacion> costoOperacionList = costoOperacionRepository.findAll();
        assertThat(costoOperacionList).hasSize(databaseSizeBeforeUpdate);
        CostoOperacion testCostoOperacion = costoOperacionList.get(costoOperacionList.size() - 1);
        assertThat(testCostoOperacion.getCostoOperacion()).isEqualTo(UPDATED_COSTO_OPERACION);
    }

    @Test
    @Transactional
    void patchNonExistingCostoOperacion() throws Exception {
        int databaseSizeBeforeUpdate = costoOperacionRepository.findAll().size();
        costoOperacion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCostoOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, costoOperacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(costoOperacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the CostoOperacion in the database
        List<CostoOperacion> costoOperacionList = costoOperacionRepository.findAll();
        assertThat(costoOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCostoOperacion() throws Exception {
        int databaseSizeBeforeUpdate = costoOperacionRepository.findAll().size();
        costoOperacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCostoOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(costoOperacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the CostoOperacion in the database
        List<CostoOperacion> costoOperacionList = costoOperacionRepository.findAll();
        assertThat(costoOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCostoOperacion() throws Exception {
        int databaseSizeBeforeUpdate = costoOperacionRepository.findAll().size();
        costoOperacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCostoOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(costoOperacion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CostoOperacion in the database
        List<CostoOperacion> costoOperacionList = costoOperacionRepository.findAll();
        assertThat(costoOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCostoOperacion() throws Exception {
        // Initialize the database
        costoOperacionRepository.saveAndFlush(costoOperacion);

        int databaseSizeBeforeDelete = costoOperacionRepository.findAll().size();

        // Delete the costoOperacion
        restCostoOperacionMockMvc
            .perform(delete(ENTITY_API_URL_ID, costoOperacion.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CostoOperacion> costoOperacionList = costoOperacionRepository.findAll();
        assertThat(costoOperacionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
