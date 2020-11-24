package com.mycompany.myapp.web.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.domain.EmployeeSkillId;
import com.mycompany.myapp.service.EmployeeSkillQueryService;
import com.mycompany.myapp.service.EmployeeSkillService;
import com.mycompany.myapp.service.dto.EmployeeSkillCriteria;
import com.mycompany.myapp.service.dto.EmployeeSkillDTO;
import com.mycompany.myapp.service.mapper.EmployeeSkillMapper;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.EmployeeSkill}.
 */
@RestController
@RequestMapping("/api")
public class EmployeeSkillResource {

    private final Logger log = LoggerFactory.getLogger(EmployeeSkillResource.class);

    private static final String ENTITY_NAME = "employeeSkill";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmployeeSkillService employeeSkillService;

    private final EmployeeSkillQueryService employeeSkillQueryService;

    private final EmployeeSkillMapper employeeSkillMapper;

    public EmployeeSkillResource(
        EmployeeSkillService employeeSkillService,
        EmployeeSkillQueryService employeeSkillQueryService,
        EmployeeSkillMapper employeeSkillMapper
    ) {
        this.employeeSkillService = employeeSkillService;
        this.employeeSkillQueryService = employeeSkillQueryService;
        this.employeeSkillMapper = employeeSkillMapper;
    }

    /**
     * {@code POST  /employee-skills} : Create a new employeeSkill.
     *
     * @param employeeSkillDTO the employeeSkillDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new employeeSkillDTO, or with status {@code 400 (Bad Request)} if the employeeSkill has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/employee-skills")
    public ResponseEntity<EmployeeSkillDTO> createEmployeeSkill(@Valid @RequestBody EmployeeSkillDTO employeeSkillDTO)
        throws URISyntaxException {
        log.debug("REST request to save EmployeeSkill : {}", employeeSkillDTO);
        EmployeeSkillId employeeSkillId = employeeSkillMapper.toEntity(employeeSkillDTO).getId();
        if (employeeSkillId == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (employeeSkillService.findOne(employeeSkillId).isPresent()) {
            throw new BadRequestAlertException("This employeeSkill already exists", ENTITY_NAME, "idexists");
        }
        EmployeeSkillDTO result = employeeSkillService.save(employeeSkillDTO);
        return ResponseEntity
            .created(
                new URI(
                    "/api/employee-skills/" + "name=" + result.getName() + ";" + "employeeUsername=" + result.getEmployee().getUsername()
                )
            )
            .headers(
                HeaderUtil.createEntityCreationAlert(
                    applicationName,
                    true,
                    ENTITY_NAME,
                    "name=" + result.getName() + ";" + "employeeUsername=" + result.getEmployee().getUsername()
                )
            )
            .body(result);
    }

    /**
     * {@code PUT  /employee-skills} : Updates an existing employeeSkill.
     *
     * @param employeeSkillDTO the employeeSkillDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated employeeSkillDTO,
     * or with status {@code 400 (Bad Request)} if the employeeSkillDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the employeeSkillDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/employee-skills")
    public ResponseEntity<EmployeeSkillDTO> updateEmployeeSkill(@Valid @RequestBody EmployeeSkillDTO employeeSkillDTO)
        throws URISyntaxException {
        log.debug("REST request to update EmployeeSkill : {}", employeeSkillDTO);
        EmployeeSkillId employeeSkillId = employeeSkillMapper.toEntity(employeeSkillDTO).getId();
        if (employeeSkillId == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!employeeSkillService.findOne(employeeSkillId).isPresent()) {
            throw new BadRequestAlertException("This employeeSkill doesn't exist", ENTITY_NAME, "idexists");
        }
        EmployeeSkillDTO result = employeeSkillService.save(employeeSkillDTO);
        return ResponseEntity
            .ok()
            .headers(
                HeaderUtil.createEntityUpdateAlert(
                    applicationName,
                    true,
                    ENTITY_NAME,
                    "name=" + employeeSkillDTO.getName() + ";" + "employeeUsername=" + employeeSkillDTO.getEmployee().getUsername()
                )
            )
            .body(result);
    }

    /**
     * {@code PATCH  /employee-skills} : Updates given fields of an existing employeeSkill.
     *
     * @param employeeSkillDTO the employeeSkillDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated employeeSkillDTO,
     * or with status {@code 400 (Bad Request)} if the employeeSkillDTO is not valid,
     * or with status {@code 404 (Not Found)} if the employeeSkillDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the employeeSkillDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/employee-skills", consumes = "application/merge-patch+json")
    public ResponseEntity<EmployeeSkillDTO> partialUpdateEmployeeSkill(@NotNull @RequestBody EmployeeSkillDTO employeeSkillDTO)
        throws URISyntaxException {
        log.debug("REST request to update EmployeeSkill partially : {}", employeeSkillDTO);
        EmployeeSkillId employeeSkillId = employeeSkillMapper.toEntity(employeeSkillDTO).getId();
        if (employeeSkillId == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!employeeSkillService.findOne(employeeSkillId).isPresent()) {
            throw new BadRequestAlertException("This employeeSkill doesn't exist", ENTITY_NAME, "idexists");
        }

        Optional<EmployeeSkillDTO> result = Optional.ofNullable(employeeSkillService.partialUpdate(employeeSkillDTO));

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(
                applicationName,
                true,
                ENTITY_NAME,
                "name=" + employeeSkillDTO.getName() + ";" + "employeeUsername=" + employeeSkillDTO.getEmployee().getUsername()
            )
        );
    }

    /**
     * {@code GET  /employee-skills} : get all the employeeSkills.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of employeeSkills in body.
     */
    @GetMapping("/employee-skills")
    public ResponseEntity<List<EmployeeSkillDTO>> getAllEmployeeSkills(EmployeeSkillCriteria criteria, Pageable pageable) {
        log.debug("REST request to get EmployeeSkills by criteria: {}", criteria);
        Page<EmployeeSkillDTO> page = employeeSkillQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /employee-skills/count} : count all the employeeSkills.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/employee-skills/count")
    public ResponseEntity<Long> countEmployeeSkills(EmployeeSkillCriteria criteria) {
        log.debug("REST request to count EmployeeSkills by criteria: {}", criteria);
        return ResponseEntity.ok().body(employeeSkillQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /employee-skills/:id} : get the "id" employeeSkill.
     *
     * @param idMap a Map representation of the id of the employeeSkillDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the employeeSkillDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/employee-skills/{id}")
    public ResponseEntity<EmployeeSkillDTO> getEmployeeSkill(@MatrixVariable(pathVar = "id") Map<String, String> idMap) {
        final ObjectMapper mapper = new ObjectMapper();
        final EmployeeSkillId id = mapper.convertValue(idMap, EmployeeSkillId.class);
        log.debug("REST request to get EmployeeSkill : {}", id);
        Optional<EmployeeSkillDTO> employeeSkillDTO = employeeSkillService.findOne(id);
        return ResponseUtil.wrapOrNotFound(employeeSkillDTO);
    }

    /**
     * {@code DELETE  /employee-skills/:id} : delete the "id" employeeSkill.
     *
     * @param idMap a Map representation of the id of the employeeSkillDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/employee-skills/{id}")
    public ResponseEntity<Void> deleteEmployeeSkill(@MatrixVariable(pathVar = "id") Map<String, String> idMap) {
        final ObjectMapper mapper = new ObjectMapper();
        final EmployeeSkillId id = mapper.convertValue(idMap, EmployeeSkillId.class);
        log.debug("REST request to delete EmployeeSkill : {}", id);
        employeeSkillService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
