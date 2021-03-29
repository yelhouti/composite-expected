package com.mycompany.myapp.web.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.domain.EmployeeSkillCertificateId;
import com.mycompany.myapp.domain.EmployeeSkillCertificateId;
import com.mycompany.myapp.repository.EmployeeSkillCertificateDetailsRepository;
import com.mycompany.myapp.service.EmployeeSkillCertificateDetailsQueryService;
import com.mycompany.myapp.service.EmployeeSkillCertificateDetailsService;
import com.mycompany.myapp.service.criteria.EmployeeSkillCertificateDetailsCriteria;
import com.mycompany.myapp.service.dto.EmployeeSkillCertificateDetailsDTO;
import com.mycompany.myapp.service.mapper.EmployeeSkillCertificateDetailsMapper;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.EmployeeSkillCertificateDetails}.
 */
@RestController
@RequestMapping("/api")
public class EmployeeSkillCertificateDetailsResource {

    private final Logger log = LoggerFactory.getLogger(EmployeeSkillCertificateDetailsResource.class);

    private static final String ENTITY_NAME = "employeeSkillCertificateDetails";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmployeeSkillCertificateDetailsService employeeSkillCertificateDetailsService;

    private final EmployeeSkillCertificateDetailsRepository employeeSkillCertificateDetailsRepository;

    private final EmployeeSkillCertificateDetailsQueryService employeeSkillCertificateDetailsQueryService;

    private final EmployeeSkillCertificateDetailsMapper employeeSkillCertificateDetailsMapper;

    public EmployeeSkillCertificateDetailsResource(
        EmployeeSkillCertificateDetailsService employeeSkillCertificateDetailsService,
        EmployeeSkillCertificateDetailsRepository employeeSkillCertificateDetailsRepository,
        EmployeeSkillCertificateDetailsQueryService employeeSkillCertificateDetailsQueryService,
        EmployeeSkillCertificateDetailsMapper employeeSkillCertificateDetailsMapper
    ) {
        this.employeeSkillCertificateDetailsService = employeeSkillCertificateDetailsService;
        this.employeeSkillCertificateDetailsRepository = employeeSkillCertificateDetailsRepository;
        this.employeeSkillCertificateDetailsQueryService = employeeSkillCertificateDetailsQueryService;
        this.employeeSkillCertificateDetailsMapper = employeeSkillCertificateDetailsMapper;
    }

