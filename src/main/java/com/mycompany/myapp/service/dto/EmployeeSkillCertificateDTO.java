package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.GeneratedByJHipster;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.EmployeeSkillCertificate} entity.
 */
@GeneratedByJHipster
public class EmployeeSkillCertificateDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer grade;

    @NotNull
    private LocalDate date;

    private CertificateTypeDTO type;

    private EmployeeSkillDTO skill;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getGrade() {
        return grade;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public CertificateTypeDTO getType() {
        return type;
    }

    public void setType(CertificateTypeDTO type) {
        this.type = type;
    }

    public EmployeeSkillDTO getSkill() {
        return skill;
    }

    public void setSkill(EmployeeSkillDTO skill) {
        this.skill = skill;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EmployeeSkillCertificateDTO)) {
            return false;
        }

        EmployeeSkillCertificateDTO employeeSkillCertificateDTO = (EmployeeSkillCertificateDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, employeeSkillCertificateDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmployeeSkillCertificateDTO{" +
            "id=" + getId() +
            ", grade=" + getGrade() +
            ", date='" + getDate() + "'" +
            ", type=" + getType() +
            ", skill='" + getSkill() + "'" +
            "}";
    }
}
