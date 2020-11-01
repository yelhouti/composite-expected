package com.mycompany.myapp.repository;

import com.mycompany.myapp.GeneratedByJHipster;
import com.mycompany.myapp.domain.EmployeeSkillCertificate;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the EmployeeSkillCertificate entity.
 */
@SuppressWarnings("unused")
@Repository
@GeneratedByJHipster
public interface EmployeeSkillCertificateRepository
    extends JpaRepository<EmployeeSkillCertificate, Long>, JpaSpecificationExecutor<EmployeeSkillCertificate> {}
