package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.GeneratedByJHipster;
import java.io.Serializable;
import java.util.Objects;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.BooleanFilter;
import tech.jhipster.service.filter.DoubleFilter;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.FloatFilter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.LocalDateFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.mycompany.myapp.domain.EmployeeSkillCertificate} entity. This class is used
 * in {@link com.mycompany.myapp.web.rest.EmployeeSkillCertificateResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /employee-skill-certificates?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@GeneratedByJHipster
public class EmployeeSkillCertificateCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private IntegerFilter grade;

    private LocalDateFilter date;

    private LongFilter typeId;

    private LongFilter skillId;

    public EmployeeSkillCertificateCriteria() {}

    public EmployeeSkillCertificateCriteria(EmployeeSkillCertificateCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.grade = other.grade == null ? null : other.grade.copy();
        this.date = other.date == null ? null : other.date.copy();
        this.typeId = other.typeId == null ? null : other.typeId.copy();
        this.skillId = other.skillId == null ? null : other.skillId.copy();
    }

    @Override
    public EmployeeSkillCertificateCriteria copy() {
        return new EmployeeSkillCertificateCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public IntegerFilter getGrade() {
        return grade;
    }

    public void setGrade(IntegerFilter grade) {
        this.grade = grade;
    }

    public LocalDateFilter getDate() {
        return date;
    }

    public void setDate(LocalDateFilter date) {
        this.date = date;
    }

    public LongFilter getTypeId() {
        return typeId;
    }

    public void setTypeId(LongFilter typeId) {
        this.typeId = typeId;
    }

    public LongFilter getSkillId() {
        return skillId;
    }

    public void setSkillId(LongFilter skillId) {
        this.skillId = skillId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final EmployeeSkillCertificateCriteria that = (EmployeeSkillCertificateCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(grade, that.grade) &&
            Objects.equals(date, that.date) &&
            Objects.equals(typeId, that.typeId) &&
            Objects.equals(skillId, that.skillId)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, grade, date, typeId, skillId);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmployeeSkillCertificateCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (grade != null ? "grade=" + grade + ", " : "") +
                (date != null ? "date=" + date + ", " : "") +
                (typeId != null ? "typeId=" + typeId + ", " : "") +
                (skillId != null ? "skillId=" + skillId + ", " : "") +
            "}";
    }
}
