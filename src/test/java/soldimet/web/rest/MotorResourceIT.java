package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.Motor;
import soldimet.repository.MotorRepository;
import soldimet.service.MotorService;
import soldimet.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static soldimet.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MotorResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class MotorResourceIT {

    private static final String DEFAULT_MARCA_MOTOR = "AAAAAAAAAA";
    private static final String UPDATED_MARCA_MOTOR = "BBBBBBBBBB";

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

    @Autowired
    private Validator validator;

    private MockMvc restMotorMockMvc;

    private Motor motor;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MotorResource motorResource = new MotorResource(motorService);
        this.restMotorMockMvc = MockMvcBuilders.standaloneSetup(motorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Motor createEntity(EntityManager em) {
        Motor motor = new Motor()
            .marcaMotor(DEFAULT_MARCA_MOTOR);
        return motor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Motor createUpdatedEntity(EntityManager em) {
        Motor motor = new Motor()
            .marcaMotor(UPDATED_MARCA_MOTOR);
        return motor;
    }

    @BeforeEach
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
        assertThat(testMotor.getMarcaMotor()).isEqualTo(DEFAULT_MARCA_MOTOR);
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
    public void checkMarcaMotorIsRequired() throws Exception {
        int databaseSizeBeforeTest = motorRepository.findAll().size();
        // set the field null
        motor.setMarcaMotor(null);

        // Create the Motor, which fails.

        restMotorMockMvc.perform(post("/api/motors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(motor)))
            .andExpect(status().isBadRequest());

        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeTest);
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
            .andExpect(jsonPath("$.[*].id").value(hasItem(motor.getId().intValue())))
            .andExpect(jsonPath("$.[*].marcaMotor").value(hasItem(DEFAULT_MARCA_MOTOR.toString())));
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
            .andExpect(jsonPath("$.id").value(motor.getId().intValue()))
            .andExpect(jsonPath("$.marcaMotor").value(DEFAULT_MARCA_MOTOR.toString()));
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
        Motor updatedMotor = motorRepository.findById(motor.getId()).get();
        // Disconnect from session so that the updates on updatedMotor are not directly saved in db
        em.detach(updatedMotor);
        updatedMotor
            .marcaMotor(UPDATED_MARCA_MOTOR);

        restMotorMockMvc.perform(put("/api/motors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMotor)))
            .andExpect(status().isOk());

        // Validate the Motor in the database
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeUpdate);
        Motor testMotor = motorList.get(motorList.size() - 1);
        assertThat(testMotor.getMarcaMotor()).isEqualTo(UPDATED_MARCA_MOTOR);
    }

    @Test
    @Transactional
    public void updateNonExistingMotor() throws Exception {
        int databaseSizeBeforeUpdate = motorRepository.findAll().size();

        // Create the Motor

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMotorMockMvc.perform(put("/api/motors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(motor)))
            .andExpect(status().isBadRequest());

        // Validate the Motor in the database
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMotor() throws Exception {
        // Initialize the database
        motorService.save(motor);

        int databaseSizeBeforeDelete = motorRepository.findAll().size();

        // Delete the motor
        restMotorMockMvc.perform(delete("/api/motors/{id}", motor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
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
