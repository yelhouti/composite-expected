package com.mycompany.myapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.GeneratedByJHipster;
import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

@GeneratedByJHipster
class EmployeeSkillCertificateDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeeSkillCertificateDTO.class);
        EmployeeSkillCertificateDTO employeeSkillCertificateDTO1 = new EmployeeSkillCertificateDTO();
        employeeSkillCertificateDTO1.setId(1L);
        EmployeeSkillCertificateDTO employeeSkillCertificateDTO2 = new EmployeeSkillCertificateDTO();
        assertThat(employeeSkillCertificateDTO1).isNotEqualTo(employeeSkillCertificateDTO2);
        employeeSkillCertificateDTO2.setId(employeeSkillCertificateDTO1.getId());
        assertThat(employeeSkillCertificateDTO1).isEqualTo(employeeSkillCertificateDTO2);
        employeeSkillCertificateDTO2.setId(2L);
        assertThat(employeeSkillCertificateDTO1).isNotEqualTo(employeeSkillCertificateDTO2);
        employeeSkillCertificateDTO1.setId(null);
        assertThat(employeeSkillCertificateDTO1).isNotEqualTo(employeeSkillCertificateDTO2);
    }
}