    /**
     * {@code POST  /employee-skill-certificate-details} : Create a new employeeSkillCertificateDetails.
     *
     * @param employeeSkillCertificateDetailsDTO the employeeSkillCertificateDetailsDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new employeeSkillCertificateDetailsDTO, or with status {@code 400 (Bad Request)} if the employeeSkillCertificateDetails has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/employee-skill-certificate-details")
    public ResponseEntity<EmployeeSkillCertificateDetailsDTO> createEmployeeSkillCertificateDetails(
        @Valid @RequestBody EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO
    ) throws URISyntaxException {
        log.debug("REST request to save EmployeeSkillCertificateDetails : {}", employeeSkillCertificateDetailsDTO);
        EmployeeSkillCertificateId id = employeeSkillCertificateDetailsMapper.toEntity(employeeSkillCertificateDetailsDTO).getId();
        if (id == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (employeeSkillCertificateDetailsService.findOne(id).isPresent()) {
            throw new BadRequestAlertException("This employeeSkillCertificateDetails already exists", ENTITY_NAME, "idexists");
        }
        if (Objects.isNull(employeeSkillCertificateDetailsDTO.getEmployeeSkillCertificate())) {
            throw new BadRequestAlertException("Invalid association value provided", ENTITY_NAME, "null");
        }
        EmployeeSkillCertificateDetailsDTO result = employeeSkillCertificateDetailsService.save(employeeSkillCertificateDetailsDTO);
        return ResponseEntity
            .created(
                new URI(
                    "/api/employee-skill-certificate-details/" +
                    "typeId=" +
                    result.getEmployeeSkillCertificate().getType().getId() +
                    ";" +
                    "skillName=" +
                    result.getEmployeeSkillCertificate().getSkill().getName() +
                    ";" +
                    "skillEmployeeUsername=" +
                    result.getEmployeeSkillCertificate().getSkill().getEmployee().getUsername()
                )
            )
            .headers(
                HeaderUtil.createEntityCreationAlert(
                    applicationName,
                    true,
                    ENTITY_NAME,
                    "typeId=" +
                    result.getEmployeeSkillCertificate().getType().getId() +
                    ";" +
                    "skillName=" +
                    result.getEmployeeSkillCertificate().getSkill().getName() +
                    ";" +
                    "skillEmployeeUsername=" +
                    result.getEmployeeSkillCertificate().getSkill().getEmployee().getUsername()
                )
            )
            .body(result);
    }

    /**
     * {@code PUT  /employee-skill-certificate-details/:id} : Updates an existing employeeSkillCertificateDetails.
     *
     * @param idMap a Map representation of the id of the employeeSkillCertificateDetailsDTO to save.
     * @param employeeSkillCertificateDetailsDTO the employeeSkillCertificateDetailsDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated employeeSkillCertificateDetailsDTO,
     * or with status {@code 400 (Bad Request)} if the employeeSkillCertificateDetailsDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the employeeSkillCertificateDetailsDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/employee-skill-certificate-details/{id}")
    public ResponseEntity<EmployeeSkillCertificateDetailsDTO> updateEmployeeSkillCertificateDetails(
        @MatrixVariable(pathVar = "id") Map<String, String> idMap,
        @Valid @RequestBody EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO
    ) throws URISyntaxException {
        final ObjectMapper mapper = new ObjectMapper();
        final EmployeeSkillCertificateId id = mapper.convertValue(idMap, EmployeeSkillCertificateId.class);
        log.debug("REST request to update EmployeeSkillCertificateDetails : {}, {}", id, employeeSkillCertificateDetailsDTO);
        if (!Objects.equals(id, employeeSkillCertificateDetailsMapper.toEntity(employeeSkillCertificateDetailsDTO).getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }
        if (!employeeSkillCertificateDetailsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }
        EmployeeSkillCertificateDetailsDTO result = employeeSkillCertificateDetailsService.save(employeeSkillCertificateDetailsDTO);
        return ResponseEntity
            .ok()
            .headers(
                HeaderUtil.createEntityUpdateAlert(
                    applicationName,
                    true,
                    ENTITY_NAME,
                    "typeId=" +
                    employeeSkillCertificateDetailsDTO.getEmployeeSkillCertificate().getType().getId() +
                    ";" +
                    "skillName=" +
                    employeeSkillCertificateDetailsDTO.getEmployeeSkillCertificate().getSkill().getName() +
                    ";" +
                    "skillEmployeeUsername=" +
                    employeeSkillCertificateDetailsDTO.getEmployeeSkillCertificate().getSkill().getEmployee().getUsername()
                )
            )
            .body(result);
    }

    /**
     * {@code PATCH  /employee-skill-certificate-details/:id} : Partial updates given fields of an existing employeeSkillCertificateDetails, field will ignore if it is null
     *
     * @param idMap a Map representation of the id of the employeeSkillCertificateDetailsDTO to save.
     * @param employeeSkillCertificateDetailsDTO the employeeSkillCertificateDetailsDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated employeeSkillCertificateDetailsDTO,
     * or with status {@code 400 (Bad Request)} if the employeeSkillCertificateDetailsDTO is not valid,
     * or with status {@code 404 (Not Found)} if the employeeSkillCertificateDetailsDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the employeeSkillCertificateDetailsDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/employee-skill-certificate-details/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<EmployeeSkillCertificateDetailsDTO> partialUpdateEmployeeSkillCertificateDetails(
        @MatrixVariable(pathVar = "id") Map<String, String> idMap,
        @NotNull @RequestBody EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO
    ) throws URISyntaxException {
        final ObjectMapper mapper = new ObjectMapper();
        final EmployeeSkillCertificateId id = mapper.convertValue(idMap, EmployeeSkillCertificateId.class);
        log.debug(
            "REST request to partial update EmployeeSkillCertificateDetails partially : {}, {}",
            id,
            employeeSkillCertificateDetailsDTO
        );
        if (!Objects.equals(id, employeeSkillCertificateDetailsMapper.toEntity(employeeSkillCertificateDetailsDTO).getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!employeeSkillCertificateDetailsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<EmployeeSkillCertificateDetailsDTO> result = employeeSkillCertificateDetailsService.partialUpdate(
            employeeSkillCertificateDetailsDTO
        );

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(
                applicationName,
                true,
                ENTITY_NAME,
                "typeId=" +
                employeeSkillCertificateDetailsDTO.getEmployeeSkillCertificate().getType().getId() +
                ";" +
                "skillName=" +
                employeeSkillCertificateDetailsDTO.getEmployeeSkillCertificate().getSkill().getName() +
                ";" +
                "skillEmployeeUsername=" +
                employeeSkillCertificateDetailsDTO.getEmployeeSkillCertificate().getSkill().getEmployee().getUsername()
            )
        );
    }

    /**
     * {@code GET  /employee-skill-certificate-details} : get all the employeeSkillCertificateDetails.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of employeeSkillCertificateDetails in body.
     */
    @GetMapping("/employee-skill-certificate-details")
    public ResponseEntity<List<EmployeeSkillCertificateDetailsDTO>> getAllEmployeeSkillCertificateDetails(
        EmployeeSkillCertificateDetailsCriteria criteria
    ) {
        log.debug("REST request to get EmployeeSkillCertificateDetails by criteria: {}", criteria);
        List<EmployeeSkillCertificateDetailsDTO> entityList = employeeSkillCertificateDetailsQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /employee-skill-certificate-details/count} : count all the employeeSkillCertificateDetails.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/employee-skill-certificate-details/count")
    public ResponseEntity<Long> countEmployeeSkillCertificateDetails(EmployeeSkillCertificateDetailsCriteria criteria) {
        log.debug("REST request to count EmployeeSkillCertificateDetails by criteria: {}", criteria);
        return ResponseEntity.ok().body(employeeSkillCertificateDetailsQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /employee-skill-certificate-details/:id} : get the "id" employeeSkillCertificateDetails.
     *
     * @param idMap a Map representation of the id of the employeeSkillCertificateDetailsDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the employeeSkillCertificateDetailsDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/employee-skill-certificate-details/{id}")
    public ResponseEntity<EmployeeSkillCertificateDetailsDTO> getEmployeeSkillCertificateDetails(
        @MatrixVariable(pathVar = "id") Map<String, String> idMap
    ) {
        final ObjectMapper mapper = new ObjectMapper();
        final EmployeeSkillCertificateId id = mapper.convertValue(idMap, EmployeeSkillCertificateId.class);
        log.debug("REST request to get EmployeeSkillCertificateDetails : {}", id);
        Optional<EmployeeSkillCertificateDetailsDTO> employeeSkillCertificateDetailsDTO = employeeSkillCertificateDetailsService.findOne(
            id
        );
        return ResponseUtil.wrapOrNotFound(employeeSkillCertificateDetailsDTO);
    }

    /**
     * {@code DELETE  /employee-skill-certificate-details/:id} : delete the "id" employeeSkillCertificateDetails.
     *
     * @param idMap a Map representation of the id of the employeeSkillCertificateDetailsDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/employee-skill-certificate-details/{id}")
    public ResponseEntity<Void> deleteEmployeeSkillCertificateDetails(@MatrixVariable(pathVar = "id") Map<String, String> idMap) {
        final ObjectMapper mapper = new ObjectMapper();
        final EmployeeSkillCertificateId id = mapper.convertValue(idMap, EmployeeSkillCertificateId.class);
        log.debug("REST request to delete EmployeeSkillCertificateDetails : {}", id);
        employeeSkillCertificateDetailsService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
