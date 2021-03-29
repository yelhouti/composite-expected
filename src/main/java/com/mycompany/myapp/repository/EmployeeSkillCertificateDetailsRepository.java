package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.EmployeeSkillCertificateDetails;
import com.mycompany.myapp.domain.EmployeeSkillCertificateId;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the EmployeeSkillCertificateDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeeSkillCertificateDetailsRepository
    extends
        JpaRepository<EmployeeSkillCertificateDetails, EmployeeSkillCertificateId>,
        JpaSpecificationExecutor<EmployeeSkillCertificateDetails> {}
