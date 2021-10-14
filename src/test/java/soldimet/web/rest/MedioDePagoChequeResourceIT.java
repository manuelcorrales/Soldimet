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
import soldimet.domain.MedioDePagoCheque;
import soldimet.repository.MedioDePagoChequeRepository;

/**
 * Integration tests for the {@link MedioDePagoChequeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MedioDePagoChequeResourceIT {

    private static final String DEFAULT_NUMERO_CHEQUE = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_CHEQUE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/medio-de-pago-cheques";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MedioDePagoChequeRepository medioDePagoChequeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMedioDePagoChequeMockMvc;

    private MedioDePagoCheque medioDePagoCheque;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MedioDePagoCheque createEntity(EntityManager em) {
        MedioDePagoCheque medioDePagoCheque = new MedioDePagoCheque().numeroCheque(DEFAULT_NUMERO_CHEQUE);
        // Add required entity
        Banco banco;
        if (TestUtil.findAll(em, Banco.class).isEmpty()) {
            banco = BancoResourceIT.createEntity(em);
            em.persist(banco);
            em.flush();
        } else {
            banco = TestUtil.findAll(em, Banco.class).get(0);
        }
        medioDePagoCheque.setBanco(banco);
        return medioDePagoCheque;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MedioDePagoCheque createUpdatedEntity(EntityManager em) {
        MedioDePagoCheque medioDePagoCheque = new MedioDePagoCheque().numeroCheque(UPDATED_NUMERO_CHEQUE);
        // Add required entity
        Banco banco;
        if (TestUtil.findAll(em, Banco.class).isEmpty()) {
            banco = BancoResourceIT.createUpdatedEntity(em);
            em.persist(banco);
            em.flush();
        } else {
            banco = TestUtil.findAll(em, Banco.class).get(0);
        }
        medioDePagoCheque.setBanco(banco);
        return medioDePagoCheque;
    }

    @BeforeEach
    public void initTest() {
        medioDePagoCheque = createEntity(em);
    }

    @Test
    @Transactional
    void createMedioDePagoCheque() throws Exception {
        int databaseSizeBeforeCreate = medioDePagoChequeRepository.findAll().size();
        // Create the MedioDePagoCheque
        restMedioDePagoChequeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(medioDePagoCheque))
            )
            .andExpect(status().isCreated());

        // Validate the MedioDePagoCheque in the database
        List<MedioDePagoCheque> medioDePagoChequeList = medioDePagoChequeRepository.findAll();
        assertThat(medioDePagoChequeList).hasSize(databaseSizeBeforeCreate + 1);
        MedioDePagoCheque testMedioDePagoCheque = medioDePagoChequeList.get(medioDePagoChequeList.size() - 1);
        assertThat(testMedioDePagoCheque.getNumeroCheque()).isEqualTo(DEFAULT_NUMERO_CHEQUE);
    }

    @Test
    @Transactional
    void createMedioDePagoChequeWithExistingId() throws Exception {
        // Create the MedioDePagoCheque with an existing ID
        medioDePagoCheque.setId(1L);

        int databaseSizeBeforeCreate = medioDePagoChequeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedioDePagoChequeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(medioDePagoCheque))
            )
            .andExpect(status().isBadRequest());

        // Validate the MedioDePagoCheque in the database
        List<MedioDePagoCheque> medioDePagoChequeList = medioDePagoChequeRepository.findAll();
        assertThat(medioDePagoChequeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNumeroChequeIsRequired() throws Exception {
        int databaseSizeBeforeTest = medioDePagoChequeRepository.findAll().size();
        // set the field null
        medioDePagoCheque.setNumeroCheque(null);

        // Create the MedioDePagoCheque, which fails.

        restMedioDePagoChequeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(medioDePagoCheque))
            )
            .andExpect(status().isBadRequest());

        List<MedioDePagoCheque> medioDePagoChequeList = medioDePagoChequeRepository.findAll();
        assertThat(medioDePagoChequeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllMedioDePagoCheques() throws Exception {
        // Initialize the database
        medioDePagoChequeRepository.saveAndFlush(medioDePagoCheque);

        // Get all the medioDePagoChequeList
        restMedioDePagoChequeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medioDePagoCheque.getId().intValue())))
            .andExpect(jsonPath("$.[*].numeroCheque").value(hasItem(DEFAULT_NUMERO_CHEQUE)));
    }

    @Test
    @Transactional
    void getMedioDePagoCheque() throws Exception {
        // Initialize the database
        medioDePagoChequeRepository.saveAndFlush(medioDePagoCheque);

        // Get the medioDePagoCheque
        restMedioDePagoChequeMockMvc
            .perform(get(ENTITY_API_URL_ID, medioDePagoCheque.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(medioDePagoCheque.getId().intValue()))
            .andExpect(jsonPath("$.numeroCheque").value(DEFAULT_NUMERO_CHEQUE));
    }

    @Test
    @Transactional
    void getNonExistingMedioDePagoCheque() throws Exception {
        // Get the medioDePagoCheque
        restMedioDePagoChequeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMedioDePagoCheque() throws Exception {
        // Initialize the database
        medioDePagoChequeRepository.saveAndFlush(medioDePagoCheque);

        int databaseSizeBeforeUpdate = medioDePagoChequeRepository.findAll().size();

        // Update the medioDePagoCheque
        MedioDePagoCheque updatedMedioDePagoCheque = medioDePagoChequeRepository.findById(medioDePagoCheque.getId()).get();
        // Disconnect from session so that the updates on updatedMedioDePagoCheque are not directly saved in db
        em.detach(updatedMedioDePagoCheque);
        updatedMedioDePagoCheque.numeroCheque(UPDATED_NUMERO_CHEQUE);

        restMedioDePagoChequeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMedioDePagoCheque.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMedioDePagoCheque))
            )
            .andExpect(status().isOk());

        // Validate the MedioDePagoCheque in the database
        List<MedioDePagoCheque> medioDePagoChequeList = medioDePagoChequeRepository.findAll();
        assertThat(medioDePagoChequeList).hasSize(databaseSizeBeforeUpdate);
        MedioDePagoCheque testMedioDePagoCheque = medioDePagoChequeList.get(medioDePagoChequeList.size() - 1);
        assertThat(testMedioDePagoCheque.getNumeroCheque()).isEqualTo(UPDATED_NUMERO_CHEQUE);
    }

    @Test
    @Transactional
    void putNonExistingMedioDePagoCheque() throws Exception {
        int databaseSizeBeforeUpdate = medioDePagoChequeRepository.findAll().size();
        medioDePagoCheque.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedioDePagoChequeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, medioDePagoCheque.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(medioDePagoCheque))
            )
            .andExpect(status().isBadRequest());

        // Validate the MedioDePagoCheque in the database
        List<MedioDePagoCheque> medioDePagoChequeList = medioDePagoChequeRepository.findAll();
        assertThat(medioDePagoChequeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMedioDePagoCheque() throws Exception {
        int databaseSizeBeforeUpdate = medioDePagoChequeRepository.findAll().size();
        medioDePagoCheque.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMedioDePagoChequeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(medioDePagoCheque))
            )
            .andExpect(status().isBadRequest());

        // Validate the MedioDePagoCheque in the database
        List<MedioDePagoCheque> medioDePagoChequeList = medioDePagoChequeRepository.findAll();
        assertThat(medioDePagoChequeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMedioDePagoCheque() throws Exception {
        int databaseSizeBeforeUpdate = medioDePagoChequeRepository.findAll().size();
        medioDePagoCheque.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMedioDePagoChequeMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(medioDePagoCheque))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MedioDePagoCheque in the database
        List<MedioDePagoCheque> medioDePagoChequeList = medioDePagoChequeRepository.findAll();
        assertThat(medioDePagoChequeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMedioDePagoChequeWithPatch() throws Exception {
        // Initialize the database
        medioDePagoChequeRepository.saveAndFlush(medioDePagoCheque);

        int databaseSizeBeforeUpdate = medioDePagoChequeRepository.findAll().size();

        // Update the medioDePagoCheque using partial update
        MedioDePagoCheque partialUpdatedMedioDePagoCheque = new MedioDePagoCheque();
        partialUpdatedMedioDePagoCheque.setId(medioDePagoCheque.getId());

        partialUpdatedMedioDePagoCheque.numeroCheque(UPDATED_NUMERO_CHEQUE);

        restMedioDePagoChequeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMedioDePagoCheque.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMedioDePagoCheque))
            )
            .andExpect(status().isOk());

        // Validate the MedioDePagoCheque in the database
        List<MedioDePagoCheque> medioDePagoChequeList = medioDePagoChequeRepository.findAll();
        assertThat(medioDePagoChequeList).hasSize(databaseSizeBeforeUpdate);
        MedioDePagoCheque testMedioDePagoCheque = medioDePagoChequeList.get(medioDePagoChequeList.size() - 1);
        assertThat(testMedioDePagoCheque.getNumeroCheque()).isEqualTo(UPDATED_NUMERO_CHEQUE);
    }

    @Test
    @Transactional
    void fullUpdateMedioDePagoChequeWithPatch() throws Exception {
        // Initialize the database
        medioDePagoChequeRepository.saveAndFlush(medioDePagoCheque);

        int databaseSizeBeforeUpdate = medioDePagoChequeRepository.findAll().size();

        // Update the medioDePagoCheque using partial update
        MedioDePagoCheque partialUpdatedMedioDePagoCheque = new MedioDePagoCheque();
        partialUpdatedMedioDePagoCheque.setId(medioDePagoCheque.getId());

        partialUpdatedMedioDePagoCheque.numeroCheque(UPDATED_NUMERO_CHEQUE);

        restMedioDePagoChequeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMedioDePagoCheque.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMedioDePagoCheque))
            )
            .andExpect(status().isOk());

        // Validate the MedioDePagoCheque in the database
        List<MedioDePagoCheque> medioDePagoChequeList = medioDePagoChequeRepository.findAll();
        assertThat(medioDePagoChequeList).hasSize(databaseSizeBeforeUpdate);
        MedioDePagoCheque testMedioDePagoCheque = medioDePagoChequeList.get(medioDePagoChequeList.size() - 1);
        assertThat(testMedioDePagoCheque.getNumeroCheque()).isEqualTo(UPDATED_NUMERO_CHEQUE);
    }

    @Test
    @Transactional
    void patchNonExistingMedioDePagoCheque() throws Exception {
        int databaseSizeBeforeUpdate = medioDePagoChequeRepository.findAll().size();
        medioDePagoCheque.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedioDePagoChequeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, medioDePagoCheque.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(medioDePagoCheque))
            )
            .andExpect(status().isBadRequest());

        // Validate the MedioDePagoCheque in the database
        List<MedioDePagoCheque> medioDePagoChequeList = medioDePagoChequeRepository.findAll();
        assertThat(medioDePagoChequeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMedioDePagoCheque() throws Exception {
        int databaseSizeBeforeUpdate = medioDePagoChequeRepository.findAll().size();
        medioDePagoCheque.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMedioDePagoChequeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(medioDePagoCheque))
            )
            .andExpect(status().isBadRequest());

        // Validate the MedioDePagoCheque in the database
        List<MedioDePagoCheque> medioDePagoChequeList = medioDePagoChequeRepository.findAll();
        assertThat(medioDePagoChequeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMedioDePagoCheque() throws Exception {
        int databaseSizeBeforeUpdate = medioDePagoChequeRepository.findAll().size();
        medioDePagoCheque.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMedioDePagoChequeMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(medioDePagoCheque))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MedioDePagoCheque in the database
        List<MedioDePagoCheque> medioDePagoChequeList = medioDePagoChequeRepository.findAll();
        assertThat(medioDePagoChequeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMedioDePagoCheque() throws Exception {
        // Initialize the database
        medioDePagoChequeRepository.saveAndFlush(medioDePagoCheque);

        int databaseSizeBeforeDelete = medioDePagoChequeRepository.findAll().size();

        // Delete the medioDePagoCheque
        restMedioDePagoChequeMockMvc
            .perform(delete(ENTITY_API_URL_ID, medioDePagoCheque.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MedioDePagoCheque> medioDePagoChequeList = medioDePagoChequeRepository.findAll();
        assertThat(medioDePagoChequeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
