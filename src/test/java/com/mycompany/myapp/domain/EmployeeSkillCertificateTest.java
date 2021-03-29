package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EmployeeSkillCertificateTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeeSkillCertificate.class);
        EmployeeSkillCertificate employeeSkillCertificate1 = new EmployeeSkillCertificate();
        employeeSkillCertificate1.setId(new EmployeeSkillCertificateId(1L, "id1", "id1"));
        EmployeeSkillCertificate employeeSkillCertificate2 = new EmployeeSkillCertificate();
        employeeSkillCertificate2.setId(employeeSkillCertificate1.getId());
        assertThat(employeeSkillCertificate1).isEqualTo(employeeSkillCertificate2);
        employeeSkillCertificate2.setId(new EmployeeSkillCertificateId(2L, "id2", "id2"));
        assertThat(employeeSkillCertificate1).isNotEqualTo(employeeSkillCertificate2);
        employeeSkillCertificate1.setId(null);
        assertThat(employeeSkillCertificate1).isNotEqualTo(employeeSkillCertificate2);
    }
}
