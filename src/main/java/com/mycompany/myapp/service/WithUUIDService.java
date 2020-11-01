package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.WithUUIDDTO;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.WithUUID}.
 */
public interface WithUUIDService {
    /**
     * Save a withUUID.
     *
     * @param withUUIDDTO the entity to save.
     * @return the persisted entity.
     */
    WithUUIDDTO save(WithUUIDDTO withUUIDDTO);

    /**
     * Partially updates a withUUID.
     *
     * @param withUUIDDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<WithUUIDDTO> partialUpdate(WithUUIDDTO withUUIDDTO);

    /**
     * Get all the withUUIDS.
     *
     * @return the list of entities.
     */
    List<WithUUIDDTO> findAll();
    /**
     * Get all the WithUUIDDTO where WithUUIDDetails is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<WithUUIDDTO> findAllWhereWithUUIDDetailsIsNull();

    /**
     * Get the "id" withUUID.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<WithUUIDDTO> findOne(UUID id);

    /**
     * Delete the "id" withUUID.
     *
     * @param id the id of the entity.
     */
    void delete(UUID id);
}
