package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.GeneratedByJHipster;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.WithIdStringDetails} entity.
 */
@GeneratedByJHipster
public class WithIdStringDetailsDTO implements Serializable {

    private Long id;

    private String name;

    private WithIdStringDTO withIdString;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", withIdString=" + getWithIdString() +
            "}";
    }
}
