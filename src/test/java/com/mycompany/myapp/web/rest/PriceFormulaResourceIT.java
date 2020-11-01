package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.CompositekeyApp;
import com.mycompany.myapp.GeneratedByJHipster;
import com.mycompany.myapp.domain.PriceFormula;
import com.mycompany.myapp.repository.PriceFormulaRepository;
import com.mycompany.myapp.service.PriceFormulaQueryService;
import com.mycompany.myapp.service.dto.PriceFormulaCriteria;
import com.mycompany.myapp.service.dto.PriceFormulaDTO;
import com.mycompany.myapp.service.mapper.PriceFormulaMapper;
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
 * Integration tests for the {@link PriceFormulaResource} REST controller.
 */
@SpringBootTest(classes = CompositekeyApp.class)
@AutoConfigureMockMvc
@WithMockUser
@GeneratedByJHipster
class PriceFormulaResourceIT {

    private static final String DEFAULT_FORMULA = "AAAAAAAAAA";
    private static final String UPDATED_FORMULA = "BBBBBBBBBB";

    @Autowired
    private PriceFormulaRepository priceFormulaRepository;

    @Autowired
    private PriceFormulaMapper priceFormulaMapper;

    @Autowired
    private PriceFormulaQueryService priceFormulaQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPriceFormulaMockMvc;

    private PriceFormula priceFormula;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PriceFormula createEntity(EntityManager em) {
        PriceFormula priceFormula = new PriceFormula().formula(DEFAULT_FORMULA);
        return priceFormula;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PriceFormula createUpdatedEntity(EntityManager em) {
        PriceFormula priceFormula = new PriceFormula().formula(UPDATED_FORMULA);
        return priceFormula;
    }

    @BeforeEach
    public void initTest() {
        priceFormula = createEntity(em);
    }

    @Test
    @Transactional
    void createPriceFormula() throws Exception {
        int databaseSizeBeforeCreate = priceFormulaRepository.findAll().size();
        // Create the PriceFormula
        PriceFormulaDTO priceFormulaDTO = priceFormulaMapper.toDto(priceFormula);
        restPriceFormulaMockMvc
            .perform(
                post("/api/price-formulas")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(priceFormulaDTO))
            )
            .andExpect(status().isCreated());

        // Validate the PriceFormula in the database
        List<PriceFormula> priceFormulaList = priceFormulaRepository.findAll();
        assertThat(priceFormulaList).hasSize(databaseSizeBeforeCreate + 1);
        PriceFormula testPriceFormula = priceFormulaList.get(priceFormulaList.size() - 1);
        assertThat(testPriceFormula.getFormula()).isEqualTo(DEFAULT_FORMULA);
    }

    @Test
    @Transactional
    void createPriceFormulaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = priceFormulaRepository.findAll().size();

