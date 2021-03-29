package com.mycompany.myapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EmployeeDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeeDTO.class);
        EmployeeDTO employeeDTO1 = new EmployeeDTO();
        employeeDTO1.setUsername("id1");
        EmployeeDTO employeeDTO2 = new EmployeeDTO();
        assertThat(employeeDTO1).isNotEqualTo(employeeDTO2);
        employeeDTO2.setUsername(employeeDTO1.getUsername());
        assertThat(employeeDTO1).isEqualTo(employeeDTO2);
        EmployeeDTO employeeDTO3 = new EmployeeDTO();
        employeeDTO3.setUsername("id3");
        assertThat(employeeDTO1).isNotEqualTo(employeeDTO3);
        EmployeeDTO employeeDTO4 = new EmployeeDTO();
        employeeDTO4.setUsername(null);
        assertThat(employeeDTO1).isNotEqualTo(employeeDTO4);
    }
}
