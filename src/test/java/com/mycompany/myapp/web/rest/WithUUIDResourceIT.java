package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.WithUUID;
import com.mycompany.myapp.domain.WithUUIDDetails;
import com.mycompany.myapp.repository.WithUUIDRepository;
import com.mycompany.myapp.service.criteria.WithUUIDCriteria;
import com.mycompany.myapp.service.dto.WithUUIDDTO;
import com.mycompany.myapp.service.mapper.WithUUIDMapper;
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
 * Integration tests for the {@link WithUUIDResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class WithUUIDResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/with-uuids";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{uuid}";

    @Autowired
    private WithUUIDRepository withUUIDRepository;

    @Autowired
    private WithUUIDMapper withUUIDMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restWithUUIDMockMvc;

    private WithUUID withUUID;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WithUUID createEntity(EntityManager em) {
        WithUUID withUUID = new WithUUID().name(DEFAULT_NAME);
        return withUUID;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WithUUID createUpdatedEntity(EntityManager em) {
        WithUUID withUUID = new WithUUID().name(UPDATED_NAME);
        return withUUID;
    }

    @BeforeEach
    public void initTest() {
        withUUID = createEntity(em);
    }

    @Test
    @Transactional
    void createWithUUID() throws Exception {
        int databaseSizeBeforeCreate = withUUIDRepository.findAll().size();
        // Create the WithUUID
        WithUUIDDTO withUUIDDTO = withUUIDMapper.toDto(withUUID);
        restWithUUIDMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(withUUIDDTO)))
            .andExpect(status().isCreated());

        // Validate the WithUUID in the database
        List<WithUUID> withUUIDList = withUUIDRepository.findAll();
        assertThat(withUUIDList).hasSize(databaseSizeBeforeCreate + 1);
        WithUUID testWithUUID = withUUIDList.get(withUUIDList.size() - 1);
        assertThat(testWithUUID.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    void createWithUUIDWithExistingId() throws Exception {
        // Create the WithUUID with an existing ID
        withUUIDRepository.saveAndFlush(withUUID);
        WithUUIDDTO withUUIDDTO = withUUIDMapper.toDto(withUUID);

        int databaseSizeBeforeCreate = withUUIDRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restWithUUIDMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(withUUIDDTO)))
            .andExpect(status().isBadRequest());

        // Validate the WithUUID in the database
        List<WithUUID> withUUIDList = withUUIDRepository.findAll();
        assertThat(withUUIDList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = withUUIDRepository.findAll().size();
        // set the field null
        withUUID.setName(null);

        // Create the WithUUID, which fails.
        WithUUIDDTO withUUIDDTO = withUUIDMapper.toDto(withUUID);

        restWithUUIDMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(withUUIDDTO)))
            .andExpect(status().isBadRequest());

        List<WithUUID> withUUIDList = withUUIDRepository.findAll();
        assertThat(withUUIDList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllWithUUIDS() throws Exception {
        // Initialize the database
        withUUIDRepository.saveAndFlush(withUUID);

        // Get all the withUUIDList
        restWithUUIDMockMvc
            .perform(get(ENTITY_API_URL))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].uuid").value(hasItem(withUUID.getUuid().toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    @Transactional
    void getWithUUID() throws Exception {
        // Initialize the database
        withUUIDRepository.saveAndFlush(withUUID);

        // Get the withUUID
        restWithUUIDMockMvc
            .perform(get(ENTITY_API_URL_ID, withUUID.getUuid()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.uuid").value(withUUID.getUuid().toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    void getWithUUIDSByIdFiltering() throws Exception {
        // Initialize the database
        withUUIDRepository.saveAndFlush(withUUID);

        UUID id = withUUID.getUuid();

        defaultWithUUIDShouldBeFound("uuid.equals=" + id);
        defaultWithUUIDShouldNotBeFound("uuid.notEquals=" + id);
    }

    @Test
    @Transactional
    void getAllWithUUIDSByNameIsEqualToSomething() throws Exception {
        // Initialize the database
        withUUIDRepository.saveAndFlush(withUUID);

        // Get all the withUUIDList where name equals to DEFAULT_NAME
        defaultWithUUIDShouldBeFound("name.equals=" + DEFAULT_NAME);

        // Get all the withUUIDList where name equals to UPDATED_NAME
        defaultWithUUIDShouldNotBeFound("name.equals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllWithUUIDSByNameIsNotEqualToSomething() throws Exception {
        // Initialize the database
        withUUIDRepository.saveAndFlush(withUUID);

        // Get all the withUUIDList where name not equals to DEFAULT_NAME
        defaultWithUUIDShouldNotBeFound("name.notEquals=" + DEFAULT_NAME);

        // Get all the withUUIDList where name not equals to UPDATED_NAME
        defaultWithUUIDShouldBeFound("name.notEquals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllWithUUIDSByNameIsInShouldWork() throws Exception {
        // Initialize the database
        withUUIDRepository.saveAndFlush(withUUID);

        // Get all the withUUIDList where name in DEFAULT_NAME or UPDATED_NAME
        defaultWithUUIDShouldBeFound("name.in=" + DEFAULT_NAME + "," + UPDATED_NAME);

        // Get all the withUUIDList where name equals to UPDATED_NAME
        defaultWithUUIDShouldNotBeFound("name.in=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllWithUUIDSByNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        withUUIDRepository.saveAndFlush(withUUID);

        // Get all the withUUIDList where name is not null
        defaultWithUUIDShouldBeFound("name.specified=true");

        // Get all the withUUIDList where name is null
        defaultWithUUIDShouldNotBeFound("name.specified=false");
    }

    @Test
    @Transactional
    void getAllWithUUIDSByNameContainsSomething() throws Exception {
        // Initialize the database
        withUUIDRepository.saveAndFlush(withUUID);

        // Get all the withUUIDList where name contains DEFAULT_NAME
        defaultWithUUIDShouldBeFound("name.contains=" + DEFAULT_NAME);

        // Get all the withUUIDList where name contains UPDATED_NAME
        defaultWithUUIDShouldNotBeFound("name.contains=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllWithUUIDSByNameNotContainsSomething() throws Exception {
        // Initialize the database
        withUUIDRepository.saveAndFlush(withUUID);

        // Get all the withUUIDList where name does not contain DEFAULT_NAME
        defaultWithUUIDShouldNotBeFound("name.doesNotContain=" + DEFAULT_NAME);

        // Get all the withUUIDList where name does not contain UPDATED_NAME
        defaultWithUUIDShouldBeFound("name.doesNotContain=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllWithUUIDSByWithUUIDDetailsIsEqualToSomething() throws Exception {
        // Initialize the database
        withUUIDRepository.saveAndFlush(withUUID);
        WithUUIDDetails withUUIDDetails = WithUUIDDetailsResourceIT.createEntity(em);
        em.persist(withUUIDDetails);
        em.flush();
        withUUIDRepository.saveAndFlush(withUUID);

        // Get all the withUUIDList where withUUIDDetails.withUUID.uuid equals to withUUIDDetails.getUuid()
        defaultWithUUIDShouldBeFound("withUUIDDetails.withUUID.uuid.equals=" + withUUIDDetails.getUuid());

        // Get all the withUUIDList where withUUIDDetails.withUUID.uuid equals to UUID.randomUUID()
        defaultWithUUIDShouldNotBeFound("withUUIDDetails.withUUID.uuid.equals=" + UUID.randomUUID());
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultWithUUIDShouldBeFound(String filter) throws Exception {
        restWithUUIDMockMvc
            .perform(get(ENTITY_API_URL + "?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].uuid").value(hasItem(withUUID.getUuid().toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));

        // Check, that the count call also returns 1
        restWithUUIDMockMvc
            .perform(get(ENTITY_API_URL + "/count?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultWithUUIDShouldNotBeFound(String filter) throws Exception {
        restWithUUIDMockMvc
            .perform(get(ENTITY_API_URL + "?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restWithUUIDMockMvc
            .perform(get(ENTITY_API_URL + "/count?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingWithUUID() throws Exception {
        // Get the withUUID
        restWithUUIDMockMvc.perform(get(ENTITY_API_URL_ID, UUID.randomUUID().toString())).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewWithUUID() throws Exception {
        // Initialize the database
        withUUIDRepository.saveAndFlush(withUUID);

        int databaseSizeBeforeUpdate = withUUIDRepository.findAll().size();

        // Update the withUUID
        WithUUID updatedWithUUID = withUUIDRepository.findById(withUUID.getUuid()).get();
        // Disconnect from session so that the updates on updatedWithUUID are not directly saved in db
        em.detach(updatedWithUUID);
        updatedWithUUID.name(UPDATED_NAME);
        WithUUIDDTO withUUIDDTO = withUUIDMapper.toDto(updatedWithUUID);

        restWithUUIDMockMvc
            .perform(
                put(ENTITY_API_URL_ID, withUUID.getUuid())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(withUUIDDTO))
            )
            .andExpect(status().isOk());

        // Validate the WithUUID in the database
        List<WithUUID> withUUIDList = withUUIDRepository.findAll();
        assertThat(withUUIDList).hasSize(databaseSizeBeforeUpdate);
        WithUUID testWithUUID = withUUIDList.get(withUUIDList.size() - 1);
        assertThat(testWithUUID.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void putNonExistingWithUUID() throws Exception {
        int databaseSizeBeforeUpdate = withUUIDRepository.findAll().size();
        withUUID.setUuid(UUID.randomUUID());

        // Create the WithUUID
        WithUUIDDTO withUUIDDTO = withUUIDMapper.toDto(withUUID);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWithUUIDMockMvc
            .perform(
                put(ENTITY_API_URL_ID, withUUID.getUuid())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(withUUIDDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WithUUID in the database
        List<WithUUID> withUUIDList = withUUIDRepository.findAll();
        assertThat(withUUIDList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchWithUUID() throws Exception {
        int databaseSizeBeforeUpdate = withUUIDRepository.findAll().size();
        withUUID.setUuid(UUID.randomUUID());

        // Create the WithUUID
        WithUUIDDTO withUUIDDTO = withUUIDMapper.toDto(withUUID);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWithUUIDMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(withUUIDDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WithUUID in the database
        List<WithUUID> withUUIDList = withUUIDRepository.findAll();
        assertThat(withUUIDList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamWithUUID() throws Exception {
        int databaseSizeBeforeUpdate = withUUIDRepository.findAll().size();
        withUUID.setUuid(UUID.randomUUID());

        // Create the WithUUID
        WithUUIDDTO withUUIDDTO = withUUIDMapper.toDto(withUUID);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWithUUIDMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(withUUIDDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the WithUUID in the database
        List<WithUUID> withUUIDList = withUUIDRepository.findAll();
        assertThat(withUUIDList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateWithUUIDWithPatch() throws Exception {
        // Initialize the database
        withUUIDRepository.saveAndFlush(withUUID);

        int databaseSizeBeforeUpdate = withUUIDRepository.findAll().size();

        // Update the withUUID using partial update
        WithUUID partialUpdatedWithUUID = new WithUUID();
        partialUpdatedWithUUID.setUuid(withUUID.getUuid());

        restWithUUIDMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWithUUID.getUuid())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWithUUID))
            )
            .andExpect(status().isOk());

        // Validate the WithUUID in the database
        List<WithUUID> withUUIDList = withUUIDRepository.findAll();
        assertThat(withUUIDList).hasSize(databaseSizeBeforeUpdate);
        WithUUID testWithUUID = withUUIDList.get(withUUIDList.size() - 1);
        assertThat(testWithUUID.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    void fullUpdateWithUUIDWithPatch() throws Exception {
        // Initialize the database
        withUUIDRepository.saveAndFlush(withUUID);

        int databaseSizeBeforeUpdate = withUUIDRepository.findAll().size();

        // Update the withUUID using partial update
        WithUUID partialUpdatedWithUUID = new WithUUID();
        partialUpdatedWithUUID.setUuid(withUUID.getUuid());

        partialUpdatedWithUUID.name(UPDATED_NAME);

        restWithUUIDMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWithUUID.getUuid())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWithUUID))
            )
            .andExpect(status().isOk());

        // Validate the WithUUID in the database
        List<WithUUID> withUUIDList = withUUIDRepository.findAll();
        assertThat(withUUIDList).hasSize(databaseSizeBeforeUpdate);
        WithUUID testWithUUID = withUUIDList.get(withUUIDList.size() - 1);
        assertThat(testWithUUID.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingWithUUID() throws Exception {
        int databaseSizeBeforeUpdate = withUUIDRepository.findAll().size();
        withUUID.setUuid(UUID.randomUUID());

        // Create the WithUUID
        WithUUIDDTO withUUIDDTO = withUUIDMapper.toDto(withUUID);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWithUUIDMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(withUUIDDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WithUUID in the database
        List<WithUUID> withUUIDList = withUUIDRepository.findAll();
        assertThat(withUUIDList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchWithUUID() throws Exception {
        int databaseSizeBeforeUpdate = withUUIDRepository.findAll().size();
        withUUID.setUuid(UUID.randomUUID());

        // Create the WithUUID
        WithUUIDDTO withUUIDDTO = withUUIDMapper.toDto(withUUID);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWithUUIDMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(withUUIDDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WithUUID in the database
        List<WithUUID> withUUIDList = withUUIDRepository.findAll();
        assertThat(withUUIDList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamWithUUID() throws Exception {
        int databaseSizeBeforeUpdate = withUUIDRepository.findAll().size();
        withUUID.setUuid(UUID.randomUUID());

        // Create the WithUUID
        WithUUIDDTO withUUIDDTO = withUUIDMapper.toDto(withUUID);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWithUUIDMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(withUUIDDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the WithUUID in the database
        List<WithUUID> withUUIDList = withUUIDRepository.findAll();
        assertThat(withUUIDList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteWithUUID() throws Exception {
        // Initialize the database
        withUUIDRepository.saveAndFlush(withUUID);

        int databaseSizeBeforeDelete = withUUIDRepository.findAll().size();

        // Delete the withUUID
        restWithUUIDMockMvc
            .perform(delete(ENTITY_API_URL_ID, withUUID.getUuid()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<WithUUID> withUUIDList = withUUIDRepository.findAll();
        assertThat(withUUIDList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
