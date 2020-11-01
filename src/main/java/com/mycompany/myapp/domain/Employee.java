package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.GeneratedByJHipster;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Employee.
 */
@Entity
@Table(name = "employee")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@GeneratedByJHipster
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private String id;

    @NotNull
    @Column(name = "fullname", nullable = false)
    private String fullname;

    @OneToMany(mappedBy = "manager")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "teamMembers", "skills", "taughtSkills", "manager" }, allowSetters = true)
    private Set<Employee> teamMembers = new HashSet<>();

    @OneToMany(mappedBy = "employee")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "employeeSkillCertificates", "tasks", "employee", "teacher" }, allowSetters = true)
    private Set<EmployeeSkill> skills = new HashSet<>();

    @OneToMany(mappedBy = "teacher")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "employeeSkillCertificates", "tasks", "employee", "teacher" }, allowSetters = true)
    private Set<EmployeeSkill> taughtSkills = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "teamMembers", "skills", "taughtSkills", "manager" }, allowSetters = true)
    private Employee manager;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Employee id(String id) {
        this.id = id;
        return this;
    }

    public String getFullname() {
        return fullname;
    }

    public Employee fullname(String fullname) {
        this.fullname = fullname;
        return this;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public Set<Employee> getTeamMembers() {
        return teamMembers;
    }

    public Employee teamMembers(Set<Employee> employees) {
        this.teamMembers = employees;
        return this;
    }

    public Employee addTeamMember(Employee employee) {
        this.teamMembers.add(employee);
        employee.setManager(this);
        return this;
    }

    public Employee removeTeamMember(Employee employee) {
        this.teamMembers.remove(employee);
        employee.setManager(null);
        return this;
    }

    public void setTeamMembers(Set<Employee> employees) {
        this.teamMembers = employees;
    }

    public Set<EmployeeSkill> getSkills() {
        return skills;
    }

    public Employee skills(Set<EmployeeSkill> employeeSkills) {
        this.skills = employeeSkills;
        return this;
    }

    public Employee addSkill(EmployeeSkill employeeSkill) {
        this.skills.add(employeeSkill);
        employeeSkill.setEmployee(this);
        return this;
    }

    public Employee removeSkill(EmployeeSkill employeeSkill) {
        this.skills.remove(employeeSkill);
        employeeSkill.setEmployee(null);
        return this;
    }

    public void setSkills(Set<EmployeeSkill> employeeSkills) {
        this.skills = employeeSkills;
    }

    public Set<EmployeeSkill> getTaughtSkills() {
        return taughtSkills;
    }

    public Employee taughtSkills(Set<EmployeeSkill> employeeSkills) {
        this.taughtSkills = employeeSkills;
        return this;
    }

    public Employee addTaughtSkill(EmployeeSkill employeeSkill) {
        this.taughtSkills.add(employeeSkill);
        employeeSkill.setTeacher(this);
        return this;
    }

    public Employee removeTaughtSkill(EmployeeSkill employeeSkill) {
        this.taughtSkills.remove(employeeSkill);
        employeeSkill.setTeacher(null);
        return this;
    }

    public void setTaughtSkills(Set<EmployeeSkill> employeeSkills) {
        this.taughtSkills = employeeSkills;
    }

    public Employee getManager() {
        return manager;
    }

    public Employee manager(Employee employee) {
        this.manager = employee;
        return this;
    }

    public void setManager(Employee employee) {
        this.manager = employee;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Employee)) {
            return false;
        }
        return id != null && id.equals(((Employee) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Employee{" +
            "id=" + getId() +
            ", fullname='" + getFullname() + "'" +
            "}";
    }
}
