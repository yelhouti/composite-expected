package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EmployeeSkillCertificateDetailsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeeSkillCertificateDetails.class);
        EmployeeSkillCertificateDetails employeeSkillCertificateDetails1 = new EmployeeSkillCertificateDetails();
        employeeSkillCertificateDetails1.setId(new EmployeeSkillCertificateId(1L, "id1", "id1"));
        EmployeeSkillCertificateDetails employeeSkillCertificateDetails2 = new EmployeeSkillCertificateDetails();
        employeeSkillCertificateDetails2.setId(employeeSkillCertificateDetails1.getId());
        assertThat(employeeSkillCertificateDetails1).isEqualTo(employeeSkillCertificateDetails2);
        employeeSkillCertificateDetails2.setId(new EmployeeSkillCertificateId(2L, "id2", "id2"));
        assertThat(employeeSkillCertificateDetails1).isNotEqualTo(employeeSkillCertificateDetails2);
        employeeSkillCertificateDetails1.setId(null);
        assertThat(employeeSkillCertificateDetails1).isNotEqualTo(employeeSkillCertificateDetails2);
    }
}
