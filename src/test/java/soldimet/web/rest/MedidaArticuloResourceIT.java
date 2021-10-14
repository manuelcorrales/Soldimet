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
import soldimet.domain.MedidaArticulo;
import soldimet.repository.MedidaArticuloRepository;

/**
 * Integration tests for the {@link MedidaArticuloResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MedidaArticuloResourceIT {

    private static final String DEFAULT_MEDIDA = "AAAAAAAAAA";
    private static final String UPDATED_MEDIDA = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/medida-articulos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MedidaArticuloRepository medidaArticuloRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMedidaArticuloMockMvc;

    private MedidaArticulo medidaArticulo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MedidaArticulo createEntity(EntityManager em) {
        MedidaArticulo medidaArticulo = new MedidaArticulo().medida(DEFAULT_MEDIDA);
        return medidaArticulo;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MedidaArticulo createUpdatedEntity(EntityManager em) {
        MedidaArticulo medidaArticulo = new MedidaArticulo().medida(UPDATED_MEDIDA);
        return medidaArticulo;
    }

    @BeforeEach
    public void initTest() {
        medidaArticulo = createEntity(em);
    }

    @Test
    @Transactional
    void createMedidaArticulo() throws Exception {
        int databaseSizeBeforeCreate = medidaArticuloRepository.findAll().size();
        // Create the MedidaArticulo
        restMedidaArticuloMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(medidaArticulo))
            )
            .andExpect(status().isCreated());

        // Validate the MedidaArticulo in the database
        List<MedidaArticulo> medidaArticuloList = medidaArticuloRepository.findAll();
        assertThat(medidaArticuloList).hasSize(databaseSizeBeforeCreate + 1);
        MedidaArticulo testMedidaArticulo = medidaArticuloList.get(medidaArticuloList.size() - 1);
        assertThat(testMedidaArticulo.getMedida()).isEqualTo(DEFAULT_MEDIDA);
    }

    @Test
    @Transactional
    void createMedidaArticuloWithExistingId() throws Exception {
        // Create the MedidaArticulo with an existing ID
        medidaArticulo.setId(1L);

        int databaseSizeBeforeCreate = medidaArticuloRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedidaArticuloMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(medidaArticulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the MedidaArticulo in the database
        List<MedidaArticulo> medidaArticuloList = medidaArticuloRepository.findAll();
        assertThat(medidaArticuloList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMedidaArticulos() throws Exception {
        // Initialize the database
        medidaArticuloRepository.saveAndFlush(medidaArticulo);

        // Get all the medidaArticuloList
        restMedidaArticuloMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medidaArticulo.getId().intValue())))
            .andExpect(jsonPath("$.[*].medida").value(hasItem(DEFAULT_MEDIDA)));
    }

    @Test
    @Transactional
    void getMedidaArticulo() throws Exception {
        // Initialize the database
        medidaArticuloRepository.saveAndFlush(medidaArticulo);

        // Get the medidaArticulo
        restMedidaArticuloMockMvc
            .perform(get(ENTITY_API_URL_ID, medidaArticulo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(medidaArticulo.getId().intValue()))
            .andExpect(jsonPath("$.medida").value(DEFAULT_MEDIDA));
    }

    @Test
    @Transactional
    void getNonExistingMedidaArticulo() throws Exception {
        // Get the medidaArticulo
        restMedidaArticuloMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMedidaArticulo() throws Exception {
        // Initialize the database
        medidaArticuloRepository.saveAndFlush(medidaArticulo);

        int databaseSizeBeforeUpdate = medidaArticuloRepository.findAll().size();

        // Update the medidaArticulo
        MedidaArticulo updatedMedidaArticulo = medidaArticuloRepository.findById(medidaArticulo.getId()).get();
        // Disconnect from session so that the updates on updatedMedidaArticulo are not directly saved in db
        em.detach(updatedMedidaArticulo);
        updatedMedidaArticulo.medida(UPDATED_MEDIDA);

        restMedidaArticuloMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMedidaArticulo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMedidaArticulo))
            )
            .andExpect(status().isOk());

        // Validate the MedidaArticulo in the database
        List<MedidaArticulo> medidaArticuloList = medidaArticuloRepository.findAll();
        assertThat(medidaArticuloList).hasSize(databaseSizeBeforeUpdate);
        MedidaArticulo testMedidaArticulo = medidaArticuloList.get(medidaArticuloList.size() - 1);
        assertThat(testMedidaArticulo.getMedida()).isEqualTo(UPDATED_MEDIDA);
    }

    @Test
    @Transactional
    void putNonExistingMedidaArticulo() throws Exception {
        int databaseSizeBeforeUpdate = medidaArticuloRepository.findAll().size();
        medidaArticulo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedidaArticuloMockMvc
            .perform(
                put(ENTITY_API_URL_ID, medidaArticulo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(medidaArticulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the MedidaArticulo in the database
        List<MedidaArticulo> medidaArticuloList = medidaArticuloRepository.findAll();
        assertThat(medidaArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMedidaArticulo() throws Exception {
        int databaseSizeBeforeUpdate = medidaArticuloRepository.findAll().size();
        medidaArticulo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMedidaArticuloMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(medidaArticulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the MedidaArticulo in the database
        List<MedidaArticulo> medidaArticuloList = medidaArticuloRepository.findAll();
        assertThat(medidaArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMedidaArticulo() throws Exception {
        int databaseSizeBeforeUpdate = medidaArticuloRepository.findAll().size();
        medidaArticulo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMedidaArticuloMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(medidaArticulo)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the MedidaArticulo in the database
        List<MedidaArticulo> medidaArticuloList = medidaArticuloRepository.findAll();
        assertThat(medidaArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMedidaArticuloWithPatch() throws Exception {
        // Initialize the database
        medidaArticuloRepository.saveAndFlush(medidaArticulo);

        int databaseSizeBeforeUpdate = medidaArticuloRepository.findAll().size();

        // Update the medidaArticulo using partial update
        MedidaArticulo partialUpdatedMedidaArticulo = new MedidaArticulo();
        partialUpdatedMedidaArticulo.setId(medidaArticulo.getId());

        restMedidaArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMedidaArticulo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMedidaArticulo))
            )
            .andExpect(status().isOk());

        // Validate the MedidaArticulo in the database
        List<MedidaArticulo> medidaArticuloList = medidaArticuloRepository.findAll();
        assertThat(medidaArticuloList).hasSize(databaseSizeBeforeUpdate);
        MedidaArticulo testMedidaArticulo = medidaArticuloList.get(medidaArticuloList.size() - 1);
        assertThat(testMedidaArticulo.getMedida()).isEqualTo(DEFAULT_MEDIDA);
    }

    @Test
    @Transactional
    void fullUpdateMedidaArticuloWithPatch() throws Exception {
        // Initialize the database
        medidaArticuloRepository.saveAndFlush(medidaArticulo);

        int databaseSizeBeforeUpdate = medidaArticuloRepository.findAll().size();

        // Update the medidaArticulo using partial update
        MedidaArticulo partialUpdatedMedidaArticulo = new MedidaArticulo();
        partialUpdatedMedidaArticulo.setId(medidaArticulo.getId());

        partialUpdatedMedidaArticulo.medida(UPDATED_MEDIDA);

        restMedidaArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMedidaArticulo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMedidaArticulo))
            )
            .andExpect(status().isOk());

        // Validate the MedidaArticulo in the database
        List<MedidaArticulo> medidaArticuloList = medidaArticuloRepository.findAll();
        assertThat(medidaArticuloList).hasSize(databaseSizeBeforeUpdate);
        MedidaArticulo testMedidaArticulo = medidaArticuloList.get(medidaArticuloList.size() - 1);
        assertThat(testMedidaArticulo.getMedida()).isEqualTo(UPDATED_MEDIDA);
    }

    @Test
    @Transactional
    void patchNonExistingMedidaArticulo() throws Exception {
        int databaseSizeBeforeUpdate = medidaArticuloRepository.findAll().size();
        medidaArticulo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedidaArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, medidaArticulo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(medidaArticulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the MedidaArticulo in the database
        List<MedidaArticulo> medidaArticuloList = medidaArticuloRepository.findAll();
        assertThat(medidaArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMedidaArticulo() throws Exception {
        int databaseSizeBeforeUpdate = medidaArticuloRepository.findAll().size();
        medidaArticulo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMedidaArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(medidaArticulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the MedidaArticulo in the database
        List<MedidaArticulo> medidaArticuloList = medidaArticuloRepository.findAll();
        assertThat(medidaArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMedidaArticulo() throws Exception {
        int databaseSizeBeforeUpdate = medidaArticuloRepository.findAll().size();
        medidaArticulo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMedidaArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(medidaArticulo))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MedidaArticulo in the database
        List<MedidaArticulo> medidaArticuloList = medidaArticuloRepository.findAll();
        assertThat(medidaArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMedidaArticulo() throws Exception {
        // Initialize the database
        medidaArticuloRepository.saveAndFlush(medidaArticulo);

        int databaseSizeBeforeDelete = medidaArticuloRepository.findAll().size();

        // Delete the medidaArticulo
        restMedidaArticuloMockMvc
            .perform(delete(ENTITY_API_URL_ID, medidaArticulo.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MedidaArticulo> medidaArticuloList = medidaArticuloRepository.findAll();
        assertThat(medidaArticuloList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
