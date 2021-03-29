package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.EmployeeSkillCertificateId;
import com.mycompany.myapp.service.dto.EmployeeSkillCertificateDetailsDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.EmployeeSkillCertificateDetails}.
 */
public interface EmployeeSkillCertificateDetailsService {
    /**
     * Save a employeeSkillCertificateDetails.
     *
     * @param employeeSkillCertificateDetailsDTO the entity to save.
     * @return the persisted entity.
     */
    EmployeeSkillCertificateDetailsDTO save(EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO);

    /**
     * Partially updates a employeeSkillCertificateDetails.
     *
     * @param employeeSkillCertificateDetailsDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<EmployeeSkillCertificateDetailsDTO> partialUpdate(EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO);

    /**
     * Get all the employeeSkillCertificateDetails.
     *
     * @return the list of entities.
     */
    List<EmployeeSkillCertificateDetailsDTO> findAll();

    /**
     * Get the "id" employeeSkillCertificateDetails.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<EmployeeSkillCertificateDetailsDTO> findOne(EmployeeSkillCertificateId id);

    /**
     * Delete the "id" employeeSkillCertificateDetails.
     *
     * @param id the id of the entity.
     */
    void delete(EmployeeSkillCertificateId id);
}
