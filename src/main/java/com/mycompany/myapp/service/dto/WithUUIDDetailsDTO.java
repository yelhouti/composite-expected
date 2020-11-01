package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.WithUUIDDetails} entity.
 */
public class WithUUIDDetailsDTO implements Serializable {
    private UUID uuid;

    private String details;

    private WithUUIDDTO withUUID;

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public WithUUIDDTO getWithUUID() {
        return withUUID;
    }

    public void setWithUUID(WithUUIDDTO withUUID) {
        this.withUUID = withUUID;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WithUUIDDetailsDTO)) {
            return false;
        }

        WithUUIDDetailsDTO withUUIDDetailsDTO = (WithUUIDDetailsDTO) o;
        if (this.uuid == null) {
            return false;
        }
        return Objects.equals(this.uuid, withUUIDDetailsDTO.uuid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.uuid);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WithUUIDDetailsDTO{" +
            "uuid='" + getUuid() + "'" +
            ", details='" + getDetails() + "'" +
            ", withUUID='" + getWithUUID() + "'" +
            "}";
    }
}
