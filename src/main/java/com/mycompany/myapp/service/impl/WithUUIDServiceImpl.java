package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.WithUUID;
import com.mycompany.myapp.repository.WithUUIDRepository;
import com.mycompany.myapp.service.WithUUIDService;
import com.mycompany.myapp.service.dto.WithUUIDDTO;
import com.mycompany.myapp.service.mapper.WithUUIDMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link WithUUID}.
 */
@Service
@Transactional
public class WithUUIDServiceImpl implements WithUUIDService {

    private final Logger log = LoggerFactory.getLogger(WithUUIDServiceImpl.class);

    private final WithUUIDRepository withUUIDRepository;

    private final WithUUIDMapper withUUIDMapper;

    public WithUUIDServiceImpl(WithUUIDRepository withUUIDRepository, WithUUIDMapper withUUIDMapper) {
        this.withUUIDRepository = withUUIDRepository;
        this.withUUIDMapper = withUUIDMapper;
    }

    @Override
    public WithUUIDDTO save(WithUUIDDTO withUUIDDTO) {
        log.debug("Request to save WithUUID : {}", withUUIDDTO);
        WithUUID withUUID = withUUIDMapper.toEntity(withUUIDDTO);
        withUUID = withUUIDRepository.save(withUUID);
        return withUUIDMapper.toDto(withUUID);
    }

    @Override
    public Optional<WithUUIDDTO> partialUpdate(WithUUIDDTO withUUIDDTO) {
        log.debug("Request to partially update WithUUID : {}", withUUIDDTO);

        return withUUIDRepository
            .findById(withUUIDDTO.getUuid())
            .map(
                existingWithUUID -> {
                    if (withUUIDDTO.getName() != null) {
                        existingWithUUID.setName(withUUIDDTO.getName());
                    }

                    return existingWithUUID;
                }
            )
            .map(withUUIDRepository::save)
            .map(withUUIDMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<WithUUIDDTO> findAll() {
        log.debug("Request to get all WithUUIDS");
        return withUUIDRepository.findAll().stream().map(withUUIDMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get all the withUUIDS where WithUUIDDetails is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<WithUUIDDTO> findAllWhereWithUUIDDetailsIsNull() {
        log.debug("Request to get all withUUIDS where WithUUIDDetails is null");
        return StreamSupport
            .stream(withUUIDRepository.findAll().spliterator(), false)
            .filter(withUUID -> withUUID.getWithUUIDDetails() == null)
            .map(withUUIDMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<WithUUIDDTO> findOne(UUID id) {
        log.debug("Request to get WithUUID : {}", id);
        return withUUIDRepository.findById(id).map(withUUIDMapper::toDto);
    }

    @Override
    public void delete(UUID id) {
        log.debug("Request to delete WithUUID : {}", id);
        withUUIDRepository.deleteById(id);
    }
}
