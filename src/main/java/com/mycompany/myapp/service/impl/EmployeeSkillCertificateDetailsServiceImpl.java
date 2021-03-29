package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.EmployeeSkillCertificateDetails;
import com.mycompany.myapp.domain.EmployeeSkillCertificateId;
import com.mycompany.myapp.repository.EmployeeSkillCertificateDetailsRepository;
import com.mycompany.myapp.repository.EmployeeSkillCertificateRepository;
import com.mycompany.myapp.service.EmployeeSkillCertificateDetailsService;
import com.mycompany.myapp.service.dto.EmployeeSkillCertificateDetailsDTO;
import com.mycompany.myapp.service.mapper.EmployeeSkillCertificateDetailsMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link EmployeeSkillCertificateDetails}.
 */
@Service
@Transactional
public class EmployeeSkillCertificateDetailsServiceImpl implements EmployeeSkillCertificateDetailsService {

    private final Logger log = LoggerFactory.getLogger(EmployeeSkillCertificateDetailsServiceImpl.class);

    private final EmployeeSkillCertificateDetailsRepository employeeSkillCertificateDetailsRepository;

    private final EmployeeSkillCertificateDetailsMapper employeeSkillCertificateDetailsMapper;

    private final EmployeeSkillCertificateRepository employeeSkillCertificateRepository;

    public EmployeeSkillCertificateDetailsServiceImpl(
        EmployeeSkillCertificateDetailsRepository employeeSkillCertificateDetailsRepository,
        EmployeeSkillCertificateDetailsMapper employeeSkillCertificateDetailsMapper,
        EmployeeSkillCertificateRepository employeeSkillCertificateRepository
    ) {
        this.employeeSkillCertificateDetailsRepository = employeeSkillCertificateDetailsRepository;
        this.employeeSkillCertificateDetailsMapper = employeeSkillCertificateDetailsMapper;
        this.employeeSkillCertificateRepository = employeeSkillCertificateRepository;
    }

    @Override
    public EmployeeSkillCertificateDetailsDTO save(EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO) {
        log.debug("Request to save EmployeeSkillCertificateDetails : {}", employeeSkillCertificateDetailsDTO);
        EmployeeSkillCertificateDetails employeeSkillCertificateDetails = employeeSkillCertificateDetailsMapper.toEntity(
            employeeSkillCertificateDetailsDTO
        );
        EmployeeSkillCertificateId id = employeeSkillCertificateDetails.getEmployeeSkillCertificate().getId();
        employeeSkillCertificateRepository.findById(id).ifPresent(employeeSkillCertificateDetails::employeeSkillCertificate);
        employeeSkillCertificateDetails = employeeSkillCertificateDetailsRepository.save(employeeSkillCertificateDetails);
        return employeeSkillCertificateDetailsMapper.toDto(employeeSkillCertificateDetails);
    }

    @Override
    public Optional<EmployeeSkillCertificateDetailsDTO> partialUpdate(
        EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO
    ) {
        log.debug("Request to partially update EmployeeSkillCertificateDetails : {}", employeeSkillCertificateDetailsDTO);

        return employeeSkillCertificateDetailsRepository
            .findById(employeeSkillCertificateDetailsMapper.toEntity(employeeSkillCertificateDetailsDTO).getId())
            .map(
                existingEmployeeSkillCertificateDetails -> {
                    employeeSkillCertificateDetailsMapper.partialUpdate(
                        existingEmployeeSkillCertificateDetails,
                        employeeSkillCertificateDetailsDTO
                    );
                    return existingEmployeeSkillCertificateDetails;
                }
            )
            .map(employeeSkillCertificateDetailsRepository::save)
            .map(employeeSkillCertificateDetailsMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeSkillCertificateDetailsDTO> findAll() {
        log.debug("Request to get all EmployeeSkillCertificateDetails");
        return employeeSkillCertificateDetailsRepository
            .findAll()
            .stream()
            .map(employeeSkillCertificateDetailsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<EmployeeSkillCertificateDetailsDTO> findOne(EmployeeSkillCertificateId id) {
        log.debug("Request to get EmployeeSkillCertificateDetails : {}", id);
        return employeeSkillCertificateDetailsRepository.findById(id).map(employeeSkillCertificateDetailsMapper::toDto);
    }

    @Override
    public void delete(EmployeeSkillCertificateId id) {
        log.debug("Request to delete EmployeeSkillCertificateDetails : {}", id);
        employeeSkillCertificateDetailsRepository.deleteById(id);
    }
}
