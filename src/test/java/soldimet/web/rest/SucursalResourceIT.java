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
import soldimet.domain.Sucursal;
import soldimet.repository.SucursalRepository;

/**
 * Integration tests for the {@link SucursalResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SucursalResourceIT {

    private static final String DEFAULT_NOMBRE_SUCURSAL = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_SUCURSAL = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/sucursals";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SucursalRepository sucursalRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSucursalMockMvc;

    private Sucursal sucursal;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sucursal createEntity(EntityManager em) {
        Sucursal sucursal = new Sucursal().nombreSucursal(DEFAULT_NOMBRE_SUCURSAL);
        return sucursal;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sucursal createUpdatedEntity(EntityManager em) {
        Sucursal sucursal = new Sucursal().nombreSucursal(UPDATED_NOMBRE_SUCURSAL);
        return sucursal;
    }

    @BeforeEach
    public void initTest() {
        sucursal = createEntity(em);
    }

    @Test
    @Transactional
    void createSucursal() throws Exception {
        int databaseSizeBeforeCreate = sucursalRepository.findAll().size();
        // Create the Sucursal
        restSucursalMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sucursal)))
            .andExpect(status().isCreated());

        // Validate the Sucursal in the database
        List<Sucursal> sucursalList = sucursalRepository.findAll();
        assertThat(sucursalList).hasSize(databaseSizeBeforeCreate + 1);
        Sucursal testSucursal = sucursalList.get(sucursalList.size() - 1);
        assertThat(testSucursal.getNombreSucursal()).isEqualTo(DEFAULT_NOMBRE_SUCURSAL);
    }

    @Test
    @Transactional
    void createSucursalWithExistingId() throws Exception {
        // Create the Sucursal with an existing ID
        sucursal.setId(1L);

        int databaseSizeBeforeCreate = sucursalRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSucursalMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sucursal)))
            .andExpect(status().isBadRequest());

        // Validate the Sucursal in the database
        List<Sucursal> sucursalList = sucursalRepository.findAll();
        assertThat(sucursalList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreSucursalIsRequired() throws Exception {
        int databaseSizeBeforeTest = sucursalRepository.findAll().size();
        // set the field null
        sucursal.setNombreSucursal(null);

        // Create the Sucursal, which fails.

        restSucursalMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sucursal)))
            .andExpect(status().isBadRequest());

        List<Sucursal> sucursalList = sucursalRepository.findAll();
        assertThat(sucursalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllSucursals() throws Exception {
        // Initialize the database
        sucursalRepository.saveAndFlush(sucursal);

        // Get all the sucursalList
        restSucursalMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sucursal.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreSucursal").value(hasItem(DEFAULT_NOMBRE_SUCURSAL)));
    }

    @Test
    @Transactional
    void getSucursal() throws Exception {
        // Initialize the database
        sucursalRepository.saveAndFlush(sucursal);

        // Get the sucursal
        restSucursalMockMvc
            .perform(get(ENTITY_API_URL_ID, sucursal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(sucursal.getId().intValue()))
            .andExpect(jsonPath("$.nombreSucursal").value(DEFAULT_NOMBRE_SUCURSAL));
    }

    @Test
    @Transactional
    void getNonExistingSucursal() throws Exception {
        // Get the sucursal
        restSucursalMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewSucursal() throws Exception {
        // Initialize the database
        sucursalRepository.saveAndFlush(sucursal);

        int databaseSizeBeforeUpdate = sucursalRepository.findAll().size();

        // Update the sucursal
        Sucursal updatedSucursal = sucursalRepository.findById(sucursal.getId()).get();
        // Disconnect from session so that the updates on updatedSucursal are not directly saved in db
        em.detach(updatedSucursal);
        updatedSucursal.nombreSucursal(UPDATED_NOMBRE_SUCURSAL);

        restSucursalMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSucursal.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSucursal))
            )
            .andExpect(status().isOk());

        // Validate the Sucursal in the database
        List<Sucursal> sucursalList = sucursalRepository.findAll();
        assertThat(sucursalList).hasSize(databaseSizeBeforeUpdate);
        Sucursal testSucursal = sucursalList.get(sucursalList.size() - 1);
        assertThat(testSucursal.getNombreSucursal()).isEqualTo(UPDATED_NOMBRE_SUCURSAL);
    }

    @Test
    @Transactional
    void putNonExistingSucursal() throws Exception {
        int databaseSizeBeforeUpdate = sucursalRepository.findAll().size();
        sucursal.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSucursalMockMvc
            .perform(
                put(ENTITY_API_URL_ID, sucursal.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(sucursal))
            )
            .andExpect(status().isBadRequest());

        // Validate the Sucursal in the database
        List<Sucursal> sucursalList = sucursalRepository.findAll();
        assertThat(sucursalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSucursal() throws Exception {
        int databaseSizeBeforeUpdate = sucursalRepository.findAll().size();
        sucursal.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSucursalMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(sucursal))
            )
            .andExpect(status().isBadRequest());

        // Validate the Sucursal in the database
        List<Sucursal> sucursalList = sucursalRepository.findAll();
        assertThat(sucursalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSucursal() throws Exception {
        int databaseSizeBeforeUpdate = sucursalRepository.findAll().size();
        sucursal.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSucursalMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sucursal)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Sucursal in the database
        List<Sucursal> sucursalList = sucursalRepository.findAll();
        assertThat(sucursalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSucursalWithPatch() throws Exception {
        // Initialize the database
        sucursalRepository.saveAndFlush(sucursal);

        int databaseSizeBeforeUpdate = sucursalRepository.findAll().size();

        // Update the sucursal using partial update
        Sucursal partialUpdatedSucursal = new Sucursal();
        partialUpdatedSucursal.setId(sucursal.getId());

        partialUpdatedSucursal.nombreSucursal(UPDATED_NOMBRE_SUCURSAL);

        restSucursalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSucursal.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSucursal))
            )
            .andExpect(status().isOk());

        // Validate the Sucursal in the database
        List<Sucursal> sucursalList = sucursalRepository.findAll();
        assertThat(sucursalList).hasSize(databaseSizeBeforeUpdate);
        Sucursal testSucursal = sucursalList.get(sucursalList.size() - 1);
        assertThat(testSucursal.getNombreSucursal()).isEqualTo(UPDATED_NOMBRE_SUCURSAL);
    }

    @Test
    @Transactional
    void fullUpdateSucursalWithPatch() throws Exception {
        // Initialize the database
        sucursalRepository.saveAndFlush(sucursal);

        int databaseSizeBeforeUpdate = sucursalRepository.findAll().size();

        // Update the sucursal using partial update
        Sucursal partialUpdatedSucursal = new Sucursal();
        partialUpdatedSucursal.setId(sucursal.getId());

        partialUpdatedSucursal.nombreSucursal(UPDATED_NOMBRE_SUCURSAL);

        restSucursalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSucursal.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSucursal))
            )
            .andExpect(status().isOk());

        // Validate the Sucursal in the database
        List<Sucursal> sucursalList = sucursalRepository.findAll();
        assertThat(sucursalList).hasSize(databaseSizeBeforeUpdate);
        Sucursal testSucursal = sucursalList.get(sucursalList.size() - 1);
        assertThat(testSucursal.getNombreSucursal()).isEqualTo(UPDATED_NOMBRE_SUCURSAL);
    }

    @Test
    @Transactional
    void patchNonExistingSucursal() throws Exception {
        int databaseSizeBeforeUpdate = sucursalRepository.findAll().size();
        sucursal.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSucursalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, sucursal.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(sucursal))
            )
            .andExpect(status().isBadRequest());

        // Validate the Sucursal in the database
        List<Sucursal> sucursalList = sucursalRepository.findAll();
        assertThat(sucursalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSucursal() throws Exception {
        int databaseSizeBeforeUpdate = sucursalRepository.findAll().size();
        sucursal.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSucursalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(sucursal))
            )
            .andExpect(status().isBadRequest());

        // Validate the Sucursal in the database
        List<Sucursal> sucursalList = sucursalRepository.findAll();
        assertThat(sucursalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSucursal() throws Exception {
        int databaseSizeBeforeUpdate = sucursalRepository.findAll().size();
        sucursal.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSucursalMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(sucursal)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Sucursal in the database
        List<Sucursal> sucursalList = sucursalRepository.findAll();
        assertThat(sucursalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSucursal() throws Exception {
        // Initialize the database
        sucursalRepository.saveAndFlush(sucursal);

        int databaseSizeBeforeDelete = sucursalRepository.findAll().size();

        // Delete the sucursal
        restSucursalMockMvc
            .perform(delete(ENTITY_API_URL_ID, sucursal.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Sucursal> sucursalList = sucursalRepository.findAll();
        assertThat(sucursalList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
