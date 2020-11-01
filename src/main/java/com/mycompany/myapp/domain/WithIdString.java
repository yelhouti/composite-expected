package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A WithIdString.
 */
@Entity
@Table(name = "with_id_string")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WithIdString implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Column(name = "name")
    private String name;

    @JsonIgnoreProperties(value = { "withIdString" }, allowSetters = true)
    @OneToOne(mappedBy = "withIdString")
    private WithIdStringDetails withIdStringDetails;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public WithIdString id(String id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return this.name;
    }

    public WithIdString name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public WithIdStringDetails getWithIdStringDetails() {
        return this.withIdStringDetails;
    }

    public WithIdString withIdStringDetails(WithIdStringDetails withIdStringDetails) {
        this.setWithIdStringDetails(withIdStringDetails);
        return this;
    }

    public void setWithIdStringDetails(WithIdStringDetails withIdStringDetails) {
        if (this.withIdStringDetails != null) {
            this.withIdStringDetails.setWithIdString(null);
        }
        if (withIdStringDetails != null) {
            withIdStringDetails.setWithIdString(this);
        }
        this.withIdStringDetails = withIdStringDetails;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WithIdString)) {
            return false;
        }
        return id != null && id.equals(((WithIdString) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WithIdString{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
