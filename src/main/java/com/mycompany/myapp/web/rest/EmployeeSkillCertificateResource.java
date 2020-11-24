package com.mycompany.myapp.web.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.domain.EmployeeSkillCertificateId;
import com.mycompany.myapp.service.EmployeeSkillCertificateQueryService;
import com.mycompany.myapp.service.EmployeeSkillCertificateService;
import com.mycompany.myapp.service.dto.EmployeeSkillCertificateCriteria;
import com.mycompany.myapp.service.dto.EmployeeSkillCertificateDTO;
import com.mycompany.myapp.service.mapper.EmployeeSkillCertificateMapper;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.EmployeeSkillCertificate}.
 */
@RestController
@RequestMapping("/api")
public class EmployeeSkillCertificateResource {

    private final Logger log = LoggerFactory.getLogger(EmployeeSkillCertificateResource.class);

    private static final String ENTITY_NAME = "employeeSkillCertificate";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmployeeSkillCertificateService employeeSkillCertificateService;

    private final EmployeeSkillCertificateQueryService employeeSkillCertificateQueryService;

    private final EmployeeSkillCertificateMapper employeeSkillCertificateMapper;

    public EmployeeSkillCertificateResource(
        EmployeeSkillCertificateService employeeSkillCertificateService,
        EmployeeSkillCertificateQueryService employeeSkillCertificateQueryService,
        EmployeeSkillCertificateMapper employeeSkillCertificateMapper
    ) {
        this.employeeSkillCertificateService = employeeSkillCertificateService;
        this.employeeSkillCertificateQueryService = employeeSkillCertificateQueryService;
        this.employeeSkillCertificateMapper = employeeSkillCertificateMapper;
    }

