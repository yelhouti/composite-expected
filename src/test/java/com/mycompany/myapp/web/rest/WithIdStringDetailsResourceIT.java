package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.WithIdString;
import com.mycompany.myapp.domain.WithIdStringDetails;
import com.mycompany.myapp.repository.WithIdStringDetailsRepository;
import com.mycompany.myapp.service.WithIdStringDetailsQueryService;
import com.mycompany.myapp.service.criteria.WithIdStringDetailsCriteria;
import com.mycompany.myapp.service.dto.WithIdStringDetailsDTO;
import com.mycompany.myapp.service.mapper.WithIdStringDetailsMapper;
import java.util.List;
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
 * Integration tests for the {@link WithIdStringDetailsResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class WithIdStringDetailsResourceIT {

    private static final String DEFAULT_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_DETAILS = "BBBBBBBBBB";

    @Autowired
    private WithIdStringDetailsRepository withIdStringDetailsRepository;

    @Autowired
    private WithIdStringDetailsMapper withIdStringDetailsMapper;

    @Autowired
    private WithIdStringDetailsQueryService withIdStringDetailsQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restWithIdStringDetailsMockMvc;

    private WithIdStringDetails withIdStringDetails;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WithIdStringDetails createEntity(EntityManager em) {
        WithIdStringDetails withIdStringDetails = new WithIdStringDetails().details(DEFAULT_DETAILS);
        // Add required entity
        WithIdString withIdString;
        if (TestUtil.findAll(em, WithIdString.class).isEmpty()) {
            withIdString = WithIdStringResourceIT.createEntity(em);
            em.persist(withIdString);
            em.flush();
        } else {
            withIdString = TestUtil.findAll(em, WithIdString.class).get(0);
        }
        withIdStringDetails.setWithIdString(withIdString);
        return withIdStringDetails;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WithIdStringDetails createUpdatedEntity(EntityManager em) {
        WithIdStringDetails withIdStringDetails = new WithIdStringDetails().details(UPDATED_DETAILS);
        // Add required entity
        WithIdString withIdString;
        if (TestUtil.findAll(em, WithIdString.class).isEmpty()) {
            withIdString = WithIdStringResourceIT.createUpdatedEntity(em);
            em.persist(withIdString);
            em.flush();
        } else {
            withIdString = TestUtil.findAll(em, WithIdString.class).get(0);
        }
        withIdStringDetails.setWithIdString(withIdString);
        return withIdStringDetails;
    }

    @BeforeEach
    public void initTest() {
        withIdStringDetails = createEntity(em);
    }

    @Test
    @Transactional
    void createWithIdStringDetails() throws Exception {
        int databaseSizeBeforeCreate = withIdStringDetailsRepository.findAll().size();
        // Create the WithIdStringDetails
        WithIdStringDetailsDTO withIdStringDetailsDTO = withIdStringDetailsMapper.toDto(withIdStringDetails);
        restWithIdStringDetailsMockMvc
            .perform(
                post("/api/with-id-string-details")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(withIdStringDetailsDTO))
            )
            .andExpect(status().isCreated());

        // Validate the WithIdStringDetails in the database
        List<WithIdStringDetails> withIdStringDetailsList = withIdStringDetailsRepository.findAll();
        assertThat(withIdStringDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        WithIdStringDetails testWithIdStringDetails = withIdStringDetailsList.get(withIdStringDetailsList.size() - 1);
        assertThat(testWithIdStringDetails.getDetails()).isEqualTo(DEFAULT_DETAILS);

        // Validate the id for MapsId, the ids must be same
        assertThat(testWithIdStringDetails.getId()).isEqualTo(testWithIdStringDetails.getWithIdString().getId());
    }

    @Test
    @Transactional
    void createWithIdStringDetailsWithExistingId() throws Exception {
        // Create the WithIdStringDetails with an existing ID
        withIdStringDetails.setId("existing_id");
        WithIdStringDetailsDTO withIdStringDetailsDTO = withIdStringDetailsMapper.toDto(withIdStringDetails);

        int databaseSizeBeforeCreate = withIdStringDetailsRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restWithIdStringDetailsMockMvc
            .perform(
                post("/api/with-id-string-details")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(withIdStringDetailsDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WithIdStringDetails in the database
        List<WithIdStringDetails> withIdStringDetailsList = withIdStringDetailsRepository.findAll();
        assertThat(withIdStringDetailsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void updateWithIdStringDetailsMapsIdAssociationWithNewId() throws Exception {
        // Initialize the database
        withIdStringDetailsRepository.saveAndFlush(withIdStringDetails);
        int databaseSizeBeforeCreate = withIdStringDetailsRepository.findAll().size();

        // Add a new parent entity
        WithIdString withIdString = WithIdStringResourceIT.createUpdatedEntity(em);
        em.persist(withIdString);
        em.flush();

        // Load the withIdStringDetails
        WithIdStringDetails updatedWithIdStringDetails = withIdStringDetailsRepository.findById(withIdStringDetails.getId()).get();
        assertThat(updatedWithIdStringDetails).isNotNull();
        // Disconnect from session so that the updates on updatedWithIdStringDetails are not directly saved in db
        em.detach(updatedWithIdStringDetails);

        // Update the WithIdString with new association value
        updatedWithIdStringDetails.setWithIdString(withIdString);
        WithIdStringDetailsDTO updatedWithIdStringDetailsDTO = withIdStringDetailsMapper.toDto(updatedWithIdStringDetails);
        assertThat(updatedWithIdStringDetailsDTO).isNotNull();

        // Update the entity
        restWithIdStringDetailsMockMvc
            .perform(
                put("/api/with-id-string-details")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedWithIdStringDetailsDTO))
            )
            .andExpect(status().isOk());

        // Validate the WithIdStringDetails in the database
        List<WithIdStringDetails> withIdStringDetailsList = withIdStringDetailsRepository.findAll();
        assertThat(withIdStringDetailsList).hasSize(databaseSizeBeforeCreate);
        WithIdStringDetails testWithIdStringDetails = withIdStringDetailsList.get(withIdStringDetailsList.size() - 1);
        // Validate the id for MapsId, the ids must be same
        // Uncomment the following line for assertion. However, please note that there is a known issue and uncommenting will fail the test.
        // Please look at https://github.com/jhipster/generator-jhipster/issues/9100. You can modify this test as necessary.
        // assertThat(testWithIdStringDetails.getId()).isEqualTo(testWithIdStringDetails.getWithIdString().getId());
    }

    @Test
    @Transactional
    void getAllWithIdStringDetails() throws Exception {
        // Initialize the database
        withIdStringDetailsRepository.saveAndFlush(withIdStringDetails);

        // Get all the withIdStringDetailsList
        restWithIdStringDetailsMockMvc
            .perform(get("/api/with-id-string-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(withIdStringDetails.getId())))
            .andExpect(jsonPath("$.[*].details").value(hasItem(DEFAULT_DETAILS)));
    }

    @Test
    @Transactional
    void getWithIdStringDetails() throws Exception {
        // Initialize the database
        withIdStringDetailsRepository.saveAndFlush(withIdStringDetails);

        // Get the withIdStringDetails
        restWithIdStringDetailsMockMvc
            .perform(get("/api/with-id-string-details/{id}", withIdStringDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(withIdStringDetails.getId()))
            .andExpect(jsonPath("$.details").value(DEFAULT_DETAILS));
    }

    @Test
    @Transactional
    void getWithIdStringDetailsByIdFiltering() throws Exception {
        // Initialize the database
        withIdStringDetailsRepository.saveAndFlush(withIdStringDetails);

        String id = withIdStringDetails.getId();

        defaultWithIdStringDetailsShouldBeFound("id.equals=" + id);
        defaultWithIdStringDetailsShouldNotBeFound("id.notEquals=" + id);
    }

    @Test
    @Transactional
    void getAllWithIdStringDetailsByDetailsIsEqualToSomething() throws Exception {
        // Initialize the database
        withIdStringDetailsRepository.saveAndFlush(withIdStringDetails);

        // Get all the withIdStringDetailsList where details equals to DEFAULT_DETAILS
        defaultWithIdStringDetailsShouldBeFound("details.equals=" + DEFAULT_DETAILS);

        // Get all the withIdStringDetailsList where details equals to UPDATED_DETAILS
        defaultWithIdStringDetailsShouldNotBeFound("details.equals=" + UPDATED_DETAILS);
    }

    @Test
    @Transactional
    void getAllWithIdStringDetailsByDetailsIsNotEqualToSomething() throws Exception {
        // Initialize the database
        withIdStringDetailsRepository.saveAndFlush(withIdStringDetails);

        // Get all the withIdStringDetailsList where details not equals to DEFAULT_DETAILS
        defaultWithIdStringDetailsShouldNotBeFound("details.notEquals=" + DEFAULT_DETAILS);

        // Get all the withIdStringDetailsList where details not equals to UPDATED_DETAILS
        defaultWithIdStringDetailsShouldBeFound("details.notEquals=" + UPDATED_DETAILS);
    }

    @Test
    @Transactional
    void getAllWithIdStringDetailsByDetailsIsInShouldWork() throws Exception {
        // Initialize the database
        withIdStringDetailsRepository.saveAndFlush(withIdStringDetails);

        // Get all the withIdStringDetailsList where details in DEFAULT_DETAILS or UPDATED_DETAILS
        defaultWithIdStringDetailsShouldBeFound("details.in=" + DEFAULT_DETAILS + "," + UPDATED_DETAILS);

        // Get all the withIdStringDetailsList where details equals to UPDATED_DETAILS
        defaultWithIdStringDetailsShouldNotBeFound("details.in=" + UPDATED_DETAILS);
    }

    @Test
    @Transactional
    void getAllWithIdStringDetailsByDetailsIsNullOrNotNull() throws Exception {
        // Initialize the database
        withIdStringDetailsRepository.saveAndFlush(withIdStringDetails);

        // Get all the withIdStringDetailsList where details is not null
        defaultWithIdStringDetailsShouldBeFound("details.specified=true");

        // Get all the withIdStringDetailsList where details is null
        defaultWithIdStringDetailsShouldNotBeFound("details.specified=false");
    }

    @Test
    @Transactional
    void getAllWithIdStringDetailsByDetailsContainsSomething() throws Exception {
        // Initialize the database
        withIdStringDetailsRepository.saveAndFlush(withIdStringDetails);

        // Get all the withIdStringDetailsList where details contains DEFAULT_DETAILS
        defaultWithIdStringDetailsShouldBeFound("details.contains=" + DEFAULT_DETAILS);

        // Get all the withIdStringDetailsList where details contains UPDATED_DETAILS
        defaultWithIdStringDetailsShouldNotBeFound("details.contains=" + UPDATED_DETAILS);
    }

    @Test
    @Transactional
    void getAllWithIdStringDetailsByDetailsNotContainsSomething() throws Exception {
        // Initialize the database
        withIdStringDetailsRepository.saveAndFlush(withIdStringDetails);

        // Get all the withIdStringDetailsList where details does not contain DEFAULT_DETAILS
        defaultWithIdStringDetailsShouldNotBeFound("details.doesNotContain=" + DEFAULT_DETAILS);

        // Get all the withIdStringDetailsList where details does not contain UPDATED_DETAILS
        defaultWithIdStringDetailsShouldBeFound("details.doesNotContain=" + UPDATED_DETAILS);
    }

    @Test
    @Transactional
    void getAllWithIdStringDetailsByWithIdStringIsEqualToSomething() throws Exception {
        // Get already existing entity
        WithIdString withIdString = withIdStringDetails.getWithIdString();
        withIdStringDetailsRepository.saveAndFlush(withIdStringDetails);
        String withIdStringId = withIdString.getId();

        // Get all the withIdStringDetailsList where withIdString equals to withIdStringId
        defaultWithIdStringDetailsShouldBeFound("withIdStringId.equals=" + withIdStringId);

        // Get all the withIdStringDetailsList where withIdString equals to "invalid-id"
        defaultWithIdStringDetailsShouldNotBeFound("withIdStringId.equals=" + "invalid-id");
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultWithIdStringDetailsShouldBeFound(String filter) throws Exception {
        restWithIdStringDetailsMockMvc
            .perform(get("/api/with-id-string-details?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(withIdStringDetails.getId())))
            .andExpect(jsonPath("$.[*].details").value(hasItem(DEFAULT_DETAILS)));

        // Check, that the count call also returns 1
        restWithIdStringDetailsMockMvc
            .perform(get("/api/with-id-string-details/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultWithIdStringDetailsShouldNotBeFound(String filter) throws Exception {
        restWithIdStringDetailsMockMvc
            .perform(get("/api/with-id-string-details?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restWithIdStringDetailsMockMvc
            .perform(get("/api/with-id-string-details/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingWithIdStringDetails() throws Exception {
        // Get the withIdStringDetails
        restWithIdStringDetailsMockMvc.perform(get("/api/with-id-string-details/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void updateWithIdStringDetails() throws Exception {
        // Initialize the database
        withIdStringDetailsRepository.saveAndFlush(withIdStringDetails);

        int databaseSizeBeforeUpdate = withIdStringDetailsRepository.findAll().size();

        // Update the withIdStringDetails
        WithIdStringDetails updatedWithIdStringDetails = withIdStringDetailsRepository.findById(withIdStringDetails.getId()).get();
        // Disconnect from session so that the updates on updatedWithIdStringDetails are not directly saved in db
        em.detach(updatedWithIdStringDetails);
        updatedWithIdStringDetails.details(UPDATED_DETAILS);
        WithIdStringDetailsDTO withIdStringDetailsDTO = withIdStringDetailsMapper.toDto(updatedWithIdStringDetails);

        restWithIdStringDetailsMockMvc
            .perform(
                put("/api/with-id-string-details")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(withIdStringDetailsDTO))
            )
            .andExpect(status().isOk());

        // Validate the WithIdStringDetails in the database
        List<WithIdStringDetails> withIdStringDetailsList = withIdStringDetailsRepository.findAll();
        assertThat(withIdStringDetailsList).hasSize(databaseSizeBeforeUpdate);
        WithIdStringDetails testWithIdStringDetails = withIdStringDetailsList.get(withIdStringDetailsList.size() - 1);
        assertThat(testWithIdStringDetails.getDetails()).isEqualTo(UPDATED_DETAILS);
    }

    @Test
    @Transactional
    void updateNonExistingWithIdStringDetails() throws Exception {
        int databaseSizeBeforeUpdate = withIdStringDetailsRepository.findAll().size();

        // Create the WithIdStringDetails
        WithIdStringDetailsDTO withIdStringDetailsDTO = withIdStringDetailsMapper.toDto(withIdStringDetails);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWithIdStringDetailsMockMvc
            .perform(
                put("/api/with-id-string-details")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(withIdStringDetailsDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WithIdStringDetails in the database
        List<WithIdStringDetails> withIdStringDetailsList = withIdStringDetailsRepository.findAll();
        assertThat(withIdStringDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateWithIdStringDetailsWithPatch() throws Exception {
        // Initialize the database
        withIdStringDetailsRepository.saveAndFlush(withIdStringDetails);

        int databaseSizeBeforeUpdate = withIdStringDetailsRepository.findAll().size();

        // Update the withIdStringDetails using partial update
        WithIdStringDetails partialUpdatedWithIdStringDetails = new WithIdStringDetails();
        partialUpdatedWithIdStringDetails.setId(withIdStringDetails.getId());

        restWithIdStringDetailsMockMvc
            .perform(
                patch("/api/with-id-string-details")
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWithIdStringDetails))
            )
            .andExpect(status().isOk());

        // Validate the WithIdStringDetails in the database
        List<WithIdStringDetails> withIdStringDetailsList = withIdStringDetailsRepository.findAll();
        assertThat(withIdStringDetailsList).hasSize(databaseSizeBeforeUpdate);
        WithIdStringDetails testWithIdStringDetails = withIdStringDetailsList.get(withIdStringDetailsList.size() - 1);
        assertThat(testWithIdStringDetails.getDetails()).isEqualTo(DEFAULT_DETAILS);
    }

    @Test
    @Transactional
    void fullUpdateWithIdStringDetailsWithPatch() throws Exception {
        // Initialize the database
        withIdStringDetailsRepository.saveAndFlush(withIdStringDetails);

        int databaseSizeBeforeUpdate = withIdStringDetailsRepository.findAll().size();

        // Update the withIdStringDetails using partial update
        WithIdStringDetails partialUpdatedWithIdStringDetails = new WithIdStringDetails();
        partialUpdatedWithIdStringDetails.setId(withIdStringDetails.getId());

        partialUpdatedWithIdStringDetails.details(UPDATED_DETAILS);

        restWithIdStringDetailsMockMvc
            .perform(
                patch("/api/with-id-string-details")
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWithIdStringDetails))
            )
            .andExpect(status().isOk());

        // Validate the WithIdStringDetails in the database
        List<WithIdStringDetails> withIdStringDetailsList = withIdStringDetailsRepository.findAll();
        assertThat(withIdStringDetailsList).hasSize(databaseSizeBeforeUpdate);
        WithIdStringDetails testWithIdStringDetails = withIdStringDetailsList.get(withIdStringDetailsList.size() - 1);
        assertThat(testWithIdStringDetails.getDetails()).isEqualTo(UPDATED_DETAILS);
    }

    @Test
    @Transactional
    void partialUpdateWithIdStringDetailsShouldThrown() throws Exception {
        // Update the withIdStringDetails without id should throw
        WithIdStringDetails partialUpdatedWithIdStringDetails = new WithIdStringDetails();

        restWithIdStringDetailsMockMvc
            .perform(
                patch("/api/with-id-string-details")
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWithIdStringDetails))
            )
            .andExpect(status().isBadRequest());
    }

    @Test
    @Transactional
    void deleteWithIdStringDetails() throws Exception {
        // Initialize the database
        withIdStringDetailsRepository.saveAndFlush(withIdStringDetails);

        int databaseSizeBeforeDelete = withIdStringDetailsRepository.findAll().size();

        // Delete the withIdStringDetails
        restWithIdStringDetailsMockMvc
            .perform(delete("/api/with-id-string-details/{id}", withIdStringDetails.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<WithIdStringDetails> withIdStringDetailsList = withIdStringDetailsRepository.findAll();
        assertThat(withIdStringDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
