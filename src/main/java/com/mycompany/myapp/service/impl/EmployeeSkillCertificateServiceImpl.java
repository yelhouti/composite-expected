package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.EmployeeSkillCertificate;
import com.mycompany.myapp.domain.EmployeeSkillCertificateId;
import com.mycompany.myapp.repository.EmployeeSkillCertificateRepository;
import com.mycompany.myapp.service.EmployeeSkillCertificateService;
import com.mycompany.myapp.service.dto.EmployeeSkillCertificateDTO;
import com.mycompany.myapp.service.mapper.EmployeeSkillCertificateMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link EmployeeSkillCertificate}.
 */
@Service
@Transactional
public class EmployeeSkillCertificateServiceImpl implements EmployeeSkillCertificateService {

    private final Logger log = LoggerFactory.getLogger(EmployeeSkillCertificateServiceImpl.class);

    private final EmployeeSkillCertificateRepository employeeSkillCertificateRepository;

    private final EmployeeSkillCertificateMapper employeeSkillCertificateMapper;

    public EmployeeSkillCertificateServiceImpl(
        EmployeeSkillCertificateRepository employeeSkillCertificateRepository,
        EmployeeSkillCertificateMapper employeeSkillCertificateMapper
    ) {
        this.employeeSkillCertificateRepository = employeeSkillCertificateRepository;
        this.employeeSkillCertificateMapper = employeeSkillCertificateMapper;
    }

    @Override
    public EmployeeSkillCertificateDTO save(EmployeeSkillCertificateDTO employeeSkillCertificateDTO) {
        log.debug("Request to save EmployeeSkillCertificate : {}", employeeSkillCertificateDTO);
        EmployeeSkillCertificate employeeSkillCertificate = employeeSkillCertificateMapper.toEntity(employeeSkillCertificateDTO);
        employeeSkillCertificate = employeeSkillCertificateRepository.save(employeeSkillCertificate);
        return employeeSkillCertificateMapper.toDto(employeeSkillCertificate);
    }

    @Override
    public Optional<EmployeeSkillCertificateDTO> partialUpdate(EmployeeSkillCertificateDTO employeeSkillCertificateDTO) {
        log.debug("Request to partially update EmployeeSkillCertificate : {}", employeeSkillCertificateDTO);

        return employeeSkillCertificateRepository
            .findById(employeeSkillCertificateMapper.toEntity(employeeSkillCertificateDTO).getId())
            .map(
                existingEmployeeSkillCertificate -> {
                    employeeSkillCertificateMapper.partialUpdate(existingEmployeeSkillCertificate, employeeSkillCertificateDTO);
                    return existingEmployeeSkillCertificate;
                }
            )
            .map(employeeSkillCertificateRepository::save)
            .map(employeeSkillCertificateMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EmployeeSkillCertificateDTO> findAll(Pageable pageable) {
        log.debug("Request to get all EmployeeSkillCertificates");
        return employeeSkillCertificateRepository.findAll(pageable).map(employeeSkillCertificateMapper::toDto);
    }

    /**
     *  Get all the employeeSkillCertificates where EmployeeSkillCertificateDetails is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<EmployeeSkillCertificateDTO> findAllWhereEmployeeSkillCertificateDetailsIsNull() {
        log.debug("Request to get all employeeSkillCertificates where EmployeeSkillCertificateDetails is null");
        return StreamSupport
            .stream(employeeSkillCertificateRepository.findAll().spliterator(), false)
            .filter(employeeSkillCertificate -> employeeSkillCertificate.getEmployeeSkillCertificateDetails() == null)
            .map(employeeSkillCertificateMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<EmployeeSkillCertificateDTO> findOne(EmployeeSkillCertificateId id) {
        log.debug("Request to get EmployeeSkillCertificate : {}", id);
        return employeeSkillCertificateRepository.findById(id).map(employeeSkillCertificateMapper::toDto);
    }

    @Override
    public void delete(EmployeeSkillCertificateId id) {
        log.debug("Request to delete EmployeeSkillCertificate : {}", id);
        employeeSkillCertificateRepository.deleteById(id);
    }
}
