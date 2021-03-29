package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.*; // for static metamodels
import com.mycompany.myapp.domain.WithUUID;
import com.mycompany.myapp.repository.WithUUIDRepository;
import com.mycompany.myapp.service.criteria.WithUUIDCriteria;
import com.mycompany.myapp.service.dto.WithUUIDDTO;
import com.mycompany.myapp.service.mapper.WithUUIDMapper;
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
 * Service for executing complex queries for {@link WithUUID} entities in the database.
 * The main input is a {@link WithUUIDCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link WithUUIDDTO} or a {@link Page} of {@link WithUUIDDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class WithUUIDQueryService extends QueryService<WithUUID> {

    private final Logger log = LoggerFactory.getLogger(WithUUIDQueryService.class);

    private final WithUUIDRepository withUUIDRepository;

    private final WithUUIDMapper withUUIDMapper;

    private final WithUUIDDetailsQueryService withUUIDDetailsQueryService;

    public WithUUIDQueryService(
        WithUUIDRepository withUUIDRepository,
        WithUUIDMapper withUUIDMapper,
        @Lazy WithUUIDDetailsQueryService withUUIDDetailsQueryService
    ) {
        this.withUUIDRepository = withUUIDRepository;
        this.withUUIDMapper = withUUIDMapper;
        this.withUUIDDetailsQueryService = withUUIDDetailsQueryService;
    }

    /**
     * Return a {@link List} of {@link WithUUIDDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<WithUUIDDTO> findByCriteria(WithUUIDCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<WithUUID> specification = createSpecification(criteria);
        return withUUIDMapper.toDto(withUUIDRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link WithUUIDDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<WithUUIDDTO> findByCriteria(WithUUIDCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<WithUUID> specification = createSpecification(criteria);
        return withUUIDRepository.findAll(specification, page).map(withUUIDMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(WithUUIDCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<WithUUID> specification = createSpecification(criteria);
        return withUUIDRepository.count(specification);
    }

    /**
     * Function to convert {@link WithUUIDCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    public Specification<WithUUID> createSpecification(WithUUIDCriteria criteria) {
        Specification<WithUUID> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getUuid() != null) {
                specification = specification.and(buildSpecification(criteria.getUuid(), WithUUID_.uuid));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), WithUUID_.name));
            }

            if (criteria.getWithUUIDDetails() != null) {
                Specification<WithUUIDDetails> withUUIDDetailsSpecification =
                    this.withUUIDDetailsQueryService.createSpecification(criteria.getWithUUIDDetails());
                specification =
                    specification.and(
                        (root, query, criteriaBuilder) -> {
                            Root<WithUUIDDetails> withUUIDDetailsRoot = query.from(WithUUIDDetails.class);
                            return criteriaBuilder.and(
                                criteriaBuilder.equal(
                                    withUUIDDetailsRoot.get(WithUUIDDetails_.uuid),
                                    root.get(WithUUID_.withUUIDDetails).get(WithUUIDDetails_.uuid)
                                ),
                                withUUIDDetailsSpecification.toPredicate(withUUIDDetailsRoot, query, criteriaBuilder)
                            );
                        }
                    );
            }
        }
        return specification;
    }
}
