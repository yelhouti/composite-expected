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
 * Criteria class for the {@link com.mycompany.myapp.domain.EmployeeSkillCertificateDetails} entity. This class is used
 * in {@link com.mycompany.myapp.web.rest.EmployeeSkillCertificateDetailsResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /employee-skill-certificate-details?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class EmployeeSkillCertificateDetailsCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private StringFilter detail;

    private EmployeeSkillCertificateCriteria employeeSkillCertificate;

    public EmployeeSkillCertificateDetailsCriteria() {}

    public EmployeeSkillCertificateDetailsCriteria(EmployeeSkillCertificateDetailsCriteria other) {
        this.detail = other.detail == null ? null : other.detail.copy();
        this.employeeSkillCertificate = other.employeeSkillCertificate == null ? null : other.employeeSkillCertificate.copy();
    }

    @Override
    public EmployeeSkillCertificateDetailsCriteria copy() {
        return new EmployeeSkillCertificateDetailsCriteria(this);
    }

    public StringFilter getDetail() {
        return detail;
    }

    public StringFilter detail() {
        if (detail == null) {
            detail = new StringFilter();
        }
        return detail;
    }

    public void setDetail(StringFilter detail) {
        this.detail = detail;
    }

    public EmployeeSkillCertificateCriteria getEmployeeSkillCertificate() {
        return employeeSkillCertificate;
    }

    public EmployeeSkillCertificateCriteria employeeSkillCertificate() {
        if (employeeSkillCertificate == null) {
            employeeSkillCertificate = new EmployeeSkillCertificateCriteria();
        }
        return employeeSkillCertificate;
    }

    public void setEmployeeSkillCertificate(EmployeeSkillCertificateCriteria employeeSkillCertificate) {
        this.employeeSkillCertificate = employeeSkillCertificate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final EmployeeSkillCertificateDetailsCriteria that = (EmployeeSkillCertificateDetailsCriteria) o;
        return Objects.equals(detail, that.detail) && Objects.equals(employeeSkillCertificate, that.employeeSkillCertificate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(detail, employeeSkillCertificate);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmployeeSkillCertificateDetailsCriteria{" +
            (detail != null ? "detail=" + detail + ", " : "") +
            (employeeSkillCertificate != null ? "employeeSkillCertificate=" + employeeSkillCertificate + ", " : "") +
            "}";
    }
}
