package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EmployeeSkillTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeeSkill.class);
        EmployeeSkill employeeSkill1 = new EmployeeSkill();
        employeeSkill1.setName("id1");
        EmployeeSkill employeeSkill2 = new EmployeeSkill();
        employeeSkill2.setName(employeeSkill1.getName());
        assertThat(employeeSkill1).isEqualTo(employeeSkill2);
        employeeSkill2.setName("id2");
        assertThat(employeeSkill1).isNotEqualTo(employeeSkill2);
        employeeSkill1.setName(null);
        assertThat(employeeSkill1).isNotEqualTo(employeeSkill2);
    }
}
