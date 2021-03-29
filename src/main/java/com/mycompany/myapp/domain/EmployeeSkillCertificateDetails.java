package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A EmployeeSkillCertificateDetails.
 */
@Entity
@Table(name = "escd")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class EmployeeSkillCertificateDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @EmbeddedId
    EmployeeSkillCertificateId id;

    @NotNull
    @Column(name = "detail", nullable = false)
    private String detail;

    @JsonIgnoreProperties(value = { "employeeSkillCertificateDetails", "type", "skill" }, allowSetters = true)
    @OneToOne
    @MapsId
    @JoinColumns(
        {
            @JoinColumn(name = "type_id", referencedColumnName = "type_id"),
            @JoinColumn(name = "skill_name", referencedColumnName = "skill_name"),
            @JoinColumn(name = "skill_employee_username", referencedColumnName = "skill_employee_username"),
        }
    )
    private EmployeeSkillCertificate employeeSkillCertificate;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public EmployeeSkillCertificateId getId() {
        return id;
    }

    public void setId(EmployeeSkillCertificateId id) {
        this.id = id;
    }

    public EmployeeSkillCertificateDetails id(EmployeeSkillCertificateId id) {
        this.id = id;
        return this;
    }

    public String getDetail() {
        return this.detail;
    }

    public EmployeeSkillCertificateDetails detail(String detail) {
        this.detail = detail;
        return this;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public EmployeeSkillCertificate getEmployeeSkillCertificate() {
        return this.employeeSkillCertificate;
    }

    public EmployeeSkillCertificateDetails employeeSkillCertificate(EmployeeSkillCertificate employeeSkillCertificate) {
        this.setEmployeeSkillCertificate(employeeSkillCertificate);
        return this;
    }

    public void setEmployeeSkillCertificate(EmployeeSkillCertificate employeeSkillCertificate) {
        this.employeeSkillCertificate = employeeSkillCertificate;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EmployeeSkillCertificateDetails)) {
            return false;
        }
        return id != null && id.equals(((EmployeeSkillCertificateDetails) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmployeeSkillCertificateDetails{" +
            "id=" + getId() +
            ", detail='" + getDetail() + "'" +
            "}";
    }
}
