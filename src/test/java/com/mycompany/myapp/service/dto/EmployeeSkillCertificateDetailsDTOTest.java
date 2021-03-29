package com.mycompany.myapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EmployeeSkillCertificateDetailsDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeeSkillCertificateDetailsDTO.class);
        EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO1 = new EmployeeSkillCertificateDetailsDTO();
        EmployeeSkillCertificateDTO employeeSkillCertificateDTO1 = new EmployeeSkillCertificateDTO();
        CertificateTypeDTO certificateTypeDTO1 = new CertificateTypeDTO();
        certificateTypeDTO1.setId(1L);
        employeeSkillCertificateDTO1.setType(certificateTypeDTO1);
        EmployeeSkillDTO employeeSkillDTO1 = new EmployeeSkillDTO();
        employeeSkillDTO1.setName("id1");
        EmployeeDTO employeeDTO1 = new EmployeeDTO();
        employeeDTO1.setUsername("id1");
        employeeSkillDTO1.setEmployee(employeeDTO1);
        employeeSkillCertificateDTO1.setSkill(employeeSkillDTO1);
        employeeSkillCertificateDetailsDTO1.setEmployeeSkillCertificate(employeeSkillCertificateDTO1);
        EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO2 = new EmployeeSkillCertificateDetailsDTO();
        assertThat(employeeSkillCertificateDetailsDTO1).isNotEqualTo(employeeSkillCertificateDetailsDTO2);
        employeeSkillCertificateDetailsDTO2.setEmployeeSkillCertificate(employeeSkillCertificateDTO1);
        assertThat(employeeSkillCertificateDetailsDTO1).isEqualTo(employeeSkillCertificateDetailsDTO2);
        EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO3 = new EmployeeSkillCertificateDetailsDTO();
        EmployeeSkillCertificateDTO employeeSkillCertificateDTO3 = new EmployeeSkillCertificateDTO();
        CertificateTypeDTO certificateTypeDTO3 = new CertificateTypeDTO();
        certificateTypeDTO3.setId(3L);
        employeeSkillCertificateDTO3.setType(certificateTypeDTO3);
        EmployeeSkillDTO employeeSkillDTO3 = new EmployeeSkillDTO();
        employeeSkillDTO3.setName("id3");
        EmployeeDTO employeeDTO3 = new EmployeeDTO();
        employeeDTO3.setUsername("id3");
        employeeSkillDTO3.setEmployee(employeeDTO3);
        employeeSkillCertificateDTO3.setSkill(employeeSkillDTO3);
        employeeSkillCertificateDetailsDTO3.setEmployeeSkillCertificate(employeeSkillCertificateDTO3);
        assertThat(employeeSkillCertificateDetailsDTO1).isNotEqualTo(employeeSkillCertificateDetailsDTO3);
        EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO4 = new EmployeeSkillCertificateDetailsDTO();
        employeeSkillCertificateDetailsDTO4.setEmployeeSkillCertificate(null);
        assertThat(employeeSkillCertificateDetailsDTO1).isNotEqualTo(employeeSkillCertificateDetailsDTO4);
    }
}
