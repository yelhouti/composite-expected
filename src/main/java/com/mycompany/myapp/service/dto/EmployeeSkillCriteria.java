package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.BooleanFilter;
import tech.jhipster.service.filter.DoubleFilter;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.FloatFilter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.mycompany.myapp.domain.EmployeeSkill} entity. This class is used
 * in {@link com.mycompany.myapp.web.rest.EmployeeSkillResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /employee-skills?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class EmployeeSkillCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter name;

    private IntegerFilter level;

    private LongFilter employeeSkillCertificateId;

    private LongFilter taskId;

    private LongFilter employeeId;

    private LongFilter teacherId;

    public EmployeeSkillCriteria() {}

    public EmployeeSkillCriteria(EmployeeSkillCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.name = other.name == null ? null : other.name.copy();
        this.level = other.level == null ? null : other.level.copy();
        this.employeeSkillCertificateId = other.employeeSkillCertificateId == null ? null : other.employeeSkillCertificateId.copy();
        this.taskId = other.taskId == null ? null : other.taskId.copy();
        this.employeeId = other.employeeId == null ? null : other.employeeId.copy();
        this.teacherId = other.teacherId == null ? null : other.teacherId.copy();
    }

    @Override
    public EmployeeSkillCriteria copy() {
        return new EmployeeSkillCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getName() {
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public IntegerFilter getLevel() {
        return level;
    }

    public void setLevel(IntegerFilter level) {
        this.level = level;
    }

    public LongFilter getEmployeeSkillCertificateId() {
        return employeeSkillCertificateId;
    }

    public void setEmployeeSkillCertificateId(LongFilter employeeSkillCertificateId) {
        this.employeeSkillCertificateId = employeeSkillCertificateId;
    }

    public LongFilter getTaskId() {
        return taskId;
    }

    public void setTaskId(LongFilter taskId) {
        this.taskId = taskId;
    }

    public LongFilter getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(LongFilter employeeId) {
        this.employeeId = employeeId;
    }

    public LongFilter getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(LongFilter teacherId) {
        this.teacherId = teacherId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final EmployeeSkillCriteria that = (EmployeeSkillCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(name, that.name) &&
            Objects.equals(level, that.level) &&
            Objects.equals(employeeSkillCertificateId, that.employeeSkillCertificateId) &&
            Objects.equals(taskId, that.taskId) &&
            Objects.equals(employeeId, that.employeeId) &&
            Objects.equals(teacherId, that.teacherId)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, level, employeeSkillCertificateId, taskId, employeeId, teacherId);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmployeeSkillCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (name != null ? "name=" + name + ", " : "") +
                (level != null ? "level=" + level + ", " : "") +
                (employeeSkillCertificateId != null ? "employeeSkillCertificateId=" + employeeSkillCertificateId + ", " : "") +
                (taskId != null ? "taskId=" + taskId + ", " : "") +
                (employeeId != null ? "employeeId=" + employeeId + ", " : "") +
                (teacherId != null ? "teacherId=" + teacherId + ", " : "") +
            "}";
    }
}
