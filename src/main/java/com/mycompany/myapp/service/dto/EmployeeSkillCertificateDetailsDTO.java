package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.EmployeeSkillCertificateDetails} entity.
 */
public class EmployeeSkillCertificateDetailsDTO implements Serializable {

    @NotNull
    private String detail;

    private EmployeeSkillCertificateDTO employeeSkillCertificate;

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public EmployeeSkillCertificateDTO getEmployeeSkillCertificate() {
        return employeeSkillCertificate;
    }

    public void setEmployeeSkillCertificate(EmployeeSkillCertificateDTO employeeSkillCertificate) {
        this.employeeSkillCertificate = employeeSkillCertificate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EmployeeSkillCertificateDetailsDTO)) {
            return false;
        }

        EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO = (EmployeeSkillCertificateDetailsDTO) o;
        if (this.employeeSkillCertificate == null) {
            return false;
        }
        return Objects.equals(this.employeeSkillCertificate, employeeSkillCertificateDetailsDTO.employeeSkillCertificate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.employeeSkillCertificate);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmployeeSkillCertificateDetailsDTO{" +
            "detail='" + getDetail() + "'" +
            ", employeeSkillCertificate='" + getEmployeeSkillCertificate() + "'" +
            "}";
    }
}
