package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.UUID;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A WithUUID.
 */
@Entity
@Table(name = "with_uuid")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WithUUID implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name = "uuid")
    private UUID uuid;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @JsonIgnoreProperties(value = { "withUUID" }, allowSetters = true)
    @OneToOne(mappedBy = "withUUID")
    private WithUUIDDetails withUUIDDetails;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public UUID getUuid() {
        return this.uuid;
    }

    public WithUUID uuid(UUID uuid) {
        this.uuid = uuid;
        return this;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getName() {
        return this.name;
    }

    public WithUUID name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public WithUUIDDetails getWithUUIDDetails() {
        return this.withUUIDDetails;
    }

    public WithUUID withUUIDDetails(WithUUIDDetails withUUIDDetails) {
        this.setWithUUIDDetails(withUUIDDetails);
        return this;
    }

    public void setWithUUIDDetails(WithUUIDDetails withUUIDDetails) {
        if (this.withUUIDDetails != null) {
            this.withUUIDDetails.setWithUUID(null);
        }
        if (withUUIDDetails != null) {
            withUUIDDetails.setWithUUID(this);
        }
        this.withUUIDDetails = withUUIDDetails;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WithUUID)) {
            return false;
        }
        return uuid != null && uuid.equals(((WithUUID) o).uuid);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WithUUID{" +
            "uuid='" + getUuid() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
