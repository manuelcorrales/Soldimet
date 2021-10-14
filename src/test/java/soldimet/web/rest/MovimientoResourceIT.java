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
import soldimet.domain.Empleado;
import soldimet.domain.EstadoMovimiento;
import soldimet.domain.Movimiento;
import soldimet.domain.TipoMovimiento;
import soldimet.repository.MovimientoRepository;

/**
 * Integration tests for the {@link MovimientoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MovimientoResourceIT {

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());

    private static final Float DEFAULT_IMPORTE = 1F;
    private static final Float UPDATED_IMPORTE = 2F;

    private static final Float DEFAULT_DESCUENTO = 1F;
    private static final Float UPDATED_DESCUENTO = 2F;

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/movimientos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MovimientoRepository movimientoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMovimientoMockMvc;

    private Movimiento movimiento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Movimiento createEntity(EntityManager em) {
        Movimiento movimiento = new Movimiento()
            .fecha(DEFAULT_FECHA)
            .importe(DEFAULT_IMPORTE)
            .descuento(DEFAULT_DESCUENTO)
            .observaciones(DEFAULT_OBSERVACIONES);
        // Add required entity
        EstadoMovimiento estadoMovimiento;
        if (TestUtil.findAll(em, EstadoMovimiento.class).isEmpty()) {
            estadoMovimiento = EstadoMovimientoResourceIT.createEntity(em);
            em.persist(estadoMovimiento);
            em.flush();
        } else {
            estadoMovimiento = TestUtil.findAll(em, EstadoMovimiento.class).get(0);
        }
        movimiento.setEstado(estadoMovimiento);
        // Add required entity
        TipoMovimiento tipoMovimiento;
        if (TestUtil.findAll(em, TipoMovimiento.class).isEmpty()) {
            tipoMovimiento = TipoMovimientoResourceIT.createEntity(em);
            em.persist(tipoMovimiento);
            em.flush();
        } else {
            tipoMovimiento = TestUtil.findAll(em, TipoMovimiento.class).get(0);
        }
        movimiento.setTipoMovimiento(tipoMovimiento);
        // Add required entity
        Empleado empleado;
        if (TestUtil.findAll(em, Empleado.class).isEmpty()) {
            empleado = EmpleadoResourceIT.createEntity(em);
            em.persist(empleado);
            em.flush();
        } else {
            empleado = TestUtil.findAll(em, Empleado.class).get(0);
        }
        movimiento.setEmpleado(empleado);
        return movimiento;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Movimiento createUpdatedEntity(EntityManager em) {
        Movimiento movimiento = new Movimiento()
            .fecha(UPDATED_FECHA)
            .importe(UPDATED_IMPORTE)
            .descuento(UPDATED_DESCUENTO)
            .observaciones(UPDATED_OBSERVACIONES);
        // Add required entity
        EstadoMovimiento estadoMovimiento;
        if (TestUtil.findAll(em, EstadoMovimiento.class).isEmpty()) {
            estadoMovimiento = EstadoMovimientoResourceIT.createUpdatedEntity(em);
            em.persist(estadoMovimiento);
            em.flush();
        } else {
            estadoMovimiento = TestUtil.findAll(em, EstadoMovimiento.class).get(0);
        }
        movimiento.setEstado(estadoMovimiento);
        // Add required entity
        TipoMovimiento tipoMovimiento;
        if (TestUtil.findAll(em, TipoMovimiento.class).isEmpty()) {
            tipoMovimiento = TipoMovimientoResourceIT.createUpdatedEntity(em);
            em.persist(tipoMovimiento);
            em.flush();
        } else {
            tipoMovimiento = TestUtil.findAll(em, TipoMovimiento.class).get(0);
        }
        movimiento.setTipoMovimiento(tipoMovimiento);
        // Add required entity
        Empleado empleado;
        if (TestUtil.findAll(em, Empleado.class).isEmpty()) {
            empleado = EmpleadoResourceIT.createUpdatedEntity(em);
            em.persist(empleado);
            em.flush();
        } else {
            empleado = TestUtil.findAll(em, Empleado.class).get(0);
        }
        movimiento.setEmpleado(empleado);
        return movimiento;
    }

    @BeforeEach
    public void initTest() {
        movimiento = createEntity(em);
    }

    @Test
    @Transactional
    void createMovimiento() throws Exception {
        int databaseSizeBeforeCreate = movimientoRepository.findAll().size();
        // Create the Movimiento
        restMovimientoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(movimiento)))
            .andExpect(status().isCreated());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeCreate + 1);
        Movimiento testMovimiento = movimientoList.get(movimientoList.size() - 1);
        assertThat(testMovimiento.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testMovimiento.getImporte()).isEqualTo(DEFAULT_IMPORTE);
        assertThat(testMovimiento.getDescuento()).isEqualTo(DEFAULT_DESCUENTO);
        assertThat(testMovimiento.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
    }

    @Test
    @Transactional
    void createMovimientoWithExistingId() throws Exception {
        // Create the Movimiento with an existing ID
        movimiento.setId(1L);

        int databaseSizeBeforeCreate = movimientoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMovimientoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(movimiento)))
            .andExpect(status().isBadRequest());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkFechaIsRequired() throws Exception {
        int databaseSizeBeforeTest = movimientoRepository.findAll().size();
        // set the field null
        movimiento.setFecha(null);

        // Create the Movimiento, which fails.

        restMovimientoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(movimiento)))
            .andExpect(status().isBadRequest());

        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkImporteIsRequired() throws Exception {
        int databaseSizeBeforeTest = movimientoRepository.findAll().size();
        // set the field null
        movimiento.setImporte(null);

        // Create the Movimiento, which fails.

        restMovimientoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(movimiento)))
            .andExpect(status().isBadRequest());

        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllMovimientos() throws Exception {
        // Initialize the database
        movimientoRepository.saveAndFlush(movimiento);

        // Get all the movimientoList
        restMovimientoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(movimiento.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].importe").value(hasItem(DEFAULT_IMPORTE.doubleValue())))
            .andExpect(jsonPath("$.[*].descuento").value(hasItem(DEFAULT_DESCUENTO.doubleValue())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES)));
    }

    @Test
    @Transactional
    void getMovimiento() throws Exception {
        // Initialize the database
        movimientoRepository.saveAndFlush(movimiento);

        // Get the movimiento
        restMovimientoMockMvc
            .perform(get(ENTITY_API_URL_ID, movimiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(movimiento.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.importe").value(DEFAULT_IMPORTE.doubleValue()))
            .andExpect(jsonPath("$.descuento").value(DEFAULT_DESCUENTO.doubleValue()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES));
    }

    @Test
    @Transactional
    void getNonExistingMovimiento() throws Exception {
        // Get the movimiento
        restMovimientoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMovimiento() throws Exception {
        // Initialize the database
        movimientoRepository.saveAndFlush(movimiento);

        int databaseSizeBeforeUpdate = movimientoRepository.findAll().size();

        // Update the movimiento
        Movimiento updatedMovimiento = movimientoRepository.findById(movimiento.getId()).get();
        // Disconnect from session so that the updates on updatedMovimiento are not directly saved in db
        em.detach(updatedMovimiento);
        updatedMovimiento.fecha(UPDATED_FECHA).importe(UPDATED_IMPORTE).descuento(UPDATED_DESCUENTO).observaciones(UPDATED_OBSERVACIONES);

        restMovimientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMovimiento.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMovimiento))
            )
            .andExpect(status().isOk());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeUpdate);
        Movimiento testMovimiento = movimientoList.get(movimientoList.size() - 1);
        assertThat(testMovimiento.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testMovimiento.getImporte()).isEqualTo(UPDATED_IMPORTE);
        assertThat(testMovimiento.getDescuento()).isEqualTo(UPDATED_DESCUENTO);
        assertThat(testMovimiento.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    void putNonExistingMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = movimientoRepository.findAll().size();
        movimiento.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMovimientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, movimiento.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(movimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = movimientoRepository.findAll().size();
        movimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(movimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = movimientoRepository.findAll().size();
        movimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(movimiento)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMovimientoWithPatch() throws Exception {
        // Initialize the database
        movimientoRepository.saveAndFlush(movimiento);

        int databaseSizeBeforeUpdate = movimientoRepository.findAll().size();

        // Update the movimiento using partial update
        Movimiento partialUpdatedMovimiento = new Movimiento();
        partialUpdatedMovimiento.setId(movimiento.getId());

        partialUpdatedMovimiento.observaciones(UPDATED_OBSERVACIONES);

        restMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMovimiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMovimiento))
            )
            .andExpect(status().isOk());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeUpdate);
        Movimiento testMovimiento = movimientoList.get(movimientoList.size() - 1);
        assertThat(testMovimiento.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testMovimiento.getImporte()).isEqualTo(DEFAULT_IMPORTE);
        assertThat(testMovimiento.getDescuento()).isEqualTo(DEFAULT_DESCUENTO);
        assertThat(testMovimiento.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    void fullUpdateMovimientoWithPatch() throws Exception {
        // Initialize the database
        movimientoRepository.saveAndFlush(movimiento);

        int databaseSizeBeforeUpdate = movimientoRepository.findAll().size();

        // Update the movimiento using partial update
        Movimiento partialUpdatedMovimiento = new Movimiento();
        partialUpdatedMovimiento.setId(movimiento.getId());

        partialUpdatedMovimiento
            .fecha(UPDATED_FECHA)
            .importe(UPDATED_IMPORTE)
            .descuento(UPDATED_DESCUENTO)
            .observaciones(UPDATED_OBSERVACIONES);

        restMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMovimiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMovimiento))
            )
            .andExpect(status().isOk());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeUpdate);
        Movimiento testMovimiento = movimientoList.get(movimientoList.size() - 1);
        assertThat(testMovimiento.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testMovimiento.getImporte()).isEqualTo(UPDATED_IMPORTE);
        assertThat(testMovimiento.getDescuento()).isEqualTo(UPDATED_DESCUENTO);
        assertThat(testMovimiento.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    void patchNonExistingMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = movimientoRepository.findAll().size();
        movimiento.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, movimiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(movimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = movimientoRepository.findAll().size();
        movimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(movimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = movimientoRepository.findAll().size();
        movimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(movimiento))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMovimiento() throws Exception {
        // Initialize the database
        movimientoRepository.saveAndFlush(movimiento);

        int databaseSizeBeforeDelete = movimientoRepository.findAll().size();

        // Delete the movimiento
        restMovimientoMockMvc
            .perform(delete(ENTITY_API_URL_ID, movimiento.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
