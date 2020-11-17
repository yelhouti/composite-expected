package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.*; // for static metamodels
import com.mycompany.myapp.domain.EmployeeSkill;
import com.mycompany.myapp.repository.EmployeeSkillRepository;
import com.mycompany.myapp.service.dto.EmployeeSkillCriteria;
import com.mycompany.myapp.service.dto.EmployeeSkillDTO;
import com.mycompany.myapp.service.mapper.EmployeeSkillMapper;
import java.util.List;
import javax.persistence.criteria.JoinType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link EmployeeSkill} entities in the database.
 * The main input is a {@link EmployeeSkillCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link EmployeeSkillDTO} or a {@link Page} of {@link EmployeeSkillDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class EmployeeSkillQueryService extends QueryService<EmployeeSkill> {

    private final Logger log = LoggerFactory.getLogger(EmployeeSkillQueryService.class);

    private final EmployeeSkillRepository employeeSkillRepository;

    private final EmployeeSkillMapper employeeSkillMapper;

    public EmployeeSkillQueryService(EmployeeSkillRepository employeeSkillRepository, EmployeeSkillMapper employeeSkillMapper) {
        this.employeeSkillRepository = employeeSkillRepository;
        this.employeeSkillMapper = employeeSkillMapper;
    }

    /**
     * Return a {@link List} of {@link EmployeeSkillDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<EmployeeSkillDTO> findByCriteria(EmployeeSkillCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<EmployeeSkill> specification = createSpecification(criteria);
        return employeeSkillMapper.toDto(employeeSkillRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link EmployeeSkillDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<EmployeeSkillDTO> findByCriteria(EmployeeSkillCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<EmployeeSkill> specification = createSpecification(criteria);
        return employeeSkillRepository.findAll(specification, page).map(employeeSkillMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(EmployeeSkillCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<EmployeeSkill> specification = createSpecification(criteria);
        return employeeSkillRepository.count(specification);
    }

    /**
     * Function to convert {@link EmployeeSkillCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<EmployeeSkill> createSpecification(EmployeeSkillCriteria criteria) {
        Specification<EmployeeSkill> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildStringSpecification(criteria.getId(), EmployeeSkill_.id));
            }
            if (criteria.getLevel() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getLevel(), EmployeeSkill_.level));
            }
            if (criteria.getEmployeeSkillCertificateId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getEmployeeSkillCertificateId(),
                            root -> root.join(EmployeeSkill_.employeeSkillCertificates, JoinType.LEFT).get(EmployeeSkillCertificate_.id)
                        )
                    );
            }
            if (criteria.getTaskId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getTaskId(), root -> root.join(EmployeeSkill_.tasks, JoinType.LEFT).get(Task_.id))
                    );
            }
            if (criteria.getEmployeeId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getEmployeeId(),
                            root -> root.join(EmployeeSkill_.employee, JoinType.LEFT).get(Employee_.id)
                        )
                    );
            }
            if (criteria.getTeacherId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getTeacherId(),
                            root -> root.join(EmployeeSkill_.teacher, JoinType.LEFT).get(Employee_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
