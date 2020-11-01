package com.mycompany.myapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EmployeeSkillDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeeSkillDTO.class);
        EmployeeSkillDTO employeeSkillDTO1 = new EmployeeSkillDTO();
        employeeSkillDTO1.setId(1L);
        EmployeeSkillDTO employeeSkillDTO2 = new EmployeeSkillDTO();
        assertThat(employeeSkillDTO1).isNotEqualTo(employeeSkillDTO2);
        employeeSkillDTO2.setId(employeeSkillDTO1.getId());
        assertThat(employeeSkillDTO1).isEqualTo(employeeSkillDTO2);
        employeeSkillDTO2.setId(2L);
        assertThat(employeeSkillDTO1).isNotEqualTo(employeeSkillDTO2);
        employeeSkillDTO1.setId(null);
        assertThat(employeeSkillDTO1).isNotEqualTo(employeeSkillDTO2);
    }
}
