package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.EmployeeSkill} entity.
 */
public class EmployeeSkillDTO implements Serializable {

    @NotNull
    private String name;

    @NotNull
    private Integer level;

    private Set<TaskDTO> tasks = new HashSet<>();

    private EmployeeDTO employee;

    private EmployeeDTO teacher;

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getLevel() {
        return this.level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Set<TaskDTO> getTasks() {
        return this.tasks;
    }

    public void setTasks(Set<TaskDTO> tasks) {
        this.tasks = tasks;
    }

    public EmployeeDTO getEmployee() {
        return this.employee;
    }

    public void setEmployee(EmployeeDTO employee) {
        this.employee = employee;
    }

    public EmployeeDTO getTeacher() {
        return this.teacher;
    }

    public void setTeacher(EmployeeDTO teacher) {
        this.teacher = teacher;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EmployeeSkillDTO)) {
            return false;
        }

        EmployeeSkillDTO employeeSkillDTO = (EmployeeSkillDTO) o;
        if (this.name == null && this.employee == null) {
            return false;
        }
        return Objects.equals(this.name, employeeSkillDTO.name) && Objects.equals(this.employee, employeeSkillDTO.employee);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.name, this.employee);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmployeeSkillDTO{" +
            "name='" + getName() + "'" +
            ", level=" + getLevel() +
            ", tasks=" + getTasks() +
            ", employee='" + getEmployee() + "'" +
            ", teacher='" + getTeacher() + "'" +
            "}";
    }
}
