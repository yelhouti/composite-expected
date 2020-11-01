package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.UUID;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A WithUUIDDetails.
 */
@Entity
@Table(name = "with_uuid_details")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WithUUIDDetails implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private UUID uuid;

    @Column(name = "details")
    private String details;

    @JsonIgnoreProperties(value = { "withUUIDDetails" }, allowSetters = true)
    @OneToOne
    @MapsId
    @JoinColumn(name = "uuid")
    private WithUUID withUUID;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public WithUUIDDetails uuid(UUID uuid) {
        this.uuid = uuid;
        return this;
    }

    public String getDetails() {
        return this.details;
    }

    public WithUUIDDetails details(String details) {
        this.details = details;
        return this;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public WithUUID getWithUUID() {
        return this.withUUID;
    }

    public WithUUIDDetails withUUID(WithUUID withUUID) {
        this.setWithUUID(withUUID);
        return this;
    }

    public void setWithUUID(WithUUID withUUID) {
        this.withUUID = withUUID;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WithUUIDDetails)) {
            return false;
        }
        return uuid != null && uuid.equals(((WithUUIDDetails) o).uuid);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WithUUIDDetails{" +
            "uuid=" + getUuid() +
            ", details='" + getDetails() + "'" +
            "}";
    }
}
