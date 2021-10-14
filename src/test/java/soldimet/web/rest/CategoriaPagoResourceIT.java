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
import soldimet.domain.CategoriaPago;
import soldimet.repository.CategoriaPagoRepository;

/**
 * Integration tests for the {@link CategoriaPagoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CategoriaPagoResourceIT {

    private static final String DEFAULT_NOMBRE_CATEGORIA_PAGO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_CATEGORIA_PAGO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/categoria-pagos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CategoriaPagoRepository categoriaPagoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCategoriaPagoMockMvc;

    private CategoriaPago categoriaPago;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CategoriaPago createEntity(EntityManager em) {
        CategoriaPago categoriaPago = new CategoriaPago().nombreCategoriaPago(DEFAULT_NOMBRE_CATEGORIA_PAGO);
        return categoriaPago;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CategoriaPago createUpdatedEntity(EntityManager em) {
        CategoriaPago categoriaPago = new CategoriaPago().nombreCategoriaPago(UPDATED_NOMBRE_CATEGORIA_PAGO);
        return categoriaPago;
    }

    @BeforeEach
    public void initTest() {
        categoriaPago = createEntity(em);
    }

    @Test
    @Transactional
    void createCategoriaPago() throws Exception {
        int databaseSizeBeforeCreate = categoriaPagoRepository.findAll().size();
        // Create the CategoriaPago
        restCategoriaPagoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(categoriaPago)))
            .andExpect(status().isCreated());

        // Validate the CategoriaPago in the database
        List<CategoriaPago> categoriaPagoList = categoriaPagoRepository.findAll();
        assertThat(categoriaPagoList).hasSize(databaseSizeBeforeCreate + 1);
        CategoriaPago testCategoriaPago = categoriaPagoList.get(categoriaPagoList.size() - 1);
        assertThat(testCategoriaPago.getNombreCategoriaPago()).isEqualTo(DEFAULT_NOMBRE_CATEGORIA_PAGO);
    }

    @Test
    @Transactional
    void createCategoriaPagoWithExistingId() throws Exception {
        // Create the CategoriaPago with an existing ID
        categoriaPago.setId(1L);

        int databaseSizeBeforeCreate = categoriaPagoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCategoriaPagoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(categoriaPago)))
            .andExpect(status().isBadRequest());

        // Validate the CategoriaPago in the database
        List<CategoriaPago> categoriaPagoList = categoriaPagoRepository.findAll();
        assertThat(categoriaPagoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreCategoriaPagoIsRequired() throws Exception {
        int databaseSizeBeforeTest = categoriaPagoRepository.findAll().size();
        // set the field null
        categoriaPago.setNombreCategoriaPago(null);

        // Create the CategoriaPago, which fails.

        restCategoriaPagoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(categoriaPago)))
            .andExpect(status().isBadRequest());

        List<CategoriaPago> categoriaPagoList = categoriaPagoRepository.findAll();
        assertThat(categoriaPagoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCategoriaPagos() throws Exception {
        // Initialize the database
        categoriaPagoRepository.saveAndFlush(categoriaPago);

        // Get all the categoriaPagoList
        restCategoriaPagoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(categoriaPago.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreCategoriaPago").value(hasItem(DEFAULT_NOMBRE_CATEGORIA_PAGO)));
    }

    @Test
    @Transactional
    void getCategoriaPago() throws Exception {
        // Initialize the database
        categoriaPagoRepository.saveAndFlush(categoriaPago);

        // Get the categoriaPago
        restCategoriaPagoMockMvc
            .perform(get(ENTITY_API_URL_ID, categoriaPago.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(categoriaPago.getId().intValue()))
            .andExpect(jsonPath("$.nombreCategoriaPago").value(DEFAULT_NOMBRE_CATEGORIA_PAGO));
    }

    @Test
    @Transactional
    void getNonExistingCategoriaPago() throws Exception {
        // Get the categoriaPago
        restCategoriaPagoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCategoriaPago() throws Exception {
        // Initialize the database
        categoriaPagoRepository.saveAndFlush(categoriaPago);

        int databaseSizeBeforeUpdate = categoriaPagoRepository.findAll().size();

        // Update the categoriaPago
        CategoriaPago updatedCategoriaPago = categoriaPagoRepository.findById(categoriaPago.getId()).get();
        // Disconnect from session so that the updates on updatedCategoriaPago are not directly saved in db
        em.detach(updatedCategoriaPago);
        updatedCategoriaPago.nombreCategoriaPago(UPDATED_NOMBRE_CATEGORIA_PAGO);

        restCategoriaPagoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCategoriaPago.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCategoriaPago))
            )
            .andExpect(status().isOk());

        // Validate the CategoriaPago in the database
        List<CategoriaPago> categoriaPagoList = categoriaPagoRepository.findAll();
        assertThat(categoriaPagoList).hasSize(databaseSizeBeforeUpdate);
        CategoriaPago testCategoriaPago = categoriaPagoList.get(categoriaPagoList.size() - 1);
        assertThat(testCategoriaPago.getNombreCategoriaPago()).isEqualTo(UPDATED_NOMBRE_CATEGORIA_PAGO);
    }

    @Test
    @Transactional
    void putNonExistingCategoriaPago() throws Exception {
        int databaseSizeBeforeUpdate = categoriaPagoRepository.findAll().size();
        categoriaPago.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCategoriaPagoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, categoriaPago.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(categoriaPago))
            )
            .andExpect(status().isBadRequest());

        // Validate the CategoriaPago in the database
        List<CategoriaPago> categoriaPagoList = categoriaPagoRepository.findAll();
        assertThat(categoriaPagoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCategoriaPago() throws Exception {
        int databaseSizeBeforeUpdate = categoriaPagoRepository.findAll().size();
        categoriaPago.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCategoriaPagoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(categoriaPago))
            )
            .andExpect(status().isBadRequest());

        // Validate the CategoriaPago in the database
        List<CategoriaPago> categoriaPagoList = categoriaPagoRepository.findAll();
        assertThat(categoriaPagoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCategoriaPago() throws Exception {
        int databaseSizeBeforeUpdate = categoriaPagoRepository.findAll().size();
        categoriaPago.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCategoriaPagoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(categoriaPago)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CategoriaPago in the database
        List<CategoriaPago> categoriaPagoList = categoriaPagoRepository.findAll();
        assertThat(categoriaPagoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCategoriaPagoWithPatch() throws Exception {
        // Initialize the database
        categoriaPagoRepository.saveAndFlush(categoriaPago);

        int databaseSizeBeforeUpdate = categoriaPagoRepository.findAll().size();

        // Update the categoriaPago using partial update
        CategoriaPago partialUpdatedCategoriaPago = new CategoriaPago();
        partialUpdatedCategoriaPago.setId(categoriaPago.getId());

        partialUpdatedCategoriaPago.nombreCategoriaPago(UPDATED_NOMBRE_CATEGORIA_PAGO);

        restCategoriaPagoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCategoriaPago.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCategoriaPago))
            )
            .andExpect(status().isOk());

        // Validate the CategoriaPago in the database
        List<CategoriaPago> categoriaPagoList = categoriaPagoRepository.findAll();
        assertThat(categoriaPagoList).hasSize(databaseSizeBeforeUpdate);
        CategoriaPago testCategoriaPago = categoriaPagoList.get(categoriaPagoList.size() - 1);
        assertThat(testCategoriaPago.getNombreCategoriaPago()).isEqualTo(UPDATED_NOMBRE_CATEGORIA_PAGO);
    }

    @Test
    @Transactional
    void fullUpdateCategoriaPagoWithPatch() throws Exception {
        // Initialize the database
        categoriaPagoRepository.saveAndFlush(categoriaPago);

        int databaseSizeBeforeUpdate = categoriaPagoRepository.findAll().size();

        // Update the categoriaPago using partial update
        CategoriaPago partialUpdatedCategoriaPago = new CategoriaPago();
        partialUpdatedCategoriaPago.setId(categoriaPago.getId());

        partialUpdatedCategoriaPago.nombreCategoriaPago(UPDATED_NOMBRE_CATEGORIA_PAGO);

        restCategoriaPagoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCategoriaPago.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCategoriaPago))
            )
            .andExpect(status().isOk());

        // Validate the CategoriaPago in the database
        List<CategoriaPago> categoriaPagoList = categoriaPagoRepository.findAll();
        assertThat(categoriaPagoList).hasSize(databaseSizeBeforeUpdate);
        CategoriaPago testCategoriaPago = categoriaPagoList.get(categoriaPagoList.size() - 1);
        assertThat(testCategoriaPago.getNombreCategoriaPago()).isEqualTo(UPDATED_NOMBRE_CATEGORIA_PAGO);
    }

    @Test
    @Transactional
    void patchNonExistingCategoriaPago() throws Exception {
        int databaseSizeBeforeUpdate = categoriaPagoRepository.findAll().size();
        categoriaPago.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCategoriaPagoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, categoriaPago.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(categoriaPago))
            )
            .andExpect(status().isBadRequest());

        // Validate the CategoriaPago in the database
        List<CategoriaPago> categoriaPagoList = categoriaPagoRepository.findAll();
        assertThat(categoriaPagoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCategoriaPago() throws Exception {
        int databaseSizeBeforeUpdate = categoriaPagoRepository.findAll().size();
        categoriaPago.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCategoriaPagoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(categoriaPago))
            )
            .andExpect(status().isBadRequest());

        // Validate the CategoriaPago in the database
        List<CategoriaPago> categoriaPagoList = categoriaPagoRepository.findAll();
        assertThat(categoriaPagoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCategoriaPago() throws Exception {
        int databaseSizeBeforeUpdate = categoriaPagoRepository.findAll().size();
        categoriaPago.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCategoriaPagoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(categoriaPago))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CategoriaPago in the database
        List<CategoriaPago> categoriaPagoList = categoriaPagoRepository.findAll();
        assertThat(categoriaPagoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCategoriaPago() throws Exception {
        // Initialize the database
        categoriaPagoRepository.saveAndFlush(categoriaPago);

        int databaseSizeBeforeDelete = categoriaPagoRepository.findAll().size();

        // Delete the categoriaPago
        restCategoriaPagoMockMvc
            .perform(delete(ENTITY_API_URL_ID, categoriaPago.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CategoriaPago> categoriaPagoList = categoriaPagoRepository.findAll();
        assertThat(categoriaPagoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
