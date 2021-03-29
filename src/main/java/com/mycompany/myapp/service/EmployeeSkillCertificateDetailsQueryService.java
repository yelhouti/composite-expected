package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.*; // for static metamodels
import com.mycompany.myapp.domain.EmployeeSkillCertificateDetails;
import com.mycompany.myapp.repository.EmployeeSkillCertificateDetailsRepository;
import com.mycompany.myapp.service.criteria.EmployeeSkillCertificateDetailsCriteria;
import com.mycompany.myapp.service.dto.EmployeeSkillCertificateDetailsDTO;
import com.mycompany.myapp.service.mapper.EmployeeSkillCertificateDetailsMapper;
import java.util.List;
import javax.persistence.criteria.Root;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link EmployeeSkillCertificateDetails} entities in the database.
 * The main input is a {@link EmployeeSkillCertificateDetailsCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link EmployeeSkillCertificateDetailsDTO} or a {@link Page} of {@link EmployeeSkillCertificateDetailsDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class EmployeeSkillCertificateDetailsQueryService extends QueryService<EmployeeSkillCertificateDetails> {

    private final Logger log = LoggerFactory.getLogger(EmployeeSkillCertificateDetailsQueryService.class);

    private final EmployeeSkillCertificateDetailsRepository employeeSkillCertificateDetailsRepository;

    private final EmployeeSkillCertificateDetailsMapper employeeSkillCertificateDetailsMapper;

    private final EmployeeSkillCertificateQueryService employeeSkillCertificateQueryService;

    public EmployeeSkillCertificateDetailsQueryService(
        EmployeeSkillCertificateDetailsRepository employeeSkillCertificateDetailsRepository,
        EmployeeSkillCertificateDetailsMapper employeeSkillCertificateDetailsMapper,
        @Lazy EmployeeSkillCertificateQueryService employeeSkillCertificateQueryService
    ) {
        this.employeeSkillCertificateDetailsRepository = employeeSkillCertificateDetailsRepository;
        this.employeeSkillCertificateDetailsMapper = employeeSkillCertificateDetailsMapper;
        this.employeeSkillCertificateQueryService = employeeSkillCertificateQueryService;
    }

    /**
     * Return a {@link List} of {@link EmployeeSkillCertificateDetailsDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<EmployeeSkillCertificateDetailsDTO> findByCriteria(EmployeeSkillCertificateDetailsCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<EmployeeSkillCertificateDetails> specification = createSpecification(criteria);
        return employeeSkillCertificateDetailsMapper.toDto(employeeSkillCertificateDetailsRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link EmployeeSkillCertificateDetailsDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<EmployeeSkillCertificateDetailsDTO> findByCriteria(EmployeeSkillCertificateDetailsCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<EmployeeSkillCertificateDetails> specification = createSpecification(criteria);
        return employeeSkillCertificateDetailsRepository.findAll(specification, page).map(employeeSkillCertificateDetailsMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(EmployeeSkillCertificateDetailsCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<EmployeeSkillCertificateDetails> specification = createSpecification(criteria);
        return employeeSkillCertificateDetailsRepository.count(specification);
    }

    /**
     * Function to convert {@link EmployeeSkillCertificateDetailsCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    public Specification<EmployeeSkillCertificateDetails> createSpecification(EmployeeSkillCertificateDetailsCriteria criteria) {
        Specification<EmployeeSkillCertificateDetails> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getDetail() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDetail(), EmployeeSkillCertificateDetails_.detail));
            }

            if (criteria.getEmployeeSkillCertificate() != null) {
                Specification<EmployeeSkillCertificate> employeeSkillCertificateSpecification =
                    this.employeeSkillCertificateQueryService.createSpecification(criteria.getEmployeeSkillCertificate());
                specification =
                    specification.and(
                        (root, query, criteriaBuilder) -> {
                            Root<EmployeeSkillCertificate> employeeSkillCertificateRoot = query.from(EmployeeSkillCertificate.class);
                            return criteriaBuilder.and(
                                criteriaBuilder.equal(
                                    employeeSkillCertificateRoot,
                                    root.get(EmployeeSkillCertificateDetails_.employeeSkillCertificate)
                                ),
                                employeeSkillCertificateSpecification.toPredicate(employeeSkillCertificateRoot, query, criteriaBuilder)
                            );
                        }
                    );
            }
        }
        return specification;
    }
}
