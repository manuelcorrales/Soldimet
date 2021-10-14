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
import soldimet.domain.Articulo;
import soldimet.domain.MovimientoArticulo;
import soldimet.repository.MovimientoArticuloRepository;

/**
 * Integration tests for the {@link MovimientoArticuloResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MovimientoArticuloResourceIT {

    private static final Integer DEFAULT_CANTIDAD = 1;
    private static final Integer UPDATED_CANTIDAD = 2;

    private static final String ENTITY_API_URL = "/api/movimiento-articulos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MovimientoArticuloRepository movimientoArticuloRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMovimientoArticuloMockMvc;

    private MovimientoArticulo movimientoArticulo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MovimientoArticulo createEntity(EntityManager em) {
        MovimientoArticulo movimientoArticulo = new MovimientoArticulo().cantidad(DEFAULT_CANTIDAD);
        // Add required entity
        Articulo articulo;
        if (TestUtil.findAll(em, Articulo.class).isEmpty()) {
            articulo = ArticuloResourceIT.createEntity(em);
            em.persist(articulo);
            em.flush();
        } else {
            articulo = TestUtil.findAll(em, Articulo.class).get(0);
        }
        movimientoArticulo.setArticulo(articulo);
        return movimientoArticulo;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MovimientoArticulo createUpdatedEntity(EntityManager em) {
        MovimientoArticulo movimientoArticulo = new MovimientoArticulo().cantidad(UPDATED_CANTIDAD);
        // Add required entity
        Articulo articulo;
        if (TestUtil.findAll(em, Articulo.class).isEmpty()) {
            articulo = ArticuloResourceIT.createUpdatedEntity(em);
            em.persist(articulo);
            em.flush();
        } else {
            articulo = TestUtil.findAll(em, Articulo.class).get(0);
        }
        movimientoArticulo.setArticulo(articulo);
        return movimientoArticulo;
    }

    @BeforeEach
    public void initTest() {
        movimientoArticulo = createEntity(em);
    }

    @Test
    @Transactional
    void createMovimientoArticulo() throws Exception {
        int databaseSizeBeforeCreate = movimientoArticuloRepository.findAll().size();
        // Create the MovimientoArticulo
        restMovimientoArticuloMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(movimientoArticulo))
            )
            .andExpect(status().isCreated());

        // Validate the MovimientoArticulo in the database
        List<MovimientoArticulo> movimientoArticuloList = movimientoArticuloRepository.findAll();
        assertThat(movimientoArticuloList).hasSize(databaseSizeBeforeCreate + 1);
        MovimientoArticulo testMovimientoArticulo = movimientoArticuloList.get(movimientoArticuloList.size() - 1);
        assertThat(testMovimientoArticulo.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
    }

    @Test
    @Transactional
    void createMovimientoArticuloWithExistingId() throws Exception {
        // Create the MovimientoArticulo with an existing ID
        movimientoArticulo.setId(1L);

        int databaseSizeBeforeCreate = movimientoArticuloRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMovimientoArticuloMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(movimientoArticulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the MovimientoArticulo in the database
        List<MovimientoArticulo> movimientoArticuloList = movimientoArticuloRepository.findAll();
        assertThat(movimientoArticuloList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkCantidadIsRequired() throws Exception {
        int databaseSizeBeforeTest = movimientoArticuloRepository.findAll().size();
        // set the field null
        movimientoArticulo.setCantidad(null);

        // Create the MovimientoArticulo, which fails.

        restMovimientoArticuloMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(movimientoArticulo))
            )
            .andExpect(status().isBadRequest());

        List<MovimientoArticulo> movimientoArticuloList = movimientoArticuloRepository.findAll();
        assertThat(movimientoArticuloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllMovimientoArticulos() throws Exception {
        // Initialize the database
        movimientoArticuloRepository.saveAndFlush(movimientoArticulo);

        // Get all the movimientoArticuloList
        restMovimientoArticuloMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(movimientoArticulo.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD)));
    }

    @Test
    @Transactional
    void getMovimientoArticulo() throws Exception {
        // Initialize the database
        movimientoArticuloRepository.saveAndFlush(movimientoArticulo);

        // Get the movimientoArticulo
        restMovimientoArticuloMockMvc
            .perform(get(ENTITY_API_URL_ID, movimientoArticulo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(movimientoArticulo.getId().intValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD));
    }

    @Test
    @Transactional
    void getNonExistingMovimientoArticulo() throws Exception {
        // Get the movimientoArticulo
        restMovimientoArticuloMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMovimientoArticulo() throws Exception {
        // Initialize the database
        movimientoArticuloRepository.saveAndFlush(movimientoArticulo);

        int databaseSizeBeforeUpdate = movimientoArticuloRepository.findAll().size();

        // Update the movimientoArticulo
        MovimientoArticulo updatedMovimientoArticulo = movimientoArticuloRepository.findById(movimientoArticulo.getId()).get();
        // Disconnect from session so that the updates on updatedMovimientoArticulo are not directly saved in db
        em.detach(updatedMovimientoArticulo);
        updatedMovimientoArticulo.cantidad(UPDATED_CANTIDAD);

        restMovimientoArticuloMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMovimientoArticulo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMovimientoArticulo))
            )
            .andExpect(status().isOk());

        // Validate the MovimientoArticulo in the database
        List<MovimientoArticulo> movimientoArticuloList = movimientoArticuloRepository.findAll();
        assertThat(movimientoArticuloList).hasSize(databaseSizeBeforeUpdate);
        MovimientoArticulo testMovimientoArticulo = movimientoArticuloList.get(movimientoArticuloList.size() - 1);
        assertThat(testMovimientoArticulo.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
    }

    @Test
    @Transactional
    void putNonExistingMovimientoArticulo() throws Exception {
        int databaseSizeBeforeUpdate = movimientoArticuloRepository.findAll().size();
        movimientoArticulo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMovimientoArticuloMockMvc
            .perform(
                put(ENTITY_API_URL_ID, movimientoArticulo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(movimientoArticulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the MovimientoArticulo in the database
        List<MovimientoArticulo> movimientoArticuloList = movimientoArticuloRepository.findAll();
        assertThat(movimientoArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMovimientoArticulo() throws Exception {
        int databaseSizeBeforeUpdate = movimientoArticuloRepository.findAll().size();
        movimientoArticulo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientoArticuloMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(movimientoArticulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the MovimientoArticulo in the database
        List<MovimientoArticulo> movimientoArticuloList = movimientoArticuloRepository.findAll();
        assertThat(movimientoArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMovimientoArticulo() throws Exception {
        int databaseSizeBeforeUpdate = movimientoArticuloRepository.findAll().size();
        movimientoArticulo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientoArticuloMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(movimientoArticulo))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MovimientoArticulo in the database
        List<MovimientoArticulo> movimientoArticuloList = movimientoArticuloRepository.findAll();
        assertThat(movimientoArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMovimientoArticuloWithPatch() throws Exception {
        // Initialize the database
        movimientoArticuloRepository.saveAndFlush(movimientoArticulo);

        int databaseSizeBeforeUpdate = movimientoArticuloRepository.findAll().size();

        // Update the movimientoArticulo using partial update
        MovimientoArticulo partialUpdatedMovimientoArticulo = new MovimientoArticulo();
        partialUpdatedMovimientoArticulo.setId(movimientoArticulo.getId());

        restMovimientoArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMovimientoArticulo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMovimientoArticulo))
            )
            .andExpect(status().isOk());

        // Validate the MovimientoArticulo in the database
        List<MovimientoArticulo> movimientoArticuloList = movimientoArticuloRepository.findAll();
        assertThat(movimientoArticuloList).hasSize(databaseSizeBeforeUpdate);
        MovimientoArticulo testMovimientoArticulo = movimientoArticuloList.get(movimientoArticuloList.size() - 1);
        assertThat(testMovimientoArticulo.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
    }

    @Test
    @Transactional
    void fullUpdateMovimientoArticuloWithPatch() throws Exception {
        // Initialize the database
        movimientoArticuloRepository.saveAndFlush(movimientoArticulo);

        int databaseSizeBeforeUpdate = movimientoArticuloRepository.findAll().size();

        // Update the movimientoArticulo using partial update
        MovimientoArticulo partialUpdatedMovimientoArticulo = new MovimientoArticulo();
        partialUpdatedMovimientoArticulo.setId(movimientoArticulo.getId());

        partialUpdatedMovimientoArticulo.cantidad(UPDATED_CANTIDAD);

        restMovimientoArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMovimientoArticulo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMovimientoArticulo))
            )
            .andExpect(status().isOk());

        // Validate the MovimientoArticulo in the database
        List<MovimientoArticulo> movimientoArticuloList = movimientoArticuloRepository.findAll();
        assertThat(movimientoArticuloList).hasSize(databaseSizeBeforeUpdate);
        MovimientoArticulo testMovimientoArticulo = movimientoArticuloList.get(movimientoArticuloList.size() - 1);
        assertThat(testMovimientoArticulo.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
    }

    @Test
    @Transactional
    void patchNonExistingMovimientoArticulo() throws Exception {
        int databaseSizeBeforeUpdate = movimientoArticuloRepository.findAll().size();
        movimientoArticulo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMovimientoArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, movimientoArticulo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(movimientoArticulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the MovimientoArticulo in the database
        List<MovimientoArticulo> movimientoArticuloList = movimientoArticuloRepository.findAll();
        assertThat(movimientoArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMovimientoArticulo() throws Exception {
        int databaseSizeBeforeUpdate = movimientoArticuloRepository.findAll().size();
        movimientoArticulo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientoArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(movimientoArticulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the MovimientoArticulo in the database
        List<MovimientoArticulo> movimientoArticuloList = movimientoArticuloRepository.findAll();
        assertThat(movimientoArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMovimientoArticulo() throws Exception {
        int databaseSizeBeforeUpdate = movimientoArticuloRepository.findAll().size();
        movimientoArticulo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientoArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(movimientoArticulo))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MovimientoArticulo in the database
        List<MovimientoArticulo> movimientoArticuloList = movimientoArticuloRepository.findAll();
        assertThat(movimientoArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMovimientoArticulo() throws Exception {
        // Initialize the database
        movimientoArticuloRepository.saveAndFlush(movimientoArticulo);

        int databaseSizeBeforeDelete = movimientoArticuloRepository.findAll().size();

        // Delete the movimientoArticulo
        restMovimientoArticuloMockMvc
            .perform(delete(ENTITY_API_URL_ID, movimientoArticulo.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MovimientoArticulo> movimientoArticuloList = movimientoArticuloRepository.findAll();
        assertThat(movimientoArticuloList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
