package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.WithUUIDDetailsDTO;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.WithUUIDDetails}.
 */
public interface WithUUIDDetailsService {
    /**
     * Save a withUUIDDetails.
     *
     * @param withUUIDDetailsDTO the entity to save.
     * @return the persisted entity.
     */
    WithUUIDDetailsDTO save(WithUUIDDetailsDTO withUUIDDetailsDTO);

    /**
     * Partially updates a withUUIDDetails.
     *
     * @param withUUIDDetailsDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<WithUUIDDetailsDTO> partialUpdate(WithUUIDDetailsDTO withUUIDDetailsDTO);

    /**
     * Get all the withUUIDDetails.
     *
     * @return the list of entities.
     */
    List<WithUUIDDetailsDTO> findAll();

    /**
     * Get the "id" withUUIDDetails.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<WithUUIDDetailsDTO> findOne(UUID id);

    /**
     * Delete the "id" withUUIDDetails.
     *
     * @param id the id of the entity.
     */
    void delete(UUID id);
}
