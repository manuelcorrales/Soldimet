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
import soldimet.domain.Marca;
import soldimet.repository.MarcaRepository;

/**
 * Integration tests for the {@link MarcaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MarcaResourceIT {

    private static final String DEFAULT_NOMBRE_MARCA = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_MARCA = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/marcas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MarcaRepository marcaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMarcaMockMvc;

    private Marca marca;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Marca createEntity(EntityManager em) {
        Marca marca = new Marca().nombreMarca(DEFAULT_NOMBRE_MARCA);
        return marca;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Marca createUpdatedEntity(EntityManager em) {
        Marca marca = new Marca().nombreMarca(UPDATED_NOMBRE_MARCA);
        return marca;
    }

    @BeforeEach
    public void initTest() {
        marca = createEntity(em);
    }

    @Test
    @Transactional
    void createMarca() throws Exception {
        int databaseSizeBeforeCreate = marcaRepository.findAll().size();
        // Create the Marca
        restMarcaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(marca)))
            .andExpect(status().isCreated());

        // Validate the Marca in the database
        List<Marca> marcaList = marcaRepository.findAll();
        assertThat(marcaList).hasSize(databaseSizeBeforeCreate + 1);
        Marca testMarca = marcaList.get(marcaList.size() - 1);
        assertThat(testMarca.getNombreMarca()).isEqualTo(DEFAULT_NOMBRE_MARCA);
    }

    @Test
    @Transactional
    void createMarcaWithExistingId() throws Exception {
        // Create the Marca with an existing ID
        marca.setId(1L);

        int databaseSizeBeforeCreate = marcaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMarcaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(marca)))
            .andExpect(status().isBadRequest());

        // Validate the Marca in the database
        List<Marca> marcaList = marcaRepository.findAll();
        assertThat(marcaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreMarcaIsRequired() throws Exception {
        int databaseSizeBeforeTest = marcaRepository.findAll().size();
        // set the field null
        marca.setNombreMarca(null);

        // Create the Marca, which fails.

        restMarcaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(marca)))
            .andExpect(status().isBadRequest());

        List<Marca> marcaList = marcaRepository.findAll();
        assertThat(marcaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllMarcas() throws Exception {
        // Initialize the database
        marcaRepository.saveAndFlush(marca);

        // Get all the marcaList
        restMarcaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(marca.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreMarca").value(hasItem(DEFAULT_NOMBRE_MARCA)));
    }

    @Test
    @Transactional
    void getMarca() throws Exception {
        // Initialize the database
        marcaRepository.saveAndFlush(marca);

        // Get the marca
        restMarcaMockMvc
            .perform(get(ENTITY_API_URL_ID, marca.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(marca.getId().intValue()))
            .andExpect(jsonPath("$.nombreMarca").value(DEFAULT_NOMBRE_MARCA));
    }

    @Test
    @Transactional
    void getNonExistingMarca() throws Exception {
        // Get the marca
        restMarcaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMarca() throws Exception {
        // Initialize the database
        marcaRepository.saveAndFlush(marca);

        int databaseSizeBeforeUpdate = marcaRepository.findAll().size();

        // Update the marca
        Marca updatedMarca = marcaRepository.findById(marca.getId()).get();
        // Disconnect from session so that the updates on updatedMarca are not directly saved in db
        em.detach(updatedMarca);
        updatedMarca.nombreMarca(UPDATED_NOMBRE_MARCA);

        restMarcaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMarca.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMarca))
            )
            .andExpect(status().isOk());

        // Validate the Marca in the database
        List<Marca> marcaList = marcaRepository.findAll();
        assertThat(marcaList).hasSize(databaseSizeBeforeUpdate);
        Marca testMarca = marcaList.get(marcaList.size() - 1);
        assertThat(testMarca.getNombreMarca()).isEqualTo(UPDATED_NOMBRE_MARCA);
    }

    @Test
    @Transactional
    void putNonExistingMarca() throws Exception {
        int databaseSizeBeforeUpdate = marcaRepository.findAll().size();
        marca.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMarcaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, marca.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(marca))
            )
            .andExpect(status().isBadRequest());

        // Validate the Marca in the database
        List<Marca> marcaList = marcaRepository.findAll();
        assertThat(marcaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMarca() throws Exception {
        int databaseSizeBeforeUpdate = marcaRepository.findAll().size();
        marca.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMarcaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(marca))
            )
            .andExpect(status().isBadRequest());

        // Validate the Marca in the database
        List<Marca> marcaList = marcaRepository.findAll();
        assertThat(marcaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMarca() throws Exception {
        int databaseSizeBeforeUpdate = marcaRepository.findAll().size();
        marca.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMarcaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(marca)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Marca in the database
        List<Marca> marcaList = marcaRepository.findAll();
        assertThat(marcaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMarcaWithPatch() throws Exception {
        // Initialize the database
        marcaRepository.saveAndFlush(marca);

        int databaseSizeBeforeUpdate = marcaRepository.findAll().size();

        // Update the marca using partial update
        Marca partialUpdatedMarca = new Marca();
        partialUpdatedMarca.setId(marca.getId());

        restMarcaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMarca.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMarca))
            )
            .andExpect(status().isOk());

        // Validate the Marca in the database
        List<Marca> marcaList = marcaRepository.findAll();
        assertThat(marcaList).hasSize(databaseSizeBeforeUpdate);
        Marca testMarca = marcaList.get(marcaList.size() - 1);
        assertThat(testMarca.getNombreMarca()).isEqualTo(DEFAULT_NOMBRE_MARCA);
    }

    @Test
    @Transactional
    void fullUpdateMarcaWithPatch() throws Exception {
        // Initialize the database
        marcaRepository.saveAndFlush(marca);

        int databaseSizeBeforeUpdate = marcaRepository.findAll().size();

        // Update the marca using partial update
        Marca partialUpdatedMarca = new Marca();
        partialUpdatedMarca.setId(marca.getId());

        partialUpdatedMarca.nombreMarca(UPDATED_NOMBRE_MARCA);

        restMarcaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMarca.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMarca))
            )
            .andExpect(status().isOk());

        // Validate the Marca in the database
        List<Marca> marcaList = marcaRepository.findAll();
        assertThat(marcaList).hasSize(databaseSizeBeforeUpdate);
        Marca testMarca = marcaList.get(marcaList.size() - 1);
        assertThat(testMarca.getNombreMarca()).isEqualTo(UPDATED_NOMBRE_MARCA);
    }

    @Test
    @Transactional
    void patchNonExistingMarca() throws Exception {
        int databaseSizeBeforeUpdate = marcaRepository.findAll().size();
        marca.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMarcaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, marca.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(marca))
            )
            .andExpect(status().isBadRequest());

        // Validate the Marca in the database
        List<Marca> marcaList = marcaRepository.findAll();
        assertThat(marcaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMarca() throws Exception {
        int databaseSizeBeforeUpdate = marcaRepository.findAll().size();
        marca.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMarcaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(marca))
            )
            .andExpect(status().isBadRequest());

        // Validate the Marca in the database
        List<Marca> marcaList = marcaRepository.findAll();
        assertThat(marcaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMarca() throws Exception {
        int databaseSizeBeforeUpdate = marcaRepository.findAll().size();
        marca.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMarcaMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(marca)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Marca in the database
        List<Marca> marcaList = marcaRepository.findAll();
        assertThat(marcaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMarca() throws Exception {
        // Initialize the database
        marcaRepository.saveAndFlush(marca);

        int databaseSizeBeforeDelete = marcaRepository.findAll().size();

        // Delete the marca
        restMarcaMockMvc
            .perform(delete(ENTITY_API_URL_ID, marca.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Marca> marcaList = marcaRepository.findAll();
        assertThat(marcaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
