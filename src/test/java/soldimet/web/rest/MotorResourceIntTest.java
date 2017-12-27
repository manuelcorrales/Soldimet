package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.Motor;
import soldimet.repository.MotorRepository;
import soldimet.service.MotorService;
import soldimet.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MotorResource REST controller.
 *
 * @see MotorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class MotorResourceIntTest {

    @Autowired
    private MotorRepository motorRepository;

    @Autowired
    private MotorService motorService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMotorMockMvc;

    private Motor motor;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MotorResource motorResource = new MotorResource(motorService);
        this.restMotorMockMvc = MockMvcBuilders.standaloneSetup(motorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Motor createEntity(EntityManager em) {
        Motor motor = new Motor();
        return motor;
    }

    @Before
    public void initTest() {
        motor = createEntity(em);
    }

    @Test
    @Transactional
    public void createMotor() throws Exception {
        int databaseSizeBeforeCreate = motorRepository.findAll().size();

        // Create the Motor
        restMotorMockMvc.perform(post("/api/motors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(motor)))
            .andExpect(status().isCreated());

        // Validate the Motor in the database
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeCreate + 1);
        Motor testMotor = motorList.get(motorList.size() - 1);
    }

    @Test
    @Transactional
    public void createMotorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = motorRepository.findAll().size();

        // Create the Motor with an existing ID
        motor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMotorMockMvc.perform(post("/api/motors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(motor)))
            .andExpect(status().isBadRequest());

        // Validate the Motor in the database
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMotors() throws Exception {
        // Initialize the database
        motorRepository.saveAndFlush(motor);

        // Get all the motorList
        restMotorMockMvc.perform(get("/api/motors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(motor.getId().intValue())));
    }

    @Test
    @Transactional
    public void getMotor() throws Exception {
        // Initialize the database
        motorRepository.saveAndFlush(motor);

        // Get the motor
        restMotorMockMvc.perform(get("/api/motors/{id}", motor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(motor.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMotor() throws Exception {
        // Get the motor
        restMotorMockMvc.perform(get("/api/motors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMotor() throws Exception {
        // Initialize the database
        motorService.save(motor);

        int databaseSizeBeforeUpdate = motorRepository.findAll().size();

        // Update the motor
        Motor updatedMotor = motorRepository.findOne(motor.getId());

        restMotorMockMvc.perform(put("/api/motors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMotor)))
            .andExpect(status().isOk());

        // Validate the Motor in the database
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeUpdate);
        Motor testMotor = motorList.get(motorList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingMotor() throws Exception {
        int databaseSizeBeforeUpdate = motorRepository.findAll().size();

        // Create the Motor

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMotorMockMvc.perform(put("/api/motors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(motor)))
            .andExpect(status().isCreated());

        // Validate the Motor in the database
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMotor() throws Exception {
        // Initialize the database
        motorService.save(motor);

        int databaseSizeBeforeDelete = motorRepository.findAll().size();

        // Get the motor
        restMotorMockMvc.perform(delete("/api/motors/{id}", motor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Motor.class);
        Motor motor1 = new Motor();
        motor1.setId(1L);
        Motor motor2 = new Motor();
        motor2.setId(motor1.getId());
        assertThat(motor1).isEqualTo(motor2);
        motor2.setId(2L);
        assertThat(motor1).isNotEqualTo(motor2);
        motor1.setId(null);
        assertThat(motor1).isNotEqualTo(motor2);
    }
}
