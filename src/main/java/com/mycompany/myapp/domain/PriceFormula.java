package com.mycompany.myapp.domain;

import com.mycompany.myapp.GeneratedByJHipster;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A PriceFormula.
 */
@Entity
@Table(name = "price_formula")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@GeneratedByJHipster
public class PriceFormula implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Integer id;

    @NotNull
    @Column(name = "formula", nullable = false)
    private String formula;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public PriceFormula id(Integer id) {
        this.id = id;
        return this;
    }

    public String getFormula() {
        return formula;
    }

    public PriceFormula formula(String formula) {
        this.formula = formula;
        return this;
    }

    public void setFormula(String formula) {
        this.formula = formula;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PriceFormula)) {
            return false;
        }
        return id != null && id.equals(((PriceFormula) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PriceFormula{" +
            "id=" + getId() +
            ", formula='" + getFormula() + "'" +
            "}";
    }
}
