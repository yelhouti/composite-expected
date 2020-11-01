package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.GeneratedByJHipster;
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
@GeneratedByJHipster
public class WithIdString implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @JsonIgnoreProperties(value = { "withIdString" }, allowSetters = true)
    @OneToOne(mappedBy = "withIdString")
    private WithIdStringDetails withIdStringDetails;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public WithIdString id(Long id) {
        this.id = id;
        return this;
    }

    public WithIdStringDetails getWithIdStringDetails() {
        return withIdStringDetails;
    }

    public WithIdString withIdStringDetails(WithIdStringDetails withIdStringDetails) {
        this.withIdStringDetails = withIdStringDetails;
        return this;
    }

    public void setWithIdStringDetails(WithIdStringDetails withIdStringDetails) {
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
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WithIdString{" +
            "id=" + getId() +
            "}";
    }
}
