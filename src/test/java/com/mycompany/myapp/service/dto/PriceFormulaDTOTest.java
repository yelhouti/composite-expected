package com.mycompany.myapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.PriceFormulaResourceIT;
import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PriceFormulaDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PriceFormulaDTO.class);
        PriceFormulaDTO priceFormulaDTO1 = new PriceFormulaDTO();
        priceFormulaDTO1.setMax(PriceFormulaResourceIT.DEFAULT_MAX);
        PriceFormulaDTO priceFormulaDTO2 = new PriceFormulaDTO();
        assertThat(priceFormulaDTO1).isNotEqualTo(priceFormulaDTO2);
        priceFormulaDTO2.setMax(PriceFormulaResourceIT.DEFAULT_MAX);
        assertThat(priceFormulaDTO1).isEqualTo(priceFormulaDTO2);
        PriceFormulaDTO priceFormulaDTO3 = new PriceFormulaDTO();
        priceFormulaDTO3.setMax(PriceFormulaResourceIT.UPDATED_MAX);
        assertThat(priceFormulaDTO1).isNotEqualTo(priceFormulaDTO3);
        PriceFormulaDTO priceFormulaDTO4 = new PriceFormulaDTO();
        priceFormulaDTO4.setMax(null);
        assertThat(priceFormulaDTO1).isNotEqualTo(priceFormulaDTO4);
    }
}
