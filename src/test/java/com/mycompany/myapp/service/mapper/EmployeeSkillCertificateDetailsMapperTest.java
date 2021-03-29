package com.mycompany.myapp.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class EmployeeSkillCertificateDetailsMapperTest {

    private EmployeeSkillCertificateDetailsMapper employeeSkillCertificateDetailsMapper;

    @BeforeEach
    public void setUp() {
        employeeSkillCertificateDetailsMapper = new EmployeeSkillCertificateDetailsMapperImpl();
    }
}
