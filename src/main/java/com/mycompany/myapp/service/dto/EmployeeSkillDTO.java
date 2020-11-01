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

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private Integer level;

    private Set<TaskDTO> tasks = new HashSet<>();

    private EmployeeDTO employee;

    private EmployeeDTO teacher;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Set<TaskDTO> getTasks() {
        return tasks;
    }

    public void setTasks(Set<TaskDTO> tasks) {
        this.tasks = tasks;
    }

    public EmployeeDTO getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeDTO employee) {
        this.employee = employee;
    }

    public EmployeeDTO getTeacher() {
        return teacher;
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
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, employeeSkillDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmployeeSkillDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", level=" + getLevel() +
            ", tasks=" + getTasks() +
            ", employee=" + getEmployee() +
            ", teacher=" + getTeacher() +
            "}";
    }
}
