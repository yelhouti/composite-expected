package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.GeneratedByJHipster;
import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

@GeneratedByJHipster
class PriceFormulaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PriceFormula.class);
        PriceFormula priceFormula1 = new PriceFormula();
        priceFormula1.setId(1L);
        PriceFormula priceFormula2 = new PriceFormula();
        priceFormula2.setId(priceFormula1.getId());
        assertThat(priceFormula1).isEqualTo(priceFormula2);
        priceFormula2.setId(2L);
        assertThat(priceFormula1).isNotEqualTo(priceFormula2);
        priceFormula1.setId(null);
        assertThat(priceFormula1).isNotEqualTo(priceFormula2);
    }
}
