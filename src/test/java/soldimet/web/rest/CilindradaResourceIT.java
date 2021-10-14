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
import soldimet.repository.CilindradaRepository;

/**
 * Integration tests for the {@link CilindradaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CilindradaResourceIT {

    private static final Integer DEFAULT_CANTIDAD_DE_CILINDROS = 1;
    private static final Integer UPDATED_CANTIDAD_DE_CILINDROS = 2;

    private static final String ENTITY_API_URL = "/api/cilindradas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CilindradaRepository cilindradaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCilindradaMockMvc;

    private Cilindrada cilindrada;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cilindrada createEntity(EntityManager em) {
        Cilindrada cilindrada = new Cilindrada().cantidadDeCilindros(DEFAULT_CANTIDAD_DE_CILINDROS);
        return cilindrada;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cilindrada createUpdatedEntity(EntityManager em) {
        Cilindrada cilindrada = new Cilindrada().cantidadDeCilindros(UPDATED_CANTIDAD_DE_CILINDROS);
        return cilindrada;
    }

    @BeforeEach
    public void initTest() {
        cilindrada = createEntity(em);
    }

    @Test
    @Transactional
    void createCilindrada() throws Exception {
        int databaseSizeBeforeCreate = cilindradaRepository.findAll().size();
        // Create the Cilindrada
        restCilindradaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cilindrada)))
            .andExpect(status().isCreated());

        // Validate the Cilindrada in the database
        List<Cilindrada> cilindradaList = cilindradaRepository.findAll();
        assertThat(cilindradaList).hasSize(databaseSizeBeforeCreate + 1);
        Cilindrada testCilindrada = cilindradaList.get(cilindradaList.size() - 1);
        assertThat(testCilindrada.getCantidadDeCilindros()).isEqualTo(DEFAULT_CANTIDAD_DE_CILINDROS);
    }

    @Test
    @Transactional
    void createCilindradaWithExistingId() throws Exception {
        // Create the Cilindrada with an existing ID
        cilindrada.setId(1L);

        int databaseSizeBeforeCreate = cilindradaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCilindradaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cilindrada)))
            .andExpect(status().isBadRequest());

        // Validate the Cilindrada in the database
        List<Cilindrada> cilindradaList = cilindradaRepository.findAll();
        assertThat(cilindradaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkCantidadDeCilindrosIsRequired() throws Exception {
        int databaseSizeBeforeTest = cilindradaRepository.findAll().size();
        // set the field null
        cilindrada.setCantidadDeCilindros(null);

        // Create the Cilindrada, which fails.

        restCilindradaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cilindrada)))
            .andExpect(status().isBadRequest());

        List<Cilindrada> cilindradaList = cilindradaRepository.findAll();
        assertThat(cilindradaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCilindradas() throws Exception {
        // Initialize the database
        cilindradaRepository.saveAndFlush(cilindrada);

        // Get all the cilindradaList
        restCilindradaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cilindrada.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidadDeCilindros").value(hasItem(DEFAULT_CANTIDAD_DE_CILINDROS)));
    }

    @Test
    @Transactional
    void getCilindrada() throws Exception {
        // Initialize the database
        cilindradaRepository.saveAndFlush(cilindrada);

        // Get the cilindrada
        restCilindradaMockMvc
            .perform(get(ENTITY_API_URL_ID, cilindrada.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cilindrada.getId().intValue()))
            .andExpect(jsonPath("$.cantidadDeCilindros").value(DEFAULT_CANTIDAD_DE_CILINDROS));
    }

    @Test
    @Transactional
    void getNonExistingCilindrada() throws Exception {
        // Get the cilindrada
        restCilindradaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCilindrada() throws Exception {
        // Initialize the database
        cilindradaRepository.saveAndFlush(cilindrada);

        int databaseSizeBeforeUpdate = cilindradaRepository.findAll().size();

        // Update the cilindrada
        Cilindrada updatedCilindrada = cilindradaRepository.findById(cilindrada.getId()).get();
        // Disconnect from session so that the updates on updatedCilindrada are not directly saved in db
        em.detach(updatedCilindrada);
        updatedCilindrada.cantidadDeCilindros(UPDATED_CANTIDAD_DE_CILINDROS);

        restCilindradaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCilindrada.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCilindrada))
            )
            .andExpect(status().isOk());

        // Validate the Cilindrada in the database
        List<Cilindrada> cilindradaList = cilindradaRepository.findAll();
        assertThat(cilindradaList).hasSize(databaseSizeBeforeUpdate);
        Cilindrada testCilindrada = cilindradaList.get(cilindradaList.size() - 1);
        assertThat(testCilindrada.getCantidadDeCilindros()).isEqualTo(UPDATED_CANTIDAD_DE_CILINDROS);
    }

    @Test
    @Transactional
    void putNonExistingCilindrada() throws Exception {
        int databaseSizeBeforeUpdate = cilindradaRepository.findAll().size();
        cilindrada.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCilindradaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cilindrada.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cilindrada))
            )
            .andExpect(status().isBadRequest());

        // Validate the Cilindrada in the database
        List<Cilindrada> cilindradaList = cilindradaRepository.findAll();
        assertThat(cilindradaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCilindrada() throws Exception {
        int databaseSizeBeforeUpdate = cilindradaRepository.findAll().size();
        cilindrada.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCilindradaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cilindrada))
            )
            .andExpect(status().isBadRequest());

        // Validate the Cilindrada in the database
        List<Cilindrada> cilindradaList = cilindradaRepository.findAll();
        assertThat(cilindradaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCilindrada() throws Exception {
        int databaseSizeBeforeUpdate = cilindradaRepository.findAll().size();
        cilindrada.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCilindradaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cilindrada)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Cilindrada in the database
        List<Cilindrada> cilindradaList = cilindradaRepository.findAll();
        assertThat(cilindradaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCilindradaWithPatch() throws Exception {
        // Initialize the database
        cilindradaRepository.saveAndFlush(cilindrada);

        int databaseSizeBeforeUpdate = cilindradaRepository.findAll().size();

        // Update the cilindrada using partial update
        Cilindrada partialUpdatedCilindrada = new Cilindrada();
        partialUpdatedCilindrada.setId(cilindrada.getId());

        restCilindradaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCilindrada.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCilindrada))
            )
            .andExpect(status().isOk());

        // Validate the Cilindrada in the database
        List<Cilindrada> cilindradaList = cilindradaRepository.findAll();
        assertThat(cilindradaList).hasSize(databaseSizeBeforeUpdate);
        Cilindrada testCilindrada = cilindradaList.get(cilindradaList.size() - 1);
        assertThat(testCilindrada.getCantidadDeCilindros()).isEqualTo(DEFAULT_CANTIDAD_DE_CILINDROS);
    }

    @Test
    @Transactional
    void fullUpdateCilindradaWithPatch() throws Exception {
        // Initialize the database
        cilindradaRepository.saveAndFlush(cilindrada);

        int databaseSizeBeforeUpdate = cilindradaRepository.findAll().size();

        // Update the cilindrada using partial update
        Cilindrada partialUpdatedCilindrada = new Cilindrada();
        partialUpdatedCilindrada.setId(cilindrada.getId());

        partialUpdatedCilindrada.cantidadDeCilindros(UPDATED_CANTIDAD_DE_CILINDROS);

        restCilindradaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCilindrada.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCilindrada))
            )
            .andExpect(status().isOk());

        // Validate the Cilindrada in the database
        List<Cilindrada> cilindradaList = cilindradaRepository.findAll();
        assertThat(cilindradaList).hasSize(databaseSizeBeforeUpdate);
        Cilindrada testCilindrada = cilindradaList.get(cilindradaList.size() - 1);
        assertThat(testCilindrada.getCantidadDeCilindros()).isEqualTo(UPDATED_CANTIDAD_DE_CILINDROS);
    }

    @Test
    @Transactional
    void patchNonExistingCilindrada() throws Exception {
        int databaseSizeBeforeUpdate = cilindradaRepository.findAll().size();
        cilindrada.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCilindradaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cilindrada.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cilindrada))
            )
            .andExpect(status().isBadRequest());

        // Validate the Cilindrada in the database
        List<Cilindrada> cilindradaList = cilindradaRepository.findAll();
        assertThat(cilindradaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCilindrada() throws Exception {
        int databaseSizeBeforeUpdate = cilindradaRepository.findAll().size();
        cilindrada.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCilindradaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cilindrada))
            )
            .andExpect(status().isBadRequest());

        // Validate the Cilindrada in the database
        List<Cilindrada> cilindradaList = cilindradaRepository.findAll();
        assertThat(cilindradaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCilindrada() throws Exception {
        int databaseSizeBeforeUpdate = cilindradaRepository.findAll().size();
        cilindrada.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCilindradaMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cilindrada))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Cilindrada in the database
        List<Cilindrada> cilindradaList = cilindradaRepository.findAll();
        assertThat(cilindradaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCilindrada() throws Exception {
        // Initialize the database
        cilindradaRepository.saveAndFlush(cilindrada);

        int databaseSizeBeforeDelete = cilindradaRepository.findAll().size();

        // Delete the cilindrada
        restCilindradaMockMvc
            .perform(delete(ENTITY_API_URL_ID, cilindrada.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Cilindrada> cilindradaList = cilindradaRepository.findAll();
        assertThat(cilindradaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
