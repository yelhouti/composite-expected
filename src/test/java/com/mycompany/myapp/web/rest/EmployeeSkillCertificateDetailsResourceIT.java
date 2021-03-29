package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.EmployeeSkillCertificate;
import com.mycompany.myapp.domain.EmployeeSkillCertificateDetails;
import com.mycompany.myapp.domain.EmployeeSkillCertificateId;
import com.mycompany.myapp.repository.EmployeeSkillCertificateDetailsRepository;
import com.mycompany.myapp.service.criteria.EmployeeSkillCertificateDetailsCriteria;
import com.mycompany.myapp.service.dto.EmployeeSkillCertificateDetailsDTO;
import com.mycompany.myapp.service.mapper.EmployeeSkillCertificateDetailsMapper;
import java.util.List;
import java.util.Random;
import java.util.UUID;
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

/**
 * Integration tests for the {@link EmployeeSkillCertificateDetailsResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EmployeeSkillCertificateDetailsResourceIT {

    private static final String DEFAULT_DETAIL = "AAAAAAAAAA";
    private static final String UPDATED_DETAIL = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/employee-skill-certificate-details";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EmployeeSkillCertificateDetailsRepository employeeSkillCertificateDetailsRepository;

    @Autowired
    private EmployeeSkillCertificateDetailsMapper employeeSkillCertificateDetailsMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEmployeeSkillCertificateDetailsMockMvc;

    private EmployeeSkillCertificateDetails employeeSkillCertificateDetails;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EmployeeSkillCertificateDetails createEntity(EntityManager em) {
        EmployeeSkillCertificateDetails employeeSkillCertificateDetails = new EmployeeSkillCertificateDetails().detail(DEFAULT_DETAIL);
        // Add required entity
        EmployeeSkillCertificate employeeSkillCertificate;
        if (TestUtil.findAll(em, EmployeeSkillCertificate.class).isEmpty()) {
            employeeSkillCertificate = EmployeeSkillCertificateResourceIT.createEntity(em);
            em.persist(employeeSkillCertificate);
            em.flush();
        } else {
            employeeSkillCertificate = TestUtil.findAll(em, EmployeeSkillCertificate.class).get(0);
        }
        employeeSkillCertificateDetails.setEmployeeSkillCertificate(employeeSkillCertificate);
        employeeSkillCertificateDetails.setId(
            new EmployeeSkillCertificateId(
                employeeSkillCertificateDetails.getEmployeeSkillCertificate().getType().getId(),
                employeeSkillCertificateDetails.getEmployeeSkillCertificate().getSkill().getName(),
                employeeSkillCertificateDetails.getEmployeeSkillCertificate().getSkill().getEmployee().getUsername()
            )
        );
        return employeeSkillCertificateDetails;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EmployeeSkillCertificateDetails createUpdatedEntity(EntityManager em) {
        EmployeeSkillCertificateDetails employeeSkillCertificateDetails = new EmployeeSkillCertificateDetails().detail(UPDATED_DETAIL);
        // Add required entity
        EmployeeSkillCertificate employeeSkillCertificate;
        if (TestUtil.findAll(em, EmployeeSkillCertificate.class).isEmpty()) {
            employeeSkillCertificate = EmployeeSkillCertificateResourceIT.createUpdatedEntity(em);
            em.persist(employeeSkillCertificate);
            em.flush();
        } else {
            employeeSkillCertificate = TestUtil.findAll(em, EmployeeSkillCertificate.class).get(0);
        }
        employeeSkillCertificateDetails.setEmployeeSkillCertificate(employeeSkillCertificate);
        employeeSkillCertificateDetails.setId(
            new EmployeeSkillCertificateId(
                employeeSkillCertificateDetails.getEmployeeSkillCertificate().getType().getId(),
                employeeSkillCertificateDetails.getEmployeeSkillCertificate().getSkill().getName(),
                employeeSkillCertificateDetails.getEmployeeSkillCertificate().getSkill().getEmployee().getUsername()
            )
        );
        return employeeSkillCertificateDetails;
    }

    @BeforeEach
    public void initTest() {
        employeeSkillCertificateDetails = createEntity(em);
    }

    @Test
    @Transactional
    void createEmployeeSkillCertificateDetails() throws Exception {
        int databaseSizeBeforeCreate = employeeSkillCertificateDetailsRepository.findAll().size();
        // Create the EmployeeSkillCertificateDetails
        EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO = employeeSkillCertificateDetailsMapper.toDto(
            employeeSkillCertificateDetails
        );
        restEmployeeSkillCertificateDetailsMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeSkillCertificateDetailsDTO))
            )
            .andExpect(status().isCreated());

        // Validate the EmployeeSkillCertificateDetails in the database
        List<EmployeeSkillCertificateDetails> employeeSkillCertificateDetailsList = employeeSkillCertificateDetailsRepository.findAll();
        assertThat(employeeSkillCertificateDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        EmployeeSkillCertificateDetails testEmployeeSkillCertificateDetails = employeeSkillCertificateDetailsList.get(
            employeeSkillCertificateDetailsList.size() - 1
        );
        assertThat(testEmployeeSkillCertificateDetails.getDetail()).isEqualTo(DEFAULT_DETAIL);

        // Validate the id for MapsId, the ids must be same
        assertThat(testEmployeeSkillCertificateDetails.getId())
            .isEqualTo(testEmployeeSkillCertificateDetails.getEmployeeSkillCertificate().getId());
    }

    @Test
    @Transactional
    void createEmployeeSkillCertificateDetailsWithExistingId() throws Exception {
        // Create the EmployeeSkillCertificateDetails with an existing ID
        employeeSkillCertificateDetailsRepository.saveAndFlush(employeeSkillCertificateDetails);
        EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO = employeeSkillCertificateDetailsMapper.toDto(
            employeeSkillCertificateDetails
        );

        int databaseSizeBeforeCreate = employeeSkillCertificateDetailsRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmployeeSkillCertificateDetailsMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeSkillCertificateDetailsDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EmployeeSkillCertificateDetails in the database
        List<EmployeeSkillCertificateDetails> employeeSkillCertificateDetailsList = employeeSkillCertificateDetailsRepository.findAll();
        assertThat(employeeSkillCertificateDetailsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDetailIsRequired() throws Exception {
        int databaseSizeBeforeTest = employeeSkillCertificateDetailsRepository.findAll().size();
        // set the field null
        employeeSkillCertificateDetails.setDetail(null);

        // Create the EmployeeSkillCertificateDetails, which fails.
        EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO = employeeSkillCertificateDetailsMapper.toDto(
            employeeSkillCertificateDetails
        );

        restEmployeeSkillCertificateDetailsMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeSkillCertificateDetailsDTO))
            )
            .andExpect(status().isBadRequest());

        List<EmployeeSkillCertificateDetails> employeeSkillCertificateDetailsList = employeeSkillCertificateDetailsRepository.findAll();
        assertThat(employeeSkillCertificateDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllEmployeeSkillCertificateDetails() throws Exception {
        // Initialize the database
        employeeSkillCertificateDetailsRepository.saveAndFlush(employeeSkillCertificateDetails);

        // Get all the employeeSkillCertificateDetailsList
        restEmployeeSkillCertificateDetailsMockMvc
            .perform(get(ENTITY_API_URL))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].detail").value(hasItem(DEFAULT_DETAIL)));
    }

    @Test
    @Transactional
    void getEmployeeSkillCertificateDetails() throws Exception {
        // Initialize the database
        employeeSkillCertificateDetailsRepository.saveAndFlush(employeeSkillCertificateDetails);

        // Get the employeeSkillCertificateDetails
        restEmployeeSkillCertificateDetailsMockMvc
            .perform(
                get(
                    ENTITY_API_URL_ID,
                    "typeId=" +
                    employeeSkillCertificateDetails.getId().getTypeId() +
                    ";" +
                    "skillName=" +
                    employeeSkillCertificateDetails.getId().getSkillName() +
                    ";" +
                    "skillEmployeeUsername=" +
                    employeeSkillCertificateDetails.getId().getSkillEmployeeUsername()
                )
            )
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.detail").value(DEFAULT_DETAIL));
    }

    @Test
    @Transactional
    void getAllEmployeeSkillCertificateDetailsByDetailIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeSkillCertificateDetailsRepository.saveAndFlush(employeeSkillCertificateDetails);

        // Get all the employeeSkillCertificateDetailsList where detail equals to DEFAULT_DETAIL
        defaultEmployeeSkillCertificateDetailsShouldBeFound("detail.equals=" + DEFAULT_DETAIL);

        // Get all the employeeSkillCertificateDetailsList where detail equals to UPDATED_DETAIL
        defaultEmployeeSkillCertificateDetailsShouldNotBeFound("detail.equals=" + UPDATED_DETAIL);
    }

    @Test
    @Transactional
    void getAllEmployeeSkillCertificateDetailsByDetailIsNotEqualToSomething() throws Exception {
        // Initialize the database
        employeeSkillCertificateDetailsRepository.saveAndFlush(employeeSkillCertificateDetails);

        // Get all the employeeSkillCertificateDetailsList where detail not equals to DEFAULT_DETAIL
        defaultEmployeeSkillCertificateDetailsShouldNotBeFound("detail.notEquals=" + DEFAULT_DETAIL);

        // Get all the employeeSkillCertificateDetailsList where detail not equals to UPDATED_DETAIL
        defaultEmployeeSkillCertificateDetailsShouldBeFound("detail.notEquals=" + UPDATED_DETAIL);
    }

    @Test
    @Transactional
    void getAllEmployeeSkillCertificateDetailsByDetailIsInShouldWork() throws Exception {
        // Initialize the database
        employeeSkillCertificateDetailsRepository.saveAndFlush(employeeSkillCertificateDetails);

        // Get all the employeeSkillCertificateDetailsList where detail in DEFAULT_DETAIL or UPDATED_DETAIL
        defaultEmployeeSkillCertificateDetailsShouldBeFound("detail.in=" + DEFAULT_DETAIL + "," + UPDATED_DETAIL);

        // Get all the employeeSkillCertificateDetailsList where detail equals to UPDATED_DETAIL
        defaultEmployeeSkillCertificateDetailsShouldNotBeFound("detail.in=" + UPDATED_DETAIL);
    }

    @Test
    @Transactional
    void getAllEmployeeSkillCertificateDetailsByDetailIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeSkillCertificateDetailsRepository.saveAndFlush(employeeSkillCertificateDetails);

        // Get all the employeeSkillCertificateDetailsList where detail is not null
        defaultEmployeeSkillCertificateDetailsShouldBeFound("detail.specified=true");

        // Get all the employeeSkillCertificateDetailsList where detail is null
        defaultEmployeeSkillCertificateDetailsShouldNotBeFound("detail.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeeSkillCertificateDetailsByDetailContainsSomething() throws Exception {
        // Initialize the database
        employeeSkillCertificateDetailsRepository.saveAndFlush(employeeSkillCertificateDetails);

        // Get all the employeeSkillCertificateDetailsList where detail contains DEFAULT_DETAIL
        defaultEmployeeSkillCertificateDetailsShouldBeFound("detail.contains=" + DEFAULT_DETAIL);

        // Get all the employeeSkillCertificateDetailsList where detail contains UPDATED_DETAIL
        defaultEmployeeSkillCertificateDetailsShouldNotBeFound("detail.contains=" + UPDATED_DETAIL);
    }

    @Test
    @Transactional
    void getAllEmployeeSkillCertificateDetailsByDetailNotContainsSomething() throws Exception {
        // Initialize the database
        employeeSkillCertificateDetailsRepository.saveAndFlush(employeeSkillCertificateDetails);

        // Get all the employeeSkillCertificateDetailsList where detail does not contain DEFAULT_DETAIL
        defaultEmployeeSkillCertificateDetailsShouldNotBeFound("detail.doesNotContain=" + DEFAULT_DETAIL);

        // Get all the employeeSkillCertificateDetailsList where detail does not contain UPDATED_DETAIL
        defaultEmployeeSkillCertificateDetailsShouldBeFound("detail.doesNotContain=" + UPDATED_DETAIL);
    }

    @Test
    @Transactional
    void getAllEmployeeSkillCertificateDetailsByEmployeeSkillCertificateIsEqualToSomething() throws Exception {
        // Get already existing entity
        EmployeeSkillCertificate employeeSkillCertificate = employeeSkillCertificateDetails.getEmployeeSkillCertificate();
        employeeSkillCertificateDetailsRepository.saveAndFlush(employeeSkillCertificateDetails);

        // Get all the employeeSkillCertificateDetailsList where employeeSkillCertificate.type.id equals to employeeSkillCertificate.getId().getTypeId()
        defaultEmployeeSkillCertificateDetailsShouldBeFound(
            "employeeSkillCertificate.type.id.equals=" + employeeSkillCertificate.getId().getTypeId()
        );

        // Get all the employeeSkillCertificateDetailsList where employeeSkillCertificate.type.id equals to (employeeSkillCertificate.getId().getTypeId() + 1)
        defaultEmployeeSkillCertificateDetailsShouldNotBeFound(
            "employeeSkillCertificate.type.id.equals=" + (employeeSkillCertificate.getId().getTypeId() + 1)
        );
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultEmployeeSkillCertificateDetailsShouldBeFound(String filter) throws Exception {
        restEmployeeSkillCertificateDetailsMockMvc
            .perform(get(ENTITY_API_URL + "?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].detail").value(hasItem(DEFAULT_DETAIL)));

        // Check, that the count call also returns 1
        restEmployeeSkillCertificateDetailsMockMvc
            .perform(get(ENTITY_API_URL + "/count?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultEmployeeSkillCertificateDetailsShouldNotBeFound(String filter) throws Exception {
        restEmployeeSkillCertificateDetailsMockMvc
            .perform(get(ENTITY_API_URL + "?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restEmployeeSkillCertificateDetailsMockMvc
            .perform(get(ENTITY_API_URL + "/count?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingEmployeeSkillCertificateDetails() throws Exception {
        // Get the employeeSkillCertificateDetails
        restEmployeeSkillCertificateDetailsMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewEmployeeSkillCertificateDetails() throws Exception {
        // Initialize the database
        employeeSkillCertificateDetailsRepository.saveAndFlush(employeeSkillCertificateDetails);

        int databaseSizeBeforeUpdate = employeeSkillCertificateDetailsRepository.findAll().size();

        // Update the employeeSkillCertificateDetails
        EmployeeSkillCertificateDetails updatedEmployeeSkillCertificateDetails = employeeSkillCertificateDetailsRepository
            .findById(employeeSkillCertificateDetails.getId())
            .get();
        // Disconnect from session so that the updates on updatedEmployeeSkillCertificateDetails are not directly saved in db
        em.detach(updatedEmployeeSkillCertificateDetails);
        updatedEmployeeSkillCertificateDetails.detail(UPDATED_DETAIL);
        EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO = employeeSkillCertificateDetailsMapper.toDto(
            updatedEmployeeSkillCertificateDetails
        );

        restEmployeeSkillCertificateDetailsMockMvc
            .perform(
                put(
                    ENTITY_API_URL_ID,
                    "typeId=" +
                    employeeSkillCertificateDetails.getId().getTypeId() +
                    ";" +
                    "skillName=" +
                    employeeSkillCertificateDetails.getId().getSkillName() +
                    ";" +
                    "skillEmployeeUsername=" +
                    employeeSkillCertificateDetails.getId().getSkillEmployeeUsername()
                )
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeSkillCertificateDetailsDTO))
            )
            .andExpect(status().isOk());

        // Validate the EmployeeSkillCertificateDetails in the database
        List<EmployeeSkillCertificateDetails> employeeSkillCertificateDetailsList = employeeSkillCertificateDetailsRepository.findAll();
        assertThat(employeeSkillCertificateDetailsList).hasSize(databaseSizeBeforeUpdate);
        EmployeeSkillCertificateDetails testEmployeeSkillCertificateDetails = employeeSkillCertificateDetailsList.get(
            employeeSkillCertificateDetailsList.size() - 1
        );
        assertThat(testEmployeeSkillCertificateDetails.getDetail()).isEqualTo(UPDATED_DETAIL);
    }

    @Test
    @Transactional
    void putNonExistingEmployeeSkillCertificateDetails() throws Exception {
        int databaseSizeBeforeUpdate = employeeSkillCertificateDetailsRepository.findAll().size();
        employeeSkillCertificateDetails.setId(
            new EmployeeSkillCertificateId(count.incrementAndGet(), UUID.randomUUID().toString(), UUID.randomUUID().toString())
        );

        // Create the EmployeeSkillCertificateDetails
        EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO = employeeSkillCertificateDetailsMapper.toDto(
            employeeSkillCertificateDetails
        );

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmployeeSkillCertificateDetailsMockMvc
            .perform(
                put(
                    ENTITY_API_URL_ID,
                    "typeId=" +
                    employeeSkillCertificateDetails.getId().getTypeId() +
                    ";" +
                    "skillName=" +
                    employeeSkillCertificateDetails.getId().getSkillName() +
                    ";" +
                    "skillEmployeeUsername=" +
                    employeeSkillCertificateDetails.getId().getSkillEmployeeUsername()
                )
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeSkillCertificateDetailsDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EmployeeSkillCertificateDetails in the database
        List<EmployeeSkillCertificateDetails> employeeSkillCertificateDetailsList = employeeSkillCertificateDetailsRepository.findAll();
        assertThat(employeeSkillCertificateDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEmployeeSkillCertificateDetails() throws Exception {
        int databaseSizeBeforeUpdate = employeeSkillCertificateDetailsRepository.findAll().size();
        employeeSkillCertificateDetails.setId(
            new EmployeeSkillCertificateId(count.incrementAndGet(), UUID.randomUUID().toString(), UUID.randomUUID().toString())
        );

        // Create the EmployeeSkillCertificateDetails
        EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO = employeeSkillCertificateDetailsMapper.toDto(
            employeeSkillCertificateDetails
        );

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmployeeSkillCertificateDetailsMockMvc
            .perform(
                put(
                    ENTITY_API_URL_ID,
                    "typeId=" +
                    count.incrementAndGet() +
                    ";" +
                    "skillName=" +
                    UUID.randomUUID().toString() +
                    ";" +
                    "skillEmployeeUsername=" +
                    UUID.randomUUID().toString()
                )
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeSkillCertificateDetailsDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EmployeeSkillCertificateDetails in the database
        List<EmployeeSkillCertificateDetails> employeeSkillCertificateDetailsList = employeeSkillCertificateDetailsRepository.findAll();
        assertThat(employeeSkillCertificateDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEmployeeSkillCertificateDetails() throws Exception {
        int databaseSizeBeforeUpdate = employeeSkillCertificateDetailsRepository.findAll().size();
        employeeSkillCertificateDetails.setId(
            new EmployeeSkillCertificateId(count.incrementAndGet(), UUID.randomUUID().toString(), UUID.randomUUID().toString())
        );

        // Create the EmployeeSkillCertificateDetails
        EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO = employeeSkillCertificateDetailsMapper.toDto(
            employeeSkillCertificateDetails
        );

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmployeeSkillCertificateDetailsMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeSkillCertificateDetailsDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EmployeeSkillCertificateDetails in the database
        List<EmployeeSkillCertificateDetails> employeeSkillCertificateDetailsList = employeeSkillCertificateDetailsRepository.findAll();
        assertThat(employeeSkillCertificateDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEmployeeSkillCertificateDetailsWithPatch() throws Exception {
        // Initialize the database
        employeeSkillCertificateDetailsRepository.saveAndFlush(employeeSkillCertificateDetails);

        int databaseSizeBeforeUpdate = employeeSkillCertificateDetailsRepository.findAll().size();

        // Update the employeeSkillCertificateDetails using partial update
        EmployeeSkillCertificateDetails partialUpdatedEmployeeSkillCertificateDetails = new EmployeeSkillCertificateDetails();
        partialUpdatedEmployeeSkillCertificateDetails.setId(employeeSkillCertificateDetails.getId());
        partialUpdatedEmployeeSkillCertificateDetails.setEmployeeSkillCertificate(
            employeeSkillCertificateDetails.getEmployeeSkillCertificate()
        );

        restEmployeeSkillCertificateDetailsMockMvc
            .perform(
                patch(
                    ENTITY_API_URL_ID,
                    "typeId=" +
                    partialUpdatedEmployeeSkillCertificateDetails.getId().getTypeId() +
                    ";" +
                    "skillName=" +
                    partialUpdatedEmployeeSkillCertificateDetails.getId().getSkillName() +
                    ";" +
                    "skillEmployeeUsername=" +
                    partialUpdatedEmployeeSkillCertificateDetails.getId().getSkillEmployeeUsername()
                )
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEmployeeSkillCertificateDetails))
            )
            .andExpect(status().isOk());

        // Validate the EmployeeSkillCertificateDetails in the database
        List<EmployeeSkillCertificateDetails> employeeSkillCertificateDetailsList = employeeSkillCertificateDetailsRepository.findAll();
        assertThat(employeeSkillCertificateDetailsList).hasSize(databaseSizeBeforeUpdate);
        EmployeeSkillCertificateDetails testEmployeeSkillCertificateDetails = employeeSkillCertificateDetailsList.get(
            employeeSkillCertificateDetailsList.size() - 1
        );
        assertThat(testEmployeeSkillCertificateDetails.getDetail()).isEqualTo(DEFAULT_DETAIL);
    }

    @Test
    @Transactional
    void fullUpdateEmployeeSkillCertificateDetailsWithPatch() throws Exception {
        // Initialize the database
        employeeSkillCertificateDetailsRepository.saveAndFlush(employeeSkillCertificateDetails);

        int databaseSizeBeforeUpdate = employeeSkillCertificateDetailsRepository.findAll().size();

        // Update the employeeSkillCertificateDetails using partial update
        EmployeeSkillCertificateDetails partialUpdatedEmployeeSkillCertificateDetails = new EmployeeSkillCertificateDetails();
        partialUpdatedEmployeeSkillCertificateDetails.setId(employeeSkillCertificateDetails.getId());
        partialUpdatedEmployeeSkillCertificateDetails.setEmployeeSkillCertificate(
            employeeSkillCertificateDetails.getEmployeeSkillCertificate()
        );

        partialUpdatedEmployeeSkillCertificateDetails.detail(UPDATED_DETAIL);

        restEmployeeSkillCertificateDetailsMockMvc
            .perform(
                patch(
                    ENTITY_API_URL_ID,
                    "typeId=" +
                    partialUpdatedEmployeeSkillCertificateDetails.getId().getTypeId() +
                    ";" +
                    "skillName=" +
                    partialUpdatedEmployeeSkillCertificateDetails.getId().getSkillName() +
                    ";" +
                    "skillEmployeeUsername=" +
                    partialUpdatedEmployeeSkillCertificateDetails.getId().getSkillEmployeeUsername()
                )
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEmployeeSkillCertificateDetails))
            )
            .andExpect(status().isOk());

        // Validate the EmployeeSkillCertificateDetails in the database
        List<EmployeeSkillCertificateDetails> employeeSkillCertificateDetailsList = employeeSkillCertificateDetailsRepository.findAll();
        assertThat(employeeSkillCertificateDetailsList).hasSize(databaseSizeBeforeUpdate);
        EmployeeSkillCertificateDetails testEmployeeSkillCertificateDetails = employeeSkillCertificateDetailsList.get(
            employeeSkillCertificateDetailsList.size() - 1
        );
        assertThat(testEmployeeSkillCertificateDetails.getDetail()).isEqualTo(UPDATED_DETAIL);
    }

    @Test
    @Transactional
    void patchNonExistingEmployeeSkillCertificateDetails() throws Exception {
        int databaseSizeBeforeUpdate = employeeSkillCertificateDetailsRepository.findAll().size();
        employeeSkillCertificateDetails.setId(
            new EmployeeSkillCertificateId(count.incrementAndGet(), UUID.randomUUID().toString(), UUID.randomUUID().toString())
        );

        // Create the EmployeeSkillCertificateDetails
        EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO = employeeSkillCertificateDetailsMapper.toDto(
            employeeSkillCertificateDetails
        );

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmployeeSkillCertificateDetailsMockMvc
            .perform(
                patch(
                    ENTITY_API_URL_ID,
                    "typeId=" +
                    count.incrementAndGet() +
                    ";" +
                    "skillName=" +
                    UUID.randomUUID().toString() +
                    ";" +
                    "skillEmployeeUsername=" +
                    UUID.randomUUID().toString()
                )
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(employeeSkillCertificateDetailsDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EmployeeSkillCertificateDetails in the database
        List<EmployeeSkillCertificateDetails> employeeSkillCertificateDetailsList = employeeSkillCertificateDetailsRepository.findAll();
        assertThat(employeeSkillCertificateDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEmployeeSkillCertificateDetails() throws Exception {
        int databaseSizeBeforeUpdate = employeeSkillCertificateDetailsRepository.findAll().size();
        employeeSkillCertificateDetails.setId(
            new EmployeeSkillCertificateId(count.incrementAndGet(), UUID.randomUUID().toString(), UUID.randomUUID().toString())
        );

        // Create the EmployeeSkillCertificateDetails
        EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO = employeeSkillCertificateDetailsMapper.toDto(
            employeeSkillCertificateDetails
        );

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmployeeSkillCertificateDetailsMockMvc
            .perform(
                patch(
                    ENTITY_API_URL_ID,
                    "typeId=" +
                    count.incrementAndGet() +
                    ";" +
                    "skillName=" +
                    UUID.randomUUID().toString() +
                    ";" +
                    "skillEmployeeUsername=" +
                    UUID.randomUUID().toString()
                )
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(employeeSkillCertificateDetailsDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EmployeeSkillCertificateDetails in the database
        List<EmployeeSkillCertificateDetails> employeeSkillCertificateDetailsList = employeeSkillCertificateDetailsRepository.findAll();
        assertThat(employeeSkillCertificateDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEmployeeSkillCertificateDetails() throws Exception {
        int databaseSizeBeforeUpdate = employeeSkillCertificateDetailsRepository.findAll().size();
        employeeSkillCertificateDetails.setId(
            new EmployeeSkillCertificateId(count.incrementAndGet(), UUID.randomUUID().toString(), UUID.randomUUID().toString())
        );

        // Create the EmployeeSkillCertificateDetails
        EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO = employeeSkillCertificateDetailsMapper.toDto(
            employeeSkillCertificateDetails
        );

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmployeeSkillCertificateDetailsMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(employeeSkillCertificateDetailsDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EmployeeSkillCertificateDetails in the database
        List<EmployeeSkillCertificateDetails> employeeSkillCertificateDetailsList = employeeSkillCertificateDetailsRepository.findAll();
        assertThat(employeeSkillCertificateDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEmployeeSkillCertificateDetails() throws Exception {
        // Initialize the database
        employeeSkillCertificateDetailsRepository.saveAndFlush(employeeSkillCertificateDetails);

        int databaseSizeBeforeDelete = employeeSkillCertificateDetailsRepository.findAll().size();

        // Delete the employeeSkillCertificateDetails
        restEmployeeSkillCertificateDetailsMockMvc
            .perform(
                delete(
                    ENTITY_API_URL_ID,
                    "typeId=" +
                    employeeSkillCertificateDetails.getId().getTypeId() +
                    ";" +
                    "skillName=" +
                    employeeSkillCertificateDetails.getId().getSkillName() +
                    ";" +
                    "skillEmployeeUsername=" +
                    employeeSkillCertificateDetails.getId().getSkillEmployeeUsername()
                )
                    .accept(MediaType.APPLICATION_JSON)
            )
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EmployeeSkillCertificateDetails> employeeSkillCertificateDetailsList = employeeSkillCertificateDetailsRepository.findAll();
        assertThat(employeeSkillCertificateDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
