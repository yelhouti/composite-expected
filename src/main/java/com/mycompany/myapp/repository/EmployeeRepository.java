package com.mycompany.myapp.repository;

import com.mycompany.myapp.GeneratedByJHipster;
import com.mycompany.myapp.domain.Employee;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Employee entity.
 */
@SuppressWarnings("unused")
@Repository
@GeneratedByJHipster
public interface EmployeeRepository extends JpaRepository<Employee, String>, JpaSpecificationExecutor<Employee> {}
