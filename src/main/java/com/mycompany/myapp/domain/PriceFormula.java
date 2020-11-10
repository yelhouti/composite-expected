package com.mycompany.myapp.domain;

import java.io.Serializable;
import java.util.Objects;
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
public class PriceFormula implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @NotNull
    @Column(name = "max", nullable = false)
    private Integer max;

    @NotNull
    @Column(name = "formula", nullable = false)
    private String formula;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Integer getMax() {
        return max;
    }

    public PriceFormula max(Integer max) {
        this.max = max;
        return this;
    }

    public void setMax(Integer max) {
        this.max = max;
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
        return max != null && max.equals(((PriceFormula) o).max);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(max);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PriceFormula{" +
            "max=" + getMax() +
            ", formula='" + getFormula() + "'" +
            "}";
    }
}
