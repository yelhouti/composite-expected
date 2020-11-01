package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.WithUUID} entity.
 */
public class WithUUIDDTO implements Serializable {

    @NotNull
    private UUID uuid;

    @NotNull
    private String name;

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WithUUIDDTO)) {
            return false;
        }

        WithUUIDDTO withUUIDDTO = (WithUUIDDTO) o;
        if (this.uuid == null) {
            return false;
        }
        return Objects.equals(this.uuid, withUUIDDTO.uuid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.uuid);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WithUUIDDTO{" +
            "uuid='" + getUuid() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
