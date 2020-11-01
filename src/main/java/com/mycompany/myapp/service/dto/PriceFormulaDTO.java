package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.GeneratedByJHipster;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.PriceFormula} entity.
 */
@GeneratedByJHipster
public class PriceFormulaDTO implements Serializable {

    @NotNull
    private Integer max;

    @NotNull
    private String formula;

    public Integer getMax() {
        return max;
    }

    public void setMax(Integer max) {
        this.max = max;
    }

    public String getFormula() {
        return formula;
    }

    public void setFormula(String formula) {
        this.formula = formula;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PriceFormulaDTO)) {
            return false;
        }

        PriceFormulaDTO priceFormulaDTO = (PriceFormulaDTO) o;
        if (this.max == null) {
            return false;
        }
        return Objects.equals(this.max, priceFormulaDTO.max);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.max);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PriceFormulaDTO{" +
            "max=" + getMax() +
            ", formula='" + getFormula() + "'" +
            "}";
    }
}
