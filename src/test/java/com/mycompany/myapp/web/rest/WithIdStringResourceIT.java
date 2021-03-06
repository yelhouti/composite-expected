package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.WithIdString;
import com.mycompany.myapp.domain.WithIdStringDetails;
import com.mycompany.myapp.repository.WithIdStringRepository;
import com.mycompany.myapp.service.criteria.WithIdStringCriteria;
import com.mycompany.myapp.service.dto.WithIdStringDTO;
import com.mycompany.myapp.service.mapper.WithIdStringMapper;
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
 * Integration tests for the {@link WithIdStringResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class WithIdStringResourceIT {

    private static final String DEFAULT_ID = "AAAAAAAAAA";
    private static final String UPDATED_ID = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/with-id-strings";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private WithIdStringRepository withIdStringRepository;

    @Autowired
    private WithIdStringMapper withIdStringMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restWithIdStringMockMvc;

    private WithIdString withIdString;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WithIdString createEntity(EntityManager em) {
        WithIdString withIdString = new WithIdString().id(DEFAULT_ID).name(DEFAULT_NAME);
        return withIdString;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WithIdString createUpdatedEntity(EntityManager em) {
        WithIdString withIdString = new WithIdString().id(UPDATED_ID).name(UPDATED_NAME);
        return withIdString;
    }

    @BeforeEach
    public void initTest() {
        withIdString = createEntity(em);
    }

    @Test
    @Transactional
    void createWithIdString() throws Exception {
        int databaseSizeBeforeCreate = withIdStringRepository.findAll().size();
        // Create the WithIdString
        WithIdStringDTO withIdStringDTO = withIdStringMapper.toDto(withIdString);
        restWithIdStringMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(withIdStringDTO))
            )
            .andExpect(status().isCreated());

        // Validate the WithIdString in the database
        List<WithIdString> withIdStringList = withIdStringRepository.findAll();
        assertThat(withIdStringList).hasSize(databaseSizeBeforeCreate + 1);
        WithIdString testWithIdString = withIdStringList.get(withIdStringList.size() - 1);
        assertThat(testWithIdString.getId()).isEqualTo(DEFAULT_ID);
        assertThat(testWithIdString.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    void createWithIdStringWithExistingId() throws Exception {
        // Create the WithIdString with an existing ID
        withIdStringRepository.saveAndFlush(withIdString);
        WithIdStringDTO withIdStringDTO = withIdStringMapper.toDto(withIdString);

        int databaseSizeBeforeCreate = withIdStringRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restWithIdStringMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(withIdStringDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WithIdString in the database
        List<WithIdString> withIdStringList = withIdStringRepository.findAll();
        assertThat(withIdStringList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllWithIdStrings() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        // Get all the withIdStringList
        restWithIdStringMockMvc
            .perform(get(ENTITY_API_URL))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(DEFAULT_ID)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    @Transactional
    void getWithIdString() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        // Get the withIdString
        restWithIdStringMockMvc
            .perform(get(ENTITY_API_URL_ID, withIdString.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(DEFAULT_ID))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    void getAllWithIdStringsByIdIsEqualToSomething() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        // Get all the withIdStringList where id equals to DEFAULT_ID
        defaultWithIdStringShouldBeFound("id.equals=" + DEFAULT_ID);

        // Get all the withIdStringList where id equals to UPDATED_ID
        defaultWithIdStringShouldNotBeFound("id.equals=" + UPDATED_ID);
    }

    @Test
    @Transactional
    void getAllWithIdStringsByIdIsNotEqualToSomething() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        // Get all the withIdStringList where id not equals to DEFAULT_ID
        defaultWithIdStringShouldNotBeFound("id.notEquals=" + DEFAULT_ID);

        // Get all the withIdStringList where id not equals to UPDATED_ID
        defaultWithIdStringShouldBeFound("id.notEquals=" + UPDATED_ID);
    }

    @Test
    @Transactional
    void getAllWithIdStringsByIdIsInShouldWork() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        // Get all the withIdStringList where id in DEFAULT_ID or UPDATED_ID
        defaultWithIdStringShouldBeFound("id.in=" + DEFAULT_ID + "," + UPDATED_ID);

        // Get all the withIdStringList where id equals to UPDATED_ID
        defaultWithIdStringShouldNotBeFound("id.in=" + UPDATED_ID);
    }

    @Test
    @Transactional
    void getAllWithIdStringsByIdIsNullOrNotNull() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        // Get all the withIdStringList where id is not null
        defaultWithIdStringShouldBeFound("id.specified=true");

        // Get all the withIdStringList where id is null
        defaultWithIdStringShouldNotBeFound("id.specified=false");
    }

    @Test
    @Transactional
    void getAllWithIdStringsByIdContainsSomething() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        // Get all the withIdStringList where id contains DEFAULT_ID
        defaultWithIdStringShouldBeFound("id.contains=" + DEFAULT_ID);

        // Get all the withIdStringList where id contains UPDATED_ID
        defaultWithIdStringShouldNotBeFound("id.contains=" + UPDATED_ID);
    }

    @Test
    @Transactional
    void getAllWithIdStringsByIdNotContainsSomething() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        // Get all the withIdStringList where id does not contain DEFAULT_ID
        defaultWithIdStringShouldNotBeFound("id.doesNotContain=" + DEFAULT_ID);

        // Get all the withIdStringList where id does not contain UPDATED_ID
        defaultWithIdStringShouldBeFound("id.doesNotContain=" + UPDATED_ID);
    }

    @Test
    @Transactional
    void getAllWithIdStringsByNameIsEqualToSomething() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        // Get all the withIdStringList where name equals to DEFAULT_NAME
        defaultWithIdStringShouldBeFound("name.equals=" + DEFAULT_NAME);

        // Get all the withIdStringList where name equals to UPDATED_NAME
        defaultWithIdStringShouldNotBeFound("name.equals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllWithIdStringsByNameIsNotEqualToSomething() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        // Get all the withIdStringList where name not equals to DEFAULT_NAME
        defaultWithIdStringShouldNotBeFound("name.notEquals=" + DEFAULT_NAME);

        // Get all the withIdStringList where name not equals to UPDATED_NAME
        defaultWithIdStringShouldBeFound("name.notEquals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllWithIdStringsByNameIsInShouldWork() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        // Get all the withIdStringList where name in DEFAULT_NAME or UPDATED_NAME
        defaultWithIdStringShouldBeFound("name.in=" + DEFAULT_NAME + "," + UPDATED_NAME);

        // Get all the withIdStringList where name equals to UPDATED_NAME
        defaultWithIdStringShouldNotBeFound("name.in=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllWithIdStringsByNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        // Get all the withIdStringList where name is not null
        defaultWithIdStringShouldBeFound("name.specified=true");

        // Get all the withIdStringList where name is null
        defaultWithIdStringShouldNotBeFound("name.specified=false");
    }

    @Test
    @Transactional
    void getAllWithIdStringsByNameContainsSomething() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        // Get all the withIdStringList where name contains DEFAULT_NAME
        defaultWithIdStringShouldBeFound("name.contains=" + DEFAULT_NAME);

        // Get all the withIdStringList where name contains UPDATED_NAME
        defaultWithIdStringShouldNotBeFound("name.contains=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllWithIdStringsByNameNotContainsSomething() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        // Get all the withIdStringList where name does not contain DEFAULT_NAME
        defaultWithIdStringShouldNotBeFound("name.doesNotContain=" + DEFAULT_NAME);

        // Get all the withIdStringList where name does not contain UPDATED_NAME
        defaultWithIdStringShouldBeFound("name.doesNotContain=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllWithIdStringsByWithIdStringDetailsIsEqualToSomething() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);
        WithIdStringDetails withIdStringDetails = WithIdStringDetailsResourceIT.createEntity(em);
        em.persist(withIdStringDetails);
        em.flush();
        withIdStringRepository.saveAndFlush(withIdString);

        // Get all the withIdStringList where withIdStringDetails.withIdString.id equals to withIdStringDetails.getId()
        defaultWithIdStringShouldBeFound("withIdStringDetails.withIdString.id.equals=" + withIdStringDetails.getId());

        // Get all the withIdStringList where withIdStringDetails.withIdString.id equals to "invalid-id"
        defaultWithIdStringShouldNotBeFound("withIdStringDetails.withIdString.id.equals=" + "invalid-id");
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultWithIdStringShouldBeFound(String filter) throws Exception {
        restWithIdStringMockMvc
            .perform(get(ENTITY_API_URL + "?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(DEFAULT_ID)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));

        // Check, that the count call also returns 1
        restWithIdStringMockMvc
            .perform(get(ENTITY_API_URL + "/count?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultWithIdStringShouldNotBeFound(String filter) throws Exception {
        restWithIdStringMockMvc
            .perform(get(ENTITY_API_URL + "?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restWithIdStringMockMvc
            .perform(get(ENTITY_API_URL + "/count?" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingWithIdString() throws Exception {
        // Get the withIdString
        restWithIdStringMockMvc.perform(get(ENTITY_API_URL_ID, withIdString.getId())).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewWithIdString() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        int databaseSizeBeforeUpdate = withIdStringRepository.findAll().size();

        // Update the withIdString
        WithIdString updatedWithIdString = withIdStringRepository.findById(withIdString.getId()).get();
        // Disconnect from session so that the updates on updatedWithIdString are not directly saved in db
        em.detach(updatedWithIdString);
        updatedWithIdString.name(UPDATED_NAME);
        WithIdStringDTO withIdStringDTO = withIdStringMapper.toDto(updatedWithIdString);

        restWithIdStringMockMvc
            .perform(
                put(ENTITY_API_URL_ID, withIdString.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(withIdStringDTO))
            )
            .andExpect(status().isOk());

        // Validate the WithIdString in the database
        List<WithIdString> withIdStringList = withIdStringRepository.findAll();
        assertThat(withIdStringList).hasSize(databaseSizeBeforeUpdate);
        WithIdString testWithIdString = withIdStringList.get(withIdStringList.size() - 1);
        assertThat(testWithIdString.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void putNonExistingWithIdString() throws Exception {
        int databaseSizeBeforeUpdate = withIdStringRepository.findAll().size();
        withIdString.setId(UUID.randomUUID().toString());

        // Create the WithIdString
        WithIdStringDTO withIdStringDTO = withIdStringMapper.toDto(withIdString);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWithIdStringMockMvc
            .perform(
                put(ENTITY_API_URL_ID, withIdString.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(withIdStringDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WithIdString in the database
        List<WithIdString> withIdStringList = withIdStringRepository.findAll();
        assertThat(withIdStringList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchWithIdString() throws Exception {
        int databaseSizeBeforeUpdate = withIdStringRepository.findAll().size();
        withIdString.setId(UUID.randomUUID().toString());

        // Create the WithIdString
        WithIdStringDTO withIdStringDTO = withIdStringMapper.toDto(withIdString);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWithIdStringMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(withIdStringDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WithIdString in the database
        List<WithIdString> withIdStringList = withIdStringRepository.findAll();
        assertThat(withIdStringList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamWithIdString() throws Exception {
        int databaseSizeBeforeUpdate = withIdStringRepository.findAll().size();
        withIdString.setId(UUID.randomUUID().toString());

        // Create the WithIdString
        WithIdStringDTO withIdStringDTO = withIdStringMapper.toDto(withIdString);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWithIdStringMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(withIdStringDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the WithIdString in the database
        List<WithIdString> withIdStringList = withIdStringRepository.findAll();
        assertThat(withIdStringList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateWithIdStringWithPatch() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        int databaseSizeBeforeUpdate = withIdStringRepository.findAll().size();

        // Update the withIdString using partial update
        WithIdString partialUpdatedWithIdString = new WithIdString();
        partialUpdatedWithIdString.setId(withIdString.getId());

        restWithIdStringMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWithIdString.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWithIdString))
            )
            .andExpect(status().isOk());

        // Validate the WithIdString in the database
        List<WithIdString> withIdStringList = withIdStringRepository.findAll();
        assertThat(withIdStringList).hasSize(databaseSizeBeforeUpdate);
        WithIdString testWithIdString = withIdStringList.get(withIdStringList.size() - 1);
        assertThat(testWithIdString.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    void fullUpdateWithIdStringWithPatch() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        int databaseSizeBeforeUpdate = withIdStringRepository.findAll().size();

        // Update the withIdString using partial update
        WithIdString partialUpdatedWithIdString = new WithIdString();
        partialUpdatedWithIdString.setId(withIdString.getId());

        partialUpdatedWithIdString.name(UPDATED_NAME);

        restWithIdStringMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWithIdString.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWithIdString))
            )
            .andExpect(status().isOk());

        // Validate the WithIdString in the database
        List<WithIdString> withIdStringList = withIdStringRepository.findAll();
        assertThat(withIdStringList).hasSize(databaseSizeBeforeUpdate);
        WithIdString testWithIdString = withIdStringList.get(withIdStringList.size() - 1);
        assertThat(testWithIdString.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingWithIdString() throws Exception {
        int databaseSizeBeforeUpdate = withIdStringRepository.findAll().size();
        withIdString.setId(UUID.randomUUID().toString());

        // Create the WithIdString
        WithIdStringDTO withIdStringDTO = withIdStringMapper.toDto(withIdString);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWithIdStringMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(withIdStringDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WithIdString in the database
        List<WithIdString> withIdStringList = withIdStringRepository.findAll();
        assertThat(withIdStringList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchWithIdString() throws Exception {
        int databaseSizeBeforeUpdate = withIdStringRepository.findAll().size();
        withIdString.setId(UUID.randomUUID().toString());

        // Create the WithIdString
        WithIdStringDTO withIdStringDTO = withIdStringMapper.toDto(withIdString);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWithIdStringMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(withIdStringDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WithIdString in the database
        List<WithIdString> withIdStringList = withIdStringRepository.findAll();
        assertThat(withIdStringList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamWithIdString() throws Exception {
        int databaseSizeBeforeUpdate = withIdStringRepository.findAll().size();
        withIdString.setId(UUID.randomUUID().toString());

        // Create the WithIdString
        WithIdStringDTO withIdStringDTO = withIdStringMapper.toDto(withIdString);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWithIdStringMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(withIdStringDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the WithIdString in the database
        List<WithIdString> withIdStringList = withIdStringRepository.findAll();
        assertThat(withIdStringList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteWithIdString() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        int databaseSizeBeforeDelete = withIdStringRepository.findAll().size();

        // Delete the withIdString
        restWithIdStringMockMvc
            .perform(delete(ENTITY_API_URL_ID, withIdString.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<WithIdString> withIdStringList = withIdStringRepository.findAll();
        assertThat(withIdStringList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
