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
import soldimet.domain.ListaPrecioRectificacionCRAM;
import soldimet.repository.ListaPrecioRectificacionCRAMRepository;

/**
 * Integration tests for the {@link ListaPrecioRectificacionCRAMResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ListaPrecioRectificacionCRAMResourceIT {

    private static final Integer DEFAULT_NUMERO_GRUPO = 1;
    private static final Integer UPDATED_NUMERO_GRUPO = 2;

    private static final String ENTITY_API_URL = "/api/lista-precio-rectificacion-crams";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ListaPrecioRectificacionCRAMRepository listaPrecioRectificacionCRAMRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restListaPrecioRectificacionCRAMMockMvc;

    private ListaPrecioRectificacionCRAM listaPrecioRectificacionCRAM;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ListaPrecioRectificacionCRAM createEntity(EntityManager em) {
        ListaPrecioRectificacionCRAM listaPrecioRectificacionCRAM = new ListaPrecioRectificacionCRAM().numeroGrupo(DEFAULT_NUMERO_GRUPO);
        return listaPrecioRectificacionCRAM;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ListaPrecioRectificacionCRAM createUpdatedEntity(EntityManager em) {
        ListaPrecioRectificacionCRAM listaPrecioRectificacionCRAM = new ListaPrecioRectificacionCRAM().numeroGrupo(UPDATED_NUMERO_GRUPO);
        return listaPrecioRectificacionCRAM;
    }

    @BeforeEach
    public void initTest() {
        listaPrecioRectificacionCRAM = createEntity(em);
    }

    @Test
    @Transactional
    void createListaPrecioRectificacionCRAM() throws Exception {
        int databaseSizeBeforeCreate = listaPrecioRectificacionCRAMRepository.findAll().size();
        // Create the ListaPrecioRectificacionCRAM
        restListaPrecioRectificacionCRAMMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(listaPrecioRectificacionCRAM))
            )
            .andExpect(status().isCreated());

        // Validate the ListaPrecioRectificacionCRAM in the database
        List<ListaPrecioRectificacionCRAM> listaPrecioRectificacionCRAMList = listaPrecioRectificacionCRAMRepository.findAll();
        assertThat(listaPrecioRectificacionCRAMList).hasSize(databaseSizeBeforeCreate + 1);
        ListaPrecioRectificacionCRAM testListaPrecioRectificacionCRAM = listaPrecioRectificacionCRAMList.get(
            listaPrecioRectificacionCRAMList.size() - 1
        );
        assertThat(testListaPrecioRectificacionCRAM.getNumeroGrupo()).isEqualTo(DEFAULT_NUMERO_GRUPO);
    }

    @Test
    @Transactional
    void createListaPrecioRectificacionCRAMWithExistingId() throws Exception {
        // Create the ListaPrecioRectificacionCRAM with an existing ID
        listaPrecioRectificacionCRAM.setId(1L);

        int databaseSizeBeforeCreate = listaPrecioRectificacionCRAMRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restListaPrecioRectificacionCRAMMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(listaPrecioRectificacionCRAM))
            )
            .andExpect(status().isBadRequest());

        // Validate the ListaPrecioRectificacionCRAM in the database
        List<ListaPrecioRectificacionCRAM> listaPrecioRectificacionCRAMList = listaPrecioRectificacionCRAMRepository.findAll();
        assertThat(listaPrecioRectificacionCRAMList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNumeroGrupoIsRequired() throws Exception {
        int databaseSizeBeforeTest = listaPrecioRectificacionCRAMRepository.findAll().size();
        // set the field null
        listaPrecioRectificacionCRAM.setNumeroGrupo(null);

        // Create the ListaPrecioRectificacionCRAM, which fails.

        restListaPrecioRectificacionCRAMMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(listaPrecioRectificacionCRAM))
            )
            .andExpect(status().isBadRequest());

        List<ListaPrecioRectificacionCRAM> listaPrecioRectificacionCRAMList = listaPrecioRectificacionCRAMRepository.findAll();
        assertThat(listaPrecioRectificacionCRAMList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllListaPrecioRectificacionCRAMS() throws Exception {
        // Initialize the database
        listaPrecioRectificacionCRAMRepository.saveAndFlush(listaPrecioRectificacionCRAM);

        // Get all the listaPrecioRectificacionCRAMList
        restListaPrecioRectificacionCRAMMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(listaPrecioRectificacionCRAM.getId().intValue())))
            .andExpect(jsonPath("$.[*].numeroGrupo").value(hasItem(DEFAULT_NUMERO_GRUPO)));
    }

    @Test
    @Transactional
    void getListaPrecioRectificacionCRAM() throws Exception {
        // Initialize the database
        listaPrecioRectificacionCRAMRepository.saveAndFlush(listaPrecioRectificacionCRAM);

        // Get the listaPrecioRectificacionCRAM
        restListaPrecioRectificacionCRAMMockMvc
            .perform(get(ENTITY_API_URL_ID, listaPrecioRectificacionCRAM.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(listaPrecioRectificacionCRAM.getId().intValue()))
            .andExpect(jsonPath("$.numeroGrupo").value(DEFAULT_NUMERO_GRUPO));
    }

    @Test
    @Transactional
    void getNonExistingListaPrecioRectificacionCRAM() throws Exception {
        // Get the listaPrecioRectificacionCRAM
        restListaPrecioRectificacionCRAMMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewListaPrecioRectificacionCRAM() throws Exception {
        // Initialize the database
        listaPrecioRectificacionCRAMRepository.saveAndFlush(listaPrecioRectificacionCRAM);

        int databaseSizeBeforeUpdate = listaPrecioRectificacionCRAMRepository.findAll().size();

        // Update the listaPrecioRectificacionCRAM
        ListaPrecioRectificacionCRAM updatedListaPrecioRectificacionCRAM = listaPrecioRectificacionCRAMRepository
            .findById(listaPrecioRectificacionCRAM.getId())
            .get();
        // Disconnect from session so that the updates on updatedListaPrecioRectificacionCRAM are not directly saved in db
        em.detach(updatedListaPrecioRectificacionCRAM);
        updatedListaPrecioRectificacionCRAM.numeroGrupo(UPDATED_NUMERO_GRUPO);

        restListaPrecioRectificacionCRAMMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedListaPrecioRectificacionCRAM.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedListaPrecioRectificacionCRAM))
            )
            .andExpect(status().isOk());

        // Validate the ListaPrecioRectificacionCRAM in the database
        List<ListaPrecioRectificacionCRAM> listaPrecioRectificacionCRAMList = listaPrecioRectificacionCRAMRepository.findAll();
        assertThat(listaPrecioRectificacionCRAMList).hasSize(databaseSizeBeforeUpdate);
        ListaPrecioRectificacionCRAM testListaPrecioRectificacionCRAM = listaPrecioRectificacionCRAMList.get(
            listaPrecioRectificacionCRAMList.size() - 1
        );
        assertThat(testListaPrecioRectificacionCRAM.getNumeroGrupo()).isEqualTo(UPDATED_NUMERO_GRUPO);
    }

    @Test
    @Transactional
    void putNonExistingListaPrecioRectificacionCRAM() throws Exception {
        int databaseSizeBeforeUpdate = listaPrecioRectificacionCRAMRepository.findAll().size();
        listaPrecioRectificacionCRAM.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restListaPrecioRectificacionCRAMMockMvc
            .perform(
                put(ENTITY_API_URL_ID, listaPrecioRectificacionCRAM.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(listaPrecioRectificacionCRAM))
            )
            .andExpect(status().isBadRequest());

        // Validate the ListaPrecioRectificacionCRAM in the database
        List<ListaPrecioRectificacionCRAM> listaPrecioRectificacionCRAMList = listaPrecioRectificacionCRAMRepository.findAll();
        assertThat(listaPrecioRectificacionCRAMList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchListaPrecioRectificacionCRAM() throws Exception {
        int databaseSizeBeforeUpdate = listaPrecioRectificacionCRAMRepository.findAll().size();
        listaPrecioRectificacionCRAM.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restListaPrecioRectificacionCRAMMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(listaPrecioRectificacionCRAM))
            )
            .andExpect(status().isBadRequest());

        // Validate the ListaPrecioRectificacionCRAM in the database
        List<ListaPrecioRectificacionCRAM> listaPrecioRectificacionCRAMList = listaPrecioRectificacionCRAMRepository.findAll();
        assertThat(listaPrecioRectificacionCRAMList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamListaPrecioRectificacionCRAM() throws Exception {
        int databaseSizeBeforeUpdate = listaPrecioRectificacionCRAMRepository.findAll().size();
        listaPrecioRectificacionCRAM.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restListaPrecioRectificacionCRAMMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(listaPrecioRectificacionCRAM))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ListaPrecioRectificacionCRAM in the database
        List<ListaPrecioRectificacionCRAM> listaPrecioRectificacionCRAMList = listaPrecioRectificacionCRAMRepository.findAll();
        assertThat(listaPrecioRectificacionCRAMList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateListaPrecioRectificacionCRAMWithPatch() throws Exception {
        // Initialize the database
        listaPrecioRectificacionCRAMRepository.saveAndFlush(listaPrecioRectificacionCRAM);

        int databaseSizeBeforeUpdate = listaPrecioRectificacionCRAMRepository.findAll().size();

        // Update the listaPrecioRectificacionCRAM using partial update
        ListaPrecioRectificacionCRAM partialUpdatedListaPrecioRectificacionCRAM = new ListaPrecioRectificacionCRAM();
        partialUpdatedListaPrecioRectificacionCRAM.setId(listaPrecioRectificacionCRAM.getId());

        restListaPrecioRectificacionCRAMMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedListaPrecioRectificacionCRAM.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedListaPrecioRectificacionCRAM))
            )
            .andExpect(status().isOk());

        // Validate the ListaPrecioRectificacionCRAM in the database
        List<ListaPrecioRectificacionCRAM> listaPrecioRectificacionCRAMList = listaPrecioRectificacionCRAMRepository.findAll();
        assertThat(listaPrecioRectificacionCRAMList).hasSize(databaseSizeBeforeUpdate);
        ListaPrecioRectificacionCRAM testListaPrecioRectificacionCRAM = listaPrecioRectificacionCRAMList.get(
            listaPrecioRectificacionCRAMList.size() - 1
        );
        assertThat(testListaPrecioRectificacionCRAM.getNumeroGrupo()).isEqualTo(DEFAULT_NUMERO_GRUPO);
    }

    @Test
    @Transactional
    void fullUpdateListaPrecioRectificacionCRAMWithPatch() throws Exception {
        // Initialize the database
        listaPrecioRectificacionCRAMRepository.saveAndFlush(listaPrecioRectificacionCRAM);

        int databaseSizeBeforeUpdate = listaPrecioRectificacionCRAMRepository.findAll().size();

        // Update the listaPrecioRectificacionCRAM using partial update
        ListaPrecioRectificacionCRAM partialUpdatedListaPrecioRectificacionCRAM = new ListaPrecioRectificacionCRAM();
        partialUpdatedListaPrecioRectificacionCRAM.setId(listaPrecioRectificacionCRAM.getId());

        partialUpdatedListaPrecioRectificacionCRAM.numeroGrupo(UPDATED_NUMERO_GRUPO);

        restListaPrecioRectificacionCRAMMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedListaPrecioRectificacionCRAM.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedListaPrecioRectificacionCRAM))
            )
            .andExpect(status().isOk());

        // Validate the ListaPrecioRectificacionCRAM in the database
        List<ListaPrecioRectificacionCRAM> listaPrecioRectificacionCRAMList = listaPrecioRectificacionCRAMRepository.findAll();
        assertThat(listaPrecioRectificacionCRAMList).hasSize(databaseSizeBeforeUpdate);
        ListaPrecioRectificacionCRAM testListaPrecioRectificacionCRAM = listaPrecioRectificacionCRAMList.get(
            listaPrecioRectificacionCRAMList.size() - 1
        );
        assertThat(testListaPrecioRectificacionCRAM.getNumeroGrupo()).isEqualTo(UPDATED_NUMERO_GRUPO);
    }

    @Test
    @Transactional
    void patchNonExistingListaPrecioRectificacionCRAM() throws Exception {
        int databaseSizeBeforeUpdate = listaPrecioRectificacionCRAMRepository.findAll().size();
        listaPrecioRectificacionCRAM.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restListaPrecioRectificacionCRAMMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, listaPrecioRectificacionCRAM.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(listaPrecioRectificacionCRAM))
            )
            .andExpect(status().isBadRequest());

        // Validate the ListaPrecioRectificacionCRAM in the database
        List<ListaPrecioRectificacionCRAM> listaPrecioRectificacionCRAMList = listaPrecioRectificacionCRAMRepository.findAll();
        assertThat(listaPrecioRectificacionCRAMList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchListaPrecioRectificacionCRAM() throws Exception {
        int databaseSizeBeforeUpdate = listaPrecioRectificacionCRAMRepository.findAll().size();
        listaPrecioRectificacionCRAM.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restListaPrecioRectificacionCRAMMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(listaPrecioRectificacionCRAM))
            )
            .andExpect(status().isBadRequest());

        // Validate the ListaPrecioRectificacionCRAM in the database
        List<ListaPrecioRectificacionCRAM> listaPrecioRectificacionCRAMList = listaPrecioRectificacionCRAMRepository.findAll();
        assertThat(listaPrecioRectificacionCRAMList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamListaPrecioRectificacionCRAM() throws Exception {
        int databaseSizeBeforeUpdate = listaPrecioRectificacionCRAMRepository.findAll().size();
        listaPrecioRectificacionCRAM.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restListaPrecioRectificacionCRAMMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(listaPrecioRectificacionCRAM))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ListaPrecioRectificacionCRAM in the database
        List<ListaPrecioRectificacionCRAM> listaPrecioRectificacionCRAMList = listaPrecioRectificacionCRAMRepository.findAll();
        assertThat(listaPrecioRectificacionCRAMList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteListaPrecioRectificacionCRAM() throws Exception {
        // Initialize the database
        listaPrecioRectificacionCRAMRepository.saveAndFlush(listaPrecioRectificacionCRAM);

        int databaseSizeBeforeDelete = listaPrecioRectificacionCRAMRepository.findAll().size();

        // Delete the listaPrecioRectificacionCRAM
        restListaPrecioRectificacionCRAMMockMvc
            .perform(delete(ENTITY_API_URL_ID, listaPrecioRectificacionCRAM.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ListaPrecioRectificacionCRAM> listaPrecioRectificacionCRAMList = listaPrecioRectificacionCRAMRepository.findAll();
        assertThat(listaPrecioRectificacionCRAMList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
