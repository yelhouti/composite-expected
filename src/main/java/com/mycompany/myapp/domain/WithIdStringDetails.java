package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A WithIdStringDetails.
 */
@Entity
@Table(name = "with_id_string_details")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WithIdStringDetails implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Column(name = "details")
    private String details;

    @JsonIgnoreProperties(value = { "withIdStringDetails" }, allowSetters = true)
    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private WithIdString withIdString;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public WithIdStringDetails id(String id) {
        this.id = id;
        return this;
    }

    public String getDetails() {
        return this.details;
    }

    public WithIdStringDetails details(String details) {
        this.details = details;
        return this;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public WithIdString getWithIdString() {
        return this.withIdString;
    }

    public WithIdStringDetails withIdString(WithIdString withIdString) {
        this.setWithIdString(withIdString);
        return this;
    }

    public void setWithIdString(WithIdString withIdString) {
        this.withIdString = withIdString;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WithIdStringDetails)) {
            return false;
        }
        return id != null && id.equals(((WithIdStringDetails) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WithIdStringDetails{" +
            "id=" + getId() +
            ", details='" + getDetails() + "'" +
            "}";
    }
}
