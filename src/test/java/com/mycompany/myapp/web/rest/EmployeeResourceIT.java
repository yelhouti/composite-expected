package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Employee;
import com.mycompany.myapp.domain.Employee;
import com.mycompany.myapp.domain.EmployeeSkill;
import com.mycompany.myapp.repository.EmployeeRepository;
import com.mycompany.myapp.service.criteria.EmployeeCriteria;
import com.mycompany.myapp.service.dto.EmployeeDTO;
import com.mycompany.myapp.service.mapper.EmployeeMapper;
import java.util.List;
import java.util.UUID;
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
 * Integration tests for the {@link EmployeeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EmployeeResourceIT {

    private static final String DEFAULT_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME = "BBBBBBBBBB";

    private static final String DEFAULT_FULLNAME = "AAAAAAAAAA";
    private static final String UPDATED_FULLNAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/employees";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{username}";

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeMapper employeeMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEmployeeMockMvc;

    private Employee employee;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Employee createEntity(EntityManager em) {
        Employee employee = new Employee().username(DEFAULT_USERNAME).fullname(DEFAULT_FULLNAME);
        return employee;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Employee createUpdatedEntity(EntityManager em) {
        Employee employee = new Employee().username(UPDATED_USERNAME).fullname(UPDATED_FULLNAME);
        return employee;
    }

    @BeforeEach
    public void initTest() {
        employee = createEntity(em);
    }

    @Test
    @Transactional
    void createEmployee() throws Exception {
        int databaseSizeBeforeCreate = employeeRepository.findAll().size();
        // Create the Employee
        EmployeeDTO employeeDTO = employeeMapper.toDto(employee);
        restEmployeeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(employeeDTO)))
            .andExpect(status().isCreated());

        // Validate the Employee in the database
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeCreate + 1);
        Employee testEmployee = employeeList.get(employeeList.size() - 1);
        assertThat(testEmployee.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testEmployee.getFullname()).isEqualTo(DEFAULT_FULLNAME);
    }

    @Test
    @Transactional
    void createEmployeeWithExistingId() throws Exception {
        // Create the Employee with an existing ID
        employeeRepository.saveAndFlush(employee);
        EmployeeDTO employeeDTO = employeeMapper.toDto(employee);

        int databaseSizeBeforeCreate = employeeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmployeeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(employeeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Employee in the database
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkUsernameIsRequired() throws Exception {
        int databaseSizeBeforeTest = employeeRepository.findAll().size();
        // set the field null
        employee.setUsername(null);

        // Create the Employee, which fails.
        EmployeeDTO employeeDTO = employeeMapper.toDto(employee);

        restEmployeeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(employeeDTO)))
            .andExpect(status().isBadRequest());

        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkFullnameIsRequired() throws Exception {
        int databaseSizeBeforeTest = employeeRepository.findAll().size();
        // set the field null
        employee.setFullname(null);

        // Create the Employee, which fails.
        EmployeeDTO employeeDTO = employeeMapper.toDto(employee);

        restEmployeeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(employeeDTO)))
            .andExpect(status().isBadRequest());

        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllEmployees() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList
        restEmployeeMockMvc
            .perform(get(ENTITY_API_URL))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME)))
            .andExpect(jsonPath("$.[*].fullname").value(hasItem(DEFAULT_FULLNAME)));
    }

    @Test
    @Transactional
    void getEmployee() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get the employee
        restEmployeeMockMvc
            .perform(get(ENTITY_API_URL_ID, employee.getUsername()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME))
            .andExpect(jsonPath("$.fullname").value(DEFAULT_FULLNAME));
    }

    @Test
    @Transactional
    void getAllEmployeesByUsernameIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where username equals to DEFAULT_USERNAME
        defaultEmployeeShouldBeFound("username.equals=" + DEFAULT_USERNAME);

        // Get all the employeeList where username equals to UPDATED_USERNAME
        defaultEmployeeShouldNotBeFound("username.equals=" + UPDATED_USERNAME);
    }

    @Test
    @Transactional
    void getAllEmployeesByUsernameIsNotEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where username not equals to DEFAULT_USERNAME
        defaultEmployeeShouldNotBeFound("username.notEquals=" + DEFAULT_USERNAME);

        // Get all the employeeList where username not equals to UPDATED_USERNAME
        defaultEmployeeShouldBeFound("username.notEquals=" + UPDATED_USERNAME);
    }

    @Test
    @Transactional
    void getAllEmployeesByUsernameIsInShouldWork() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where username in DEFAULT_USERNAME or UPDATED_USERNAME
        defaultEmployeeShouldBeFound("username.in=" + DEFAULT_USERNAME + "," + UPDATED_USERNAME);

        // Get all the employeeList where username equals to UPDATED_USERNAME
        defaultEmployeeShouldNotBeFound("username.in=" + UPDATED_USERNAME);
    }

    @Test
    @Transactional
    void getAllEmployeesByUsernameIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where username is not null
        defaultEmployeeShouldBeFound("username.specified=true");

        // Get all the employeeList where username is null
        defaultEmployeeShouldNotBeFound("username.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeesByUsernameContainsSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where username contains DEFAULT_USERNAME
        defaultEmployeeShouldBeFound("username.contains=" + DEFAULT_USERNAME);

        // Get all the employeeList where username contains UPDATED_USERNAME
        defaultEmployeeShouldNotBeFound("username.contains=" + UPDATED_USERNAME);
    }

    @Test
    @Transactional
    void getAllEmployeesByUsernameNotContainsSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where username does not contain DEFAULT_USERNAME
        defaultEmployeeShouldNotBeFound("username.doesNotContain=" + DEFAULT_USERNAME);

        // Get all the employeeList where username does not contain UPDATED_USERNAME
        defaultEmployeeShouldBeFound("username.doesNotContain=" + UPDATED_USERNAME);
    }

    @Test
    @Transactional
    void getAllEmployeesByFullnameIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where fullname equals to DEFAULT_FULLNAME
        defaultEmployeeShouldBeFound("fullname.equals=" + DEFAULT_FULLNAME);

        // Get all the employeeList where fullname equals to UPDATED_FULLNAME
        defaultEmployeeShouldNotBeFound("fullname.equals=" + UPDATED_FULLNAME);
    }

    @Test
    @Transactional
    void getAllEmployeesByFullnameIsNotEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where fullname not equals to DEFAULT_FULLNAME
        defaultEmployeeShouldNotBeFound("fullname.notEquals=" + DEFAULT_FULLNAME);

        // Get all the employeeList where fullname not equals to UPDATED_FULLNAME
        defaultEmployeeShouldBeFound("fullname.notEquals=" + UPDATED_FULLNAME);
    }

    @Test
    @Transactional
    void getAllEmployeesByFullnameIsInShouldWork() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where fullname in DEFAULT_FULLNAME or UPDATED_FULLNAME
        defaultEmployeeShouldBeFound("fullname.in=" + DEFAULT_FULLNAME + "," + UPDATED_FULLNAME);

        // Get all the employeeList where fullname equals to UPDATED_FULLNAME
        defaultEmployeeShouldNotBeFound("fullname.in=" + UPDATED_FULLNAME);
    }

    @Test
    @Transactional
    void getAllEmployeesByFullnameIsNullOrNotNull() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where fullname is not null
        defaultEmployeeShouldBeFound("fullname.specified=true");

        // Get all the employeeList where fullname is null
        defaultEmployeeShouldNotBeFound("fullname.specified=false");
    }

    @Test
    @Transactional
    void getAllEmployeesByFullnameContainsSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where fullname contains DEFAULT_FULLNAME
        defaultEmployeeShouldBeFound("fullname.contains=" + DEFAULT_FULLNAME);

        // Get all the employeeList where fullname contains UPDATED_FULLNAME
        defaultEmployeeShouldNotBeFound("fullname.contains=" + UPDATED_FULLNAME);
    }

    @Test
    @Transactional
    void getAllEmployeesByFullnameNotContainsSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where fullname does not contain DEFAULT_FULLNAME
        defaultEmployeeShouldNotBeFound("fullname.doesNotContain=" + DEFAULT_FULLNAME);

        // Get all the employeeList where fullname does not contain UPDATED_FULLNAME
        defaultEmployeeShouldBeFound("fullname.doesNotContain=" + UPDATED_FULLNAME);
    }

    @Test
    @Transactional
    void getAllEmployeesByTeamMemberIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);
        Employee teamMember = employee;
        employee.addTeamMember(teamMember);
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where teamMember.username equals to teamMember.getUsername()
        defaultEmployeeShouldBeFound("teamMember.username.equals=" + teamMember.getUsername());

        // Get all the employeeList where teamMember.username equals to "invalid-id"
        defaultEmployeeShouldNotBeFound("teamMember.username.equals=" + "invalid-id");
    }

    @Test
    @Transactional
    void getAllEmployeesBySkillIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);
        EmployeeSkill skill = EmployeeSkillResourceIT.createEntity(em);
        em.persist(skill);
        em.flush();
        employee.addSkill(skill);
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where skill.name equals to skill.getId().getName()
        defaultEmployeeShouldBeFound("skill.name.equals=" + skill.getId().getName());

        // Get all the employeeList where skill.name equals to "invalid-id"
        defaultEmployeeShouldNotBeFound("skill.name.equals=" + "invalid-id");
    }

    @Test
    @Transactional
    void getAllEmployeesByTaughtSkillIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);
        EmployeeSkill taughtSkill = EmployeeSkillResourceIT.createEntity(em);
        em.persist(taughtSkill);
        em.flush();
        employee.addTaughtSkill(taughtSkill);
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where taughtSkill.name equals to taughtSkill.getId().getName()
        defaultEmployeeShouldBeFound("taughtSkill.name.equals=" + taughtSkill.getId().getName());

        // Get all the employeeList where taughtSkill.name equals to "invalid-id"
        defaultEmployeeShouldNotBeFound("taughtSkill.name.equals=" + "invalid-id");
    }

    @Test
    @Transactional
    void getAllEmployeesByManagerIsEqualToSomething() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);
        Employee manager = employee;
        employee.setManager(manager);
        employeeRepository.saveAndFlush(employee);

        // Get all the employeeList where manager.username equals to manager.getUsername()
        defaultEmployeeShouldBeFound("manager.username.equals=" + manager.getUsername());

        // Get all the employeeList where manager.username equals to "invalid-id"
        defaultEmployeeShouldNotBeFound("manager.username.equals=" + "invalid-id");
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultEmployeeShouldBeFound(String filter) throws Exception {
        restEmployeeMockMvc
            .perform(get(ENTITY_API_URL + "?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME)))
            .andExpect(jsonPath("$.[*].fullname").value(hasItem(DEFAULT_FULLNAME)));

        // Check, that the count call also returns 1
        restEmployeeMockMvc
            .perform(get(ENTITY_API_URL + "/count?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultEmployeeShouldNotBeFound(String filter) throws Exception {
        restEmployeeMockMvc
            .perform(get(ENTITY_API_URL + "?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restEmployeeMockMvc
            .perform(get(ENTITY_API_URL + "/count?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingEmployee() throws Exception {
        // Get the employee
        restEmployeeMockMvc.perform(get(ENTITY_API_URL_ID, employee.getUsername())).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewEmployee() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        int databaseSizeBeforeUpdate = employeeRepository.findAll().size();

        // Update the employee
        Employee updatedEmployee = employeeRepository.findById(employee.getUsername()).get();
        // Disconnect from session so that the updates on updatedEmployee are not directly saved in db
        em.detach(updatedEmployee);
        updatedEmployee.fullname(UPDATED_FULLNAME);
        EmployeeDTO employeeDTO = employeeMapper.toDto(updatedEmployee);

        restEmployeeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, employee.getUsername())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeDTO))
            )
            .andExpect(status().isOk());

        // Validate the Employee in the database
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeUpdate);
        Employee testEmployee = employeeList.get(employeeList.size() - 1);
        assertThat(testEmployee.getFullname()).isEqualTo(UPDATED_FULLNAME);
    }

    @Test
    @Transactional
    void putNonExistingEmployee() throws Exception {
        int databaseSizeBeforeUpdate = employeeRepository.findAll().size();
        employee.setUsername(UUID.randomUUID().toString());

        // Create the Employee
        EmployeeDTO employeeDTO = employeeMapper.toDto(employee);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmployeeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, employee.getUsername())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Employee in the database
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEmployee() throws Exception {
        int databaseSizeBeforeUpdate = employeeRepository.findAll().size();
        employee.setUsername(UUID.randomUUID().toString());

        // Create the Employee
        EmployeeDTO employeeDTO = employeeMapper.toDto(employee);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmployeeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(employeeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Employee in the database
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEmployee() throws Exception {
        int databaseSizeBeforeUpdate = employeeRepository.findAll().size();
        employee.setUsername(UUID.randomUUID().toString());

        // Create the Employee
        EmployeeDTO employeeDTO = employeeMapper.toDto(employee);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmployeeMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(employeeDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Employee in the database
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEmployeeWithPatch() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        int databaseSizeBeforeUpdate = employeeRepository.findAll().size();

        // Update the employee using partial update
        Employee partialUpdatedEmployee = new Employee();
        partialUpdatedEmployee.setUsername(employee.getUsername());

        partialUpdatedEmployee.fullname(UPDATED_FULLNAME);

        restEmployeeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEmployee.getUsername())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEmployee))
            )
            .andExpect(status().isOk());

        // Validate the Employee in the database
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeUpdate);
        Employee testEmployee = employeeList.get(employeeList.size() - 1);
        assertThat(testEmployee.getFullname()).isEqualTo(UPDATED_FULLNAME);
    }

    @Test
    @Transactional
    void fullUpdateEmployeeWithPatch() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        int databaseSizeBeforeUpdate = employeeRepository.findAll().size();

        // Update the employee using partial update
        Employee partialUpdatedEmployee = new Employee();
        partialUpdatedEmployee.setUsername(employee.getUsername());

        partialUpdatedEmployee.fullname(UPDATED_FULLNAME);

        restEmployeeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEmployee.getUsername())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEmployee))
            )
            .andExpect(status().isOk());

        // Validate the Employee in the database
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeUpdate);
        Employee testEmployee = employeeList.get(employeeList.size() - 1);
        assertThat(testEmployee.getFullname()).isEqualTo(UPDATED_FULLNAME);
    }

    @Test
    @Transactional
    void patchNonExistingEmployee() throws Exception {
        int databaseSizeBeforeUpdate = employeeRepository.findAll().size();
        employee.setUsername(UUID.randomUUID().toString());

        // Create the Employee
        EmployeeDTO employeeDTO = employeeMapper.toDto(employee);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmployeeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(employeeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Employee in the database
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEmployee() throws Exception {
        int databaseSizeBeforeUpdate = employeeRepository.findAll().size();
        employee.setUsername(UUID.randomUUID().toString());

        // Create the Employee
        EmployeeDTO employeeDTO = employeeMapper.toDto(employee);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmployeeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(employeeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Employee in the database
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEmployee() throws Exception {
        int databaseSizeBeforeUpdate = employeeRepository.findAll().size();
        employee.setUsername(UUID.randomUUID().toString());

        // Create the Employee
        EmployeeDTO employeeDTO = employeeMapper.toDto(employee);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEmployeeMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(employeeDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Employee in the database
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEmployee() throws Exception {
        // Initialize the database
        employeeRepository.saveAndFlush(employee);

        int databaseSizeBeforeDelete = employeeRepository.findAll().size();

        // Delete the employee
        restEmployeeMockMvc
            .perform(delete(ENTITY_API_URL_ID, employee.getUsername()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Employee> employeeList = employeeRepository.findAll();
        assertThat(employeeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
