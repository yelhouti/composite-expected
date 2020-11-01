package com.mycompany.myapp.service.criteria;

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

    private StringFilter name;

    private IntegerFilter level;

    private LongFilter employeeSkillCertificateId;

    private LongFilter taskId;

    private StringFilter employeeId;

    private StringFilter teacherId;

    public EmployeeSkillCriteria() {}

    public EmployeeSkillCriteria(EmployeeSkillCriteria other) {
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

    public StringFilter getName() {
        return name;
    }

    public StringFilter name() {
        if (name == null) {
            name = new StringFilter();
        }
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public IntegerFilter getLevel() {
        return level;
    }

    public IntegerFilter level() {
        if (level == null) {
            level = new IntegerFilter();
        }
        return level;
    }

    public void setLevel(IntegerFilter level) {
        this.level = level;
    }

    public LongFilter getEmployeeSkillCertificateId() {
        return employeeSkillCertificateId;
    }

    public LongFilter employeeSkillCertificateId() {
        if (employeeSkillCertificateId == null) {
            employeeSkillCertificateId = new LongFilter();
        }
        return employeeSkillCertificateId;
    }

    public void setEmployeeSkillCertificateId(LongFilter employeeSkillCertificateId) {
        this.employeeSkillCertificateId = employeeSkillCertificateId;
    }

    public LongFilter getTaskId() {
        return taskId;
    }

    public LongFilter taskId() {
        if (taskId == null) {
            taskId = new LongFilter();
        }
        return taskId;
    }

    public void setTaskId(LongFilter taskId) {
        this.taskId = taskId;
    }

    public StringFilter getEmployeeId() {
        return employeeId;
    }

    public StringFilter employeeId() {
        if (employeeId == null) {
            employeeId = new StringFilter();
        }
        return employeeId;
    }

    public void setEmployeeId(StringFilter employeeId) {
        this.employeeId = employeeId;
    }

    public StringFilter getTeacherId() {
        return teacherId;
    }

    public StringFilter teacherId() {
        if (teacherId == null) {
            teacherId = new StringFilter();
        }
        return teacherId;
    }

    public void setTeacherId(StringFilter teacherId) {
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
        return Objects.hash(name, level, employeeSkillCertificateId, taskId, employeeId, teacherId);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmployeeSkillCriteria{" +
            (name != null ? "name=" + name + ", " : "") +
            (level != null ? "level=" + level + ", " : "") +
            (employeeSkillCertificateId != null ? "employeeSkillCertificateId=" + employeeSkillCertificateId + ", " : "") +
            (taskId != null ? "taskId=" + taskId + ", " : "") +
            (employeeId != null ? "employeeId=" + employeeId + ", " : "") +
            (teacherId != null ? "teacherId=" + teacherId + ", " : "") +
            "}";
    }
}
