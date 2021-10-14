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
import soldimet.domain.MovimientoPedido;
import soldimet.domain.PedidoRepuesto;
import soldimet.repository.MovimientoPedidoRepository;

/**
 * Integration tests for the {@link MovimientoPedidoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MovimientoPedidoResourceIT {

    private static final String ENTITY_API_URL = "/api/movimiento-pedidos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MovimientoPedidoRepository movimientoPedidoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMovimientoPedidoMockMvc;

    private MovimientoPedido movimientoPedido;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MovimientoPedido createEntity(EntityManager em) {
        MovimientoPedido movimientoPedido = new MovimientoPedido();
        // Add required entity
        Movimiento movimiento;
        if (TestUtil.findAll(em, Movimiento.class).isEmpty()) {
            movimiento = MovimientoResourceIT.createEntity(em);
            em.persist(movimiento);
            em.flush();
        } else {
            movimiento = TestUtil.findAll(em, Movimiento.class).get(0);
        }
        movimientoPedido.setMovimiento(movimiento);
        // Add required entity
        PedidoRepuesto pedidoRepuesto;
        if (TestUtil.findAll(em, PedidoRepuesto.class).isEmpty()) {
            pedidoRepuesto = PedidoRepuestoResourceIT.createEntity(em);
            em.persist(pedidoRepuesto);
            em.flush();
        } else {
            pedidoRepuesto = TestUtil.findAll(em, PedidoRepuesto.class).get(0);
        }
        movimientoPedido.setPedidoRepuesto(pedidoRepuesto);
        return movimientoPedido;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MovimientoPedido createUpdatedEntity(EntityManager em) {
        MovimientoPedido movimientoPedido = new MovimientoPedido();
        // Add required entity
        Movimiento movimiento;
        if (TestUtil.findAll(em, Movimiento.class).isEmpty()) {
            movimiento = MovimientoResourceIT.createUpdatedEntity(em);
            em.persist(movimiento);
            em.flush();
        } else {
            movimiento = TestUtil.findAll(em, Movimiento.class).get(0);
        }
        movimientoPedido.setMovimiento(movimiento);
        // Add required entity
        PedidoRepuesto pedidoRepuesto;
        if (TestUtil.findAll(em, PedidoRepuesto.class).isEmpty()) {
            pedidoRepuesto = PedidoRepuestoResourceIT.createUpdatedEntity(em);
            em.persist(pedidoRepuesto);
            em.flush();
        } else {
            pedidoRepuesto = TestUtil.findAll(em, PedidoRepuesto.class).get(0);
        }
        movimientoPedido.setPedidoRepuesto(pedidoRepuesto);
        return movimientoPedido;
    }

    @BeforeEach
    public void initTest() {
        movimientoPedido = createEntity(em);
    }

    @Test
    @Transactional
    void createMovimientoPedido() throws Exception {
        int databaseSizeBeforeCreate = movimientoPedidoRepository.findAll().size();
        // Create the MovimientoPedido
        restMovimientoPedidoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(movimientoPedido))
            )
            .andExpect(status().isCreated());

        // Validate the MovimientoPedido in the database
        List<MovimientoPedido> movimientoPedidoList = movimientoPedidoRepository.findAll();
        assertThat(movimientoPedidoList).hasSize(databaseSizeBeforeCreate + 1);
        MovimientoPedido testMovimientoPedido = movimientoPedidoList.get(movimientoPedidoList.size() - 1);
    }

    @Test
    @Transactional
    void createMovimientoPedidoWithExistingId() throws Exception {
        // Create the MovimientoPedido with an existing ID
        movimientoPedido.setId(1L);

        int databaseSizeBeforeCreate = movimientoPedidoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMovimientoPedidoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(movimientoPedido))
            )
            .andExpect(status().isBadRequest());

        // Validate the MovimientoPedido in the database
        List<MovimientoPedido> movimientoPedidoList = movimientoPedidoRepository.findAll();
        assertThat(movimientoPedidoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMovimientoPedidos() throws Exception {
        // Initialize the database
        movimientoPedidoRepository.saveAndFlush(movimientoPedido);

        // Get all the movimientoPedidoList
        restMovimientoPedidoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(movimientoPedido.getId().intValue())));
    }

    @Test
    @Transactional
    void getMovimientoPedido() throws Exception {
        // Initialize the database
        movimientoPedidoRepository.saveAndFlush(movimientoPedido);

        // Get the movimientoPedido
        restMovimientoPedidoMockMvc
            .perform(get(ENTITY_API_URL_ID, movimientoPedido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(movimientoPedido.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingMovimientoPedido() throws Exception {
        // Get the movimientoPedido
        restMovimientoPedidoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMovimientoPedido() throws Exception {
        // Initialize the database
        movimientoPedidoRepository.saveAndFlush(movimientoPedido);

        int databaseSizeBeforeUpdate = movimientoPedidoRepository.findAll().size();

        // Update the movimientoPedido
        MovimientoPedido updatedMovimientoPedido = movimientoPedidoRepository.findById(movimientoPedido.getId()).get();
        // Disconnect from session so that the updates on updatedMovimientoPedido are not directly saved in db
        em.detach(updatedMovimientoPedido);

        restMovimientoPedidoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMovimientoPedido.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMovimientoPedido))
            )
            .andExpect(status().isOk());

        // Validate the MovimientoPedido in the database
        List<MovimientoPedido> movimientoPedidoList = movimientoPedidoRepository.findAll();
        assertThat(movimientoPedidoList).hasSize(databaseSizeBeforeUpdate);
        MovimientoPedido testMovimientoPedido = movimientoPedidoList.get(movimientoPedidoList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingMovimientoPedido() throws Exception {
        int databaseSizeBeforeUpdate = movimientoPedidoRepository.findAll().size();
        movimientoPedido.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMovimientoPedidoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, movimientoPedido.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(movimientoPedido))
            )
            .andExpect(status().isBadRequest());

        // Validate the MovimientoPedido in the database
        List<MovimientoPedido> movimientoPedidoList = movimientoPedidoRepository.findAll();
        assertThat(movimientoPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMovimientoPedido() throws Exception {
        int databaseSizeBeforeUpdate = movimientoPedidoRepository.findAll().size();
        movimientoPedido.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientoPedidoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(movimientoPedido))
            )
            .andExpect(status().isBadRequest());

        // Validate the MovimientoPedido in the database
        List<MovimientoPedido> movimientoPedidoList = movimientoPedidoRepository.findAll();
        assertThat(movimientoPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMovimientoPedido() throws Exception {
        int databaseSizeBeforeUpdate = movimientoPedidoRepository.findAll().size();
        movimientoPedido.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientoPedidoMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(movimientoPedido))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MovimientoPedido in the database
        List<MovimientoPedido> movimientoPedidoList = movimientoPedidoRepository.findAll();
        assertThat(movimientoPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMovimientoPedidoWithPatch() throws Exception {
        // Initialize the database
        movimientoPedidoRepository.saveAndFlush(movimientoPedido);

        int databaseSizeBeforeUpdate = movimientoPedidoRepository.findAll().size();

        // Update the movimientoPedido using partial update
        MovimientoPedido partialUpdatedMovimientoPedido = new MovimientoPedido();
        partialUpdatedMovimientoPedido.setId(movimientoPedido.getId());

        restMovimientoPedidoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMovimientoPedido.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMovimientoPedido))
            )
            .andExpect(status().isOk());

        // Validate the MovimientoPedido in the database
        List<MovimientoPedido> movimientoPedidoList = movimientoPedidoRepository.findAll();
        assertThat(movimientoPedidoList).hasSize(databaseSizeBeforeUpdate);
        MovimientoPedido testMovimientoPedido = movimientoPedidoList.get(movimientoPedidoList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateMovimientoPedidoWithPatch() throws Exception {
        // Initialize the database
        movimientoPedidoRepository.saveAndFlush(movimientoPedido);

        int databaseSizeBeforeUpdate = movimientoPedidoRepository.findAll().size();

        // Update the movimientoPedido using partial update
        MovimientoPedido partialUpdatedMovimientoPedido = new MovimientoPedido();
        partialUpdatedMovimientoPedido.setId(movimientoPedido.getId());

        restMovimientoPedidoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMovimientoPedido.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMovimientoPedido))
            )
            .andExpect(status().isOk());

        // Validate the MovimientoPedido in the database
        List<MovimientoPedido> movimientoPedidoList = movimientoPedidoRepository.findAll();
        assertThat(movimientoPedidoList).hasSize(databaseSizeBeforeUpdate);
        MovimientoPedido testMovimientoPedido = movimientoPedidoList.get(movimientoPedidoList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingMovimientoPedido() throws Exception {
        int databaseSizeBeforeUpdate = movimientoPedidoRepository.findAll().size();
        movimientoPedido.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMovimientoPedidoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, movimientoPedido.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(movimientoPedido))
            )
            .andExpect(status().isBadRequest());

        // Validate the MovimientoPedido in the database
        List<MovimientoPedido> movimientoPedidoList = movimientoPedidoRepository.findAll();
        assertThat(movimientoPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMovimientoPedido() throws Exception {
        int databaseSizeBeforeUpdate = movimientoPedidoRepository.findAll().size();
        movimientoPedido.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientoPedidoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(movimientoPedido))
            )
            .andExpect(status().isBadRequest());

        // Validate the MovimientoPedido in the database
        List<MovimientoPedido> movimientoPedidoList = movimientoPedidoRepository.findAll();
        assertThat(movimientoPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMovimientoPedido() throws Exception {
        int databaseSizeBeforeUpdate = movimientoPedidoRepository.findAll().size();
        movimientoPedido.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientoPedidoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(movimientoPedido))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MovimientoPedido in the database
        List<MovimientoPedido> movimientoPedidoList = movimientoPedidoRepository.findAll();
        assertThat(movimientoPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMovimientoPedido() throws Exception {
        // Initialize the database
        movimientoPedidoRepository.saveAndFlush(movimientoPedido);

        int databaseSizeBeforeDelete = movimientoPedidoRepository.findAll().size();

        // Delete the movimientoPedido
        restMovimientoPedidoMockMvc
            .perform(delete(ENTITY_API_URL_ID, movimientoPedido.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MovimientoPedido> movimientoPedidoList = movimientoPedidoRepository.findAll();
        assertThat(movimientoPedidoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
