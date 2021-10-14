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
import soldimet.domain.FormaDePago;
import soldimet.domain.PagoCheque;
import soldimet.repository.PagoChequeRepository;

/**
 * Integration tests for the {@link PagoChequeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PagoChequeResourceIT {

    private static final String DEFAULT_NUMERO_CHEQUE = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_CHEQUE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/pago-cheques";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PagoChequeRepository pagoChequeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPagoChequeMockMvc;

    private PagoCheque pagoCheque;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PagoCheque createEntity(EntityManager em) {
        PagoCheque pagoCheque = new PagoCheque().numeroCheque(DEFAULT_NUMERO_CHEQUE);
        // Add required entity
        FormaDePago formaDePago;
        if (TestUtil.findAll(em, FormaDePago.class).isEmpty()) {
            formaDePago = FormaDePagoResourceIT.createEntity(em);
            em.persist(formaDePago);
            em.flush();
        } else {
            formaDePago = TestUtil.findAll(em, FormaDePago.class).get(0);
        }
        pagoCheque.setFormaDePago(formaDePago);
        // Add required entity
        Banco banco;
        if (TestUtil.findAll(em, Banco.class).isEmpty()) {
            banco = BancoResourceIT.createEntity(em);
            em.persist(banco);
            em.flush();
        } else {
            banco = TestUtil.findAll(em, Banco.class).get(0);
        }
        pagoCheque.setBanco(banco);
        return pagoCheque;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PagoCheque createUpdatedEntity(EntityManager em) {
        PagoCheque pagoCheque = new PagoCheque().numeroCheque(UPDATED_NUMERO_CHEQUE);
        // Add required entity
        FormaDePago formaDePago;
        if (TestUtil.findAll(em, FormaDePago.class).isEmpty()) {
            formaDePago = FormaDePagoResourceIT.createUpdatedEntity(em);
            em.persist(formaDePago);
            em.flush();
        } else {
            formaDePago = TestUtil.findAll(em, FormaDePago.class).get(0);
        }
        pagoCheque.setFormaDePago(formaDePago);
        // Add required entity
        Banco banco;
        if (TestUtil.findAll(em, Banco.class).isEmpty()) {
            banco = BancoResourceIT.createUpdatedEntity(em);
            em.persist(banco);
            em.flush();
        } else {
            banco = TestUtil.findAll(em, Banco.class).get(0);
        }
        pagoCheque.setBanco(banco);
        return pagoCheque;
    }

    @BeforeEach
    public void initTest() {
        pagoCheque = createEntity(em);
    }

    @Test
    @Transactional
    void createPagoCheque() throws Exception {
        int databaseSizeBeforeCreate = pagoChequeRepository.findAll().size();
        // Create the PagoCheque
        restPagoChequeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pagoCheque)))
            .andExpect(status().isCreated());

        // Validate the PagoCheque in the database
        List<PagoCheque> pagoChequeList = pagoChequeRepository.findAll();
        assertThat(pagoChequeList).hasSize(databaseSizeBeforeCreate + 1);
        PagoCheque testPagoCheque = pagoChequeList.get(pagoChequeList.size() - 1);
        assertThat(testPagoCheque.getNumeroCheque()).isEqualTo(DEFAULT_NUMERO_CHEQUE);
    }

    @Test
    @Transactional
    void createPagoChequeWithExistingId() throws Exception {
        // Create the PagoCheque with an existing ID
        pagoCheque.setId(1L);

        int databaseSizeBeforeCreate = pagoChequeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPagoChequeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pagoCheque)))
            .andExpect(status().isBadRequest());

        // Validate the PagoCheque in the database
        List<PagoCheque> pagoChequeList = pagoChequeRepository.findAll();
        assertThat(pagoChequeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNumeroChequeIsRequired() throws Exception {
        int databaseSizeBeforeTest = pagoChequeRepository.findAll().size();
        // set the field null
        pagoCheque.setNumeroCheque(null);

        // Create the PagoCheque, which fails.

        restPagoChequeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pagoCheque)))
            .andExpect(status().isBadRequest());

        List<PagoCheque> pagoChequeList = pagoChequeRepository.findAll();
        assertThat(pagoChequeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPagoCheques() throws Exception {
        // Initialize the database
        pagoChequeRepository.saveAndFlush(pagoCheque);

        // Get all the pagoChequeList
        restPagoChequeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pagoCheque.getId().intValue())))
            .andExpect(jsonPath("$.[*].numeroCheque").value(hasItem(DEFAULT_NUMERO_CHEQUE)));
    }

    @Test
    @Transactional
    void getPagoCheque() throws Exception {
        // Initialize the database
        pagoChequeRepository.saveAndFlush(pagoCheque);

        // Get the pagoCheque
        restPagoChequeMockMvc
            .perform(get(ENTITY_API_URL_ID, pagoCheque.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pagoCheque.getId().intValue()))
            .andExpect(jsonPath("$.numeroCheque").value(DEFAULT_NUMERO_CHEQUE));
    }

    @Test
    @Transactional
    void getNonExistingPagoCheque() throws Exception {
        // Get the pagoCheque
        restPagoChequeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPagoCheque() throws Exception {
        // Initialize the database
        pagoChequeRepository.saveAndFlush(pagoCheque);

        int databaseSizeBeforeUpdate = pagoChequeRepository.findAll().size();

        // Update the pagoCheque
        PagoCheque updatedPagoCheque = pagoChequeRepository.findById(pagoCheque.getId()).get();
        // Disconnect from session so that the updates on updatedPagoCheque are not directly saved in db
        em.detach(updatedPagoCheque);
        updatedPagoCheque.numeroCheque(UPDATED_NUMERO_CHEQUE);

        restPagoChequeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPagoCheque.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPagoCheque))
            )
            .andExpect(status().isOk());

        // Validate the PagoCheque in the database
        List<PagoCheque> pagoChequeList = pagoChequeRepository.findAll();
        assertThat(pagoChequeList).hasSize(databaseSizeBeforeUpdate);
        PagoCheque testPagoCheque = pagoChequeList.get(pagoChequeList.size() - 1);
        assertThat(testPagoCheque.getNumeroCheque()).isEqualTo(UPDATED_NUMERO_CHEQUE);
    }

    @Test
    @Transactional
    void putNonExistingPagoCheque() throws Exception {
        int databaseSizeBeforeUpdate = pagoChequeRepository.findAll().size();
        pagoCheque.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPagoChequeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, pagoCheque.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pagoCheque))
            )
            .andExpect(status().isBadRequest());

        // Validate the PagoCheque in the database
        List<PagoCheque> pagoChequeList = pagoChequeRepository.findAll();
        assertThat(pagoChequeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPagoCheque() throws Exception {
        int databaseSizeBeforeUpdate = pagoChequeRepository.findAll().size();
        pagoCheque.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPagoChequeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pagoCheque))
            )
            .andExpect(status().isBadRequest());

        // Validate the PagoCheque in the database
        List<PagoCheque> pagoChequeList = pagoChequeRepository.findAll();
        assertThat(pagoChequeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPagoCheque() throws Exception {
        int databaseSizeBeforeUpdate = pagoChequeRepository.findAll().size();
        pagoCheque.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPagoChequeMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pagoCheque)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the PagoCheque in the database
        List<PagoCheque> pagoChequeList = pagoChequeRepository.findAll();
        assertThat(pagoChequeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePagoChequeWithPatch() throws Exception {
        // Initialize the database
        pagoChequeRepository.saveAndFlush(pagoCheque);

        int databaseSizeBeforeUpdate = pagoChequeRepository.findAll().size();

        // Update the pagoCheque using partial update
        PagoCheque partialUpdatedPagoCheque = new PagoCheque();
        partialUpdatedPagoCheque.setId(pagoCheque.getId());

        restPagoChequeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPagoCheque.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPagoCheque))
            )
            .andExpect(status().isOk());

        // Validate the PagoCheque in the database
        List<PagoCheque> pagoChequeList = pagoChequeRepository.findAll();
        assertThat(pagoChequeList).hasSize(databaseSizeBeforeUpdate);
        PagoCheque testPagoCheque = pagoChequeList.get(pagoChequeList.size() - 1);
        assertThat(testPagoCheque.getNumeroCheque()).isEqualTo(DEFAULT_NUMERO_CHEQUE);
    }

    @Test
    @Transactional
    void fullUpdatePagoChequeWithPatch() throws Exception {
        // Initialize the database
        pagoChequeRepository.saveAndFlush(pagoCheque);

        int databaseSizeBeforeUpdate = pagoChequeRepository.findAll().size();

        // Update the pagoCheque using partial update
        PagoCheque partialUpdatedPagoCheque = new PagoCheque();
        partialUpdatedPagoCheque.setId(pagoCheque.getId());

        partialUpdatedPagoCheque.numeroCheque(UPDATED_NUMERO_CHEQUE);

        restPagoChequeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPagoCheque.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPagoCheque))
            )
            .andExpect(status().isOk());

        // Validate the PagoCheque in the database
        List<PagoCheque> pagoChequeList = pagoChequeRepository.findAll();
        assertThat(pagoChequeList).hasSize(databaseSizeBeforeUpdate);
        PagoCheque testPagoCheque = pagoChequeList.get(pagoChequeList.size() - 1);
        assertThat(testPagoCheque.getNumeroCheque()).isEqualTo(UPDATED_NUMERO_CHEQUE);
    }

    @Test
    @Transactional
    void patchNonExistingPagoCheque() throws Exception {
        int databaseSizeBeforeUpdate = pagoChequeRepository.findAll().size();
        pagoCheque.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPagoChequeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, pagoCheque.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pagoCheque))
            )
            .andExpect(status().isBadRequest());

        // Validate the PagoCheque in the database
        List<PagoCheque> pagoChequeList = pagoChequeRepository.findAll();
        assertThat(pagoChequeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPagoCheque() throws Exception {
        int databaseSizeBeforeUpdate = pagoChequeRepository.findAll().size();
        pagoCheque.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPagoChequeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pagoCheque))
            )
            .andExpect(status().isBadRequest());

        // Validate the PagoCheque in the database
        List<PagoCheque> pagoChequeList = pagoChequeRepository.findAll();
        assertThat(pagoChequeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPagoCheque() throws Exception {
        int databaseSizeBeforeUpdate = pagoChequeRepository.findAll().size();
        pagoCheque.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPagoChequeMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(pagoCheque))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PagoCheque in the database
        List<PagoCheque> pagoChequeList = pagoChequeRepository.findAll();
        assertThat(pagoChequeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePagoCheque() throws Exception {
        // Initialize the database
        pagoChequeRepository.saveAndFlush(pagoCheque);

        int databaseSizeBeforeDelete = pagoChequeRepository.findAll().size();

        // Delete the pagoCheque
        restPagoChequeMockMvc
            .perform(delete(ENTITY_API_URL_ID, pagoCheque.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PagoCheque> pagoChequeList = pagoChequeRepository.findAll();
        assertThat(pagoChequeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
