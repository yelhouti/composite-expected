package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.GeneratedByJHipster;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.WithIdString} entity.
 */
@GeneratedByJHipster
public class WithIdStringDTO implements Serializable {

    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WithIdStringDTO)) {
            return false;
        }

        WithIdStringDTO withIdStringDTO = (WithIdStringDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, withIdStringDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WithIdStringDTO{" +
            "id=" + getId() +
            "}";
    }
}
