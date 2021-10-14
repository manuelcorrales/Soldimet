package soldimet.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.time.ZoneId;
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
import soldimet.domain.ListaPrecioDesdeHasta;
import soldimet.repository.ListaPrecioDesdeHastaRepository;

/**
 * Integration tests for the {@link ListaPrecioDesdeHastaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ListaPrecioDesdeHastaResourceIT {

    private static final LocalDate DEFAULT_FECHA_DESDE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_DESDE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_HASTA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_HASTA = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/lista-precio-desde-hastas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ListaPrecioDesdeHastaRepository listaPrecioDesdeHastaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restListaPrecioDesdeHastaMockMvc;

    private ListaPrecioDesdeHasta listaPrecioDesdeHasta;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ListaPrecioDesdeHasta createEntity(EntityManager em) {
        ListaPrecioDesdeHasta listaPrecioDesdeHasta = new ListaPrecioDesdeHasta()
            .fechaDesde(DEFAULT_FECHA_DESDE)
            .fechaHasta(DEFAULT_FECHA_HASTA);
        return listaPrecioDesdeHasta;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ListaPrecioDesdeHasta createUpdatedEntity(EntityManager em) {
        ListaPrecioDesdeHasta listaPrecioDesdeHasta = new ListaPrecioDesdeHasta()
            .fechaDesde(UPDATED_FECHA_DESDE)
            .fechaHasta(UPDATED_FECHA_HASTA);
        return listaPrecioDesdeHasta;
    }

    @BeforeEach
    public void initTest() {
        listaPrecioDesdeHasta = createEntity(em);
    }

    @Test
    @Transactional
    void createListaPrecioDesdeHasta() throws Exception {
        int databaseSizeBeforeCreate = listaPrecioDesdeHastaRepository.findAll().size();
        // Create the ListaPrecioDesdeHasta
        restListaPrecioDesdeHastaMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(listaPrecioDesdeHasta))
            )
            .andExpect(status().isCreated());

        // Validate the ListaPrecioDesdeHasta in the database
        List<ListaPrecioDesdeHasta> listaPrecioDesdeHastaList = listaPrecioDesdeHastaRepository.findAll();
        assertThat(listaPrecioDesdeHastaList).hasSize(databaseSizeBeforeCreate + 1);
        ListaPrecioDesdeHasta testListaPrecioDesdeHasta = listaPrecioDesdeHastaList.get(listaPrecioDesdeHastaList.size() - 1);
        assertThat(testListaPrecioDesdeHasta.getFechaDesde()).isEqualTo(DEFAULT_FECHA_DESDE);
        assertThat(testListaPrecioDesdeHasta.getFechaHasta()).isEqualTo(DEFAULT_FECHA_HASTA);
    }

    @Test
    @Transactional
    void createListaPrecioDesdeHastaWithExistingId() throws Exception {
        // Create the ListaPrecioDesdeHasta with an existing ID
        listaPrecioDesdeHasta.setId(1L);

        int databaseSizeBeforeCreate = listaPrecioDesdeHastaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restListaPrecioDesdeHastaMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(listaPrecioDesdeHasta))
            )
            .andExpect(status().isBadRequest());

        // Validate the ListaPrecioDesdeHasta in the database
        List<ListaPrecioDesdeHasta> listaPrecioDesdeHastaList = listaPrecioDesdeHastaRepository.findAll();
        assertThat(listaPrecioDesdeHastaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkFechaDesdeIsRequired() throws Exception {
        int databaseSizeBeforeTest = listaPrecioDesdeHastaRepository.findAll().size();
        // set the field null
        listaPrecioDesdeHasta.setFechaDesde(null);

        // Create the ListaPrecioDesdeHasta, which fails.

        restListaPrecioDesdeHastaMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(listaPrecioDesdeHasta))
            )
            .andExpect(status().isBadRequest());

        List<ListaPrecioDesdeHasta> listaPrecioDesdeHastaList = listaPrecioDesdeHastaRepository.findAll();
        assertThat(listaPrecioDesdeHastaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllListaPrecioDesdeHastas() throws Exception {
        // Initialize the database
        listaPrecioDesdeHastaRepository.saveAndFlush(listaPrecioDesdeHasta);

        // Get all the listaPrecioDesdeHastaList
        restListaPrecioDesdeHastaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(listaPrecioDesdeHasta.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaDesde").value(hasItem(DEFAULT_FECHA_DESDE.toString())))
            .andExpect(jsonPath("$.[*].fechaHasta").value(hasItem(DEFAULT_FECHA_HASTA.toString())));
    }

    @Test
    @Transactional
    void getListaPrecioDesdeHasta() throws Exception {
        // Initialize the database
        listaPrecioDesdeHastaRepository.saveAndFlush(listaPrecioDesdeHasta);

        // Get the listaPrecioDesdeHasta
        restListaPrecioDesdeHastaMockMvc
            .perform(get(ENTITY_API_URL_ID, listaPrecioDesdeHasta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(listaPrecioDesdeHasta.getId().intValue()))
            .andExpect(jsonPath("$.fechaDesde").value(DEFAULT_FECHA_DESDE.toString()))
            .andExpect(jsonPath("$.fechaHasta").value(DEFAULT_FECHA_HASTA.toString()));
    }

    @Test
    @Transactional
    void getNonExistingListaPrecioDesdeHasta() throws Exception {
        // Get the listaPrecioDesdeHasta
        restListaPrecioDesdeHastaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewListaPrecioDesdeHasta() throws Exception {
        // Initialize the database
        listaPrecioDesdeHastaRepository.saveAndFlush(listaPrecioDesdeHasta);

        int databaseSizeBeforeUpdate = listaPrecioDesdeHastaRepository.findAll().size();

        // Update the listaPrecioDesdeHasta
        ListaPrecioDesdeHasta updatedListaPrecioDesdeHasta = listaPrecioDesdeHastaRepository.findById(listaPrecioDesdeHasta.getId()).get();
        // Disconnect from session so that the updates on updatedListaPrecioDesdeHasta are not directly saved in db
        em.detach(updatedListaPrecioDesdeHasta);
        updatedListaPrecioDesdeHasta.fechaDesde(UPDATED_FECHA_DESDE).fechaHasta(UPDATED_FECHA_HASTA);

        restListaPrecioDesdeHastaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedListaPrecioDesdeHasta.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedListaPrecioDesdeHasta))
            )
            .andExpect(status().isOk());

        // Validate the ListaPrecioDesdeHasta in the database
        List<ListaPrecioDesdeHasta> listaPrecioDesdeHastaList = listaPrecioDesdeHastaRepository.findAll();
        assertThat(listaPrecioDesdeHastaList).hasSize(databaseSizeBeforeUpdate);
        ListaPrecioDesdeHasta testListaPrecioDesdeHasta = listaPrecioDesdeHastaList.get(listaPrecioDesdeHastaList.size() - 1);
        assertThat(testListaPrecioDesdeHasta.getFechaDesde()).isEqualTo(UPDATED_FECHA_DESDE);
        assertThat(testListaPrecioDesdeHasta.getFechaHasta()).isEqualTo(UPDATED_FECHA_HASTA);
    }

    @Test
    @Transactional
    void putNonExistingListaPrecioDesdeHasta() throws Exception {
        int databaseSizeBeforeUpdate = listaPrecioDesdeHastaRepository.findAll().size();
        listaPrecioDesdeHasta.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restListaPrecioDesdeHastaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, listaPrecioDesdeHasta.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(listaPrecioDesdeHasta))
            )
            .andExpect(status().isBadRequest());

        // Validate the ListaPrecioDesdeHasta in the database
        List<ListaPrecioDesdeHasta> listaPrecioDesdeHastaList = listaPrecioDesdeHastaRepository.findAll();
        assertThat(listaPrecioDesdeHastaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchListaPrecioDesdeHasta() throws Exception {
        int databaseSizeBeforeUpdate = listaPrecioDesdeHastaRepository.findAll().size();
        listaPrecioDesdeHasta.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restListaPrecioDesdeHastaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(listaPrecioDesdeHasta))
            )
            .andExpect(status().isBadRequest());

        // Validate the ListaPrecioDesdeHasta in the database
        List<ListaPrecioDesdeHasta> listaPrecioDesdeHastaList = listaPrecioDesdeHastaRepository.findAll();
        assertThat(listaPrecioDesdeHastaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamListaPrecioDesdeHasta() throws Exception {
        int databaseSizeBeforeUpdate = listaPrecioDesdeHastaRepository.findAll().size();
        listaPrecioDesdeHasta.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restListaPrecioDesdeHastaMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(listaPrecioDesdeHasta))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ListaPrecioDesdeHasta in the database
        List<ListaPrecioDesdeHasta> listaPrecioDesdeHastaList = listaPrecioDesdeHastaRepository.findAll();
        assertThat(listaPrecioDesdeHastaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateListaPrecioDesdeHastaWithPatch() throws Exception {
        // Initialize the database
        listaPrecioDesdeHastaRepository.saveAndFlush(listaPrecioDesdeHasta);

        int databaseSizeBeforeUpdate = listaPrecioDesdeHastaRepository.findAll().size();

        // Update the listaPrecioDesdeHasta using partial update
        ListaPrecioDesdeHasta partialUpdatedListaPrecioDesdeHasta = new ListaPrecioDesdeHasta();
        partialUpdatedListaPrecioDesdeHasta.setId(listaPrecioDesdeHasta.getId());

        restListaPrecioDesdeHastaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedListaPrecioDesdeHasta.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedListaPrecioDesdeHasta))
            )
            .andExpect(status().isOk());

        // Validate the ListaPrecioDesdeHasta in the database
        List<ListaPrecioDesdeHasta> listaPrecioDesdeHastaList = listaPrecioDesdeHastaRepository.findAll();
        assertThat(listaPrecioDesdeHastaList).hasSize(databaseSizeBeforeUpdate);
        ListaPrecioDesdeHasta testListaPrecioDesdeHasta = listaPrecioDesdeHastaList.get(listaPrecioDesdeHastaList.size() - 1);
        assertThat(testListaPrecioDesdeHasta.getFechaDesde()).isEqualTo(DEFAULT_FECHA_DESDE);
        assertThat(testListaPrecioDesdeHasta.getFechaHasta()).isEqualTo(DEFAULT_FECHA_HASTA);
    }

    @Test
    @Transactional
    void fullUpdateListaPrecioDesdeHastaWithPatch() throws Exception {
        // Initialize the database
        listaPrecioDesdeHastaRepository.saveAndFlush(listaPrecioDesdeHasta);

        int databaseSizeBeforeUpdate = listaPrecioDesdeHastaRepository.findAll().size();

        // Update the listaPrecioDesdeHasta using partial update
        ListaPrecioDesdeHasta partialUpdatedListaPrecioDesdeHasta = new ListaPrecioDesdeHasta();
        partialUpdatedListaPrecioDesdeHasta.setId(listaPrecioDesdeHasta.getId());

        partialUpdatedListaPrecioDesdeHasta.fechaDesde(UPDATED_FECHA_DESDE).fechaHasta(UPDATED_FECHA_HASTA);

        restListaPrecioDesdeHastaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedListaPrecioDesdeHasta.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedListaPrecioDesdeHasta))
            )
            .andExpect(status().isOk());

        // Validate the ListaPrecioDesdeHasta in the database
        List<ListaPrecioDesdeHasta> listaPrecioDesdeHastaList = listaPrecioDesdeHastaRepository.findAll();
        assertThat(listaPrecioDesdeHastaList).hasSize(databaseSizeBeforeUpdate);
        ListaPrecioDesdeHasta testListaPrecioDesdeHasta = listaPrecioDesdeHastaList.get(listaPrecioDesdeHastaList.size() - 1);
        assertThat(testListaPrecioDesdeHasta.getFechaDesde()).isEqualTo(UPDATED_FECHA_DESDE);
        assertThat(testListaPrecioDesdeHasta.getFechaHasta()).isEqualTo(UPDATED_FECHA_HASTA);
    }

    @Test
    @Transactional
    void patchNonExistingListaPrecioDesdeHasta() throws Exception {
        int databaseSizeBeforeUpdate = listaPrecioDesdeHastaRepository.findAll().size();
        listaPrecioDesdeHasta.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restListaPrecioDesdeHastaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, listaPrecioDesdeHasta.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(listaPrecioDesdeHasta))
            )
            .andExpect(status().isBadRequest());

        // Validate the ListaPrecioDesdeHasta in the database
        List<ListaPrecioDesdeHasta> listaPrecioDesdeHastaList = listaPrecioDesdeHastaRepository.findAll();
        assertThat(listaPrecioDesdeHastaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchListaPrecioDesdeHasta() throws Exception {
        int databaseSizeBeforeUpdate = listaPrecioDesdeHastaRepository.findAll().size();
        listaPrecioDesdeHasta.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restListaPrecioDesdeHastaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(listaPrecioDesdeHasta))
            )
            .andExpect(status().isBadRequest());

        // Validate the ListaPrecioDesdeHasta in the database
        List<ListaPrecioDesdeHasta> listaPrecioDesdeHastaList = listaPrecioDesdeHastaRepository.findAll();
        assertThat(listaPrecioDesdeHastaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamListaPrecioDesdeHasta() throws Exception {
        int databaseSizeBeforeUpdate = listaPrecioDesdeHastaRepository.findAll().size();
        listaPrecioDesdeHasta.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restListaPrecioDesdeHastaMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(listaPrecioDesdeHasta))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ListaPrecioDesdeHasta in the database
        List<ListaPrecioDesdeHasta> listaPrecioDesdeHastaList = listaPrecioDesdeHastaRepository.findAll();
        assertThat(listaPrecioDesdeHastaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteListaPrecioDesdeHasta() throws Exception {
        // Initialize the database
        listaPrecioDesdeHastaRepository.saveAndFlush(listaPrecioDesdeHasta);

        int databaseSizeBeforeDelete = listaPrecioDesdeHastaRepository.findAll().size();

        // Delete the listaPrecioDesdeHasta
        restListaPrecioDesdeHastaMockMvc
            .perform(delete(ENTITY_API_URL_ID, listaPrecioDesdeHasta.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ListaPrecioDesdeHasta> listaPrecioDesdeHastaList = listaPrecioDesdeHastaRepository.findAll();
        assertThat(listaPrecioDesdeHastaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
