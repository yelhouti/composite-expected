package com.mycompany.myapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EmployeeSkillDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeeSkillDTO.class);
        EmployeeSkillDTO employeeSkillDTO1 = new EmployeeSkillDTO();
        employeeSkillDTO1.setName("id1");
        EmployeeDTO employeeDTO1 = new EmployeeDTO();
        employeeDTO1.setUsername("id1");
        employeeSkillDTO1.setEmployee(employeeDTO1);
        EmployeeSkillDTO employeeSkillDTO2 = new EmployeeSkillDTO();
        assertThat(employeeSkillDTO1).isNotEqualTo(employeeSkillDTO2);
        employeeSkillDTO2.setName(employeeSkillDTO1.getName());
        employeeSkillDTO2.setEmployee(employeeDTO1);
        assertThat(employeeSkillDTO1).isEqualTo(employeeSkillDTO2);
        EmployeeSkillDTO employeeSkillDTO3 = new EmployeeSkillDTO();
        employeeSkillDTO3.setName("id3");
        EmployeeDTO employeeDTO3 = new EmployeeDTO();
        employeeDTO3.setUsername("id3");
        employeeSkillDTO3.setEmployee(employeeDTO3);
        assertThat(employeeSkillDTO1).isNotEqualTo(employeeSkillDTO3);
        EmployeeSkillDTO employeeSkillDTO4 = new EmployeeSkillDTO();
        employeeSkillDTO4.setName(null);
        employeeSkillDTO4.setEmployee(null);
        assertThat(employeeSkillDTO1).isNotEqualTo(employeeSkillDTO4);
    }
}