        // Create the PriceFormula with an existing ID
        priceFormula.setId(1L);
        PriceFormulaDTO priceFormulaDTO = priceFormulaMapper.toDto(priceFormula);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPriceFormulaMockMvc
            .perform(
                post("/api/price-formulas")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(priceFormulaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PriceFormula in the database
        List<PriceFormula> priceFormulaList = priceFormulaRepository.findAll();
        assertThat(priceFormulaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkFormulaIsRequired() throws Exception {
        int databaseSizeBeforeTest = priceFormulaRepository.findAll().size();
        // set the field null
        priceFormula.setFormula(null);

        // Create the PriceFormula, which fails.
        PriceFormulaDTO priceFormulaDTO = priceFormulaMapper.toDto(priceFormula);

        restPriceFormulaMockMvc
            .perform(
                post("/api/price-formulas")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(priceFormulaDTO))
            )
            .andExpect(status().isBadRequest());

        List<PriceFormula> priceFormulaList = priceFormulaRepository.findAll();
        assertThat(priceFormulaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPriceFormulas() throws Exception {
        // Initialize the database
        priceFormulaRepository.saveAndFlush(priceFormula);

        // Get all the priceFormulaList
        restPriceFormulaMockMvc
            .perform(get("/api/price-formulas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(priceFormula.getId())))
            .andExpect(jsonPath("$.[*].formula").value(hasItem(DEFAULT_FORMULA)));
    }

    @Test
    @Transactional
    void getPriceFormula() throws Exception {
        // Initialize the database
        priceFormulaRepository.saveAndFlush(priceFormula);

        // Get the priceFormula
        restPriceFormulaMockMvc
            .perform(get("/api/price-formulas/{id}", priceFormula.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(priceFormula.getId()))
            .andExpect(jsonPath("$.formula").value(DEFAULT_FORMULA));
    }

    @Test
    @Transactional
    void getPriceFormulasByIdFiltering() throws Exception {
        // Initialize the database
        priceFormulaRepository.saveAndFlush(priceFormula);

        Long id = priceFormula.getId();

        defaultPriceFormulaShouldBeFound("id.equals=" + id);
        defaultPriceFormulaShouldNotBeFound("id.notEquals=" + id);

        defaultPriceFormulaShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultPriceFormulaShouldNotBeFound("id.greaterThan=" + id);

        defaultPriceFormulaShouldBeFound("id.lessThanOrEqual=" + id);
        defaultPriceFormulaShouldNotBeFound("id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllPriceFormulasByFormulaIsEqualToSomething() throws Exception {
        // Initialize the database
        priceFormulaRepository.saveAndFlush(priceFormula);

        // Get all the priceFormulaList where formula equals to DEFAULT_FORMULA
        defaultPriceFormulaShouldBeFound("formula.equals=" + DEFAULT_FORMULA);

        // Get all the priceFormulaList where formula equals to UPDATED_FORMULA
        defaultPriceFormulaShouldNotBeFound("formula.equals=" + UPDATED_FORMULA);
    }

    @Test
    @Transactional
    void getAllPriceFormulasByFormulaIsNotEqualToSomething() throws Exception {
        // Initialize the database
        priceFormulaRepository.saveAndFlush(priceFormula);

        // Get all the priceFormulaList where formula not equals to DEFAULT_FORMULA
        defaultPriceFormulaShouldNotBeFound("formula.notEquals=" + DEFAULT_FORMULA);

        // Get all the priceFormulaList where formula not equals to UPDATED_FORMULA
        defaultPriceFormulaShouldBeFound("formula.notEquals=" + UPDATED_FORMULA);
    }

    @Test
    @Transactional
    void getAllPriceFormulasByFormulaIsInShouldWork() throws Exception {
        // Initialize the database
        priceFormulaRepository.saveAndFlush(priceFormula);

        // Get all the priceFormulaList where formula in DEFAULT_FORMULA or UPDATED_FORMULA
        defaultPriceFormulaShouldBeFound("formula.in=" + DEFAULT_FORMULA + "," + UPDATED_FORMULA);

        // Get all the priceFormulaList where formula equals to UPDATED_FORMULA
        defaultPriceFormulaShouldNotBeFound("formula.in=" + UPDATED_FORMULA);
    }

    @Test
    @Transactional
    void getAllPriceFormulasByFormulaIsNullOrNotNull() throws Exception {
        // Initialize the database
        priceFormulaRepository.saveAndFlush(priceFormula);

        // Get all the priceFormulaList where formula is not null
        defaultPriceFormulaShouldBeFound("formula.specified=true");

        // Get all the priceFormulaList where formula is null
        defaultPriceFormulaShouldNotBeFound("formula.specified=false");
    }

    @Test
    @Transactional
    void getAllPriceFormulasByFormulaContainsSomething() throws Exception {
        // Initialize the database
        priceFormulaRepository.saveAndFlush(priceFormula);

        // Get all the priceFormulaList where formula contains DEFAULT_FORMULA
        defaultPriceFormulaShouldBeFound("formula.contains=" + DEFAULT_FORMULA);

        // Get all the priceFormulaList where formula contains UPDATED_FORMULA
        defaultPriceFormulaShouldNotBeFound("formula.contains=" + UPDATED_FORMULA);
    }

    @Test
    @Transactional
    void getAllPriceFormulasByFormulaNotContainsSomething() throws Exception {
        // Initialize the database
        priceFormulaRepository.saveAndFlush(priceFormula);

        // Get all the priceFormulaList where formula does not contain DEFAULT_FORMULA
        defaultPriceFormulaShouldNotBeFound("formula.doesNotContain=" + DEFAULT_FORMULA);

        // Get all the priceFormulaList where formula does not contain UPDATED_FORMULA
        defaultPriceFormulaShouldBeFound("formula.doesNotContain=" + UPDATED_FORMULA);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultPriceFormulaShouldBeFound(String filter) throws Exception {
        restPriceFormulaMockMvc
            .perform(get("/api/price-formulas?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(priceFormula.getId().intValue())))
            .andExpect(jsonPath("$.[*].formula").value(hasItem(DEFAULT_FORMULA)));

        // Check, that the count call also returns 1
        restPriceFormulaMockMvc
            .perform(get("/api/price-formulas/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultPriceFormulaShouldNotBeFound(String filter) throws Exception {
        restPriceFormulaMockMvc
            .perform(get("/api/price-formulas?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restPriceFormulaMockMvc
            .perform(get("/api/price-formulas/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingPriceFormula() throws Exception {
        // Get the priceFormula
        restPriceFormulaMockMvc.perform(get("/api/price-formulas/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void updatePriceFormula() throws Exception {
        // Initialize the database
        priceFormulaRepository.saveAndFlush(priceFormula);

        int databaseSizeBeforeUpdate = priceFormulaRepository.findAll().size();

        // Update the priceFormula
        PriceFormula updatedPriceFormula = priceFormulaRepository.findById(priceFormula.getId()).get();
        // Disconnect from session so that the updates on updatedPriceFormula are not directly saved in db
        em.detach(updatedPriceFormula);
        updatedPriceFormula.formula(UPDATED_FORMULA);
        PriceFormulaDTO priceFormulaDTO = priceFormulaMapper.toDto(updatedPriceFormula);

        restPriceFormulaMockMvc
            .perform(
                put("/api/price-formulas")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(priceFormulaDTO))
            )
            .andExpect(status().isOk());

        // Validate the PriceFormula in the database
        List<PriceFormula> priceFormulaList = priceFormulaRepository.findAll();
        assertThat(priceFormulaList).hasSize(databaseSizeBeforeUpdate);
        PriceFormula testPriceFormula = priceFormulaList.get(priceFormulaList.size() - 1);
        assertThat(testPriceFormula.getFormula()).isEqualTo(UPDATED_FORMULA);
    }

    @Test
    @Transactional
    void updateNonExistingPriceFormula() throws Exception {
        int databaseSizeBeforeUpdate = priceFormulaRepository.findAll().size();

        // Create the PriceFormula
        PriceFormulaDTO priceFormulaDTO = priceFormulaMapper.toDto(priceFormula);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPriceFormulaMockMvc
            .perform(
                put("/api/price-formulas")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(priceFormulaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PriceFormula in the database
        List<PriceFormula> priceFormulaList = priceFormulaRepository.findAll();
        assertThat(priceFormulaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePriceFormulaWithPatch() throws Exception {
        // Initialize the database
        priceFormulaRepository.saveAndFlush(priceFormula);

        int databaseSizeBeforeUpdate = priceFormulaRepository.findAll().size();

        // Update the priceFormula using partial update
        PriceFormula partialUpdatedPriceFormula = new PriceFormula();
        partialUpdatedPriceFormula.setId(priceFormula.getId());

        restPriceFormulaMockMvc
            .perform(
                patch("/api/price-formulas")
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPriceFormula))
            )
            .andExpect(status().isOk());

        // Validate the PriceFormula in the database
        List<PriceFormula> priceFormulaList = priceFormulaRepository.findAll();
        assertThat(priceFormulaList).hasSize(databaseSizeBeforeUpdate);
        PriceFormula testPriceFormula = priceFormulaList.get(priceFormulaList.size() - 1);
        assertThat(testPriceFormula.getFormula()).isEqualTo(DEFAULT_FORMULA);
    }

    @Test
    @Transactional
    void fullUpdatePriceFormulaWithPatch() throws Exception {
        // Initialize the database
        priceFormulaRepository.saveAndFlush(priceFormula);

        int databaseSizeBeforeUpdate = priceFormulaRepository.findAll().size();

        // Update the priceFormula using partial update
        PriceFormula partialUpdatedPriceFormula = new PriceFormula();
        partialUpdatedPriceFormula.setId(priceFormula.getId());

        partialUpdatedPriceFormula.formula(UPDATED_FORMULA);

        restPriceFormulaMockMvc
            .perform(
                patch("/api/price-formulas")
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPriceFormula))
            )
            .andExpect(status().isOk());

        // Validate the PriceFormula in the database
        List<PriceFormula> priceFormulaList = priceFormulaRepository.findAll();
        assertThat(priceFormulaList).hasSize(databaseSizeBeforeUpdate);
        PriceFormula testPriceFormula = priceFormulaList.get(priceFormulaList.size() - 1);
        assertThat(testPriceFormula.getFormula()).isEqualTo(UPDATED_FORMULA);
    }

    @Test
    @Transactional
    void partialUpdatePriceFormulaShouldThrown() throws Exception {
        // Update the priceFormula without id should throw
        PriceFormula partialUpdatedPriceFormula = new PriceFormula();

        restPriceFormulaMockMvc
            .perform(
                patch("/api/price-formulas")
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPriceFormula))
            )
            .andExpect(status().isBadRequest());
    }

    @Test
    @Transactional
    void deletePriceFormula() throws Exception {
        // Initialize the database
        priceFormulaRepository.saveAndFlush(priceFormula);

        int databaseSizeBeforeDelete = priceFormulaRepository.findAll().size();

        // Delete the priceFormula
        restPriceFormulaMockMvc
            .perform(delete("/api/price-formulas/{id}", priceFormula.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PriceFormula> priceFormulaList = priceFormulaRepository.findAll();
        assertThat(priceFormulaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
