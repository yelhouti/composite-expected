package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.WithUUIDDetails;
import com.mycompany.myapp.repository.WithUUIDDetailsRepository;
import com.mycompany.myapp.repository.WithUUIDRepository;
import com.mycompany.myapp.service.WithUUIDDetailsService;
import com.mycompany.myapp.service.dto.WithUUIDDetailsDTO;
import com.mycompany.myapp.service.mapper.WithUUIDDetailsMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link WithUUIDDetails}.
 */
@Service
@Transactional
public class WithUUIDDetailsServiceImpl implements WithUUIDDetailsService {
    private final Logger log = LoggerFactory.getLogger(WithUUIDDetailsServiceImpl.class);

    private final WithUUIDDetailsRepository withUUIDDetailsRepository;

    private final WithUUIDDetailsMapper withUUIDDetailsMapper;

    private final WithUUIDRepository withUUIDRepository;

    public WithUUIDDetailsServiceImpl(
        WithUUIDDetailsRepository withUUIDDetailsRepository,
        WithUUIDDetailsMapper withUUIDDetailsMapper,
        WithUUIDRepository withUUIDRepository
    ) {
        this.withUUIDDetailsRepository = withUUIDDetailsRepository;
        this.withUUIDDetailsMapper = withUUIDDetailsMapper;
        this.withUUIDRepository = withUUIDRepository;
    }

    @Override
    public WithUUIDDetailsDTO save(WithUUIDDetailsDTO withUUIDDetailsDTO) {
        log.debug("Request to save WithUUIDDetails : {}", withUUIDDetailsDTO);
        WithUUIDDetails withUUIDDetails = withUUIDDetailsMapper.toEntity(withUUIDDetailsDTO);
        UUID withUUIDId = withUUIDDetailsDTO.getWithUUID().getUuid();
        withUUIDRepository.findById(withUUIDId).ifPresent(withUUIDDetails::withUUID);
        withUUIDDetails = withUUIDDetailsRepository.save(withUUIDDetails);
        return withUUIDDetailsMapper.toDto(withUUIDDetails);
    }

    @Override
    public Optional<WithUUIDDetailsDTO> partialUpdate(WithUUIDDetailsDTO withUUIDDetailsDTO) {
        log.debug("Request to partially update WithUUIDDetails : {}", withUUIDDetailsDTO);

        return withUUIDDetailsRepository
            .findById(withUUIDDetailsDTO.getUuid())
            .map(
                existingWithUUIDDetails -> {
                    if (withUUIDDetailsDTO.getDetails() != null) {
                        existingWithUUIDDetails.setDetails(withUUIDDetailsDTO.getDetails());
                    }

                    return existingWithUUIDDetails;
                }
            )
            .map(withUUIDDetailsRepository::save)
            .map(withUUIDDetailsMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<WithUUIDDetailsDTO> findAll() {
        log.debug("Request to get all WithUUIDDetails");
        return withUUIDDetailsRepository
            .findAll()
            .stream()
            .map(withUUIDDetailsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<WithUUIDDetailsDTO> findOne(UUID id) {
        log.debug("Request to get WithUUIDDetails : {}", id);
        return withUUIDDetailsRepository.findById(id).map(withUUIDDetailsMapper::toDto);
    }

    @Override
    public void delete(UUID id) {
        log.debug("Request to delete WithUUIDDetails : {}", id);
        withUUIDDetailsRepository.deleteById(id);
    }
}
