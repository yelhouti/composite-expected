package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.repository.WithUUIDRepository;
import com.mycompany.myapp.service.WithUUIDQueryService;
import com.mycompany.myapp.service.WithUUIDService;
import com.mycompany.myapp.service.criteria.WithUUIDCriteria;
import com.mycompany.myapp.service.dto.WithUUIDDTO;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.StreamSupport;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.WithUUID}.
 */
@RestController
@RequestMapping("/api")
public class WithUUIDResource {
    private final Logger log = LoggerFactory.getLogger(WithUUIDResource.class);

    private static final String ENTITY_NAME = "withUUID";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WithUUIDService withUUIDService;

    private final WithUUIDRepository withUUIDRepository;

    private final WithUUIDQueryService withUUIDQueryService;

    public WithUUIDResource(
        WithUUIDService withUUIDService,
        WithUUIDRepository withUUIDRepository,
        WithUUIDQueryService withUUIDQueryService
    ) {
        this.withUUIDService = withUUIDService;
        this.withUUIDRepository = withUUIDRepository;
        this.withUUIDQueryService = withUUIDQueryService;
    }

    /**
     * {@code POST  /with-uuids} : Create a new withUUID.
     *
     * @param withUUIDDTO the withUUIDDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new withUUIDDTO, or with status {@code 400 (Bad Request)} if the withUUID has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/with-uuids")
    public ResponseEntity<WithUUIDDTO> createWithUUID(@Valid @RequestBody WithUUIDDTO withUUIDDTO) throws URISyntaxException {
        log.debug("REST request to save WithUUID : {}", withUUIDDTO);
        if (withUUIDDTO.getUuid() != null) {
            throw new BadRequestAlertException("A new withUUID cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WithUUIDDTO result = withUUIDService.save(withUUIDDTO);
        return ResponseEntity
            .created(new URI("/api/with-uuids/" + result.getUuid()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getUuid().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /with-uuids/:uuid} : Updates an existing withUUID.
     *
     * @param uuid the id of the withUUIDDTO to save.
     * @param withUUIDDTO the withUUIDDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated withUUIDDTO,
     * or with status {@code 400 (Bad Request)} if the withUUIDDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the withUUIDDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/with-uuids/{uuid}")
    public ResponseEntity<WithUUIDDTO> updateWithUUID(
        @PathVariable(value = "uuid", required = false) final UUID uuid,
        @Valid @RequestBody WithUUIDDTO withUUIDDTO
    )
        throws URISyntaxException {
        log.debug("REST request to update WithUUID : {}, {}", uuid, withUUIDDTO);
        if (withUUIDDTO.getUuid() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(uuid, withUUIDDTO.getUuid())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!withUUIDRepository.existsById(uuid)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        WithUUIDDTO result = withUUIDService.save(withUUIDDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, withUUIDDTO.getUuid().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /with-uuids} : Updates given fields of an existing withUUID.
     *
     * @param withUUIDDTO the withUUIDDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated withUUIDDTO,
     * or with status {@code 400 (Bad Request)} if the withUUIDDTO is not valid,
     * or with status {@code 404 (Not Found)} if the withUUIDDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the withUUIDDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/with-uuids", consumes = "application/merge-patch+json")
    public ResponseEntity<WithUUIDDTO> partialUpdateWithUUID(@NotNull @RequestBody WithUUIDDTO withUUIDDTO) throws URISyntaxException {
        log.debug("REST request to update WithUUID partially : {}", withUUIDDTO);
        if (withUUIDDTO.getUuid() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        Optional<WithUUIDDTO> result = withUUIDService.partialUpdate(withUUIDDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, withUUIDDTO.getUuid().toString())
        );
    }

    /**
     * {@code GET  /with-uuids} : get all the withUUIDS.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of withUUIDS in body.
     */
    @GetMapping("/with-uuids")
    public ResponseEntity<List<WithUUIDDTO>> getAllWithUUIDS(WithUUIDCriteria criteria) {
        log.debug("REST request to get WithUUIDS by criteria: {}", criteria);
        List<WithUUIDDTO> entityList = withUUIDQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /with-uuids/count} : count all the withUUIDS.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/with-uuids/count")
    public ResponseEntity<Long> countWithUUIDS(WithUUIDCriteria criteria) {
        log.debug("REST request to count WithUUIDS by criteria: {}", criteria);
        return ResponseEntity.ok().body(withUUIDQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /with-uuids/:id} : get the "id" withUUID.
     *
     * @param id the id of the withUUIDDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the withUUIDDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/with-uuids/{id}")
    public ResponseEntity<WithUUIDDTO> getWithUUID(@PathVariable UUID id) {
        log.debug("REST request to get WithUUID : {}", id);
        Optional<WithUUIDDTO> withUUIDDTO = withUUIDService.findOne(id);
        return ResponseUtil.wrapOrNotFound(withUUIDDTO);
    }

    /**
     * {@code DELETE  /with-uuids/:id} : delete the "id" withUUID.
     *
     * @param id the id of the withUUIDDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/with-uuids/{id}")
    public ResponseEntity<Void> deleteWithUUID(@PathVariable UUID id) {
        log.debug("REST request to delete WithUUID : {}", id);
        withUUIDService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