    /**
     * {@code POST  /employee-skill-certificates} : Create a new employeeSkillCertificate.
     *
     * @param employeeSkillCertificateDTO the employeeSkillCertificateDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new employeeSkillCertificateDTO, or with status {@code 400 (Bad Request)} if the employeeSkillCertificate has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/employee-skill-certificates")
    public ResponseEntity<EmployeeSkillCertificateDTO> createEmployeeSkillCertificate(
        @Valid @RequestBody EmployeeSkillCertificateDTO employeeSkillCertificateDTO
    )
        throws URISyntaxException {
        log.debug("REST request to save EmployeeSkillCertificate : {}", employeeSkillCertificateDTO);
        EmployeeSkillCertificateId employeeSkillCertificateId = employeeSkillCertificateMapper
            .toEntity(employeeSkillCertificateDTO)
            .getId();
        if (employeeSkillCertificateId == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (employeeSkillCertificateService.findOne(employeeSkillCertificateId).isPresent()) {
            throw new BadRequestAlertException("This employeeSkillCertificate already exists", ENTITY_NAME, "idexists");
        }
        EmployeeSkillCertificateDTO result = employeeSkillCertificateService.save(employeeSkillCertificateDTO);
        return ResponseEntity
            .created(
                new URI(
                    "/api/employee-skill-certificates/" +
                    "typeId=" +
                    result.getType().getId() +
                    ";" +
                    "skillName=" +
                    result.getSkill().getName() +
                    ";" +
                    "skillEmployeeUsername=" +
                    result.getSkill().getEmployee().getUsername()
                )
            )
            .headers(
                HeaderUtil.createEntityCreationAlert(
                    applicationName,
                    true,
                    ENTITY_NAME,
                    "typeId=" +
                    result.getType().getId() +
                    ";" +
                    "skillName=" +
                    result.getSkill().getName() +
                    ";" +
                    "skillEmployeeUsername=" +
                    result.getSkill().getEmployee().getUsername()
                )
            )
            .body(result);
    }

    /**
     * {@code PUT  /employee-skill-certificates} : Updates an existing employeeSkillCertificate.
     *
     * @param employeeSkillCertificateDTO the employeeSkillCertificateDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated employeeSkillCertificateDTO,
     * or with status {@code 400 (Bad Request)} if the employeeSkillCertificateDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the employeeSkillCertificateDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/employee-skill-certificates")
    public ResponseEntity<EmployeeSkillCertificateDTO> updateEmployeeSkillCertificate(
        @Valid @RequestBody EmployeeSkillCertificateDTO employeeSkillCertificateDTO
    )
        throws URISyntaxException {
        log.debug("REST request to update EmployeeSkillCertificate : {}", employeeSkillCertificateDTO);
        EmployeeSkillCertificateId employeeSkillCertificateId = employeeSkillCertificateMapper
            .toEntity(employeeSkillCertificateDTO)
            .getId();
        if (employeeSkillCertificateId == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!employeeSkillCertificateService.findOne(employeeSkillCertificateId).isPresent()) {
            throw new BadRequestAlertException("This employeeSkillCertificate doesn't exist", ENTITY_NAME, "idexists");
        }
        EmployeeSkillCertificateDTO result = employeeSkillCertificateService.save(employeeSkillCertificateDTO);
        return ResponseEntity
            .ok()
            .headers(
                HeaderUtil.createEntityUpdateAlert(
                    applicationName,
                    true,
                    ENTITY_NAME,
                    "typeId=" +
                    employeeSkillCertificateDTO.getType().getId() +
                    ";" +
                    "skillName=" +
                    employeeSkillCertificateDTO.getSkill().getName() +
                    ";" +
                    "skillEmployeeUsername=" +
                    employeeSkillCertificateDTO.getSkill().getEmployee().getUsername()
                )
            )
            .body(result);
    }

    /**
     * {@code PATCH  /employee-skill-certificates} : Updates given fields of an existing employeeSkillCertificate.
     *
     * @param employeeSkillCertificateDTO the employeeSkillCertificateDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated employeeSkillCertificateDTO,
     * or with status {@code 400 (Bad Request)} if the employeeSkillCertificateDTO is not valid,
     * or with status {@code 404 (Not Found)} if the employeeSkillCertificateDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the employeeSkillCertificateDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/employee-skill-certificates", consumes = "application/merge-patch+json")
    public ResponseEntity<EmployeeSkillCertificateDTO> partialUpdateEmployeeSkillCertificate(
        @NotNull @RequestBody EmployeeSkillCertificateDTO employeeSkillCertificateDTO
    )
        throws URISyntaxException {
        log.debug("REST request to update EmployeeSkillCertificate partially : {}", employeeSkillCertificateDTO);
        EmployeeSkillCertificateId employeeSkillCertificateId = employeeSkillCertificateMapper
            .toEntity(employeeSkillCertificateDTO)
            .getId();
        if (employeeSkillCertificateId == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!employeeSkillCertificateService.findOne(employeeSkillCertificateId).isPresent()) {
            throw new BadRequestAlertException("This employeeSkillCertificate doesn't exist", ENTITY_NAME, "idexists");
        }

        Optional<EmployeeSkillCertificateDTO> result = Optional.ofNullable(
            employeeSkillCertificateService.partialUpdate(employeeSkillCertificateDTO)
        );

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(
                applicationName,
                true,
                ENTITY_NAME,
                "typeId=" +
                employeeSkillCertificateDTO.getType().getId() +
                ";" +
                "skillName=" +
                employeeSkillCertificateDTO.getSkill().getName() +
                ";" +
                "skillEmployeeUsername=" +
                employeeSkillCertificateDTO.getSkill().getEmployee().getUsername()
            )
        );
    }

    /**
     * {@code GET  /employee-skill-certificates} : get all the employeeSkillCertificates.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of employeeSkillCertificates in body.
     */
    @GetMapping("/employee-skill-certificates")
    public ResponseEntity<List<EmployeeSkillCertificateDTO>> getAllEmployeeSkillCertificates(
        EmployeeSkillCertificateCriteria criteria,
        Pageable pageable
    ) {
        log.debug("REST request to get EmployeeSkillCertificates by criteria: {}", criteria);
        Page<EmployeeSkillCertificateDTO> page = employeeSkillCertificateQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /employee-skill-certificates/count} : count all the employeeSkillCertificates.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/employee-skill-certificates/count")
    public ResponseEntity<Long> countEmployeeSkillCertificates(EmployeeSkillCertificateCriteria criteria) {
        log.debug("REST request to count EmployeeSkillCertificates by criteria: {}", criteria);
        return ResponseEntity.ok().body(employeeSkillCertificateQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /employee-skill-certificates/:id} : get the "id" employeeSkillCertificate.
     *
     * @param idMap a Map representation of the id of the employeeSkillCertificateDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the employeeSkillCertificateDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/employee-skill-certificates/{id}")
    public ResponseEntity<EmployeeSkillCertificateDTO> getEmployeeSkillCertificate(
        @MatrixVariable(pathVar = "id") Map<String, String> idMap
    ) {
        final ObjectMapper mapper = new ObjectMapper();
        final EmployeeSkillCertificateId id = mapper.convertValue(idMap, EmployeeSkillCertificateId.class);
        log.debug("REST request to get EmployeeSkillCertificate : {}", id);
        Optional<EmployeeSkillCertificateDTO> employeeSkillCertificateDTO = employeeSkillCertificateService.findOne(id);
        return ResponseUtil.wrapOrNotFound(employeeSkillCertificateDTO);
    }

    /**
     * {@code DELETE  /employee-skill-certificates/:id} : delete the "id" employeeSkillCertificate.
     *
     * @param idMap a Map representation of the id of the employeeSkillCertificateDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/employee-skill-certificates/{id}")
    public ResponseEntity<Void> deleteEmployeeSkillCertificate(@MatrixVariable(pathVar = "id") Map<String, String> idMap) {
        final ObjectMapper mapper = new ObjectMapper();
        final EmployeeSkillCertificateId id = mapper.convertValue(idMap, EmployeeSkillCertificateId.class);
        log.debug("REST request to delete EmployeeSkillCertificate : {}", id);
        employeeSkillCertificateService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
