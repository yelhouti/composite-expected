package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.WithUUID;
import com.mycompany.myapp.domain.WithUUIDDetails;
import com.mycompany.myapp.repository.WithUUIDDetailsRepository;
import com.mycompany.myapp.service.criteria.WithUUIDDetailsCriteria;
import com.mycompany.myapp.service.dto.WithUUIDDetailsDTO;
import com.mycompany.myapp.service.mapper.WithUUIDDetailsMapper;
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
 * Integration tests for the {@link WithUUIDDetailsResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class WithUUIDDetailsResourceIT {
    private static final String DEFAULT_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_DETAILS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/with-uuid-details";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{uuid}";

    @Autowired
    private WithUUIDDetailsRepository withUUIDDetailsRepository;

    @Autowired
    private WithUUIDDetailsMapper withUUIDDetailsMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restWithUUIDDetailsMockMvc;

    private WithUUIDDetails withUUIDDetails;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WithUUIDDetails createEntity(EntityManager em) {
        WithUUIDDetails withUUIDDetails = new WithUUIDDetails().details(DEFAULT_DETAILS);
        // Add required entity
        WithUUID withUUID;
        if (TestUtil.findAll(em, WithUUID.class).isEmpty()) {
            withUUID = WithUUIDResourceIT.createEntity(em);
            em.persist(withUUID);
            em.flush();
        } else {
            withUUID = TestUtil.findAll(em, WithUUID.class).get(0);
        }
        withUUIDDetails.setWithUUID(withUUID);
        return withUUIDDetails;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WithUUIDDetails createUpdatedEntity(EntityManager em) {
        WithUUIDDetails withUUIDDetails = new WithUUIDDetails().details(UPDATED_DETAILS);
        // Add required entity
        WithUUID withUUID;
        if (TestUtil.findAll(em, WithUUID.class).isEmpty()) {
            withUUID = WithUUIDResourceIT.createUpdatedEntity(em);
            em.persist(withUUID);
            em.flush();
        } else {
            withUUID = TestUtil.findAll(em, WithUUID.class).get(0);
        }
        withUUIDDetails.setWithUUID(withUUID);
        return withUUIDDetails;
    }

    @BeforeEach
    public void initTest() {
        withUUIDDetails = createEntity(em);
    }

    @Test
    @Transactional
    void createWithUUIDDetails() throws Exception {
        int databaseSizeBeforeCreate = withUUIDDetailsRepository.findAll().size();
        // Create the WithUUIDDetails
        WithUUIDDetailsDTO withUUIDDetailsDTO = withUUIDDetailsMapper.toDto(withUUIDDetails);
        restWithUUIDDetailsMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(withUUIDDetailsDTO))
            )
            .andExpect(status().isCreated());

        // Validate the WithUUIDDetails in the database
        List<WithUUIDDetails> withUUIDDetailsList = withUUIDDetailsRepository.findAll();
        assertThat(withUUIDDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        WithUUIDDetails testWithUUIDDetails = withUUIDDetailsList.get(withUUIDDetailsList.size() - 1);
        assertThat(testWithUUIDDetails.getDetails()).isEqualTo(DEFAULT_DETAILS);

        // Validate the id for MapsId, the ids must be same
        assertThat(testWithUUIDDetails.getUuid()).isEqualTo(testWithUUIDDetails.getWithUUID().getUuid());
    }

    @Test
    @Transactional
    void createWithUUIDDetailsWithExistingId() throws Exception {
        // Create the WithUUIDDetails with an existing ID
        withUUIDDetailsRepository.saveAndFlush(withUUIDDetails);
        WithUUIDDetailsDTO withUUIDDetailsDTO = withUUIDDetailsMapper.toDto(withUUIDDetails);

        int databaseSizeBeforeCreate = withUUIDDetailsRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restWithUUIDDetailsMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(withUUIDDetailsDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WithUUIDDetails in the database
        List<WithUUIDDetails> withUUIDDetailsList = withUUIDDetailsRepository.findAll();
        assertThat(withUUIDDetailsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void updateWithUUIDDetailsMapsIdAssociationWithNewId() throws Exception {
        // Initialize the database
        withUUIDDetailsRepository.saveAndFlush(withUUIDDetails);
        int databaseSizeBeforeCreate = withUUIDDetailsRepository.findAll().size();

        // Add a new parent entity
        WithUUID withUUID = WithUUIDResourceIT.createUpdatedEntity(em);
        em.persist(withUUID);
        em.flush();

        // Load the withUUIDDetails
        WithUUIDDetails updatedWithUUIDDetails = withUUIDDetailsRepository.findById(withUUIDDetails.getUuid()).get();
        assertThat(updatedWithUUIDDetails).isNotNull();
        // Disconnect from session so that the updates on updatedWithUUIDDetails are not directly saved in db
        em.detach(updatedWithUUIDDetails);

        // Update the WithUUID with new association value
        updatedWithUUIDDetails.setWithUUID(withUUID);
        WithUUIDDetailsDTO updatedWithUUIDDetailsDTO = withUUIDDetailsMapper.toDto(updatedWithUUIDDetails);
        assertThat(updatedWithUUIDDetailsDTO).isNotNull();

        // Update the entity
        restWithUUIDDetailsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedWithUUIDDetailsDTO.getUuid())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedWithUUIDDetailsDTO))
            )
            .andExpect(status().isOk());

        // Validate the WithUUIDDetails in the database
        List<WithUUIDDetails> withUUIDDetailsList = withUUIDDetailsRepository.findAll();
        assertThat(withUUIDDetailsList).hasSize(databaseSizeBeforeCreate);
        WithUUIDDetails testWithUUIDDetails = withUUIDDetailsList.get(withUUIDDetailsList.size() - 1);
        // Validate the id for MapsId, the ids must be same
        // Uncomment the following line for assertion. However, please note that there is a known issue and uncommenting will fail the test.
        // Please look at https://github.com/jhipster/generator-jhipster/issues/9100. You can modify this test as necessary.
        // assertThat(testWithUUIDDetails.getUuid()).isEqualTo(testWithUUIDDetails.getWithUUID().getUuid());
    }

    @Test
    @Transactional
    void getAllWithUUIDDetails() throws Exception {
        // Initialize the database
        withUUIDDetailsRepository.saveAndFlush(withUUIDDetails);

        // Get all the withUUIDDetailsList
        restWithUUIDDetailsMockMvc
            .perform(get(ENTITY_API_URL + "?sort=uuid,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].uuid").value(hasItem(withUUIDDetails.getUuid().toString())))
            .andExpect(jsonPath("$.[*].details").value(hasItem(DEFAULT_DETAILS)));
    }

    @Test
    @Transactional
    void getWithUUIDDetails() throws Exception {
        // Initialize the database
        withUUIDDetailsRepository.saveAndFlush(withUUIDDetails);

        // Get the withUUIDDetails
        restWithUUIDDetailsMockMvc
            .perform(get(ENTITY_API_URL_ID, withUUIDDetails.getUuid()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.uuid").value(withUUIDDetails.getUuid().toString()))
            .andExpect(jsonPath("$.details").value(DEFAULT_DETAILS));
    }

    @Test
    @Transactional
    void getWithUUIDDetailsByIdFiltering() throws Exception {
        // Initialize the database
        withUUIDDetailsRepository.saveAndFlush(withUUIDDetails);

        UUID id = withUUIDDetails.getUuid();

        defaultWithUUIDDetailsShouldBeFound("uuid.equals=" + id);
        defaultWithUUIDDetailsShouldNotBeFound("uuid.notEquals=" + id);
    }

    @Test
    @Transactional
    void getAllWithUUIDDetailsByDetailsIsEqualToSomething() throws Exception {
        // Initialize the database
        withUUIDDetailsRepository.saveAndFlush(withUUIDDetails);

        // Get all the withUUIDDetailsList where details equals to DEFAULT_DETAILS
        defaultWithUUIDDetailsShouldBeFound("details.equals=" + DEFAULT_DETAILS);

        // Get all the withUUIDDetailsList where details equals to UPDATED_DETAILS
        defaultWithUUIDDetailsShouldNotBeFound("details.equals=" + UPDATED_DETAILS);
    }

    @Test
    @Transactional
    void getAllWithUUIDDetailsByDetailsIsNotEqualToSomething() throws Exception {
        // Initialize the database
        withUUIDDetailsRepository.saveAndFlush(withUUIDDetails);

        // Get all the withUUIDDetailsList where details not equals to DEFAULT_DETAILS
        defaultWithUUIDDetailsShouldNotBeFound("details.notEquals=" + DEFAULT_DETAILS);

        // Get all the withUUIDDetailsList where details not equals to UPDATED_DETAILS
        defaultWithUUIDDetailsShouldBeFound("details.notEquals=" + UPDATED_DETAILS);
    }

    @Test
    @Transactional
    void getAllWithUUIDDetailsByDetailsIsInShouldWork() throws Exception {
        // Initialize the database
        withUUIDDetailsRepository.saveAndFlush(withUUIDDetails);

        // Get all the withUUIDDetailsList where details in DEFAULT_DETAILS or UPDATED_DETAILS
        defaultWithUUIDDetailsShouldBeFound("details.in=" + DEFAULT_DETAILS + "," + UPDATED_DETAILS);

        // Get all the withUUIDDetailsList where details equals to UPDATED_DETAILS
        defaultWithUUIDDetailsShouldNotBeFound("details.in=" + UPDATED_DETAILS);
    }

    @Test
    @Transactional
    void getAllWithUUIDDetailsByDetailsIsNullOrNotNull() throws Exception {
        // Initialize the database
        withUUIDDetailsRepository.saveAndFlush(withUUIDDetails);

        // Get all the withUUIDDetailsList where details is not null
        defaultWithUUIDDetailsShouldBeFound("details.specified=true");

        // Get all the withUUIDDetailsList where details is null
        defaultWithUUIDDetailsShouldNotBeFound("details.specified=false");
    }

    @Test
    @Transactional
    void getAllWithUUIDDetailsByDetailsContainsSomething() throws Exception {
        // Initialize the database
        withUUIDDetailsRepository.saveAndFlush(withUUIDDetails);

        // Get all the withUUIDDetailsList where details contains DEFAULT_DETAILS
        defaultWithUUIDDetailsShouldBeFound("details.contains=" + DEFAULT_DETAILS);

        // Get all the withUUIDDetailsList where details contains UPDATED_DETAILS
        defaultWithUUIDDetailsShouldNotBeFound("details.contains=" + UPDATED_DETAILS);
    }

    @Test
    @Transactional
    void getAllWithUUIDDetailsByDetailsNotContainsSomething() throws Exception {
        // Initialize the database
        withUUIDDetailsRepository.saveAndFlush(withUUIDDetails);

        // Get all the withUUIDDetailsList where details does not contain DEFAULT_DETAILS
        defaultWithUUIDDetailsShouldNotBeFound("details.doesNotContain=" + DEFAULT_DETAILS);

        // Get all the withUUIDDetailsList where details does not contain UPDATED_DETAILS
        defaultWithUUIDDetailsShouldBeFound("details.doesNotContain=" + UPDATED_DETAILS);
    }

    @Test
    @Transactional
    void getAllWithUUIDDetailsByWithUUIDIsEqualToSomething() throws Exception {
        // Get already existing entity
        WithUUID withUUID = withUUIDDetails.getWithUUID();
        withUUIDDetailsRepository.saveAndFlush(withUUIDDetails);
        UUID withUUIDId = withUUID.getUuid();

        // Get all the withUUIDDetailsList where withUUID equals to withUUIDId
        defaultWithUUIDDetailsShouldBeFound("withUUIDId.equals=" + withUUIDId);

        // Get all the withUUIDDetailsList where withUUID equals to UUID.randomUUID()
        defaultWithUUIDDetailsShouldNotBeFound("withUUIDId.equals=" + UUID.randomUUID());
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultWithUUIDDetailsShouldBeFound(String filter) throws Exception {
        restWithUUIDDetailsMockMvc
            .perform(get(ENTITY_API_URL + "?sort=uuid,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].uuid").value(hasItem(withUUIDDetails.getUuid().toString())))
            .andExpect(jsonPath("$.[*].details").value(hasItem(DEFAULT_DETAILS)));

        // Check, that the count call also returns 1
        restWithUUIDDetailsMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=uuid,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultWithUUIDDetailsShouldNotBeFound(String filter) throws Exception {
        restWithUUIDDetailsMockMvc
            .perform(get(ENTITY_API_URL + "?sort=uuid,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restWithUUIDDetailsMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=uuid,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingWithUUIDDetails() throws Exception {
        // Get the withUUIDDetails
        restWithUUIDDetailsMockMvc.perform(get(ENTITY_API_URL_ID, UUID.randomUUID().toString())).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewWithUUIDDetails() throws Exception {
        // Initialize the database
        withUUIDDetailsRepository.saveAndFlush(withUUIDDetails);

        int databaseSizeBeforeUpdate = withUUIDDetailsRepository.findAll().size();

        // Update the withUUIDDetails
        WithUUIDDetails updatedWithUUIDDetails = withUUIDDetailsRepository.findById(withUUIDDetails.getUuid()).get();
        // Disconnect from session so that the updates on updatedWithUUIDDetails are not directly saved in db
        em.detach(updatedWithUUIDDetails);
        updatedWithUUIDDetails.details(UPDATED_DETAILS);
        WithUUIDDetailsDTO withUUIDDetailsDTO = withUUIDDetailsMapper.toDto(updatedWithUUIDDetails);

        restWithUUIDDetailsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, withUUIDDetailsDTO.getUuid())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(withUUIDDetailsDTO))
            )
            .andExpect(status().isOk());

        // Validate the WithUUIDDetails in the database
        List<WithUUIDDetails> withUUIDDetailsList = withUUIDDetailsRepository.findAll();
        assertThat(withUUIDDetailsList).hasSize(databaseSizeBeforeUpdate);
        WithUUIDDetails testWithUUIDDetails = withUUIDDetailsList.get(withUUIDDetailsList.size() - 1);
        assertThat(testWithUUIDDetails.getDetails()).isEqualTo(UPDATED_DETAILS);
    }

    @Test
    @Transactional
    void putNonExistingWithUUIDDetails() throws Exception {
        int databaseSizeBeforeUpdate = withUUIDDetailsRepository.findAll().size();
        withUUIDDetails.setUuid(UUID.randomUUID());

        // Create the WithUUIDDetails
        WithUUIDDetailsDTO withUUIDDetailsDTO = withUUIDDetailsMapper.toDto(withUUIDDetails);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWithUUIDDetailsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, withUUIDDetailsDTO.getUuid())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(withUUIDDetailsDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WithUUIDDetails in the database
        List<WithUUIDDetails> withUUIDDetailsList = withUUIDDetailsRepository.findAll();
        assertThat(withUUIDDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchWithUUIDDetails() throws Exception {
        int databaseSizeBeforeUpdate = withUUIDDetailsRepository.findAll().size();
        withUUIDDetails.setUuid(UUID.randomUUID());

        // Create the WithUUIDDetails
        WithUUIDDetailsDTO withUUIDDetailsDTO = withUUIDDetailsMapper.toDto(withUUIDDetails);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWithUUIDDetailsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(withUUIDDetailsDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WithUUIDDetails in the database
        List<WithUUIDDetails> withUUIDDetailsList = withUUIDDetailsRepository.findAll();
        assertThat(withUUIDDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamWithUUIDDetails() throws Exception {
        int databaseSizeBeforeUpdate = withUUIDDetailsRepository.findAll().size();
        withUUIDDetails.setUuid(UUID.randomUUID());

        // Create the WithUUIDDetails
        WithUUIDDetailsDTO withUUIDDetailsDTO = withUUIDDetailsMapper.toDto(withUUIDDetails);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWithUUIDDetailsMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(withUUIDDetailsDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the WithUUIDDetails in the database
        List<WithUUIDDetails> withUUIDDetailsList = withUUIDDetailsRepository.findAll();
        assertThat(withUUIDDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateWithUUIDDetailsWithPatch() throws Exception {
        // Initialize the database
        withUUIDDetailsRepository.saveAndFlush(withUUIDDetails);

        int databaseSizeBeforeUpdate = withUUIDDetailsRepository.findAll().size();

        // Update the withUUIDDetails using partial update
        WithUUIDDetails partialUpdatedWithUUIDDetails = new WithUUIDDetails();
        partialUpdatedWithUUIDDetails.setUuid(withUUIDDetails.getUuid());

        partialUpdatedWithUUIDDetails.details(UPDATED_DETAILS);

        restWithUUIDDetailsMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWithUUIDDetails))
            )
            .andExpect(status().isOk());

        // Validate the WithUUIDDetails in the database
        List<WithUUIDDetails> withUUIDDetailsList = withUUIDDetailsRepository.findAll();
        assertThat(withUUIDDetailsList).hasSize(databaseSizeBeforeUpdate);
        WithUUIDDetails testWithUUIDDetails = withUUIDDetailsList.get(withUUIDDetailsList.size() - 1);
        assertThat(testWithUUIDDetails.getDetails()).isEqualTo(UPDATED_DETAILS);
    }

    @Test
    @Transactional
    void fullUpdateWithUUIDDetailsWithPatch() throws Exception {
        // Initialize the database
        withUUIDDetailsRepository.saveAndFlush(withUUIDDetails);

        int databaseSizeBeforeUpdate = withUUIDDetailsRepository.findAll().size();

        // Update the withUUIDDetails using partial update
        WithUUIDDetails partialUpdatedWithUUIDDetails = new WithUUIDDetails();
        partialUpdatedWithUUIDDetails.setUuid(withUUIDDetails.getUuid());

        partialUpdatedWithUUIDDetails.details(UPDATED_DETAILS);

        restWithUUIDDetailsMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWithUUIDDetails))
            )
            .andExpect(status().isOk());

        // Validate the WithUUIDDetails in the database
        List<WithUUIDDetails> withUUIDDetailsList = withUUIDDetailsRepository.findAll();
        assertThat(withUUIDDetailsList).hasSize(databaseSizeBeforeUpdate);
        WithUUIDDetails testWithUUIDDetails = withUUIDDetailsList.get(withUUIDDetailsList.size() - 1);
        assertThat(testWithUUIDDetails.getDetails()).isEqualTo(UPDATED_DETAILS);
    }

    @Test
    @Transactional
    void partialUpdateWithUUIDDetailsShouldThrown() throws Exception {
        // Update the withUUIDDetails without id should throw
        WithUUIDDetails partialUpdatedWithUUIDDetails = new WithUUIDDetails();

        restWithUUIDDetailsMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWithUUIDDetails))
            )
            .andExpect(status().isBadRequest());
    }

    @Test
    @Transactional
    void deleteWithUUIDDetails() throws Exception {
        // Initialize the database
        withUUIDDetailsRepository.saveAndFlush(withUUIDDetails);

        int databaseSizeBeforeDelete = withUUIDDetailsRepository.findAll().size();

        // Delete the withUUIDDetails
        restWithUUIDDetailsMockMvc
            .perform(delete(ENTITY_API_URL_ID, withUUIDDetails.getUuid().toString()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<WithUUIDDetails> withUUIDDetailsList = withUUIDDetailsRepository.findAll();
        assertThat(withUUIDDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
