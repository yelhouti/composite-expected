package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.repository.WithUUIDDetailsRepository;
import com.mycompany.myapp.service.WithUUIDDetailsQueryService;
import com.mycompany.myapp.service.WithUUIDDetailsService;
import com.mycompany.myapp.service.criteria.WithUUIDDetailsCriteria;
import com.mycompany.myapp.service.dto.WithUUIDDetailsDTO;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.WithUUIDDetails}.
 */
@RestController
@RequestMapping("/api")
public class WithUUIDDetailsResource {
    private final Logger log = LoggerFactory.getLogger(WithUUIDDetailsResource.class);

    private static final String ENTITY_NAME = "withUUIDDetails";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WithUUIDDetailsService withUUIDDetailsService;

    private final WithUUIDDetailsRepository withUUIDDetailsRepository;

    private final WithUUIDDetailsQueryService withUUIDDetailsQueryService;

    public WithUUIDDetailsResource(
        WithUUIDDetailsService withUUIDDetailsService,
        WithUUIDDetailsRepository withUUIDDetailsRepository,
        WithUUIDDetailsQueryService withUUIDDetailsQueryService
    ) {
        this.withUUIDDetailsService = withUUIDDetailsService;
        this.withUUIDDetailsRepository = withUUIDDetailsRepository;
        this.withUUIDDetailsQueryService = withUUIDDetailsQueryService;
    }

    /**
     * {@code POST  /with-uuid-details} : Create a new withUUIDDetails.
     *
     * @param withUUIDDetailsDTO the withUUIDDetailsDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new withUUIDDetailsDTO, or with status {@code 400 (Bad Request)} if the withUUIDDetails has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/with-uuid-details")
    public ResponseEntity<WithUUIDDetailsDTO> createWithUUIDDetails(@RequestBody WithUUIDDetailsDTO withUUIDDetailsDTO)
        throws URISyntaxException {
        log.debug("REST request to save WithUUIDDetails : {}", withUUIDDetailsDTO);
        if (withUUIDDetailsDTO.getUuid() != null) {
            throw new BadRequestAlertException("A new withUUIDDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (Objects.isNull(withUUIDDetailsDTO.getWithUUID())) {
            throw new BadRequestAlertException("Invalid association value provided", ENTITY_NAME, "null");
        }
        WithUUIDDetailsDTO result = withUUIDDetailsService.save(withUUIDDetailsDTO);
        return ResponseEntity
            .created(new URI("/api/with-uuid-details/" + result.getUuid()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getUuid().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /with-uuid-details/:uuid} : Updates an existing withUUIDDetails.
     *
     * @param uuid the id of the withUUIDDetailsDTO to save.
     * @param withUUIDDetailsDTO the withUUIDDetailsDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated withUUIDDetailsDTO,
     * or with status {@code 400 (Bad Request)} if the withUUIDDetailsDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the withUUIDDetailsDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/with-uuid-details/{uuid}")
    public ResponseEntity<WithUUIDDetailsDTO> updateWithUUIDDetails(
        @PathVariable(value = "uuid", required = false) final UUID uuid,
        @RequestBody WithUUIDDetailsDTO withUUIDDetailsDTO
    )
        throws URISyntaxException {
        log.debug("REST request to update WithUUIDDetails : {}, {}", uuid, withUUIDDetailsDTO);
        if (withUUIDDetailsDTO.getUuid() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(uuid, withUUIDDetailsDTO.getUuid())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!withUUIDDetailsRepository.existsById(uuid)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        WithUUIDDetailsDTO result = withUUIDDetailsService.save(withUUIDDetailsDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, withUUIDDetailsDTO.getUuid().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /with-uuid-details} : Updates given fields of an existing withUUIDDetails.
     *
     * @param withUUIDDetailsDTO the withUUIDDetailsDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated withUUIDDetailsDTO,
     * or with status {@code 400 (Bad Request)} if the withUUIDDetailsDTO is not valid,
     * or with status {@code 404 (Not Found)} if the withUUIDDetailsDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the withUUIDDetailsDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/with-uuid-details", consumes = "application/merge-patch+json")
    public ResponseEntity<WithUUIDDetailsDTO> partialUpdateWithUUIDDetails(@RequestBody WithUUIDDetailsDTO withUUIDDetailsDTO)
        throws URISyntaxException {
        log.debug("REST request to update WithUUIDDetails partially : {}", withUUIDDetailsDTO);
        if (withUUIDDetailsDTO.getUuid() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        Optional<WithUUIDDetailsDTO> result = withUUIDDetailsService.partialUpdate(withUUIDDetailsDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, withUUIDDetailsDTO.getUuid().toString())
        );
    }

    /**
     * {@code GET  /with-uuid-details} : get all the withUUIDDetails.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of withUUIDDetails in body.
     */
    @GetMapping("/with-uuid-details")
    public ResponseEntity<List<WithUUIDDetailsDTO>> getAllWithUUIDDetails(WithUUIDDetailsCriteria criteria) {
        log.debug("REST request to get WithUUIDDetails by criteria: {}", criteria);
        List<WithUUIDDetailsDTO> entityList = withUUIDDetailsQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /with-uuid-details/count} : count all the withUUIDDetails.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/with-uuid-details/count")
    public ResponseEntity<Long> countWithUUIDDetails(WithUUIDDetailsCriteria criteria) {
        log.debug("REST request to count WithUUIDDetails by criteria: {}", criteria);
        return ResponseEntity.ok().body(withUUIDDetailsQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /with-uuid-details/:id} : get the "id" withUUIDDetails.
     *
     * @param id the id of the withUUIDDetailsDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the withUUIDDetailsDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/with-uuid-details/{id}")
    public ResponseEntity<WithUUIDDetailsDTO> getWithUUIDDetails(@PathVariable UUID id) {
        log.debug("REST request to get WithUUIDDetails : {}", id);
        Optional<WithUUIDDetailsDTO> withUUIDDetailsDTO = withUUIDDetailsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(withUUIDDetailsDTO);
    }

    /**
     * {@code DELETE  /with-uuid-details/:id} : delete the "id" withUUIDDetails.
     *
     * @param id the id of the withUUIDDetailsDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/with-uuid-details/{id}")
    public ResponseEntity<Void> deleteWithUUIDDetails(@PathVariable UUID id) {
        log.debug("REST request to delete WithUUIDDetails : {}", id);
        withUUIDDetailsService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
