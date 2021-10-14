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
import soldimet.domain.Banco;
import soldimet.repository.BancoRepository;

/**
 * Integration tests for the {@link BancoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class BancoResourceIT {

    private static final String DEFAULT_NOMBRE_BANCO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_BANCO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/bancos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private BancoRepository bancoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBancoMockMvc;

    private Banco banco;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Banco createEntity(EntityManager em) {
        Banco banco = new Banco().nombreBanco(DEFAULT_NOMBRE_BANCO);
        return banco;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Banco createUpdatedEntity(EntityManager em) {
        Banco banco = new Banco().nombreBanco(UPDATED_NOMBRE_BANCO);
        return banco;
    }

    @BeforeEach
    public void initTest() {
        banco = createEntity(em);
    }

    @Test
    @Transactional
    void createBanco() throws Exception {
        int databaseSizeBeforeCreate = bancoRepository.findAll().size();
        // Create the Banco
        restBancoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(banco)))
            .andExpect(status().isCreated());

        // Validate the Banco in the database
        List<Banco> bancoList = bancoRepository.findAll();
        assertThat(bancoList).hasSize(databaseSizeBeforeCreate + 1);
        Banco testBanco = bancoList.get(bancoList.size() - 1);
        assertThat(testBanco.getNombreBanco()).isEqualTo(DEFAULT_NOMBRE_BANCO);
    }

    @Test
    @Transactional
    void createBancoWithExistingId() throws Exception {
        // Create the Banco with an existing ID
        banco.setId(1L);

        int databaseSizeBeforeCreate = bancoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBancoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(banco)))
            .andExpect(status().isBadRequest());

        // Validate the Banco in the database
        List<Banco> bancoList = bancoRepository.findAll();
        assertThat(bancoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreBancoIsRequired() throws Exception {
        int databaseSizeBeforeTest = bancoRepository.findAll().size();
        // set the field null
        banco.setNombreBanco(null);

        // Create the Banco, which fails.

        restBancoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(banco)))
            .andExpect(status().isBadRequest());

        List<Banco> bancoList = bancoRepository.findAll();
        assertThat(bancoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllBancos() throws Exception {
        // Initialize the database
        bancoRepository.saveAndFlush(banco);

        // Get all the bancoList
        restBancoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(banco.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreBanco").value(hasItem(DEFAULT_NOMBRE_BANCO)));
    }

    @Test
    @Transactional
    void getBanco() throws Exception {
        // Initialize the database
        bancoRepository.saveAndFlush(banco);

        // Get the banco
        restBancoMockMvc
            .perform(get(ENTITY_API_URL_ID, banco.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(banco.getId().intValue()))
            .andExpect(jsonPath("$.nombreBanco").value(DEFAULT_NOMBRE_BANCO));
    }

    @Test
    @Transactional
    void getNonExistingBanco() throws Exception {
        // Get the banco
        restBancoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewBanco() throws Exception {
        // Initialize the database
        bancoRepository.saveAndFlush(banco);

        int databaseSizeBeforeUpdate = bancoRepository.findAll().size();

        // Update the banco
        Banco updatedBanco = bancoRepository.findById(banco.getId()).get();
        // Disconnect from session so that the updates on updatedBanco are not directly saved in db
        em.detach(updatedBanco);
        updatedBanco.nombreBanco(UPDATED_NOMBRE_BANCO);

        restBancoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedBanco.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedBanco))
            )
            .andExpect(status().isOk());

        // Validate the Banco in the database
        List<Banco> bancoList = bancoRepository.findAll();
        assertThat(bancoList).hasSize(databaseSizeBeforeUpdate);
        Banco testBanco = bancoList.get(bancoList.size() - 1);
        assertThat(testBanco.getNombreBanco()).isEqualTo(UPDATED_NOMBRE_BANCO);
    }

    @Test
    @Transactional
    void putNonExistingBanco() throws Exception {
        int databaseSizeBeforeUpdate = bancoRepository.findAll().size();
        banco.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBancoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, banco.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(banco))
            )
            .andExpect(status().isBadRequest());

        // Validate the Banco in the database
        List<Banco> bancoList = bancoRepository.findAll();
        assertThat(bancoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchBanco() throws Exception {
        int databaseSizeBeforeUpdate = bancoRepository.findAll().size();
        banco.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBancoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(banco))
            )
            .andExpect(status().isBadRequest());

        // Validate the Banco in the database
        List<Banco> bancoList = bancoRepository.findAll();
        assertThat(bancoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamBanco() throws Exception {
        int databaseSizeBeforeUpdate = bancoRepository.findAll().size();
        banco.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBancoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(banco)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Banco in the database
        List<Banco> bancoList = bancoRepository.findAll();
        assertThat(bancoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateBancoWithPatch() throws Exception {
        // Initialize the database
        bancoRepository.saveAndFlush(banco);

        int databaseSizeBeforeUpdate = bancoRepository.findAll().size();

        // Update the banco using partial update
        Banco partialUpdatedBanco = new Banco();
        partialUpdatedBanco.setId(banco.getId());

        partialUpdatedBanco.nombreBanco(UPDATED_NOMBRE_BANCO);

        restBancoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBanco.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBanco))
            )
            .andExpect(status().isOk());

        // Validate the Banco in the database
        List<Banco> bancoList = bancoRepository.findAll();
        assertThat(bancoList).hasSize(databaseSizeBeforeUpdate);
        Banco testBanco = bancoList.get(bancoList.size() - 1);
        assertThat(testBanco.getNombreBanco()).isEqualTo(UPDATED_NOMBRE_BANCO);
    }

    @Test
    @Transactional
    void fullUpdateBancoWithPatch() throws Exception {
        // Initialize the database
        bancoRepository.saveAndFlush(banco);

        int databaseSizeBeforeUpdate = bancoRepository.findAll().size();

        // Update the banco using partial update
        Banco partialUpdatedBanco = new Banco();
        partialUpdatedBanco.setId(banco.getId());

        partialUpdatedBanco.nombreBanco(UPDATED_NOMBRE_BANCO);

        restBancoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBanco.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBanco))
            )
            .andExpect(status().isOk());

        // Validate the Banco in the database
        List<Banco> bancoList = bancoRepository.findAll();
        assertThat(bancoList).hasSize(databaseSizeBeforeUpdate);
        Banco testBanco = bancoList.get(bancoList.size() - 1);
        assertThat(testBanco.getNombreBanco()).isEqualTo(UPDATED_NOMBRE_BANCO);
    }

    @Test
    @Transactional
    void patchNonExistingBanco() throws Exception {
        int databaseSizeBeforeUpdate = bancoRepository.findAll().size();
        banco.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBancoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, banco.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(banco))
            )
            .andExpect(status().isBadRequest());

        // Validate the Banco in the database
        List<Banco> bancoList = bancoRepository.findAll();
        assertThat(bancoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchBanco() throws Exception {
        int databaseSizeBeforeUpdate = bancoRepository.findAll().size();
        banco.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBancoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(banco))
            )
            .andExpect(status().isBadRequest());

        // Validate the Banco in the database
        List<Banco> bancoList = bancoRepository.findAll();
        assertThat(bancoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamBanco() throws Exception {
        int databaseSizeBeforeUpdate = bancoRepository.findAll().size();
        banco.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBancoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(banco)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Banco in the database
        List<Banco> bancoList = bancoRepository.findAll();
        assertThat(bancoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteBanco() throws Exception {
        // Initialize the database
        bancoRepository.saveAndFlush(banco);

        int databaseSizeBeforeDelete = bancoRepository.findAll().size();

        // Delete the banco
        restBancoMockMvc
            .perform(delete(ENTITY_API_URL_ID, banco.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Banco> bancoList = bancoRepository.findAll();
        assertThat(bancoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
