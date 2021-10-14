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
import soldimet.domain.Aplicacion;
import soldimet.domain.Cilindrada;
import soldimet.domain.DetallePresupuesto;
import soldimet.domain.Motor;
import soldimet.domain.TipoParteMotor;
import soldimet.repository.DetallePresupuestoRepository;

/**
 * Integration tests for the {@link DetallePresupuestoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DetallePresupuestoResourceIT {

    private static final Float DEFAULT_IMPORTE = 0F;
    private static final Float UPDATED_IMPORTE = 1F;

    private static final String ENTITY_API_URL = "/api/detalle-presupuestos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DetallePresupuestoRepository detallePresupuestoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDetallePresupuestoMockMvc;

    private DetallePresupuesto detallePresupuesto;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetallePresupuesto createEntity(EntityManager em) {
        DetallePresupuesto detallePresupuesto = new DetallePresupuesto().importe(DEFAULT_IMPORTE);
        // Add required entity
        Aplicacion aplicacion;
        if (TestUtil.findAll(em, Aplicacion.class).isEmpty()) {
            aplicacion = AplicacionResourceIT.createEntity(em);
            em.persist(aplicacion);
            em.flush();
        } else {
            aplicacion = TestUtil.findAll(em, Aplicacion.class).get(0);
        }
        detallePresupuesto.setAplicacion(aplicacion);
        // Add required entity
        Cilindrada cilindrada;
        if (TestUtil.findAll(em, Cilindrada.class).isEmpty()) {
            cilindrada = CilindradaResourceIT.createEntity(em);
            em.persist(cilindrada);
            em.flush();
        } else {
            cilindrada = TestUtil.findAll(em, Cilindrada.class).get(0);
        }
        detallePresupuesto.setCilindrada(cilindrada);
        // Add required entity
        Motor motor;
        if (TestUtil.findAll(em, Motor.class).isEmpty()) {
            motor = MotorResourceIT.createEntity(em);
            em.persist(motor);
            em.flush();
        } else {
            motor = TestUtil.findAll(em, Motor.class).get(0);
        }
        detallePresupuesto.setMotor(motor);
        // Add required entity
        TipoParteMotor tipoParteMotor;
        if (TestUtil.findAll(em, TipoParteMotor.class).isEmpty()) {
            tipoParteMotor = TipoParteMotorResourceIT.createEntity(em);
            em.persist(tipoParteMotor);
            em.flush();
        } else {
            tipoParteMotor = TestUtil.findAll(em, TipoParteMotor.class).get(0);
        }
        detallePresupuesto.setTipoParteMotor(tipoParteMotor);
        return detallePresupuesto;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetallePresupuesto createUpdatedEntity(EntityManager em) {
        DetallePresupuesto detallePresupuesto = new DetallePresupuesto().importe(UPDATED_IMPORTE);
        // Add required entity
        Aplicacion aplicacion;
        if (TestUtil.findAll(em, Aplicacion.class).isEmpty()) {
            aplicacion = AplicacionResourceIT.createUpdatedEntity(em);
            em.persist(aplicacion);
            em.flush();
        } else {
            aplicacion = TestUtil.findAll(em, Aplicacion.class).get(0);
        }
        detallePresupuesto.setAplicacion(aplicacion);
        // Add required entity
        Cilindrada cilindrada;
        if (TestUtil.findAll(em, Cilindrada.class).isEmpty()) {
            cilindrada = CilindradaResourceIT.createUpdatedEntity(em);
            em.persist(cilindrada);
            em.flush();
        } else {
            cilindrada = TestUtil.findAll(em, Cilindrada.class).get(0);
        }
        detallePresupuesto.setCilindrada(cilindrada);
        // Add required entity
        Motor motor;
        if (TestUtil.findAll(em, Motor.class).isEmpty()) {
            motor = MotorResourceIT.createUpdatedEntity(em);
            em.persist(motor);
            em.flush();
        } else {
            motor = TestUtil.findAll(em, Motor.class).get(0);
        }
        detallePresupuesto.setMotor(motor);
        // Add required entity
        TipoParteMotor tipoParteMotor;
        if (TestUtil.findAll(em, TipoParteMotor.class).isEmpty()) {
            tipoParteMotor = TipoParteMotorResourceIT.createUpdatedEntity(em);
            em.persist(tipoParteMotor);
            em.flush();
        } else {
            tipoParteMotor = TestUtil.findAll(em, TipoParteMotor.class).get(0);
        }
        detallePresupuesto.setTipoParteMotor(tipoParteMotor);
        return detallePresupuesto;
    }

    @BeforeEach
    public void initTest() {
        detallePresupuesto = createEntity(em);
    }

    @Test
    @Transactional
    void createDetallePresupuesto() throws Exception {
        int databaseSizeBeforeCreate = detallePresupuestoRepository.findAll().size();
        // Create the DetallePresupuesto
        restDetallePresupuestoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(detallePresupuesto))
            )
            .andExpect(status().isCreated());

        // Validate the DetallePresupuesto in the database
        List<DetallePresupuesto> detallePresupuestoList = detallePresupuestoRepository.findAll();
        assertThat(detallePresupuestoList).hasSize(databaseSizeBeforeCreate + 1);
        DetallePresupuesto testDetallePresupuesto = detallePresupuestoList.get(detallePresupuestoList.size() - 1);
        assertThat(testDetallePresupuesto.getImporte()).isEqualTo(DEFAULT_IMPORTE);
    }

    @Test
    @Transactional
    void createDetallePresupuestoWithExistingId() throws Exception {
        // Create the DetallePresupuesto with an existing ID
        detallePresupuesto.setId(1L);

        int databaseSizeBeforeCreate = detallePresupuestoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDetallePresupuestoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(detallePresupuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetallePresupuesto in the database
        List<DetallePresupuesto> detallePresupuestoList = detallePresupuestoRepository.findAll();
        assertThat(detallePresupuestoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkImporteIsRequired() throws Exception {
        int databaseSizeBeforeTest = detallePresupuestoRepository.findAll().size();
        // set the field null
        detallePresupuesto.setImporte(null);

        // Create the DetallePresupuesto, which fails.

        restDetallePresupuestoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(detallePresupuesto))
            )
            .andExpect(status().isBadRequest());

        List<DetallePresupuesto> detallePresupuestoList = detallePresupuestoRepository.findAll();
        assertThat(detallePresupuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllDetallePresupuestos() throws Exception {
        // Initialize the database
        detallePresupuestoRepository.saveAndFlush(detallePresupuesto);

        // Get all the detallePresupuestoList
        restDetallePresupuestoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(detallePresupuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].importe").value(hasItem(DEFAULT_IMPORTE.doubleValue())));
    }

    @Test
    @Transactional
    void getDetallePresupuesto() throws Exception {
        // Initialize the database
        detallePresupuestoRepository.saveAndFlush(detallePresupuesto);

        // Get the detallePresupuesto
        restDetallePresupuestoMockMvc
            .perform(get(ENTITY_API_URL_ID, detallePresupuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(detallePresupuesto.getId().intValue()))
            .andExpect(jsonPath("$.importe").value(DEFAULT_IMPORTE.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingDetallePresupuesto() throws Exception {
        // Get the detallePresupuesto
        restDetallePresupuestoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDetallePresupuesto() throws Exception {
        // Initialize the database
        detallePresupuestoRepository.saveAndFlush(detallePresupuesto);

        int databaseSizeBeforeUpdate = detallePresupuestoRepository.findAll().size();

        // Update the detallePresupuesto
        DetallePresupuesto updatedDetallePresupuesto = detallePresupuestoRepository.findById(detallePresupuesto.getId()).get();
        // Disconnect from session so that the updates on updatedDetallePresupuesto are not directly saved in db
        em.detach(updatedDetallePresupuesto);
        updatedDetallePresupuesto.importe(UPDATED_IMPORTE);

        restDetallePresupuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDetallePresupuesto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDetallePresupuesto))
            )
            .andExpect(status().isOk());

        // Validate the DetallePresupuesto in the database
        List<DetallePresupuesto> detallePresupuestoList = detallePresupuestoRepository.findAll();
        assertThat(detallePresupuestoList).hasSize(databaseSizeBeforeUpdate);
        DetallePresupuesto testDetallePresupuesto = detallePresupuestoList.get(detallePresupuestoList.size() - 1);
        assertThat(testDetallePresupuesto.getImporte()).isEqualTo(UPDATED_IMPORTE);
    }

    @Test
    @Transactional
    void putNonExistingDetallePresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = detallePresupuestoRepository.findAll().size();
        detallePresupuesto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDetallePresupuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, detallePresupuesto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(detallePresupuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetallePresupuesto in the database
        List<DetallePresupuesto> detallePresupuestoList = detallePresupuestoRepository.findAll();
        assertThat(detallePresupuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDetallePresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = detallePresupuestoRepository.findAll().size();
        detallePresupuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetallePresupuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(detallePresupuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetallePresupuesto in the database
        List<DetallePresupuesto> detallePresupuestoList = detallePresupuestoRepository.findAll();
        assertThat(detallePresupuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDetallePresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = detallePresupuestoRepository.findAll().size();
        detallePresupuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetallePresupuestoMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(detallePresupuesto))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DetallePresupuesto in the database
        List<DetallePresupuesto> detallePresupuestoList = detallePresupuestoRepository.findAll();
        assertThat(detallePresupuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDetallePresupuestoWithPatch() throws Exception {
        // Initialize the database
        detallePresupuestoRepository.saveAndFlush(detallePresupuesto);

        int databaseSizeBeforeUpdate = detallePresupuestoRepository.findAll().size();

        // Update the detallePresupuesto using partial update
        DetallePresupuesto partialUpdatedDetallePresupuesto = new DetallePresupuesto();
        partialUpdatedDetallePresupuesto.setId(detallePresupuesto.getId());

        restDetallePresupuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDetallePresupuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDetallePresupuesto))
            )
            .andExpect(status().isOk());

        // Validate the DetallePresupuesto in the database
        List<DetallePresupuesto> detallePresupuestoList = detallePresupuestoRepository.findAll();
        assertThat(detallePresupuestoList).hasSize(databaseSizeBeforeUpdate);
        DetallePresupuesto testDetallePresupuesto = detallePresupuestoList.get(detallePresupuestoList.size() - 1);
        assertThat(testDetallePresupuesto.getImporte()).isEqualTo(DEFAULT_IMPORTE);
    }

    @Test
    @Transactional
    void fullUpdateDetallePresupuestoWithPatch() throws Exception {
        // Initialize the database
        detallePresupuestoRepository.saveAndFlush(detallePresupuesto);

        int databaseSizeBeforeUpdate = detallePresupuestoRepository.findAll().size();

        // Update the detallePresupuesto using partial update
        DetallePresupuesto partialUpdatedDetallePresupuesto = new DetallePresupuesto();
        partialUpdatedDetallePresupuesto.setId(detallePresupuesto.getId());

        partialUpdatedDetallePresupuesto.importe(UPDATED_IMPORTE);

        restDetallePresupuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDetallePresupuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDetallePresupuesto))
            )
            .andExpect(status().isOk());

        // Validate the DetallePresupuesto in the database
        List<DetallePresupuesto> detallePresupuestoList = detallePresupuestoRepository.findAll();
        assertThat(detallePresupuestoList).hasSize(databaseSizeBeforeUpdate);
        DetallePresupuesto testDetallePresupuesto = detallePresupuestoList.get(detallePresupuestoList.size() - 1);
        assertThat(testDetallePresupuesto.getImporte()).isEqualTo(UPDATED_IMPORTE);
    }

    @Test
    @Transactional
    void patchNonExistingDetallePresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = detallePresupuestoRepository.findAll().size();
        detallePresupuesto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDetallePresupuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, detallePresupuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(detallePresupuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetallePresupuesto in the database
        List<DetallePresupuesto> detallePresupuestoList = detallePresupuestoRepository.findAll();
        assertThat(detallePresupuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDetallePresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = detallePresupuestoRepository.findAll().size();
        detallePresupuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetallePresupuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(detallePresupuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetallePresupuesto in the database
        List<DetallePresupuesto> detallePresupuestoList = detallePresupuestoRepository.findAll();
        assertThat(detallePresupuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDetallePresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = detallePresupuestoRepository.findAll().size();
        detallePresupuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetallePresupuestoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(detallePresupuesto))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DetallePresupuesto in the database
        List<DetallePresupuesto> detallePresupuestoList = detallePresupuestoRepository.findAll();
        assertThat(detallePresupuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDetallePresupuesto() throws Exception {
        // Initialize the database
        detallePresupuestoRepository.saveAndFlush(detallePresupuesto);

        int databaseSizeBeforeDelete = detallePresupuestoRepository.findAll().size();

        // Delete the detallePresupuesto
        restDetallePresupuestoMockMvc
            .perform(delete(ENTITY_API_URL_ID, detallePresupuesto.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DetallePresupuesto> detallePresupuestoList = detallePresupuestoRepository.findAll();
        assertThat(detallePresupuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
