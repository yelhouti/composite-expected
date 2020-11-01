package com.mycompany.myapp.service;

import com.mycompany.myapp.GeneratedByJHipster;
import com.mycompany.myapp.service.dto.PriceFormulaDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.PriceFormula}.
 */
@GeneratedByJHipster
public interface PriceFormulaService {
    /**
     * Save a priceFormula.
     *
     * @param priceFormulaDTO the entity to save.
     * @return the persisted entity.
     */
    PriceFormulaDTO save(PriceFormulaDTO priceFormulaDTO);

    /**
     * Partially updates a priceFormula.
     *
     * @param priceFormulaDTO the entity to update partially.
     * @return the persisted entity.
     */
    PriceFormulaDTO partialUpdate(PriceFormulaDTO priceFormulaDTO);

    /**
     * Get all the priceFormulas.
     *
     * @return the list of entities.
     */
    List<PriceFormulaDTO> findAll();

    /**
     * Get the "id" priceFormula.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PriceFormulaDTO> findOne(Integer id);

    /**
     * Delete the "id" priceFormula.
     *
     * @param id the id of the entity.
     */
    void delete(Integer id);
}
