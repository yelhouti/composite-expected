package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.GeneratedByJHipster;
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
@GeneratedByJHipster
public class WithIdStringDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Column(name = "name")
    private String name;

    @JsonIgnoreProperties(value = { "withIdStringDetails" }, allowSetters = true)
    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private WithIdString withIdString;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public WithIdStringDetails id(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public WithIdStringDetails name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public WithIdString getWithIdString() {
        return withIdString;
    }

    public WithIdStringDetails withIdString(WithIdString withIdString) {
        this.withIdString = withIdString;
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
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WithIdStringDetails{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
