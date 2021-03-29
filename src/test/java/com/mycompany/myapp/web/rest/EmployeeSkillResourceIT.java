package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Employee;
import com.mycompany.myapp.domain.EmployeeSkill;
import com.mycompany.myapp.domain.EmployeeSkillCertificate;
import com.mycompany.myapp.domain.EmployeeSkillId;
import com.mycompany.myapp.domain.Task;
import com.mycompany.myapp.repository.EmployeeSkillRepository;
import com.mycompany.myapp.service.EmployeeSkillService;
import com.mycompany.myapp.service.criteria.EmployeeSkillCriteria;
import com.mycompany.myapp.service.dto.EmployeeSkillDTO;
import com.mycompany.myapp.service.mapper.EmployeeSkillMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link EmployeeSkillResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class EmployeeSkillResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_LEVEL = 1;
    private static final Integer UPDATED_LEVEL = 2;
    private static final Integer SMALLER_LEVEL = 1 - 1;

    private static final String ENTITY_API_URL = "/api/employee-skills";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private EmployeeSkillRepository employeeSkillRepository;

    @Mock
    private EmployeeSkillRepository employeeSkillRepositoryMock;

    @Autowired
    private EmployeeSkillMapper employeeSkillMapper;

    @Mock
    private EmployeeSkillService employeeSkillServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEmployeeSkillMockMvc;

    private EmployeeSkill employeeSkill;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EmployeeSkill createEntity(EntityManager em) {
        EmployeeSkill employeeSkill = new EmployeeSkill().name(DEFAULT_NAME).level(DEFAULT_LEVEL);
        // Add required entity
        Employee employee;
        if (TestUtil.findAll(em, Employee.class).isEmpty()) {
            employee = EmployeeResourceIT.createEntity(em);
            em.persist(employee);
            em.flush();
        } else {
            employee = TestUtil.findAll(em, Employee.class).get(0);
        }
        employeeSkill.setEmployee(employee);
        // Add required entity
        employeeSkill.setTeacher(employee);
        employeeSkill.setId(new EmployeeSkillId(employeeSkill.getName(), employeeSkill.getEmployee().getUsername()));
        return employeeSkill;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EmployeeSkill createUpdatedEntity(EntityManager em) {
        EmployeeSkill employeeSkill = new EmployeeSkill().name(UPDATED_NAME).level(UPDATED_LEVEL);
        // Add required entity
        Employee employee;
        if (TestUtil.findAll(em, Employee.class).isEmpty()) {
            employee = EmployeeResourceIT.createUpdatedEntity(em);
            em.persist(employee);
            em.flush();
        } else {
            employee = TestUtil.findAll(em, Employee.class).get(0);
        }
        employeeSkill.setEmployee(employee);
        // Add required entity
        employeeSkill.setTeacher(employee);
        employeeSkill.setId(new EmployeeSkillId(employeeSkill.getName(), employeeSkill.getEmployee().getUsername()));
        return employeeSkill;
    }

    @BeforeEach
    public void initTest() {
        employeeSkill = createEntity(em);
    }

    @Test
    @Transactional
    void createEmployeeSkill() throws Exception {
        int databaseSizeBeforeCreate = employeeSkillRepository.findAll().size();
        // Create the EmployeeSkill
        EmployeeSkillDTO employeeSkillDTO = employeeSkillMapper.toDto(employeeSkill);
        restEmployeeSkillMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(employeeSkillDTO))
            )
            .andExpect(status().isCreated());

        // Validate the EmployeeSkill in the database
        List<EmployeeSkill> employeeSkillList = employeeSkillRepository.findAll();
        assertThat(employeeSkillList).hasSize(databaseSizeBeforeCreate + 1);
        EmployeeSkill testEmployeeSkill = employeeSkillList.get(employeeSkillList.size() - 1);
        assertThat(testEmployeeSkill.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEmployeeSkill.getLevel()).isEqualTo(DEFAULT_LEVEL);
    }

    @Test
    @Transactional
    void createEmployeeSkillWithExistingId() throws Exception {
        // Create the EmployeeSkill with an existing ID
        employeeSkillRepository.saveAndFlush(employeeSkill);
        EmployeeSkillDTO employeeSkillDTO = employeeSkillMapper.toDto(employeeSkill);

        int databaseSizeBeforeCreate = employeeSkillRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmployeeSkillMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(employeeSkillDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EmployeeSkill in the database
        List<EmployeeSkill> employeeSkillList = employeeSkillRepository.findAll();
        assertThat(employeeSkillList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = employeeSkillRepository.findAll().size();
        // set the field null
        employeeSkill.setName(null);

        // Create the EmployeeSkill, which fails.
        EmployeeSkillDTO employeeSkillDTO = employeeSkillMapper.toDto(employeeSkill);

        restEmployeeSkillMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(employeeSkillDTO))
            )
            .andExpect(status().isBadRequest());

        List<EmployeeSkill> employeeSkillList = employeeSkillRepository.findAll();
        assertThat(employeeSkillList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkLevelIsRequired() throws Exception {
        int databaseSizeBeforeTest = employeeSkillRepository.findAll().size();
        // set the field null
        employeeSkill.setLevel(null);

        // Create the EmployeeSkill, which fails.
        EmployeeSkillDTO employeeSkillDTO = employeeSkillMapper.toDto(employeeSkill);

        restEmployeeSkillMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(employeeSkillDTO))
            )
            .andExpect(status().isBadRequest());

        List<EmployeeSkill> employeeSkillList = employeeSkillRepository.findAll();
        assertThat(employeeSkillList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllEmployeeSkills() throws Exception {
        // Initialize the database
        employeeSkillRepository.saveAndFlush(employeeSkill);

        // Get all the employeeSkillList
        restEmployeeSkillMockMvc
            .perform(get(ENTITY_API_URL))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllEmployeeSkillsWithEagerRelationshipsIsEnabled() throws Exception {
        when(employeeSkillServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restEmployeeSkillMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(employeeSkillServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllEmployeeSkillsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(employeeSkillServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restEmployeeSkillMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(employeeSkillServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getEmployeeSkill() throws Exception {
        // Initialize the database
        employeeSkillRepository.saveAndFlush(employeeSkill);

        // Get the employeeSkill
        restEmployeeSkillMockMvc
            .perform(
                get(
                    ENTITY_API_URL_ID,
                    "name=" + employeeSkill.getId().getName() + ";" + "employeeUsername=" + employeeSkill.getId().getEmployeeUsername()
                )
            )
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.level").value(DEFAULT_LEVEL));
    }

    @Test
    @Transactional
    void getAllEmployeeSkillsByNameIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeSkillRepository.saveAndFlush(employeeSkill);

        // Get all the employeeSkillList where name equals to DEFAULT_NAME
        defaultEmployeeSkillShouldBeFound("name.equals=" + DEFAULT_NAME);

        // Get all the employeeSkillList where name equals to UPDATED_NAME
        defaultEmployeeSkillShouldNotBeFound("name.equals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllEmployeeSkillsByNameIsNotEqualToSomething() throws Exception {
        // Initialize the database
        employeeSkillRepository.saveAndFlush(employeeSkill);

        // Get all the employeeSkillList where name not equals to DEFAULT_NAME
        defaultEmployeeSkillShouldNotBeFound("name.notEquals=" + DEFAULT_NAME);

        // Get all the employeeSkillList where name not equals to UPDATED_NAME
        defaultEmployeeSkillShouldBeFound("name.notEquals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllEmployeeSkillsByNameIsInShouldWork() throws Exception {
        // Initialize the database
        employeeSkillRepository.saveAndFlush(employeeSkill);

        // Get all the employeeSkillList where name in DEFAULT_NAME or UPDATED_NAME
        defaultEmployeeSkillShouldBeFound("name.in=" + DEFAULT_NAME + "," + UPDATED_NAME);

        // Get all the employeeSkillList where name equals to UPDATED_NAME
        defaultEmployeeSkillShouldNotBeFound("name.in=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllEmployeeSkillsByNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeSkillRepository.saveAndFlush(employeeSkill);

        // Get all the employeeSkillList where name is not null
        defaultEmployeeSkillShouldBeFound("name.specified=true");

        // Get all the employeeSkillList where name is null
        defaultEmployeeSkillShouldNotBeFound("name.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeeSkillsByNameContainsSomething() throws Exception {
        // Initialize the database
        employeeSkillRepository.saveAndFlush(employeeSkill);

        // Get all the employeeSkillList where name contains DEFAULT_NAME
        defaultEmployeeSkillShouldBeFound("name.contains=" + DEFAULT_NAME);

        // Get all the employeeSkillList where name contains UPDATED_NAME
        defaultEmployeeSkillShouldNotBeFound("name.contains=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllEmployeeSkillsByNameNotContainsSomething() throws Exception {
        // Initialize the database
        employeeSkillRepository.saveAndFlush(employeeSkill);

        // Get all the employeeSkillList where name does not contain DEFAULT_NAME
        defaultEmployeeSkillShouldNotBeFound("name.doesNotContain=" + DEFAULT_NAME);

        // Get all the employeeSkillList where name does not contain UPDATED_NAME
        defaultEmployeeSkillShouldBeFound("name.doesNotContain=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllEmployeeSkillsByLevelIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeSkillRepository.saveAndFlush(employeeSkill);

        // Get all the employeeSkillList where level equals to DEFAULT_LEVEL
        defaultEmployeeSkillShouldBeFound("level.equals=" + DEFAULT_LEVEL);

        // Get all the employeeSkillList where level equals to UPDATED_LEVEL
        defaultEmployeeSkillShouldNotBeFound("level.equals=" + UPDATED_LEVEL);
    }

    @Test
    @Transactional
    void getAllEmployeeSkillsByLevelIsNotEqualToSomething() throws Exception {
        // Initialize the database
        employeeSkillRepository.saveAndFlush(employeeSkill);

        // Get all the employeeSkillList where level not equals to DEFAULT_LEVEL
        defaultEmployeeSkillShouldNotBeFound("level.notEquals=" + DEFAULT_LEVEL);

        // Get all the employeeSkillList where level not equals to UPDATED_LEVEL
        defaultEmployeeSkillShouldBeFound("level.notEquals=" + UPDATED_LEVEL);
    }

    @Test
    @Transactional
    void getAllEmployeeSkillsByLevelIsInShouldWork() throws Exception {
        // Initialize the database
        employeeSkillRepository.saveAndFlush(employeeSkill);

        // Get all the employeeSkillList where level in DEFAULT_LEVEL or UPDATED_LEVEL
        defaultEmployeeSkillShouldBeFound("level.in=" + DEFAULT_LEVEL + "," + UPDATED_LEVEL);

        // Get all the employeeSkillList where level equals to UPDATED_LEVEL
        defaultEmployeeSkillShouldNotBeFound("level.in=" + UPDATED_LEVEL);
    }

    @Test
    @Transactional
    void getAllEmployeeSkillsByLevelIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeSkillRepository.saveAndFlush(employeeSkill);

        // Get all the employeeSkillList where level is not null
        defaultEmployeeSkillShouldBeFound("level.specified=true");

        // Get all the employeeSkillList where level is null
        defaultEmployeeSkillShouldNotBeFound("level.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeeSkillsByLevelIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        employeeSkillRepository.saveAndFlush(employeeSkill);

        // Get all the employeeSkillList where level is greater than or equal to DEFAULT_LEVEL
        defaultEmployeeSkillShouldBeFound("level.greaterThanOrEqual=" + DEFAULT_LEVEL);

        // Get all the employeeSkillList where level is greater than or equal to UPDATED_LEVEL
        defaultEmployeeSkillShouldNotBeFound("level.greaterThanOrEqual=" + UPDATED_LEVEL);
    }

    @Test
    @Transactional
    void getAllEmployeeSkillsByLevelIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        employeeSkillRepository.saveAndFlush(employeeSkill);

        // Get all the employeeSkillList where level is less than or equal to DEFAULT_LEVEL
        defaultEmployeeSkillShouldBeFound("level.lessThanOrEqual=" + DEFAULT_LEVEL);

        // Get all the employeeSkillList where level is less than or equal to SMALLER_LEVEL
        defaultEmployeeSkillShouldNotBeFound("level.lessThanOrEqual=" + SMALLER_LEVEL);
    }

    @Test
    @Transactional
    void getAllEmployeeSkillsByLevelIsLessThanSomething() throws Exception {
        // Initialize the database
        employeeSkillRepository.saveAndFlush(employeeSkill);

        // Get all the employeeSkillList where level is less than DEFAULT_LEVEL
        defaultEmployeeSkillShouldNotBeFound("level.lessThan=" + DEFAULT_LEVEL);

        // Get all the employeeSkillList where level is less than UPDATED_LEVEL
        defaultEmployeeSkillShouldBeFound("level.lessThan=" + UPDATED_LEVEL);
    }

    @Test
    @Transactional
    void getAllEmployeeSkillsByLevelIsGreaterThanSomething() throws Exception {
        // Initialize the database
        employeeSkillRepository.saveAndFlush(employeeSkill);

        // Get all the employeeSkillList where level is greater than DEFAULT_LEVEL
        defaultEmployeeSkillShouldNotBeFound("level.greaterThan=" + DEFAULT_LEVEL);

        // Get all the employeeSkillList where level is greater than SMALLER_LEVEL
        defaultEmployeeSkillShouldBeFound("level.greaterThan=" + SMALLER_LEVEL);
    }

    @Test
    @Transactional
    void getAllEmployeeSkillsByEmployeeSkillCertificateIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeSkillRepository.saveAndFlush(employeeSkill);
        EmployeeSkillCertificate employeeSkillCertificate = EmployeeSkillCertificateResourceIT.createEntity(em);
        em.persist(employeeSkillCertificate);
        em.flush();
        employeeSkill.addEmployeeSkillCertificate(employeeSkillCertificate);
        employeeSkillRepository.saveAndFlush(employeeSkill);

        // Get all the employeeSkillList where employeeSkillCertificate.type.id equals to employeeSkillCertificate.getId().getTypeId()
        defaultEmployeeSkillShouldBeFound("employeeSkillCertificate.type.id.equals=" + employeeSkillCertificate.getId().getTypeId());

        // Get all the employeeSkillList where employeeSkillCertificate.type.id equals to (employeeSkillCertificate.getId().getTypeId() + 1)
        defaultEmployeeSkillShouldNotBeFound(
            "employeeSkillCertificate.type.id.equals=" + (employeeSkillCertificate.getId().getTypeId() + 1)
        );
    }

    @Test
    @Transactional
    void getAllEmployeeSkillsByTaskIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeSkillRepository.saveAndFlush(employeeSkill);
        Task task = TaskResourceIT.createEntity(em);
        em.persist(task);
        em.flush();
        employeeSkill.addTask(task);
        employeeSkillRepository.saveAndFlush(employeeSkill);

        // Get all the employeeSkillList where task.id equals to task.getId()
        defaultEmployeeSkillShouldBeFound("task.id.equals=" + task.getId());

        // Get all the employeeSkillList where task.id equals to (task.getId() + 1)
        defaultEmployeeSkillShouldNotBeFound("task.id.equals=" + (task.getId() + 1));
    }

    @Test
    @Transactional
    void getAllEmployeeSkillsByEmployeeIsEqualToSomething() throws Exception {
        // Get already existing entity
        Employee employee = employeeSkill.getEmployee();
        employeeSkillRepository.saveAndFlush(employeeSkill);

        // Get all the employeeSkillList where employee.username equals to employee.getUsername()
        defaultEmployeeSkillShouldBeFound("employee.username.equals=" + employee.getUsername());

        // Get all the employeeSkillList where employee.username equals to "invalid-id"
        defaultEmployeeSkillShouldNotBeFound("employee.username.equals=" + "invalid-id");
    }

    @Test
    @Transactional
    void getAllEmployeeSkillsByTeacherIsEqualToSomething() throws Exception {
        // Get already existing entity
        Employee teacher = employeeSkill.getTeacher();
        employeeSkillRepository.saveAndFlush(employeeSkill);

        // Get all the employeeSkillList where teacher.username equals to teacher.getUsername()
        defaultEmployeeSkillShouldBeFound("teacher.username.equals=" + teacher.getUsername());

        // Get all the employeeSkillList where teacher.username equals to "invalid-id"
        defaultEmployeeSkillShouldNotBeFound("teacher.username.equals=" + "invalid-id");
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultEmployeeSkillShouldBeFound(String filter) throws Exception {
        restEmployeeSkillMockMvc
            .perform(get(ENTITY_API_URL + "?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL)));

        // Check, that the count call also returns 1
        restEmployeeSkillMockMvc
            .perform(get(ENTITY_API_URL + "/count?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultEmployeeSkillShouldNotBeFound(String filter) throws Exception {
        restEmployeeSkillMockMvc
            .perform(get(ENTITY_API_URL + "?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restEmployeeSkillMockMvc
            .perform(get(ENTITY_API_URL + "/count?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingEmployeeSkill() throws Exception {
        // Get the employeeSkill
        restEmployeeSkillMockMvc
            .perform(
                get(
                    ENTITY_API_URL_ID,
                    "name=" + employeeSkill.getId().getName() + ";" + "employeeUsername=" + employeeSkill.getId().getEmployeeUsername()
                )
            )
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewEmployeeSkill() throws Exception {
        // Initialize the database
        employeeSkillRepository.saveAndFlush(employeeSkill);

        int databaseSizeBeforeUpdate = employeeSkillRepository.findAll().size();

        // Update the employeeSkill
        EmployeeSkill updatedEmployeeSkill = employeeSkillRepository.findById(employeeSkill.getId()).get();
        // Disconnect from session so that the updates on updatedEmployeeSkill are not directly saved in db
        em.detach(updatedEmployeeSkill);
        updatedEmployeeSkill.level(UPDATED_LEVEL);
        EmployeeSkillDTO employeeSkillDTO = employeeSkillMapper.toDto(updatedEmployeeSkill);

        restEmployeeSkillMockMvc
            .perform(
                put(
                    ENTITY_API_URL_ID,
                    "name=" + employeeSkill.getId().getName() + ";" + "employeeUsername=" + employeeSkill.getId().getEmployeeUsername()
                )
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeSkillDTO))
            )
            .andExpect(status().isOk());

        // Validate the EmployeeSkill in the database
        List<EmployeeSkill> employeeSkillList = employeeSkillRepository.findAll();
        assertThat(employeeSkillList).hasSize(databaseSizeBeforeUpdate);
        EmployeeSkill testEmployeeSkill = employeeSkillList.get(employeeSkillList.size() - 1);
        assertThat(testEmployeeSkill.getLevel()).isEqualTo(UPDATED_LEVEL);
    }

    @Test
    @Transactional
    void putNonExistingEmployeeSkill() throws Exception {
        int databaseSizeBeforeUpdate = employeeSkillRepository.findAll().size();
        employeeSkill.setId(new EmployeeSkillId(UUID.randomUUID().toString(), UUID.randomUUID().toString()));

        // Create the EmployeeSkill
        EmployeeSkillDTO employeeSkillDTO = employeeSkillMapper.toDto(employeeSkill);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmployeeSkillMockMvc
            .perform(
                put(
                    ENTITY_API_URL_ID,
                    "name=" + employeeSkill.getId().getName() + ";" + "employeeUsername=" + employeeSkill.getId().getEmployeeUsername()
                )
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeSkillDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EmployeeSkill in the database
        List<EmployeeSkill> employeeSkillList = employeeSkillRepository.findAll();
        assertThat(employeeSkillList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEmployeeSkill() throws Exception {
        int databaseSizeBeforeUpdate = employeeSkillRepository.findAll().size();
        employeeSkill.setId(new EmployeeSkillId(UUID.randomUUID().toString(), UUID.randomUUID().toString()));

        // Create the EmployeeSkill
        EmployeeSkillDTO employeeSkillDTO = employeeSkillMapper.toDto(employeeSkill);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmployeeSkillMockMvc
            .perform(
                put(ENTITY_API_URL_ID, "name=" + UUID.randomUUID().toString() + ";" + "employeeUsername=" + UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeSkillDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EmployeeSkill in the database
        List<EmployeeSkill> employeeSkillList = employeeSkillRepository.findAll();
        assertThat(employeeSkillList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEmployeeSkill() throws Exception {
        int databaseSizeBeforeUpdate = employeeSkillRepository.findAll().size();
        employeeSkill.setId(new EmployeeSkillId(UUID.randomUUID().toString(), UUID.randomUUID().toString()));

        // Create the EmployeeSkill
        EmployeeSkillDTO employeeSkillDTO = employeeSkillMapper.toDto(employeeSkill);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmployeeSkillMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(employeeSkillDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EmployeeSkill in the database
        List<EmployeeSkill> employeeSkillList = employeeSkillRepository.findAll();
        assertThat(employeeSkillList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEmployeeSkillWithPatch() throws Exception {
        // Initialize the database
        employeeSkillRepository.saveAndFlush(employeeSkill);

        int databaseSizeBeforeUpdate = employeeSkillRepository.findAll().size();

        // Update the employeeSkill using partial update
        EmployeeSkill partialUpdatedEmployeeSkill = new EmployeeSkill();
        partialUpdatedEmployeeSkill.setId(employeeSkill.getId());
        partialUpdatedEmployeeSkill.setName(employeeSkill.getName());
        partialUpdatedEmployeeSkill.setEmployee(employeeSkill.getEmployee());

        restEmployeeSkillMockMvc
            .perform(
                patch(
                    ENTITY_API_URL_ID,
                    "name=" +
                    partialUpdatedEmployeeSkill.getId().getName() +
                    ";" +
                    "employeeUsername=" +
                    partialUpdatedEmployeeSkill.getId().getEmployeeUsername()
                )
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEmployeeSkill))
            )
            .andExpect(status().isOk());

        // Validate the EmployeeSkill in the database
        List<EmployeeSkill> employeeSkillList = employeeSkillRepository.findAll();
        assertThat(employeeSkillList).hasSize(databaseSizeBeforeUpdate);
        EmployeeSkill testEmployeeSkill = employeeSkillList.get(employeeSkillList.size() - 1);
        assertThat(testEmployeeSkill.getLevel()).isEqualTo(DEFAULT_LEVEL);
    }

    @Test
    @Transactional
    void fullUpdateEmployeeSkillWithPatch() throws Exception {
        // Initialize the database
        employeeSkillRepository.saveAndFlush(employeeSkill);

        int databaseSizeBeforeUpdate = employeeSkillRepository.findAll().size();

        // Update the employeeSkill using partial update
        EmployeeSkill partialUpdatedEmployeeSkill = new EmployeeSkill();
        partialUpdatedEmployeeSkill.setId(employeeSkill.getId());
        partialUpdatedEmployeeSkill.setName(employeeSkill.getName());
        partialUpdatedEmployeeSkill.setEmployee(employeeSkill.getEmployee());

        partialUpdatedEmployeeSkill.level(UPDATED_LEVEL);

        restEmployeeSkillMockMvc
            .perform(
                patch(
                    ENTITY_API_URL_ID,
                    "name=" +
                    partialUpdatedEmployeeSkill.getId().getName() +
                    ";" +
                    "employeeUsername=" +
                    partialUpdatedEmployeeSkill.getId().getEmployeeUsername()
                )
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEmployeeSkill))
            )
            .andExpect(status().isOk());

        // Validate the EmployeeSkill in the database
        List<EmployeeSkill> employeeSkillList = employeeSkillRepository.findAll();
        assertThat(employeeSkillList).hasSize(databaseSizeBeforeUpdate);
        EmployeeSkill testEmployeeSkill = employeeSkillList.get(employeeSkillList.size() - 1);
        assertThat(testEmployeeSkill.getLevel()).isEqualTo(UPDATED_LEVEL);
    }

    @Test
    @Transactional
    void patchNonExistingEmployeeSkill() throws Exception {
        int databaseSizeBeforeUpdate = employeeSkillRepository.findAll().size();
        employeeSkill.setId(new EmployeeSkillId(UUID.randomUUID().toString(), UUID.randomUUID().toString()));

        // Create the EmployeeSkill
        EmployeeSkillDTO employeeSkillDTO = employeeSkillMapper.toDto(employeeSkill);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmployeeSkillMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, "name=" + UUID.randomUUID().toString() + ";" + "employeeUsername=" + UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(employeeSkillDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EmployeeSkill in the database
        List<EmployeeSkill> employeeSkillList = employeeSkillRepository.findAll();
        assertThat(employeeSkillList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEmployeeSkill() throws Exception {
        int databaseSizeBeforeUpdate = employeeSkillRepository.findAll().size();
        employeeSkill.setId(new EmployeeSkillId(UUID.randomUUID().toString(), UUID.randomUUID().toString()));

        // Create the EmployeeSkill
        EmployeeSkillDTO employeeSkillDTO = employeeSkillMapper.toDto(employeeSkill);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmployeeSkillMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, "name=" + UUID.randomUUID().toString() + ";" + "employeeUsername=" + UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(employeeSkillDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EmployeeSkill in the database
        List<EmployeeSkill> employeeSkillList = employeeSkillRepository.findAll();
        assertThat(employeeSkillList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEmployeeSkill() throws Exception {
        int databaseSizeBeforeUpdate = employeeSkillRepository.findAll().size();
        employeeSkill.setId(new EmployeeSkillId(UUID.randomUUID().toString(), UUID.randomUUID().toString()));

        // Create the EmployeeSkill
        EmployeeSkillDTO employeeSkillDTO = employeeSkillMapper.toDto(employeeSkill);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmployeeSkillMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(employeeSkillDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EmployeeSkill in the database
        List<EmployeeSkill> employeeSkillList = employeeSkillRepository.findAll();
        assertThat(employeeSkillList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEmployeeSkill() throws Exception {
        // Initialize the database
        employeeSkillRepository.saveAndFlush(employeeSkill);

        int databaseSizeBeforeDelete = employeeSkillRepository.findAll().size();

        // Delete the employeeSkill
        restEmployeeSkillMockMvc
            .perform(
                delete(
                    ENTITY_API_URL_ID,
                    "name=" + employeeSkill.getId().getName() + ";" + "employeeUsername=" + employeeSkill.getId().getEmployeeUsername()
                )
                    .accept(MediaType.APPLICATION_JSON)
            )
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EmployeeSkill> employeeSkillList = employeeSkillRepository.findAll();
        assertThat(employeeSkillList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
