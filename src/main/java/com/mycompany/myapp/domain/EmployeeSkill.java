package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A EmployeeSkill.
 */
@Entity
@Table(name = "employee_skill")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class EmployeeSkill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "level", nullable = false)
    private Integer level;

    @OneToMany(mappedBy = "skill")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "type", "skill" }, allowSetters = true)
    private Set<EmployeeSkillCertificate> employeeSkillCertificates = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(
        name = "rel_employee_skill__task",
        joinColumns = @JoinColumn(name = "employee_skill_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "task_id", referencedColumnName = "id")
    )
    @JsonIgnoreProperties(value = { "user", "employeeSkills" }, allowSetters = true)
    private Set<Task> tasks = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "teamMembers", "skills", "taughtSkills", "manager" }, allowSetters = true)
    private Employee employee;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "teamMembers", "skills", "taughtSkills", "manager" }, allowSetters = true)
    private Employee teacher;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EmployeeSkill id(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return this.name;
    }

    public EmployeeSkill name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getLevel() {
        return this.level;
    }

    public EmployeeSkill level(Integer level) {
        this.level = level;
        return this;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Set<EmployeeSkillCertificate> getEmployeeSkillCertificates() {
        return this.employeeSkillCertificates;
    }

    public EmployeeSkill employeeSkillCertificates(Set<EmployeeSkillCertificate> employeeSkillCertificates) {
        this.setEmployeeSkillCertificates(employeeSkillCertificates);
        return this;
    }

    public EmployeeSkill addEmployeeSkillCertificate(EmployeeSkillCertificate employeeSkillCertificate) {
        this.employeeSkillCertificates.add(employeeSkillCertificate);
        employeeSkillCertificate.setSkill(this);
        return this;
    }

    public EmployeeSkill removeEmployeeSkillCertificate(EmployeeSkillCertificate employeeSkillCertificate) {
        this.employeeSkillCertificates.remove(employeeSkillCertificate);
        employeeSkillCertificate.setSkill(null);
        return this;
    }

    public void setEmployeeSkillCertificates(Set<EmployeeSkillCertificate> employeeSkillCertificates) {
        if (this.employeeSkillCertificates != null) {
            this.employeeSkillCertificates.forEach(employeeSkillCertificate -> employeeSkillCertificate.setSkill(null));
        }
        if (employeeSkillCertificates != null) {
            employeeSkillCertificates.forEach(employeeSkillCertificate -> employeeSkillCertificate.setSkill(this));
        }
        this.employeeSkillCertificates = employeeSkillCertificates;
    }

    public Set<Task> getTasks() {
        return this.tasks;
    }

    public EmployeeSkill tasks(Set<Task> tasks) {
        this.setTasks(tasks);
        return this;
    }

    public EmployeeSkill addTask(Task task) {
        this.tasks.add(task);
        task.getEmployeeSkills().add(this);
        return this;
    }

    public EmployeeSkill removeTask(Task task) {
        this.tasks.remove(task);
        task.getEmployeeSkills().remove(this);
        return this;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    public Employee getEmployee() {
        return this.employee;
    }

    public EmployeeSkill employee(Employee employee) {
        this.setEmployee(employee);
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Employee getTeacher() {
        return this.teacher;
    }

    public EmployeeSkill teacher(Employee employee) {
        this.setTeacher(employee);
        return this;
    }

    public void setTeacher(Employee employee) {
        this.teacher = employee;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EmployeeSkill)) {
            return false;
        }
        return id != null && id.equals(((EmployeeSkill) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmployeeSkill{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", level=" + getLevel() +
            "}";
    }
}
