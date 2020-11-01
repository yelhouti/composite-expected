package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.CompositekeyApp;
import com.mycompany.myapp.GeneratedByJHipster;
import com.mycompany.myapp.domain.WithIdString;
import com.mycompany.myapp.domain.WithIdStringDetails;
import com.mycompany.myapp.repository.WithIdStringRepository;
import com.mycompany.myapp.service.WithIdStringQueryService;
import com.mycompany.myapp.service.dto.WithIdStringCriteria;
import com.mycompany.myapp.service.dto.WithIdStringDTO;
import com.mycompany.myapp.service.mapper.WithIdStringMapper;
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
 * Integration tests for the {@link WithIdStringResource} REST controller.
 */
@SpringBootTest(classes = CompositekeyApp.class)
@AutoConfigureMockMvc
@WithMockUser
@GeneratedByJHipster
class WithIdStringResourceIT {

    @Autowired
    private WithIdStringRepository withIdStringRepository;

    @Autowired
    private WithIdStringMapper withIdStringMapper;

    @Autowired
    private WithIdStringQueryService withIdStringQueryService;

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
        WithIdString withIdString = new WithIdString();
        return withIdString;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WithIdString createUpdatedEntity(EntityManager em) {
        WithIdString withIdString = new WithIdString();
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
                post("/api/with-id-strings")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(withIdStringDTO))
            )
            .andExpect(status().isCreated());

        // Validate the WithIdString in the database
        List<WithIdString> withIdStringList = withIdStringRepository.findAll();
        assertThat(withIdStringList).hasSize(databaseSizeBeforeCreate + 1);
        WithIdString testWithIdString = withIdStringList.get(withIdStringList.size() - 1);
    }

    @Test
    @Transactional
    void createWithIdStringWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = withIdStringRepository.findAll().size();

        // Create the WithIdString with an existing ID
        withIdString.setId(1L);
        WithIdStringDTO withIdStringDTO = withIdStringMapper.toDto(withIdString);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWithIdStringMockMvc
            .perform(
                post("/api/with-id-strings")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(withIdStringDTO))
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
            .perform(get("/api/with-id-strings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(withIdString.getId().intValue())));
    }

    @Test
    @Transactional
    void getWithIdString() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        // Get the withIdString
        restWithIdStringMockMvc
            .perform(get("/api/with-id-strings/{id}", withIdString.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(withIdString.getId().intValue()));
    }

    @Test
    @Transactional
    void getWithIdStringsByIdFiltering() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        Long id = withIdString.getId();

        defaultWithIdStringShouldBeFound("id.equals=" + id);
        defaultWithIdStringShouldNotBeFound("id.notEquals=" + id);

        defaultWithIdStringShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultWithIdStringShouldNotBeFound("id.greaterThan=" + id);

        defaultWithIdStringShouldBeFound("id.lessThanOrEqual=" + id);
        defaultWithIdStringShouldNotBeFound("id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllWithIdStringsByWithIdStringDetailsIsEqualToSomething() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);
        WithIdStringDetails withIdStringDetails = WithIdStringDetailsResourceIT.createEntity(em);
        em.persist(withIdStringDetails);
        em.flush();
        withIdString.setWithIdStringDetails(withIdStringDetails);
        withIdStringDetails.setWithIdString(withIdString);
        withIdStringRepository.saveAndFlush(withIdString);
        Long withIdStringDetailsId = withIdStringDetails.getId();

        // Get all the withIdStringList where withIdStringDetails equals to withIdStringDetailsId
        defaultWithIdStringShouldBeFound("withIdStringDetailsId.equals=" + withIdStringDetailsId);

        // Get all the withIdStringList where withIdStringDetails equals to withIdStringDetailsId + 1
        defaultWithIdStringShouldNotBeFound("withIdStringDetailsId.equals=" + (withIdStringDetailsId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultWithIdStringShouldBeFound(String filter) throws Exception {
        restWithIdStringMockMvc
            .perform(get("/api/with-id-strings?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(withIdString.getId().intValue())));

        // Check, that the count call also returns 1
        restWithIdStringMockMvc
            .perform(get("/api/with-id-strings/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultWithIdStringShouldNotBeFound(String filter) throws Exception {
        restWithIdStringMockMvc
            .perform(get("/api/with-id-strings?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restWithIdStringMockMvc
            .perform(get("/api/with-id-strings/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingWithIdString() throws Exception {
        // Get the withIdString
        restWithIdStringMockMvc.perform(get("/api/with-id-strings/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void updateWithIdString() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        int databaseSizeBeforeUpdate = withIdStringRepository.findAll().size();

        // Update the withIdString
        WithIdString updatedWithIdString = withIdStringRepository.findById(withIdString.getId()).get();
        // Disconnect from session so that the updates on updatedWithIdString are not directly saved in db
        em.detach(updatedWithIdString);
        WithIdStringDTO withIdStringDTO = withIdStringMapper.toDto(updatedWithIdString);

        restWithIdStringMockMvc
            .perform(
                put("/api/with-id-strings")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(withIdStringDTO))
            )
            .andExpect(status().isOk());

        // Validate the WithIdString in the database
        List<WithIdString> withIdStringList = withIdStringRepository.findAll();
        assertThat(withIdStringList).hasSize(databaseSizeBeforeUpdate);
        WithIdString testWithIdString = withIdStringList.get(withIdStringList.size() - 1);
    }

    @Test
    @Transactional
    void updateNonExistingWithIdString() throws Exception {
        int databaseSizeBeforeUpdate = withIdStringRepository.findAll().size();

        // Create the WithIdString
        WithIdStringDTO withIdStringDTO = withIdStringMapper.toDto(withIdString);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWithIdStringMockMvc
            .perform(
                put("/api/with-id-strings")
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
    void partialUpdateWithIdStringWithPatch() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        int databaseSizeBeforeUpdate = withIdStringRepository.findAll().size();

        // Update the withIdString using partial update
        WithIdString partialUpdatedWithIdString = new WithIdString();
        partialUpdatedWithIdString.setId(withIdString.getId());

        restWithIdStringMockMvc
            .perform(
                patch("/api/with-id-strings")
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWithIdString))
            )
            .andExpect(status().isOk());

        // Validate the WithIdString in the database
        List<WithIdString> withIdStringList = withIdStringRepository.findAll();
        assertThat(withIdStringList).hasSize(databaseSizeBeforeUpdate);
        WithIdString testWithIdString = withIdStringList.get(withIdStringList.size() - 1);
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

        restWithIdStringMockMvc
            .perform(
                patch("/api/with-id-strings")
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWithIdString))
            )
            .andExpect(status().isOk());

        // Validate the WithIdString in the database
        List<WithIdString> withIdStringList = withIdStringRepository.findAll();
        assertThat(withIdStringList).hasSize(databaseSizeBeforeUpdate);
        WithIdString testWithIdString = withIdStringList.get(withIdStringList.size() - 1);
    }

    @Test
    @Transactional
    void partialUpdateWithIdStringShouldThrown() throws Exception {
        // Update the withIdString without id should throw
        WithIdString partialUpdatedWithIdString = new WithIdString();

        restWithIdStringMockMvc
            .perform(
                patch("/api/with-id-strings")
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWithIdString))
            )
            .andExpect(status().isBadRequest());
    }

    @Test
    @Transactional
    void deleteWithIdString() throws Exception {
        // Initialize the database
        withIdStringRepository.saveAndFlush(withIdString);

        int databaseSizeBeforeDelete = withIdStringRepository.findAll().size();

        // Delete the withIdString
        restWithIdStringMockMvc
            .perform(delete("/api/with-id-strings/{id}", withIdString.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<WithIdString> withIdStringList = withIdStringRepository.findAll();
        assertThat(withIdStringList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
