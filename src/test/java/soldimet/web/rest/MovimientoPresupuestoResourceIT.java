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
import soldimet.domain.Movimiento;
import soldimet.domain.MovimientoPresupuesto;
import soldimet.domain.Presupuesto;
import soldimet.repository.MovimientoPresupuestoRepository;

/**
 * Integration tests for the {@link MovimientoPresupuestoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MovimientoPresupuestoResourceIT {

    private static final String ENTITY_API_URL = "/api/movimiento-presupuestos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MovimientoPresupuestoRepository movimientoPresupuestoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMovimientoPresupuestoMockMvc;

    private MovimientoPresupuesto movimientoPresupuesto;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MovimientoPresupuesto createEntity(EntityManager em) {
        MovimientoPresupuesto movimientoPresupuesto = new MovimientoPresupuesto();
        // Add required entity
        Movimiento movimiento;
        if (TestUtil.findAll(em, Movimiento.class).isEmpty()) {
            movimiento = MovimientoResourceIT.createEntity(em);
            em.persist(movimiento);
            em.flush();
        } else {
            movimiento = TestUtil.findAll(em, Movimiento.class).get(0);
        }
        movimientoPresupuesto.setMovimiento(movimiento);
        // Add required entity
        Presupuesto presupuesto;
        if (TestUtil.findAll(em, Presupuesto.class).isEmpty()) {
            presupuesto = PresupuestoResourceIT.createEntity(em);
            em.persist(presupuesto);
            em.flush();
        } else {
            presupuesto = TestUtil.findAll(em, Presupuesto.class).get(0);
        }
        movimientoPresupuesto.setPresupuesto(presupuesto);
        return movimientoPresupuesto;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MovimientoPresupuesto createUpdatedEntity(EntityManager em) {
        MovimientoPresupuesto movimientoPresupuesto = new MovimientoPresupuesto();
        // Add required entity
        Movimiento movimiento;
        if (TestUtil.findAll(em, Movimiento.class).isEmpty()) {
            movimiento = MovimientoResourceIT.createUpdatedEntity(em);
            em.persist(movimiento);
            em.flush();
        } else {
            movimiento = TestUtil.findAll(em, Movimiento.class).get(0);
        }
        movimientoPresupuesto.setMovimiento(movimiento);
        // Add required entity
        Presupuesto presupuesto;
        if (TestUtil.findAll(em, Presupuesto.class).isEmpty()) {
            presupuesto = PresupuestoResourceIT.createUpdatedEntity(em);
            em.persist(presupuesto);
            em.flush();
        } else {
            presupuesto = TestUtil.findAll(em, Presupuesto.class).get(0);
        }
        movimientoPresupuesto.setPresupuesto(presupuesto);
        return movimientoPresupuesto;
    }

    @BeforeEach
    public void initTest() {
        movimientoPresupuesto = createEntity(em);
    }

    @Test
    @Transactional
    void createMovimientoPresupuesto() throws Exception {
        int databaseSizeBeforeCreate = movimientoPresupuestoRepository.findAll().size();
        // Create the MovimientoPresupuesto
        restMovimientoPresupuestoMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(movimientoPresupuesto))
            )
            .andExpect(status().isCreated());

        // Validate the MovimientoPresupuesto in the database
        List<MovimientoPresupuesto> movimientoPresupuestoList = movimientoPresupuestoRepository.findAll();
        assertThat(movimientoPresupuestoList).hasSize(databaseSizeBeforeCreate + 1);
        MovimientoPresupuesto testMovimientoPresupuesto = movimientoPresupuestoList.get(movimientoPresupuestoList.size() - 1);
    }

    @Test
    @Transactional
    void createMovimientoPresupuestoWithExistingId() throws Exception {
        // Create the MovimientoPresupuesto with an existing ID
        movimientoPresupuesto.setId(1L);

        int databaseSizeBeforeCreate = movimientoPresupuestoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMovimientoPresupuestoMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(movimientoPresupuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the MovimientoPresupuesto in the database
        List<MovimientoPresupuesto> movimientoPresupuestoList = movimientoPresupuestoRepository.findAll();
        assertThat(movimientoPresupuestoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMovimientoPresupuestos() throws Exception {
        // Initialize the database
        movimientoPresupuestoRepository.saveAndFlush(movimientoPresupuesto);

        // Get all the movimientoPresupuestoList
        restMovimientoPresupuestoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(movimientoPresupuesto.getId().intValue())));
    }

    @Test
    @Transactional
    void getMovimientoPresupuesto() throws Exception {
        // Initialize the database
        movimientoPresupuestoRepository.saveAndFlush(movimientoPresupuesto);

        // Get the movimientoPresupuesto
        restMovimientoPresupuestoMockMvc
            .perform(get(ENTITY_API_URL_ID, movimientoPresupuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(movimientoPresupuesto.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingMovimientoPresupuesto() throws Exception {
        // Get the movimientoPresupuesto
        restMovimientoPresupuestoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMovimientoPresupuesto() throws Exception {
        // Initialize the database
        movimientoPresupuestoRepository.saveAndFlush(movimientoPresupuesto);

        int databaseSizeBeforeUpdate = movimientoPresupuestoRepository.findAll().size();

        // Update the movimientoPresupuesto
        MovimientoPresupuesto updatedMovimientoPresupuesto = movimientoPresupuestoRepository.findById(movimientoPresupuesto.getId()).get();
        // Disconnect from session so that the updates on updatedMovimientoPresupuesto are not directly saved in db
        em.detach(updatedMovimientoPresupuesto);

        restMovimientoPresupuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMovimientoPresupuesto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMovimientoPresupuesto))
            )
            .andExpect(status().isOk());

        // Validate the MovimientoPresupuesto in the database
        List<MovimientoPresupuesto> movimientoPresupuestoList = movimientoPresupuestoRepository.findAll();
        assertThat(movimientoPresupuestoList).hasSize(databaseSizeBeforeUpdate);
        MovimientoPresupuesto testMovimientoPresupuesto = movimientoPresupuestoList.get(movimientoPresupuestoList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingMovimientoPresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = movimientoPresupuestoRepository.findAll().size();
        movimientoPresupuesto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMovimientoPresupuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, movimientoPresupuesto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(movimientoPresupuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the MovimientoPresupuesto in the database
        List<MovimientoPresupuesto> movimientoPresupuestoList = movimientoPresupuestoRepository.findAll();
        assertThat(movimientoPresupuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMovimientoPresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = movimientoPresupuestoRepository.findAll().size();
        movimientoPresupuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientoPresupuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(movimientoPresupuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the MovimientoPresupuesto in the database
        List<MovimientoPresupuesto> movimientoPresupuestoList = movimientoPresupuestoRepository.findAll();
        assertThat(movimientoPresupuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMovimientoPresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = movimientoPresupuestoRepository.findAll().size();
        movimientoPresupuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientoPresupuestoMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(movimientoPresupuesto))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MovimientoPresupuesto in the database
        List<MovimientoPresupuesto> movimientoPresupuestoList = movimientoPresupuestoRepository.findAll();
        assertThat(movimientoPresupuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMovimientoPresupuestoWithPatch() throws Exception {
        // Initialize the database
        movimientoPresupuestoRepository.saveAndFlush(movimientoPresupuesto);

        int databaseSizeBeforeUpdate = movimientoPresupuestoRepository.findAll().size();

        // Update the movimientoPresupuesto using partial update
        MovimientoPresupuesto partialUpdatedMovimientoPresupuesto = new MovimientoPresupuesto();
        partialUpdatedMovimientoPresupuesto.setId(movimientoPresupuesto.getId());

        restMovimientoPresupuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMovimientoPresupuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMovimientoPresupuesto))
            )
            .andExpect(status().isOk());

        // Validate the MovimientoPresupuesto in the database
        List<MovimientoPresupuesto> movimientoPresupuestoList = movimientoPresupuestoRepository.findAll();
        assertThat(movimientoPresupuestoList).hasSize(databaseSizeBeforeUpdate);
        MovimientoPresupuesto testMovimientoPresupuesto = movimientoPresupuestoList.get(movimientoPresupuestoList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateMovimientoPresupuestoWithPatch() throws Exception {
        // Initialize the database
        movimientoPresupuestoRepository.saveAndFlush(movimientoPresupuesto);

        int databaseSizeBeforeUpdate = movimientoPresupuestoRepository.findAll().size();

        // Update the movimientoPresupuesto using partial update
        MovimientoPresupuesto partialUpdatedMovimientoPresupuesto = new MovimientoPresupuesto();
        partialUpdatedMovimientoPresupuesto.setId(movimientoPresupuesto.getId());

        restMovimientoPresupuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMovimientoPresupuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMovimientoPresupuesto))
            )
            .andExpect(status().isOk());

        // Validate the MovimientoPresupuesto in the database
        List<MovimientoPresupuesto> movimientoPresupuestoList = movimientoPresupuestoRepository.findAll();
        assertThat(movimientoPresupuestoList).hasSize(databaseSizeBeforeUpdate);
        MovimientoPresupuesto testMovimientoPresupuesto = movimientoPresupuestoList.get(movimientoPresupuestoList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingMovimientoPresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = movimientoPresupuestoRepository.findAll().size();
        movimientoPresupuesto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMovimientoPresupuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, movimientoPresupuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(movimientoPresupuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the MovimientoPresupuesto in the database
        List<MovimientoPresupuesto> movimientoPresupuestoList = movimientoPresupuestoRepository.findAll();
        assertThat(movimientoPresupuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMovimientoPresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = movimientoPresupuestoRepository.findAll().size();
        movimientoPresupuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientoPresupuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(movimientoPresupuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the MovimientoPresupuesto in the database
        List<MovimientoPresupuesto> movimientoPresupuestoList = movimientoPresupuestoRepository.findAll();
        assertThat(movimientoPresupuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMovimientoPresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = movimientoPresupuestoRepository.findAll().size();
        movimientoPresupuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientoPresupuestoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(movimientoPresupuesto))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MovimientoPresupuesto in the database
        List<MovimientoPresupuesto> movimientoPresupuestoList = movimientoPresupuestoRepository.findAll();
        assertThat(movimientoPresupuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMovimientoPresupuesto() throws Exception {
        // Initialize the database
        movimientoPresupuestoRepository.saveAndFlush(movimientoPresupuesto);

        int databaseSizeBeforeDelete = movimientoPresupuestoRepository.findAll().size();

        // Delete the movimientoPresupuesto
        restMovimientoPresupuestoMockMvc
            .perform(delete(ENTITY_API_URL_ID, movimientoPresupuesto.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MovimientoPresupuesto> movimientoPresupuestoList = movimientoPresupuestoRepository.findAll();
        assertThat(movimientoPresupuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
