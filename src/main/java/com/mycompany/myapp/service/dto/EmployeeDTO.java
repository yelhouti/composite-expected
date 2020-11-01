package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.GeneratedByJHipster;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Employee} entity.
 */
@GeneratedByJHipster
public class EmployeeDTO implements Serializable {

    @NotNull
    private String username;

    @NotNull
    private String fullname;

    private EmployeeDTO manager;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public EmployeeDTO getManager() {
        return manager;
    }

    public void setManager(EmployeeDTO manager) {
        this.manager = manager;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EmployeeDTO)) {
            return false;
        }

        EmployeeDTO employeeDTO = (EmployeeDTO) o;
        if (this.username == null) {
            return false;
        }
        return Objects.equals(this.username, employeeDTO.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.username);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmployeeDTO{" +
            "username='" + getUsername() + "'" +
            ", fullname='" + getFullname() + "'" +
            ", manager='" + getManager() + "'" +
            "}";
    }
}
