package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.WithIdStringDetails} entity.
 */
public class WithIdStringDetailsDTO implements Serializable {
    private String id;

    private String details;

    private WithIdStringDTO withIdString;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public WithIdStringDTO getWithIdString() {
        return withIdString;
    }

    public void setWithIdString(WithIdStringDTO withIdString) {
        this.withIdString = withIdString;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WithIdStringDetailsDTO)) {
            return false;
        }

        WithIdStringDetailsDTO withIdStringDetailsDTO = (WithIdStringDetailsDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, withIdStringDetailsDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WithIdStringDetailsDTO{" +
            "id='" + getId() + "'" +
            ", details='" + getDetails() + "'" +
            ", withIdString='" + getWithIdString() + "'" +
            "}";
    }
}
