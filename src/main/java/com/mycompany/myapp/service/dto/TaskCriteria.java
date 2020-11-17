package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.enumeration.TaskType;
import java.io.Serializable;
import java.util.Objects;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.BooleanFilter;
import tech.jhipster.service.filter.DoubleFilter;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.FloatFilter;
import tech.jhipster.service.filter.InstantFilter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.LocalDateFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;
import tech.jhipster.service.filter.ZonedDateTimeFilter;

/**
 * Criteria class for the {@link com.mycompany.myapp.domain.Task} entity. This class is used
 * in {@link com.mycompany.myapp.web.rest.TaskResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /tasks?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class TaskCriteria implements Serializable, Criteria {

    /**
     * Class for filtering TaskType
     */
    public static class TaskTypeFilter extends Filter<TaskType> {

        public TaskTypeFilter() {}

        public TaskTypeFilter(TaskTypeFilter filter) {
            super(filter);
        }

        @Override
        public TaskTypeFilter copy() {
            return new TaskTypeFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter name;

    private TaskTypeFilter type;

    private LocalDateFilter endDate;

    private ZonedDateTimeFilter createdAt;

    private InstantFilter modifiedAt;

    private BooleanFilter done;

    private EmployeeSkillCriteria employeeSkill;

    public TaskCriteria() {}

    public TaskCriteria(TaskCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.name = other.name == null ? null : other.name.copy();
        this.type = other.type == null ? null : other.type.copy();
        this.endDate = other.endDate == null ? null : other.endDate.copy();
        this.createdAt = other.createdAt == null ? null : other.createdAt.copy();
        this.modifiedAt = other.modifiedAt == null ? null : other.modifiedAt.copy();
        this.done = other.done == null ? null : other.done.copy();
        this.employeeSkill = other.employeeSkill == null ? null : other.employeeSkill.copy();
    }

    @Override
    public TaskCriteria copy() {
        return new TaskCriteria(this);
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

    public TaskTypeFilter getType() {
        return type;
    }

    public void setType(TaskTypeFilter type) {
        this.type = type;
    }

    public LocalDateFilter getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateFilter endDate) {
        this.endDate = endDate;
    }

    public ZonedDateTimeFilter getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(ZonedDateTimeFilter createdAt) {
        this.createdAt = createdAt;
    }

    public InstantFilter getModifiedAt() {
        return modifiedAt;
    }

    public void setModifiedAt(InstantFilter modifiedAt) {
        this.modifiedAt = modifiedAt;
    }

    public BooleanFilter getDone() {
        return done;
    }

    public void setDone(BooleanFilter done) {
        this.done = done;
    }

    public EmployeeSkillCriteria getEmployeeSkill() {
        return employeeSkill;
    }

    public void setEmployeeSkill(EmployeeSkillCriteria employeeSkill) {
        this.employeeSkill = employeeSkill;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final TaskCriteria that = (TaskCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(name, that.name) &&
            Objects.equals(type, that.type) &&
            Objects.equals(endDate, that.endDate) &&
            Objects.equals(createdAt, that.createdAt) &&
            Objects.equals(modifiedAt, that.modifiedAt) &&
            Objects.equals(done, that.done) &&
            Objects.equals(employeeSkill, that.employeeSkill)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, type, endDate, createdAt, modifiedAt, done, employeeSkill);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TaskCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (name != null ? "name=" + name + ", " : "") +
            (type != null ? "type=" + type + ", " : "") +
            (endDate != null ? "endDate=" + endDate + ", " : "") +
            (createdAt != null ? "createdAt=" + createdAt + ", " : "") +
            (modifiedAt != null ? "modifiedAt=" + modifiedAt + ", " : "") +
            (done != null ? "done=" + done + ", " : "") +
            (employeeSkill != null ? "employeeSkill=" + employeeSkill + ", " : "") +
            "}";
    }
}
