package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.CompositekeyApp;
import com.mycompany.myapp.domain.Task;
import com.mycompany.myapp.domain.TaskComment;
import com.mycompany.myapp.repository.TaskCommentRepository;
import com.mycompany.myapp.service.TaskCommentQueryService;
import com.mycompany.myapp.service.dto.TaskCommentCriteria;
import com.mycompany.myapp.service.dto.TaskCommentDTO;
import com.mycompany.myapp.service.mapper.TaskCommentMapper;
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

/**
 * Integration tests for the {@link TaskCommentResource} REST controller.
 */
@SpringBootTest(classes = CompositekeyApp.class)
@AutoConfigureMockMvc
@WithMockUser
class TaskCommentResourceIT {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    @Autowired
    private TaskCommentRepository taskCommentRepository;

    @Autowired
    private TaskCommentMapper taskCommentMapper;

    @Autowired
    private TaskCommentQueryService taskCommentQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTaskCommentMockMvc;

    private TaskComment taskComment;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TaskComment createEntity(EntityManager em) {
        TaskComment taskComment = new TaskComment().value(DEFAULT_VALUE);
        // Add required entity
        Task task;
        if (TestUtil.findAll(em, Task.class).isEmpty()) {
            task = TaskResourceIT.createEntity(em);
            em.persist(task);
            em.flush();
        } else {
            task = TestUtil.findAll(em, Task.class).get(0);
        }
        taskComment.setTask(task);
        return taskComment;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TaskComment createUpdatedEntity(EntityManager em) {
        TaskComment taskComment = new TaskComment().value(UPDATED_VALUE);
        // Add required entity
        Task task;
        if (TestUtil.findAll(em, Task.class).isEmpty()) {
            task = TaskResourceIT.createUpdatedEntity(em);
            em.persist(task);
            em.flush();
        } else {
            task = TestUtil.findAll(em, Task.class).get(0);
        }
        taskComment.setTask(task);
        return taskComment;
    }

    @BeforeEach
    public void initTest() {
        taskComment = createEntity(em);
    }

    @Test
    @Transactional
    void createTaskComment() throws Exception {
        int databaseSizeBeforeCreate = taskCommentRepository.findAll().size();
        // Create the TaskComment
        TaskCommentDTO taskCommentDTO = taskCommentMapper.toDto(taskComment);
        restTaskCommentMockMvc
            .perform(
                post("/api/task-comments")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(taskCommentDTO))
            )
            .andExpect(status().isCreated());

        // Validate the TaskComment in the database
        List<TaskComment> taskCommentList = taskCommentRepository.findAll();
        assertThat(taskCommentList).hasSize(databaseSizeBeforeCreate + 1);
        TaskComment testTaskComment = taskCommentList.get(taskCommentList.size() - 1);
        assertThat(testTaskComment.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    void createTaskCommentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = taskCommentRepository.findAll().size();

        // Create the TaskComment with an existing ID
        taskComment.setId(1L);
        TaskCommentDTO taskCommentDTO = taskCommentMapper.toDto(taskComment);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaskCommentMockMvc
            .perform(
                post("/api/task-comments")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(taskCommentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskComment in the database
        List<TaskComment> taskCommentList = taskCommentRepository.findAll();
        assertThat(taskCommentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkValueIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskCommentRepository.findAll().size();
        // set the field null
        taskComment.setValue(null);

        // Create the TaskComment, which fails.
        TaskCommentDTO taskCommentDTO = taskCommentMapper.toDto(taskComment);

        restTaskCommentMockMvc
            .perform(
                post("/api/task-comments")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(taskCommentDTO))
            )
            .andExpect(status().isBadRequest());

        List<TaskComment> taskCommentList = taskCommentRepository.findAll();
        assertThat(taskCommentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTaskComments() throws Exception {
        // Initialize the database
        taskCommentRepository.saveAndFlush(taskComment);

        // Get all the taskCommentList
        restTaskCommentMockMvc
            .perform(get("/api/task-comments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taskComment.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)));
    }

    @Test
    @Transactional
    void getTaskComment() throws Exception {
        // Initialize the database
        taskCommentRepository.saveAndFlush(taskComment);

        // Get the taskComment
        restTaskCommentMockMvc
            .perform(get("/api/task-comments/{id}", taskComment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(taskComment.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE));
    }

    @Test
    @Transactional
    void getTaskCommentsByIdFiltering() throws Exception {
        // Initialize the database
        taskCommentRepository.saveAndFlush(taskComment);

        Long id = taskComment.getId();

        defaultTaskCommentShouldBeFound("id.equals=" + id);
        defaultTaskCommentShouldNotBeFound("id.notEquals=" + id);

        defaultTaskCommentShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultTaskCommentShouldNotBeFound("id.greaterThan=" + id);

        defaultTaskCommentShouldBeFound("id.lessThanOrEqual=" + id);
        defaultTaskCommentShouldNotBeFound("id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllTaskCommentsByValueIsEqualToSomething() throws Exception {
        // Initialize the database
        taskCommentRepository.saveAndFlush(taskComment);

        // Get all the taskCommentList where value equals to DEFAULT_VALUE
        defaultTaskCommentShouldBeFound("value.equals=" + DEFAULT_VALUE);

        // Get all the taskCommentList where value equals to UPDATED_VALUE
        defaultTaskCommentShouldNotBeFound("value.equals=" + UPDATED_VALUE);
    }

    @Test
    @Transactional
    void getAllTaskCommentsByValueIsNotEqualToSomething() throws Exception {
        // Initialize the database
        taskCommentRepository.saveAndFlush(taskComment);

        // Get all the taskCommentList where value not equals to DEFAULT_VALUE
        defaultTaskCommentShouldNotBeFound("value.notEquals=" + DEFAULT_VALUE);

        // Get all the taskCommentList where value not equals to UPDATED_VALUE
        defaultTaskCommentShouldBeFound("value.notEquals=" + UPDATED_VALUE);
    }

    @Test
    @Transactional
    void getAllTaskCommentsByValueIsInShouldWork() throws Exception {
        // Initialize the database
        taskCommentRepository.saveAndFlush(taskComment);

        // Get all the taskCommentList where value in DEFAULT_VALUE or UPDATED_VALUE
        defaultTaskCommentShouldBeFound("value.in=" + DEFAULT_VALUE + "," + UPDATED_VALUE);

        // Get all the taskCommentList where value equals to UPDATED_VALUE
        defaultTaskCommentShouldNotBeFound("value.in=" + UPDATED_VALUE);
    }

    @Test
    @Transactional
    void getAllTaskCommentsByValueIsNullOrNotNull() throws Exception {
        // Initialize the database
        taskCommentRepository.saveAndFlush(taskComment);

        // Get all the taskCommentList where value is not null
        defaultTaskCommentShouldBeFound("value.specified=true");

        // Get all the taskCommentList where value is null
        defaultTaskCommentShouldNotBeFound("value.specified=false");
    }

    @Test
    @Transactional
    void getAllTaskCommentsByValueContainsSomething() throws Exception {
        // Initialize the database
        taskCommentRepository.saveAndFlush(taskComment);

        // Get all the taskCommentList where value contains DEFAULT_VALUE
        defaultTaskCommentShouldBeFound("value.contains=" + DEFAULT_VALUE);

        // Get all the taskCommentList where value contains UPDATED_VALUE
        defaultTaskCommentShouldNotBeFound("value.contains=" + UPDATED_VALUE);
    }

    @Test
    @Transactional
    void getAllTaskCommentsByValueNotContainsSomething() throws Exception {
        // Initialize the database
        taskCommentRepository.saveAndFlush(taskComment);

        // Get all the taskCommentList where value does not contain DEFAULT_VALUE
        defaultTaskCommentShouldNotBeFound("value.doesNotContain=" + DEFAULT_VALUE);

        // Get all the taskCommentList where value does not contain UPDATED_VALUE
        defaultTaskCommentShouldBeFound("value.doesNotContain=" + UPDATED_VALUE);
    }

    @Test
    @Transactional
    void getAllTaskCommentsByTaskIsEqualToSomething() throws Exception {
        // Initialize the database
        taskCommentRepository.saveAndFlush(taskComment);
        Task task = TaskResourceIT.createEntity(em);
        em.persist(task);
        em.flush();
        taskComment.setTask(task);
        taskCommentRepository.saveAndFlush(taskComment);
        Long taskId = task.getId();

        // Get all the taskCommentList where task equals to taskId
        defaultTaskCommentShouldBeFound("taskId.equals=" + taskId);

        // Get all the taskCommentList where task equals to taskId + 1
        defaultTaskCommentShouldNotBeFound("taskId.equals=" + (taskId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultTaskCommentShouldBeFound(String filter) throws Exception {
        restTaskCommentMockMvc
            .perform(get("/api/task-comments?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taskComment.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)));

        // Check, that the count call also returns 1
        restTaskCommentMockMvc
            .perform(get("/api/task-comments/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultTaskCommentShouldNotBeFound(String filter) throws Exception {
        restTaskCommentMockMvc
            .perform(get("/api/task-comments?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restTaskCommentMockMvc
            .perform(get("/api/task-comments/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingTaskComment() throws Exception {
        // Get the taskComment
        restTaskCommentMockMvc.perform(get("/api/task-comments/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void updateTaskComment() throws Exception {
        // Initialize the database
        taskCommentRepository.saveAndFlush(taskComment);

        int databaseSizeBeforeUpdate = taskCommentRepository.findAll().size();

        // Update the taskComment
        TaskComment updatedTaskComment = taskCommentRepository.findById(taskComment.getId()).get();
        // Disconnect from session so that the updates on updatedTaskComment are not directly saved in db
        em.detach(updatedTaskComment);
        updatedTaskComment.value(UPDATED_VALUE);
        TaskCommentDTO taskCommentDTO = taskCommentMapper.toDto(updatedTaskComment);

        restTaskCommentMockMvc
            .perform(
                put("/api/task-comments").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskCommentDTO))
            )
            .andExpect(status().isOk());

        // Validate the TaskComment in the database
        List<TaskComment> taskCommentList = taskCommentRepository.findAll();
        assertThat(taskCommentList).hasSize(databaseSizeBeforeUpdate);
        TaskComment testTaskComment = taskCommentList.get(taskCommentList.size() - 1);
        assertThat(testTaskComment.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    void updateNonExistingTaskComment() throws Exception {
        int databaseSizeBeforeUpdate = taskCommentRepository.findAll().size();

        // Create the TaskComment
        TaskCommentDTO taskCommentDTO = taskCommentMapper.toDto(taskComment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskCommentMockMvc
            .perform(
                put("/api/task-comments").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskCommentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskComment in the database
        List<TaskComment> taskCommentList = taskCommentRepository.findAll();
        assertThat(taskCommentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTaskCommentWithPatch() throws Exception {
        // Initialize the database
        taskCommentRepository.saveAndFlush(taskComment);

        int databaseSizeBeforeUpdate = taskCommentRepository.findAll().size();

        // Update the taskComment using partial update
        TaskComment partialUpdatedTaskComment = new TaskComment();
        partialUpdatedTaskComment.setId(taskComment.getId());

        partialUpdatedTaskComment.value(UPDATED_VALUE);

        restTaskCommentMockMvc
            .perform(
                patch("/api/task-comments")
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTaskComment))
            )
            .andExpect(status().isOk());

        // Validate the TaskComment in the database
        List<TaskComment> taskCommentList = taskCommentRepository.findAll();
        assertThat(taskCommentList).hasSize(databaseSizeBeforeUpdate);
        TaskComment testTaskComment = taskCommentList.get(taskCommentList.size() - 1);
        assertThat(testTaskComment.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    void fullUpdateTaskCommentWithPatch() throws Exception {
        // Initialize the database
        taskCommentRepository.saveAndFlush(taskComment);

        int databaseSizeBeforeUpdate = taskCommentRepository.findAll().size();

        // Update the taskComment using partial update
        TaskComment partialUpdatedTaskComment = new TaskComment();
        partialUpdatedTaskComment.setId(taskComment.getId());

        partialUpdatedTaskComment.value(UPDATED_VALUE);

        restTaskCommentMockMvc
            .perform(
                patch("/api/task-comments")
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTaskComment))
            )
            .andExpect(status().isOk());

        // Validate the TaskComment in the database
        List<TaskComment> taskCommentList = taskCommentRepository.findAll();
        assertThat(taskCommentList).hasSize(databaseSizeBeforeUpdate);
        TaskComment testTaskComment = taskCommentList.get(taskCommentList.size() - 1);
        assertThat(testTaskComment.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    void partialUpdateTaskCommentShouldThrown() throws Exception {
        // Update the taskComment without id should throw
        TaskComment partialUpdatedTaskComment = new TaskComment();

        restTaskCommentMockMvc
            .perform(
                patch("/api/task-comments")
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTaskComment))
            )
            .andExpect(status().isBadRequest());
    }

    @Test
    @Transactional
    void deleteTaskComment() throws Exception {
        // Initialize the database
        taskCommentRepository.saveAndFlush(taskComment);

        int databaseSizeBeforeDelete = taskCommentRepository.findAll().size();

        // Delete the taskComment
        restTaskCommentMockMvc
            .perform(delete("/api/task-comments/{id}", taskComment.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TaskComment> taskCommentList = taskCommentRepository.findAll();
        assertThat(taskCommentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
