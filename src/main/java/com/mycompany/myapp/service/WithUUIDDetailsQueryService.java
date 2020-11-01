package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.*; // for static metamodels
import com.mycompany.myapp.domain.WithUUIDDetails;
import com.mycompany.myapp.repository.WithUUIDDetailsRepository;
import com.mycompany.myapp.service.criteria.WithUUIDDetailsCriteria;
import com.mycompany.myapp.service.dto.WithUUIDDetailsDTO;
import com.mycompany.myapp.service.mapper.WithUUIDDetailsMapper;
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
 * Service for executing complex queries for {@link WithUUIDDetails} entities in the database.
 * The main input is a {@link WithUUIDDetailsCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link WithUUIDDetailsDTO} or a {@link Page} of {@link WithUUIDDetailsDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class WithUUIDDetailsQueryService extends QueryService<WithUUIDDetails> {

    private final Logger log = LoggerFactory.getLogger(WithUUIDDetailsQueryService.class);

    private final WithUUIDDetailsRepository withUUIDDetailsRepository;

    private final WithUUIDDetailsMapper withUUIDDetailsMapper;

    public WithUUIDDetailsQueryService(WithUUIDDetailsRepository withUUIDDetailsRepository, WithUUIDDetailsMapper withUUIDDetailsMapper) {
        this.withUUIDDetailsRepository = withUUIDDetailsRepository;
        this.withUUIDDetailsMapper = withUUIDDetailsMapper;
    }

    /**
     * Return a {@link List} of {@link WithUUIDDetailsDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<WithUUIDDetailsDTO> findByCriteria(WithUUIDDetailsCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<WithUUIDDetails> specification = createSpecification(criteria);
        return withUUIDDetailsMapper.toDto(withUUIDDetailsRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link WithUUIDDetailsDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<WithUUIDDetailsDTO> findByCriteria(WithUUIDDetailsCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<WithUUIDDetails> specification = createSpecification(criteria);
        return withUUIDDetailsRepository.findAll(specification, page).map(withUUIDDetailsMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(WithUUIDDetailsCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<WithUUIDDetails> specification = createSpecification(criteria);
        return withUUIDDetailsRepository.count(specification);
    }

    /**
     * Function to convert {@link WithUUIDDetailsCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<WithUUIDDetails> createSpecification(WithUUIDDetailsCriteria criteria) {
        Specification<WithUUIDDetails> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getUuid() != null) {
                specification = specification.and(buildSpecification(criteria.getUuid(), WithUUIDDetails_.uuid));
            }
            if (criteria.getDetails() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDetails(), WithUUIDDetails_.details));
            }
            if (criteria.getWithUUIDId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getWithUUIDId(),
                            root -> root.join(WithUUIDDetails_.withUUID, JoinType.LEFT).get(WithUUID_.uuid)
                        )
                    );
            }
        }
        return specification;
    }
}
