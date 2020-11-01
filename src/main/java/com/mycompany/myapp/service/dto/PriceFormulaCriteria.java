package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.GeneratedByJHipster;
import java.io.Serializable;
import java.util.Objects;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.BooleanFilter;
import tech.jhipster.service.filter.DoubleFilter;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.FloatFilter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.mycompany.myapp.domain.PriceFormula} entity. This class is used
 * in {@link com.mycompany.myapp.web.rest.PriceFormulaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /price-formulas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@GeneratedByJHipster
public class PriceFormulaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private IntegerFilter id;

    private StringFilter formula;

    public PriceFormulaCriteria() {}

    public PriceFormulaCriteria(PriceFormulaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.formula = other.formula == null ? null : other.formula.copy();
    }

    @Override
    public PriceFormulaCriteria copy() {
        return new PriceFormulaCriteria(this);
    }

    public IntegerFilter getId() {
        return id;
    }

    public void setId(IntegerFilter id) {
        this.id = id;
    }

    public StringFilter getFormula() {
        return formula;
    }

    public void setFormula(StringFilter formula) {
        this.formula = formula;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final PriceFormulaCriteria that = (PriceFormulaCriteria) o;
        return Objects.equals(id, that.id) && Objects.equals(formula, that.formula);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, formula);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PriceFormulaCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (formula != null ? "formula=" + formula + ", " : "") +
            "}";
    }
}
