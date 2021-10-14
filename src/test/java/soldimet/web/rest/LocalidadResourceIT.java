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
import soldimet.domain.Localidad;
import soldimet.repository.LocalidadRepository;

/**
 * Integration tests for the {@link LocalidadResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LocalidadResourceIT {

    private static final String DEFAULT_NOMBRE_LOCALIDAD = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_LOCALIDAD = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/localidads";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private LocalidadRepository localidadRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLocalidadMockMvc;

    private Localidad localidad;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Localidad createEntity(EntityManager em) {
        Localidad localidad = new Localidad().nombreLocalidad(DEFAULT_NOMBRE_LOCALIDAD);
        return localidad;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Localidad createUpdatedEntity(EntityManager em) {
        Localidad localidad = new Localidad().nombreLocalidad(UPDATED_NOMBRE_LOCALIDAD);
        return localidad;
    }

    @BeforeEach
    public void initTest() {
        localidad = createEntity(em);
    }

    @Test
    @Transactional
    void createLocalidad() throws Exception {
        int databaseSizeBeforeCreate = localidadRepository.findAll().size();
        // Create the Localidad
        restLocalidadMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(localidad)))
            .andExpect(status().isCreated());

        // Validate the Localidad in the database
        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeCreate + 1);
        Localidad testLocalidad = localidadList.get(localidadList.size() - 1);
        assertThat(testLocalidad.getNombreLocalidad()).isEqualTo(DEFAULT_NOMBRE_LOCALIDAD);
    }

    @Test
    @Transactional
    void createLocalidadWithExistingId() throws Exception {
        // Create the Localidad with an existing ID
        localidad.setId(1L);

        int databaseSizeBeforeCreate = localidadRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLocalidadMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(localidad)))
            .andExpect(status().isBadRequest());

        // Validate the Localidad in the database
        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreLocalidadIsRequired() throws Exception {
        int databaseSizeBeforeTest = localidadRepository.findAll().size();
        // set the field null
        localidad.setNombreLocalidad(null);

        // Create the Localidad, which fails.

        restLocalidadMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(localidad)))
            .andExpect(status().isBadRequest());

        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllLocalidads() throws Exception {
        // Initialize the database
        localidadRepository.saveAndFlush(localidad);

        // Get all the localidadList
        restLocalidadMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(localidad.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreLocalidad").value(hasItem(DEFAULT_NOMBRE_LOCALIDAD)));
    }

    @Test
    @Transactional
    void getLocalidad() throws Exception {
        // Initialize the database
        localidadRepository.saveAndFlush(localidad);

        // Get the localidad
        restLocalidadMockMvc
            .perform(get(ENTITY_API_URL_ID, localidad.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(localidad.getId().intValue()))
            .andExpect(jsonPath("$.nombreLocalidad").value(DEFAULT_NOMBRE_LOCALIDAD));
    }

    @Test
    @Transactional
    void getNonExistingLocalidad() throws Exception {
        // Get the localidad
        restLocalidadMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewLocalidad() throws Exception {
        // Initialize the database
        localidadRepository.saveAndFlush(localidad);

        int databaseSizeBeforeUpdate = localidadRepository.findAll().size();

        // Update the localidad
        Localidad updatedLocalidad = localidadRepository.findById(localidad.getId()).get();
        // Disconnect from session so that the updates on updatedLocalidad are not directly saved in db
        em.detach(updatedLocalidad);
        updatedLocalidad.nombreLocalidad(UPDATED_NOMBRE_LOCALIDAD);

        restLocalidadMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedLocalidad.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedLocalidad))
            )
            .andExpect(status().isOk());

        // Validate the Localidad in the database
        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeUpdate);
        Localidad testLocalidad = localidadList.get(localidadList.size() - 1);
        assertThat(testLocalidad.getNombreLocalidad()).isEqualTo(UPDATED_NOMBRE_LOCALIDAD);
    }

    @Test
    @Transactional
    void putNonExistingLocalidad() throws Exception {
        int databaseSizeBeforeUpdate = localidadRepository.findAll().size();
        localidad.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLocalidadMockMvc
            .perform(
                put(ENTITY_API_URL_ID, localidad.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(localidad))
            )
            .andExpect(status().isBadRequest());

        // Validate the Localidad in the database
        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchLocalidad() throws Exception {
        int databaseSizeBeforeUpdate = localidadRepository.findAll().size();
        localidad.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLocalidadMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(localidad))
            )
            .andExpect(status().isBadRequest());

        // Validate the Localidad in the database
        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamLocalidad() throws Exception {
        int databaseSizeBeforeUpdate = localidadRepository.findAll().size();
        localidad.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLocalidadMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(localidad)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Localidad in the database
        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateLocalidadWithPatch() throws Exception {
        // Initialize the database
        localidadRepository.saveAndFlush(localidad);

        int databaseSizeBeforeUpdate = localidadRepository.findAll().size();

        // Update the localidad using partial update
        Localidad partialUpdatedLocalidad = new Localidad();
        partialUpdatedLocalidad.setId(localidad.getId());

        partialUpdatedLocalidad.nombreLocalidad(UPDATED_NOMBRE_LOCALIDAD);

        restLocalidadMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLocalidad.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLocalidad))
            )
            .andExpect(status().isOk());

        // Validate the Localidad in the database
        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeUpdate);
        Localidad testLocalidad = localidadList.get(localidadList.size() - 1);
        assertThat(testLocalidad.getNombreLocalidad()).isEqualTo(UPDATED_NOMBRE_LOCALIDAD);
    }

    @Test
    @Transactional
    void fullUpdateLocalidadWithPatch() throws Exception {
        // Initialize the database
        localidadRepository.saveAndFlush(localidad);

        int databaseSizeBeforeUpdate = localidadRepository.findAll().size();

        // Update the localidad using partial update
        Localidad partialUpdatedLocalidad = new Localidad();
        partialUpdatedLocalidad.setId(localidad.getId());

        partialUpdatedLocalidad.nombreLocalidad(UPDATED_NOMBRE_LOCALIDAD);

        restLocalidadMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLocalidad.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLocalidad))
            )
            .andExpect(status().isOk());

        // Validate the Localidad in the database
        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeUpdate);
        Localidad testLocalidad = localidadList.get(localidadList.size() - 1);
        assertThat(testLocalidad.getNombreLocalidad()).isEqualTo(UPDATED_NOMBRE_LOCALIDAD);
    }

    @Test
    @Transactional
    void patchNonExistingLocalidad() throws Exception {
        int databaseSizeBeforeUpdate = localidadRepository.findAll().size();
        localidad.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLocalidadMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, localidad.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(localidad))
            )
            .andExpect(status().isBadRequest());

        // Validate the Localidad in the database
        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchLocalidad() throws Exception {
        int databaseSizeBeforeUpdate = localidadRepository.findAll().size();
        localidad.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLocalidadMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(localidad))
            )
            .andExpect(status().isBadRequest());

        // Validate the Localidad in the database
        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamLocalidad() throws Exception {
        int databaseSizeBeforeUpdate = localidadRepository.findAll().size();
        localidad.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLocalidadMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(localidad))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Localidad in the database
        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteLocalidad() throws Exception {
        // Initialize the database
        localidadRepository.saveAndFlush(localidad);

        int databaseSizeBeforeDelete = localidadRepository.findAll().size();

        // Delete the localidad
        restLocalidadMockMvc
            .perform(delete(ENTITY_API_URL_ID, localidad.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
