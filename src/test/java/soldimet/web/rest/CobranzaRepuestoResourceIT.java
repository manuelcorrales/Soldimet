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
import soldimet.domain.CobranzaRepuesto;
import soldimet.domain.TipoRepuesto;
import soldimet.repository.CobranzaRepuestoRepository;

/**
 * Integration tests for the {@link CobranzaRepuestoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CobranzaRepuestoResourceIT {

    private static final Float DEFAULT_VALOR = 0F;
    private static final Float UPDATED_VALOR = 1F;

    private static final String ENTITY_API_URL = "/api/cobranza-repuestos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CobranzaRepuestoRepository cobranzaRepuestoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCobranzaRepuestoMockMvc;

    private CobranzaRepuesto cobranzaRepuesto;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CobranzaRepuesto createEntity(EntityManager em) {
        CobranzaRepuesto cobranzaRepuesto = new CobranzaRepuesto().valor(DEFAULT_VALOR);
        // Add required entity
        TipoRepuesto tipoRepuesto;
        if (TestUtil.findAll(em, TipoRepuesto.class).isEmpty()) {
            tipoRepuesto = TipoRepuestoResourceIT.createEntity(em);
            em.persist(tipoRepuesto);
            em.flush();
        } else {
            tipoRepuesto = TestUtil.findAll(em, TipoRepuesto.class).get(0);
        }
        cobranzaRepuesto.setTipoRepuesto(tipoRepuesto);
        return cobranzaRepuesto;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CobranzaRepuesto createUpdatedEntity(EntityManager em) {
        CobranzaRepuesto cobranzaRepuesto = new CobranzaRepuesto().valor(UPDATED_VALOR);
        // Add required entity
        TipoRepuesto tipoRepuesto;
        if (TestUtil.findAll(em, TipoRepuesto.class).isEmpty()) {
            tipoRepuesto = TipoRepuestoResourceIT.createUpdatedEntity(em);
            em.persist(tipoRepuesto);
            em.flush();
        } else {
            tipoRepuesto = TestUtil.findAll(em, TipoRepuesto.class).get(0);
        }
        cobranzaRepuesto.setTipoRepuesto(tipoRepuesto);
        return cobranzaRepuesto;
    }

    @BeforeEach
    public void initTest() {
        cobranzaRepuesto = createEntity(em);
    }

    @Test
    @Transactional
    void createCobranzaRepuesto() throws Exception {
        int databaseSizeBeforeCreate = cobranzaRepuestoRepository.findAll().size();
        // Create the CobranzaRepuesto
        restCobranzaRepuestoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cobranzaRepuesto))
            )
            .andExpect(status().isCreated());

        // Validate the CobranzaRepuesto in the database
        List<CobranzaRepuesto> cobranzaRepuestoList = cobranzaRepuestoRepository.findAll();
        assertThat(cobranzaRepuestoList).hasSize(databaseSizeBeforeCreate + 1);
        CobranzaRepuesto testCobranzaRepuesto = cobranzaRepuestoList.get(cobranzaRepuestoList.size() - 1);
        assertThat(testCobranzaRepuesto.getValor()).isEqualTo(DEFAULT_VALOR);
    }

    @Test
    @Transactional
    void createCobranzaRepuestoWithExistingId() throws Exception {
        // Create the CobranzaRepuesto with an existing ID
        cobranzaRepuesto.setId(1L);

        int databaseSizeBeforeCreate = cobranzaRepuestoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCobranzaRepuestoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cobranzaRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the CobranzaRepuesto in the database
        List<CobranzaRepuesto> cobranzaRepuestoList = cobranzaRepuestoRepository.findAll();
        assertThat(cobranzaRepuestoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkValorIsRequired() throws Exception {
        int databaseSizeBeforeTest = cobranzaRepuestoRepository.findAll().size();
        // set the field null
        cobranzaRepuesto.setValor(null);

        // Create the CobranzaRepuesto, which fails.

        restCobranzaRepuestoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cobranzaRepuesto))
            )
            .andExpect(status().isBadRequest());

        List<CobranzaRepuesto> cobranzaRepuestoList = cobranzaRepuestoRepository.findAll();
        assertThat(cobranzaRepuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCobranzaRepuestos() throws Exception {
        // Initialize the database
        cobranzaRepuestoRepository.saveAndFlush(cobranzaRepuesto);

        // Get all the cobranzaRepuestoList
        restCobranzaRepuestoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cobranzaRepuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.doubleValue())));
    }

    @Test
    @Transactional
    void getCobranzaRepuesto() throws Exception {
        // Initialize the database
        cobranzaRepuestoRepository.saveAndFlush(cobranzaRepuesto);

        // Get the cobranzaRepuesto
        restCobranzaRepuestoMockMvc
            .perform(get(ENTITY_API_URL_ID, cobranzaRepuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cobranzaRepuesto.getId().intValue()))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingCobranzaRepuesto() throws Exception {
        // Get the cobranzaRepuesto
        restCobranzaRepuestoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCobranzaRepuesto() throws Exception {
        // Initialize the database
        cobranzaRepuestoRepository.saveAndFlush(cobranzaRepuesto);

        int databaseSizeBeforeUpdate = cobranzaRepuestoRepository.findAll().size();

        // Update the cobranzaRepuesto
        CobranzaRepuesto updatedCobranzaRepuesto = cobranzaRepuestoRepository.findById(cobranzaRepuesto.getId()).get();
        // Disconnect from session so that the updates on updatedCobranzaRepuesto are not directly saved in db
        em.detach(updatedCobranzaRepuesto);
        updatedCobranzaRepuesto.valor(UPDATED_VALOR);

        restCobranzaRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCobranzaRepuesto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCobranzaRepuesto))
            )
            .andExpect(status().isOk());

        // Validate the CobranzaRepuesto in the database
        List<CobranzaRepuesto> cobranzaRepuestoList = cobranzaRepuestoRepository.findAll();
        assertThat(cobranzaRepuestoList).hasSize(databaseSizeBeforeUpdate);
        CobranzaRepuesto testCobranzaRepuesto = cobranzaRepuestoList.get(cobranzaRepuestoList.size() - 1);
        assertThat(testCobranzaRepuesto.getValor()).isEqualTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    void putNonExistingCobranzaRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = cobranzaRepuestoRepository.findAll().size();
        cobranzaRepuesto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCobranzaRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cobranzaRepuesto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cobranzaRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the CobranzaRepuesto in the database
        List<CobranzaRepuesto> cobranzaRepuestoList = cobranzaRepuestoRepository.findAll();
        assertThat(cobranzaRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCobranzaRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = cobranzaRepuestoRepository.findAll().size();
        cobranzaRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCobranzaRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cobranzaRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the CobranzaRepuesto in the database
        List<CobranzaRepuesto> cobranzaRepuestoList = cobranzaRepuestoRepository.findAll();
        assertThat(cobranzaRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCobranzaRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = cobranzaRepuestoRepository.findAll().size();
        cobranzaRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCobranzaRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cobranzaRepuesto))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CobranzaRepuesto in the database
        List<CobranzaRepuesto> cobranzaRepuestoList = cobranzaRepuestoRepository.findAll();
        assertThat(cobranzaRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCobranzaRepuestoWithPatch() throws Exception {
        // Initialize the database
        cobranzaRepuestoRepository.saveAndFlush(cobranzaRepuesto);

        int databaseSizeBeforeUpdate = cobranzaRepuestoRepository.findAll().size();

        // Update the cobranzaRepuesto using partial update
        CobranzaRepuesto partialUpdatedCobranzaRepuesto = new CobranzaRepuesto();
        partialUpdatedCobranzaRepuesto.setId(cobranzaRepuesto.getId());

        partialUpdatedCobranzaRepuesto.valor(UPDATED_VALOR);

        restCobranzaRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCobranzaRepuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCobranzaRepuesto))
            )
            .andExpect(status().isOk());

        // Validate the CobranzaRepuesto in the database
        List<CobranzaRepuesto> cobranzaRepuestoList = cobranzaRepuestoRepository.findAll();
        assertThat(cobranzaRepuestoList).hasSize(databaseSizeBeforeUpdate);
        CobranzaRepuesto testCobranzaRepuesto = cobranzaRepuestoList.get(cobranzaRepuestoList.size() - 1);
        assertThat(testCobranzaRepuesto.getValor()).isEqualTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    void fullUpdateCobranzaRepuestoWithPatch() throws Exception {
        // Initialize the database
        cobranzaRepuestoRepository.saveAndFlush(cobranzaRepuesto);

        int databaseSizeBeforeUpdate = cobranzaRepuestoRepository.findAll().size();

        // Update the cobranzaRepuesto using partial update
        CobranzaRepuesto partialUpdatedCobranzaRepuesto = new CobranzaRepuesto();
        partialUpdatedCobranzaRepuesto.setId(cobranzaRepuesto.getId());

        partialUpdatedCobranzaRepuesto.valor(UPDATED_VALOR);

        restCobranzaRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCobranzaRepuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCobranzaRepuesto))
            )
            .andExpect(status().isOk());

        // Validate the CobranzaRepuesto in the database
        List<CobranzaRepuesto> cobranzaRepuestoList = cobranzaRepuestoRepository.findAll();
        assertThat(cobranzaRepuestoList).hasSize(databaseSizeBeforeUpdate);
        CobranzaRepuesto testCobranzaRepuesto = cobranzaRepuestoList.get(cobranzaRepuestoList.size() - 1);
        assertThat(testCobranzaRepuesto.getValor()).isEqualTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    void patchNonExistingCobranzaRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = cobranzaRepuestoRepository.findAll().size();
        cobranzaRepuesto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCobranzaRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cobranzaRepuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cobranzaRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the CobranzaRepuesto in the database
        List<CobranzaRepuesto> cobranzaRepuestoList = cobranzaRepuestoRepository.findAll();
        assertThat(cobranzaRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCobranzaRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = cobranzaRepuestoRepository.findAll().size();
        cobranzaRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCobranzaRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cobranzaRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the CobranzaRepuesto in the database
        List<CobranzaRepuesto> cobranzaRepuestoList = cobranzaRepuestoRepository.findAll();
        assertThat(cobranzaRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCobranzaRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = cobranzaRepuestoRepository.findAll().size();
        cobranzaRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCobranzaRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cobranzaRepuesto))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CobranzaRepuesto in the database
        List<CobranzaRepuesto> cobranzaRepuestoList = cobranzaRepuestoRepository.findAll();
        assertThat(cobranzaRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCobranzaRepuesto() throws Exception {
        // Initialize the database
        cobranzaRepuestoRepository.saveAndFlush(cobranzaRepuesto);

        int databaseSizeBeforeDelete = cobranzaRepuestoRepository.findAll().size();

        // Delete the cobranzaRepuesto
        restCobranzaRepuestoMockMvc
            .perform(delete(ENTITY_API_URL_ID, cobranzaRepuesto.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CobranzaRepuesto> cobranzaRepuestoList = cobranzaRepuestoRepository.findAll();
        assertThat(cobranzaRepuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
