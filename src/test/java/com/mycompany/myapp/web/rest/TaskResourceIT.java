package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.CompositekeyApp;
import com.mycompany.myapp.domain.EmployeeSkill;
import com.mycompany.myapp.domain.Task;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.enumeration.TaskType;
import com.mycompany.myapp.repository.TaskRepository;
import com.mycompany.myapp.service.TaskQueryService;
import com.mycompany.myapp.service.dto.TaskCriteria;
import com.mycompany.myapp.service.dto.TaskDTO;
import com.mycompany.myapp.service.mapper.TaskMapper;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link TaskResource} REST controller.
 */
@SpringBootTest(classes = CompositekeyApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TaskResourceIT {

    public static final String DEFAULT_NAME = "AAAAAAAAAA";
    public static final String UPDATED_NAME = "BBBBBBBBBB";

    public static final TaskType DEFAULT_TYPE = TaskType.TYPE1;
    public static final TaskType UPDATED_TYPE = TaskType.TYPE2;

    public static final LocalDate DEFAULT_END_DATE = LocalDate.ofEpochDay(0L);
    public static final LocalDate UPDATED_END_DATE = LocalDate.now(ZoneId.systemDefault());
    public static final LocalDate SMALLER_END_DATE = LocalDate.ofEpochDay(-1L);

    public static final ZonedDateTime DEFAULT_CREATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    public static final ZonedDateTime UPDATED_CREATED_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    public static final ZonedDateTime SMALLER_CREATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    public static final Instant DEFAULT_MODIFIED_AT = Instant.ofEpochMilli(0L);
    public static final Instant UPDATED_MODIFIED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    public static final Boolean DEFAULT_DONE = false;
    public static final Boolean UPDATED_DONE = true;

    public static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    public static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    public static final byte[] DEFAULT_ATTACHMENT = TestUtil.createByteArray(1, "0");
    public static final byte[] UPDATED_ATTACHMENT = TestUtil.createByteArray(1, "1");
    public static final String DEFAULT_ATTACHMENT_CONTENT_TYPE = "image/jpg";
    public static final String UPDATED_ATTACHMENT_CONTENT_TYPE = "image/png";

    public static final byte[] DEFAULT_PICTURE = TestUtil.createByteArray(1, "0");
    public static final byte[] UPDATED_PICTURE = TestUtil.createByteArray(1, "1");
    public static final String DEFAULT_PICTURE_CONTENT_TYPE = "image/jpg";
    public static final String UPDATED_PICTURE_CONTENT_TYPE = "image/png";

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskMapper taskMapper;

    @Autowired
    private TaskQueryService taskQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTaskMockMvc;

    private Task task;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Task createEntity(EntityManager em) {
        Task task = new Task()
            .name(DEFAULT_NAME)
            .type(DEFAULT_TYPE)
            .endDate(DEFAULT_END_DATE)
            .createdAt(DEFAULT_CREATED_AT)
            .modifiedAt(DEFAULT_MODIFIED_AT)
            .done(DEFAULT_DONE)
            .description(DEFAULT_DESCRIPTION)
            .attachment(DEFAULT_ATTACHMENT)
            .attachmentContentType(DEFAULT_ATTACHMENT_CONTENT_TYPE)
            .picture(DEFAULT_PICTURE)
            .pictureContentType(DEFAULT_PICTURE_CONTENT_TYPE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        task.setUser(user);
        return task;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Task createUpdatedEntity(EntityManager em) {
        Task task = new Task()
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE)
            .endDate(UPDATED_END_DATE)
            .createdAt(UPDATED_CREATED_AT)
            .modifiedAt(UPDATED_MODIFIED_AT)
            .done(UPDATED_DONE)
            .description(UPDATED_DESCRIPTION)
            .attachment(UPDATED_ATTACHMENT)
            .attachmentContentType(UPDATED_ATTACHMENT_CONTENT_TYPE)
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        task.setUser(user);
        return task;
    }

    @BeforeEach
    public void initTest() {
        task = createEntity(em);
    }

    @Test
    @Transactional
    void createTask() throws Exception {
        int databaseSizeBeforeCreate = taskRepository.findAll().size();
        // Create the Task
        TaskDTO taskDTO = taskMapper.toDto(task);
        restTaskMockMvc
            .perform(post("/api/tasks").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskDTO)))
            .andExpect(status().isCreated());

        // Validate the Task in the database
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeCreate + 1);
        Task testTask = taskList.get(taskList.size() - 1);
        assertThat(testTask.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTask.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testTask.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testTask.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testTask.getModifiedAt()).isEqualTo(DEFAULT_MODIFIED_AT);
        assertThat(testTask.getDone()).isEqualTo(DEFAULT_DONE);
        assertThat(testTask.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testTask.getAttachment()).isEqualTo(DEFAULT_ATTACHMENT);
        assertThat(testTask.getAttachmentContentType()).isEqualTo(DEFAULT_ATTACHMENT_CONTENT_TYPE);
        assertThat(testTask.getPicture()).isEqualTo(DEFAULT_PICTURE);
        assertThat(testTask.getPictureContentType()).isEqualTo(DEFAULT_PICTURE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void createTaskWithExistingId() throws Exception {
        taskRepository.save(task);
        int databaseSizeBeforeCreate = taskRepository.findAll().size();

        // Create the Task with an existing ID
        TaskDTO taskDTO = taskMapper.toDto(task);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaskMockMvc
            .perform(post("/api/tasks").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Task in the database
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskRepository.findAll().size();
        // set the field null
        task.setName(null);

        // Create the Task, which fails.
        TaskDTO taskDTO = taskMapper.toDto(task);

        restTaskMockMvc
            .perform(post("/api/tasks").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskDTO)))
            .andExpect(status().isBadRequest());

        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskRepository.findAll().size();
        // set the field null
        task.setType(null);

        // Create the Task, which fails.
        TaskDTO taskDTO = taskMapper.toDto(task);

        restTaskMockMvc
            .perform(post("/api/tasks").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskDTO)))
            .andExpect(status().isBadRequest());

        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCreatedAtIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskRepository.findAll().size();
        // set the field null
        task.setCreatedAt(null);

        // Create the Task, which fails.
        TaskDTO taskDTO = taskMapper.toDto(task);

        restTaskMockMvc
            .perform(post("/api/tasks").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskDTO)))
            .andExpect(status().isBadRequest());

        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkModifiedAtIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskRepository.findAll().size();
        // set the field null
        task.setModifiedAt(null);

        // Create the Task, which fails.
        TaskDTO taskDTO = taskMapper.toDto(task);

        restTaskMockMvc
            .perform(post("/api/tasks").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskDTO)))
            .andExpect(status().isBadRequest());

        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskRepository.findAll().size();
        // set the field null
        task.setDone(null);

        // Create the Task, which fails.
        TaskDTO taskDTO = taskMapper.toDto(task);

        restTaskMockMvc
            .perform(post("/api/tasks").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskDTO)))
            .andExpect(status().isBadRequest());

        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTasks() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList
        restTaskMockMvc
            .perform(get("/api/tasks"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(task.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(sameInstant(DEFAULT_CREATED_AT))))
            .andExpect(jsonPath("$.[*].modifiedAt").value(hasItem(DEFAULT_MODIFIED_AT.toString())))
            .andExpect(jsonPath("$.[*].done").value(hasItem(DEFAULT_DONE.booleanValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].attachmentContentType").value(hasItem(DEFAULT_ATTACHMENT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].attachment").value(hasItem(Base64Utils.encodeToString(DEFAULT_ATTACHMENT))))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    void getTask() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get the task
        restTaskMockMvc
            .perform(get("/api/tasks/{id}", task.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(task.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.createdAt").value(sameInstant(DEFAULT_CREATED_AT)))
            .andExpect(jsonPath("$.modifiedAt").value(DEFAULT_MODIFIED_AT.toString()))
            .andExpect(jsonPath("$.done").value(DEFAULT_DONE.booleanValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.attachmentContentType").value(DEFAULT_ATTACHMENT_CONTENT_TYPE))
            .andExpect(jsonPath("$.attachment").value(Base64Utils.encodeToString(DEFAULT_ATTACHMENT)))
            .andExpect(jsonPath("$.pictureContentType").value(DEFAULT_PICTURE_CONTENT_TYPE))
            .andExpect(jsonPath("$.picture").value(Base64Utils.encodeToString(DEFAULT_PICTURE)));
    }

    @Test
    @Transactional
    void getTasksByIdFiltering() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        Long id = task.getId();

        defaultTaskShouldBeFound("id.equals=" + id);
        defaultTaskShouldNotBeFound("id.notEquals=" + id);

        defaultTaskShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultTaskShouldNotBeFound("id.greaterThan=" + id);

        defaultTaskShouldBeFound("id.lessThanOrEqual=" + id);
        defaultTaskShouldNotBeFound("id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllTasksByNameIsEqualToSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where name equals to DEFAULT_NAME
        defaultTaskShouldBeFound("name.equals=" + DEFAULT_NAME);

        // Get all the taskList where name equals to UPDATED_NAME
        defaultTaskShouldNotBeFound("name.equals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllTasksByNameIsNotEqualToSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where name not equals to DEFAULT_NAME
        defaultTaskShouldNotBeFound("name.notEquals=" + DEFAULT_NAME);

        // Get all the taskList where name not equals to UPDATED_NAME
        defaultTaskShouldBeFound("name.notEquals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllTasksByNameIsInShouldWork() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where name in DEFAULT_NAME or UPDATED_NAME
        defaultTaskShouldBeFound("name.in=" + DEFAULT_NAME + "," + UPDATED_NAME);

        // Get all the taskList where name equals to UPDATED_NAME
        defaultTaskShouldNotBeFound("name.in=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllTasksByNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where name is not null
        defaultTaskShouldBeFound("name.specified=true");

        // Get all the taskList where name is null
        defaultTaskShouldNotBeFound("name.specified=false");
    }

    @Test
    @Transactional
    void getAllTasksByNameContainsSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where name contains DEFAULT_NAME
        defaultTaskShouldBeFound("name.contains=" + DEFAULT_NAME);

        // Get all the taskList where name contains UPDATED_NAME
        defaultTaskShouldNotBeFound("name.contains=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllTasksByNameNotContainsSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where name does not contain DEFAULT_NAME
        defaultTaskShouldNotBeFound("name.doesNotContain=" + DEFAULT_NAME);

        // Get all the taskList where name does not contain UPDATED_NAME
        defaultTaskShouldBeFound("name.doesNotContain=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllTasksByTypeIsEqualToSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where type equals to DEFAULT_TYPE
        defaultTaskShouldBeFound("type.equals=" + DEFAULT_TYPE);

        // Get all the taskList where type equals to UPDATED_TYPE
        defaultTaskShouldNotBeFound("type.equals=" + UPDATED_TYPE);
    }

    @Test
    @Transactional
    void getAllTasksByTypeIsNotEqualToSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where type not equals to DEFAULT_TYPE
        defaultTaskShouldNotBeFound("type.notEquals=" + DEFAULT_TYPE);

        // Get all the taskList where type not equals to UPDATED_TYPE
        defaultTaskShouldBeFound("type.notEquals=" + UPDATED_TYPE);
    }

    @Test
    @Transactional
    void getAllTasksByTypeIsInShouldWork() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where type in DEFAULT_TYPE or UPDATED_TYPE
        defaultTaskShouldBeFound("type.in=" + DEFAULT_TYPE + "," + UPDATED_TYPE);

        // Get all the taskList where type equals to UPDATED_TYPE
        defaultTaskShouldNotBeFound("type.in=" + UPDATED_TYPE);
    }

    @Test
    @Transactional
    void getAllTasksByTypeIsNullOrNotNull() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where type is not null
        defaultTaskShouldBeFound("type.specified=true");

        // Get all the taskList where type is null
        defaultTaskShouldNotBeFound("type.specified=false");
    }

    @Test
    @Transactional
    void getAllTasksByEndDateIsEqualToSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where endDate equals to DEFAULT_END_DATE
        defaultTaskShouldBeFound("endDate.equals=" + DEFAULT_END_DATE);

        // Get all the taskList where endDate equals to UPDATED_END_DATE
        defaultTaskShouldNotBeFound("endDate.equals=" + UPDATED_END_DATE);
    }

    @Test
    @Transactional
    void getAllTasksByEndDateIsNotEqualToSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where endDate not equals to DEFAULT_END_DATE
        defaultTaskShouldNotBeFound("endDate.notEquals=" + DEFAULT_END_DATE);

        // Get all the taskList where endDate not equals to UPDATED_END_DATE
        defaultTaskShouldBeFound("endDate.notEquals=" + UPDATED_END_DATE);
    }

    @Test
    @Transactional
    void getAllTasksByEndDateIsInShouldWork() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where endDate in DEFAULT_END_DATE or UPDATED_END_DATE
        defaultTaskShouldBeFound("endDate.in=" + DEFAULT_END_DATE + "," + UPDATED_END_DATE);

        // Get all the taskList where endDate equals to UPDATED_END_DATE
        defaultTaskShouldNotBeFound("endDate.in=" + UPDATED_END_DATE);
    }

    @Test
    @Transactional
    void getAllTasksByEndDateIsNullOrNotNull() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where endDate is not null
        defaultTaskShouldBeFound("endDate.specified=true");

        // Get all the taskList where endDate is null
        defaultTaskShouldNotBeFound("endDate.specified=false");
    }

    @Test
    @Transactional
    void getAllTasksByEndDateIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where endDate is greater than or equal to DEFAULT_END_DATE
        defaultTaskShouldBeFound("endDate.greaterThanOrEqual=" + DEFAULT_END_DATE);

        // Get all the taskList where endDate is greater than or equal to UPDATED_END_DATE
        defaultTaskShouldNotBeFound("endDate.greaterThanOrEqual=" + UPDATED_END_DATE);
    }

    @Test
    @Transactional
    void getAllTasksByEndDateIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where endDate is less than or equal to DEFAULT_END_DATE
        defaultTaskShouldBeFound("endDate.lessThanOrEqual=" + DEFAULT_END_DATE);

        // Get all the taskList where endDate is less than or equal to SMALLER_END_DATE
        defaultTaskShouldNotBeFound("endDate.lessThanOrEqual=" + SMALLER_END_DATE);
    }

    @Test
    @Transactional
    void getAllTasksByEndDateIsLessThanSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where endDate is less than DEFAULT_END_DATE
        defaultTaskShouldNotBeFound("endDate.lessThan=" + DEFAULT_END_DATE);

        // Get all the taskList where endDate is less than UPDATED_END_DATE
        defaultTaskShouldBeFound("endDate.lessThan=" + UPDATED_END_DATE);
    }

    @Test
    @Transactional
    void getAllTasksByEndDateIsGreaterThanSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where endDate is greater than DEFAULT_END_DATE
        defaultTaskShouldNotBeFound("endDate.greaterThan=" + DEFAULT_END_DATE);

        // Get all the taskList where endDate is greater than SMALLER_END_DATE
        defaultTaskShouldBeFound("endDate.greaterThan=" + SMALLER_END_DATE);
    }

    @Test
    @Transactional
    void getAllTasksByCreatedAtIsEqualToSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where createdAt equals to DEFAULT_CREATED_AT
        defaultTaskShouldBeFound("createdAt.equals=" + DEFAULT_CREATED_AT);

        // Get all the taskList where createdAt equals to UPDATED_CREATED_AT
        defaultTaskShouldNotBeFound("createdAt.equals=" + UPDATED_CREATED_AT);
    }

    @Test
    @Transactional
    void getAllTasksByCreatedAtIsNotEqualToSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where createdAt not equals to DEFAULT_CREATED_AT
        defaultTaskShouldNotBeFound("createdAt.notEquals=" + DEFAULT_CREATED_AT);

        // Get all the taskList where createdAt not equals to UPDATED_CREATED_AT
        defaultTaskShouldBeFound("createdAt.notEquals=" + UPDATED_CREATED_AT);
    }

    @Test
    @Transactional
    void getAllTasksByCreatedAtIsInShouldWork() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where createdAt in DEFAULT_CREATED_AT or UPDATED_CREATED_AT
        defaultTaskShouldBeFound("createdAt.in=" + DEFAULT_CREATED_AT + "," + UPDATED_CREATED_AT);

        // Get all the taskList where createdAt equals to UPDATED_CREATED_AT
        defaultTaskShouldNotBeFound("createdAt.in=" + UPDATED_CREATED_AT);
    }

    @Test
    @Transactional
    void getAllTasksByCreatedAtIsNullOrNotNull() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where createdAt is not null
        defaultTaskShouldBeFound("createdAt.specified=true");

        // Get all the taskList where createdAt is null
        defaultTaskShouldNotBeFound("createdAt.specified=false");
    }

    @Test
    @Transactional
    void getAllTasksByCreatedAtIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where createdAt is greater than or equal to DEFAULT_CREATED_AT
        defaultTaskShouldBeFound("createdAt.greaterThanOrEqual=" + DEFAULT_CREATED_AT);

        // Get all the taskList where createdAt is greater than or equal to UPDATED_CREATED_AT
        defaultTaskShouldNotBeFound("createdAt.greaterThanOrEqual=" + UPDATED_CREATED_AT);
    }

    @Test
    @Transactional
    void getAllTasksByCreatedAtIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where createdAt is less than or equal to DEFAULT_CREATED_AT
        defaultTaskShouldBeFound("createdAt.lessThanOrEqual=" + DEFAULT_CREATED_AT);

        // Get all the taskList where createdAt is less than or equal to SMALLER_CREATED_AT
        defaultTaskShouldNotBeFound("createdAt.lessThanOrEqual=" + SMALLER_CREATED_AT);
    }

    @Test
    @Transactional
    void getAllTasksByCreatedAtIsLessThanSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where createdAt is less than DEFAULT_CREATED_AT
        defaultTaskShouldNotBeFound("createdAt.lessThan=" + DEFAULT_CREATED_AT);

        // Get all the taskList where createdAt is less than UPDATED_CREATED_AT
        defaultTaskShouldBeFound("createdAt.lessThan=" + UPDATED_CREATED_AT);
    }

    @Test
    @Transactional
    void getAllTasksByCreatedAtIsGreaterThanSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where createdAt is greater than DEFAULT_CREATED_AT
        defaultTaskShouldNotBeFound("createdAt.greaterThan=" + DEFAULT_CREATED_AT);

        // Get all the taskList where createdAt is greater than SMALLER_CREATED_AT
        defaultTaskShouldBeFound("createdAt.greaterThan=" + SMALLER_CREATED_AT);
    }

    @Test
    @Transactional
    void getAllTasksByModifiedAtIsEqualToSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where modifiedAt equals to DEFAULT_MODIFIED_AT
        defaultTaskShouldBeFound("modifiedAt.equals=" + DEFAULT_MODIFIED_AT);

        // Get all the taskList where modifiedAt equals to UPDATED_MODIFIED_AT
        defaultTaskShouldNotBeFound("modifiedAt.equals=" + UPDATED_MODIFIED_AT);
    }

    @Test
    @Transactional
    void getAllTasksByModifiedAtIsNotEqualToSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where modifiedAt not equals to DEFAULT_MODIFIED_AT
        defaultTaskShouldNotBeFound("modifiedAt.notEquals=" + DEFAULT_MODIFIED_AT);

        // Get all the taskList where modifiedAt not equals to UPDATED_MODIFIED_AT
        defaultTaskShouldBeFound("modifiedAt.notEquals=" + UPDATED_MODIFIED_AT);
    }

    @Test
    @Transactional
    void getAllTasksByModifiedAtIsInShouldWork() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where modifiedAt in DEFAULT_MODIFIED_AT or UPDATED_MODIFIED_AT
        defaultTaskShouldBeFound("modifiedAt.in=" + DEFAULT_MODIFIED_AT + "," + UPDATED_MODIFIED_AT);

        // Get all the taskList where modifiedAt equals to UPDATED_MODIFIED_AT
        defaultTaskShouldNotBeFound("modifiedAt.in=" + UPDATED_MODIFIED_AT);
    }

    @Test
    @Transactional
    void getAllTasksByModifiedAtIsNullOrNotNull() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where modifiedAt is not null
        defaultTaskShouldBeFound("modifiedAt.specified=true");

        // Get all the taskList where modifiedAt is null
        defaultTaskShouldNotBeFound("modifiedAt.specified=false");
    }

    @Test
    @Transactional
    void getAllTasksByDoneIsEqualToSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where done equals to DEFAULT_DONE
        defaultTaskShouldBeFound("done.equals=" + DEFAULT_DONE);

        // Get all the taskList where done equals to UPDATED_DONE
        defaultTaskShouldNotBeFound("done.equals=" + UPDATED_DONE);
    }

    @Test
    @Transactional
    void getAllTasksByDoneIsNotEqualToSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where done not equals to DEFAULT_DONE
        defaultTaskShouldNotBeFound("done.notEquals=" + DEFAULT_DONE);

        // Get all the taskList where done not equals to UPDATED_DONE
        defaultTaskShouldBeFound("done.notEquals=" + UPDATED_DONE);
    }

    @Test
    @Transactional
    void getAllTasksByDoneIsInShouldWork() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where done in DEFAULT_DONE or UPDATED_DONE
        defaultTaskShouldBeFound("done.in=" + DEFAULT_DONE + "," + UPDATED_DONE);

        // Get all the taskList where done equals to UPDATED_DONE
        defaultTaskShouldNotBeFound("done.in=" + UPDATED_DONE);
    }

    @Test
    @Transactional
    void getAllTasksByDoneIsNullOrNotNull() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        // Get all the taskList where done is not null
        defaultTaskShouldBeFound("done.specified=true");

        // Get all the taskList where done is null
        defaultTaskShouldNotBeFound("done.specified=false");
    }

    @Test
    @Transactional
    void getAllTasksByEmployeeSkillIsEqualToSomething() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);
        EmployeeSkill employeeSkill = EmployeeSkillResourceIT.createEntity(em);
        em.persist(employeeSkill);
        em.flush();
        task.addEmployeeSkill(employeeSkill);
        taskRepository.saveAndFlush(task);

        // Get all the taskList where employeeSkill.name equals to EmployeeSkillResourceIT.DEFAULT_NAME
        defaultTaskShouldBeFound("employeeSkill.name.equals=" + EmployeeSkillResourceIT.DEFAULT_NAME);

        // Get all the taskList where employeeSkill.name equals to EmployeeSkillResourceIT.UPDATED_NAME
        defaultTaskShouldNotBeFound("employeeSkill.name.equals=" + EmployeeSkillResourceIT.UPDATED_NAME);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultTaskShouldBeFound(String filter) throws Exception {
        restTaskMockMvc
            .perform(get("/api/tasks?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(task.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(sameInstant(DEFAULT_CREATED_AT))))
            .andExpect(jsonPath("$.[*].modifiedAt").value(hasItem(DEFAULT_MODIFIED_AT.toString())))
            .andExpect(jsonPath("$.[*].done").value(hasItem(DEFAULT_DONE.booleanValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].attachmentContentType").value(hasItem(DEFAULT_ATTACHMENT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].attachment").value(hasItem(Base64Utils.encodeToString(DEFAULT_ATTACHMENT))))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));

        // Check, that the count call also returns 1
        restTaskMockMvc
            .perform(get("/api/tasks/count?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultTaskShouldNotBeFound(String filter) throws Exception {
        restTaskMockMvc
            .perform(get("/api/tasks?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restTaskMockMvc
            .perform(get("/api/tasks/count?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingTask() throws Exception {
        // Get the task
        restTaskMockMvc.perform(get("/api/tasks/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void updateTask() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        int databaseSizeBeforeUpdate = taskRepository.findAll().size();

        // Update the task
        Task updatedTask = taskRepository.findById(task.getId()).get();
        // Disconnect from session so that the updates on updatedTask are not directly saved in db
        em.detach(updatedTask);
        updatedTask
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE)
            .endDate(UPDATED_END_DATE)
            .createdAt(UPDATED_CREATED_AT)
            .modifiedAt(UPDATED_MODIFIED_AT)
            .done(UPDATED_DONE)
            .description(UPDATED_DESCRIPTION)
            .attachment(UPDATED_ATTACHMENT)
            .attachmentContentType(UPDATED_ATTACHMENT_CONTENT_TYPE)
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE);
        TaskDTO taskDTO = taskMapper.toDto(updatedTask);

        restTaskMockMvc
            .perform(put("/api/tasks").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskDTO)))
            .andExpect(status().isOk());

        // Validate the Task in the database
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeUpdate);
        Task testTask = taskList.get(taskList.size() - 1);
        assertThat(testTask.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTask.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testTask.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testTask.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testTask.getModifiedAt()).isEqualTo(UPDATED_MODIFIED_AT);
        assertThat(testTask.getDone()).isEqualTo(UPDATED_DONE);
        assertThat(testTask.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTask.getAttachment()).isEqualTo(UPDATED_ATTACHMENT);
        assertThat(testTask.getAttachmentContentType()).isEqualTo(UPDATED_ATTACHMENT_CONTENT_TYPE);
        assertThat(testTask.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testTask.getPictureContentType()).isEqualTo(UPDATED_PICTURE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void updateNonExistingTask() throws Exception {
        int databaseSizeBeforeUpdate = taskRepository.findAll().size();

        // Create the Task
        TaskDTO taskDTO = taskMapper.toDto(task);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskMockMvc
            .perform(put("/api/tasks").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Task in the database
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTaskWithPatch() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        int databaseSizeBeforeUpdate = taskRepository.findAll().size();

        // Update the task using partial update
        Task partialUpdatedTask = new Task();
        partialUpdatedTask.setId(task.getId());

        partialUpdatedTask
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE)
            .createdAt(UPDATED_CREATED_AT)
            .modifiedAt(UPDATED_MODIFIED_AT)
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE);

        restTaskMockMvc
            .perform(
                patch("/api/tasks")
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTask))
            )
            .andExpect(status().isOk());

        // Validate the Task in the database
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeUpdate);
        Task testTask = taskList.get(taskList.size() - 1);
        assertThat(testTask.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTask.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testTask.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testTask.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testTask.getModifiedAt()).isEqualTo(UPDATED_MODIFIED_AT);
        assertThat(testTask.getDone()).isEqualTo(DEFAULT_DONE);
        assertThat(testTask.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testTask.getAttachment()).isEqualTo(DEFAULT_ATTACHMENT);
        assertThat(testTask.getAttachmentContentType()).isEqualTo(DEFAULT_ATTACHMENT_CONTENT_TYPE);
        assertThat(testTask.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testTask.getPictureContentType()).isEqualTo(UPDATED_PICTURE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void fullUpdateTaskWithPatch() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        int databaseSizeBeforeUpdate = taskRepository.findAll().size();

        // Update the task using partial update
        Task partialUpdatedTask = new Task();
        partialUpdatedTask.setId(task.getId());

        partialUpdatedTask
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE)
            .endDate(UPDATED_END_DATE)
            .createdAt(UPDATED_CREATED_AT)
            .modifiedAt(UPDATED_MODIFIED_AT)
            .done(UPDATED_DONE)
            .description(UPDATED_DESCRIPTION)
            .attachment(UPDATED_ATTACHMENT)
            .attachmentContentType(UPDATED_ATTACHMENT_CONTENT_TYPE)
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE);

        restTaskMockMvc
            .perform(
                patch("/api/tasks")
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTask))
            )
            .andExpect(status().isOk());

        // Validate the Task in the database
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeUpdate);
        Task testTask = taskList.get(taskList.size() - 1);
        assertThat(testTask.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTask.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testTask.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testTask.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testTask.getModifiedAt()).isEqualTo(UPDATED_MODIFIED_AT);
        assertThat(testTask.getDone()).isEqualTo(UPDATED_DONE);
        assertThat(testTask.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTask.getAttachment()).isEqualTo(UPDATED_ATTACHMENT);
        assertThat(testTask.getAttachmentContentType()).isEqualTo(UPDATED_ATTACHMENT_CONTENT_TYPE);
        assertThat(testTask.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testTask.getPictureContentType()).isEqualTo(UPDATED_PICTURE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void partialUpdateTaskShouldThrown() throws Exception {
        // Update the task without id should throw
        Task partialUpdatedTask = new Task();

        restTaskMockMvc
            .perform(
                patch("/api/tasks")
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTask))
            )
            .andExpect(status().isBadRequest());
    }

    @Test
    @Transactional
    void deleteTask() throws Exception {
        // Initialize the database
        taskRepository.saveAndFlush(task);

        int databaseSizeBeforeDelete = taskRepository.findAll().size();

        // Delete the task
        restTaskMockMvc
            .perform(delete("/api/tasks/{id}", task.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Task> taskList = taskRepository.findAll();
        assertThat(taskList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
