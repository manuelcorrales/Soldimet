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
import soldimet.domain.CostoRepuesto;
import soldimet.domain.EstadoCostoRepuesto;
import soldimet.repository.CostoRepuestoRepository;

/**
 * Integration tests for the {@link CostoRepuestoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
public class CostoRepuestoResourceIT {

    private static final Float DEFAULT_VALOR = 0F;
    private static final Float UPDATED_VALOR = 1F;

    private static final String ENTITY_API_URL = "/api/costo-repuestos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CostoRepuestoRepository costoRepuestoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCostoRepuestoMockMvc;

    private CostoRepuesto costoRepuesto;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CostoRepuesto createEntity(EntityManager em) {
        CostoRepuesto costoRepuesto = new CostoRepuesto().valor(DEFAULT_VALOR);
        // Add required entity
        EstadoCostoRepuesto estadoCostoRepuesto;
        if (TestUtil.findAll(em, EstadoCostoRepuesto.class).isEmpty()) {
            estadoCostoRepuesto = EstadoCostoRepuestoResourceIT.createEntity(em);
            em.persist(estadoCostoRepuesto);
            em.flush();
        } else {
            estadoCostoRepuesto = TestUtil.findAll(em, EstadoCostoRepuesto.class).get(0);
        }
        costoRepuesto.setEstado(estadoCostoRepuesto);
        return costoRepuesto;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CostoRepuesto createUpdatedEntity(EntityManager em) {
        CostoRepuesto costoRepuesto = new CostoRepuesto().valor(UPDATED_VALOR);
        // Add required entity
        EstadoCostoRepuesto estadoCostoRepuesto;
        if (TestUtil.findAll(em, EstadoCostoRepuesto.class).isEmpty()) {
            estadoCostoRepuesto = EstadoCostoRepuestoResourceIT.createUpdatedEntity(em);
            em.persist(estadoCostoRepuesto);
            em.flush();
        } else {
            estadoCostoRepuesto = TestUtil.findAll(em, EstadoCostoRepuesto.class).get(0);
        }
        costoRepuesto.setEstado(estadoCostoRepuesto);
        return costoRepuesto;
    }

    @BeforeEach
    public void initTest() {
        costoRepuesto = createEntity(em);
    }

    @Test
    @Transactional
    void createCostoRepuesto() throws Exception {
        int databaseSizeBeforeCreate = costoRepuestoRepository.findAll().size();
        // Create the CostoRepuesto
        restCostoRepuestoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(costoRepuesto)))
            .andExpect(status().isCreated());

        // Validate the CostoRepuesto in the database
        List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
        assertThat(costoRepuestoList).hasSize(databaseSizeBeforeCreate + 1);
        CostoRepuesto testCostoRepuesto = costoRepuestoList.get(costoRepuestoList.size() - 1);
        assertThat(testCostoRepuesto.getValor()).isEqualTo(DEFAULT_VALOR);
    }

    @Test
    @Transactional
    void createCostoRepuestoWithExistingId() throws Exception {
        // Create the CostoRepuesto with an existing ID
        costoRepuesto.setId(1L);

        int databaseSizeBeforeCreate = costoRepuestoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCostoRepuestoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(costoRepuesto)))
            .andExpect(status().isBadRequest());

        // Validate the CostoRepuesto in the database
        List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
        assertThat(costoRepuestoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkValorIsRequired() throws Exception {
        int databaseSizeBeforeTest = costoRepuestoRepository.findAll().size();
        // set the field null
        costoRepuesto.setValor(null);

        // Create the CostoRepuesto, which fails.

        restCostoRepuestoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(costoRepuesto)))
            .andExpect(status().isBadRequest());

        List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
        assertThat(costoRepuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCostoRepuestos() throws Exception {
        // Initialize the database
        costoRepuestoRepository.saveAndFlush(costoRepuesto);

        // Get all the costoRepuestoList
        restCostoRepuestoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(costoRepuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.doubleValue())));
    }

    @Test
    @Transactional
    void getCostoRepuesto() throws Exception {
        // Initialize the database
        costoRepuestoRepository.saveAndFlush(costoRepuesto);

        // Get the costoRepuesto
        restCostoRepuestoMockMvc
            .perform(get(ENTITY_API_URL_ID, costoRepuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(costoRepuesto.getId().intValue()))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingCostoRepuesto() throws Exception {
        // Get the costoRepuesto
        restCostoRepuestoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCostoRepuesto() throws Exception {
        // Initialize the database
        costoRepuestoRepository.saveAndFlush(costoRepuesto);

        int databaseSizeBeforeUpdate = costoRepuestoRepository.findAll().size();

        // Update the costoRepuesto
        CostoRepuesto updatedCostoRepuesto = costoRepuestoRepository.findById(costoRepuesto.getId()).get();
        // Disconnect from session so that the updates on updatedCostoRepuesto are not directly saved in db
        em.detach(updatedCostoRepuesto);
        updatedCostoRepuesto.valor(UPDATED_VALOR);

        restCostoRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCostoRepuesto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCostoRepuesto))
            )
            .andExpect(status().isOk());

        // Validate the CostoRepuesto in the database
        List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
        assertThat(costoRepuestoList).hasSize(databaseSizeBeforeUpdate);
        CostoRepuesto testCostoRepuesto = costoRepuestoList.get(costoRepuestoList.size() - 1);
        assertThat(testCostoRepuesto.getValor()).isEqualTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    void putNonExistingCostoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = costoRepuestoRepository.findAll().size();
        costoRepuesto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCostoRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, costoRepuesto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(costoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the CostoRepuesto in the database
        List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
        assertThat(costoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCostoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = costoRepuestoRepository.findAll().size();
        costoRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCostoRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(costoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the CostoRepuesto in the database
        List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
        assertThat(costoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCostoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = costoRepuestoRepository.findAll().size();
        costoRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCostoRepuestoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(costoRepuesto)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CostoRepuesto in the database
        List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
        assertThat(costoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCostoRepuestoWithPatch() throws Exception {
        // Initialize the database
        costoRepuestoRepository.saveAndFlush(costoRepuesto);

        int databaseSizeBeforeUpdate = costoRepuestoRepository.findAll().size();

        // Update the costoRepuesto using partial update
        CostoRepuesto partialUpdatedCostoRepuesto = new CostoRepuesto();
        partialUpdatedCostoRepuesto.setId(costoRepuesto.getId());

        restCostoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCostoRepuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCostoRepuesto))
            )
            .andExpect(status().isOk());

        // Validate the CostoRepuesto in the database
        List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
        assertThat(costoRepuestoList).hasSize(databaseSizeBeforeUpdate);
        CostoRepuesto testCostoRepuesto = costoRepuestoList.get(costoRepuestoList.size() - 1);
        assertThat(testCostoRepuesto.getValor()).isEqualTo(DEFAULT_VALOR);
    }

    @Test
    @Transactional
    void fullUpdateCostoRepuestoWithPatch() throws Exception {
        // Initialize the database
        costoRepuestoRepository.saveAndFlush(costoRepuesto);

        int databaseSizeBeforeUpdate = costoRepuestoRepository.findAll().size();

        // Update the costoRepuesto using partial update
        CostoRepuesto partialUpdatedCostoRepuesto = new CostoRepuesto();
        partialUpdatedCostoRepuesto.setId(costoRepuesto.getId());

        partialUpdatedCostoRepuesto.valor(UPDATED_VALOR);

        restCostoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCostoRepuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCostoRepuesto))
            )
            .andExpect(status().isOk());

        // Validate the CostoRepuesto in the database
        List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
        assertThat(costoRepuestoList).hasSize(databaseSizeBeforeUpdate);
        CostoRepuesto testCostoRepuesto = costoRepuestoList.get(costoRepuestoList.size() - 1);
        assertThat(testCostoRepuesto.getValor()).isEqualTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    void patchNonExistingCostoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = costoRepuestoRepository.findAll().size();
        costoRepuesto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCostoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, costoRepuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(costoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the CostoRepuesto in the database
        List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
        assertThat(costoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCostoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = costoRepuestoRepository.findAll().size();
        costoRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCostoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(costoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the CostoRepuesto in the database
        List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
        assertThat(costoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCostoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = costoRepuestoRepository.findAll().size();
        costoRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCostoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(costoRepuesto))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CostoRepuesto in the database
        List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
        assertThat(costoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCostoRepuesto() throws Exception {
        // Initialize the database
        costoRepuestoRepository.saveAndFlush(costoRepuesto);

        int databaseSizeBeforeDelete = costoRepuestoRepository.findAll().size();

        // Delete the costoRepuesto
        restCostoRepuestoMockMvc
            .perform(delete(ENTITY_API_URL_ID, costoRepuesto.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
        assertThat(costoRepuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
