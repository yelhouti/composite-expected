package com.mycompany.myapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.GeneratedByJHipster;
import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

@GeneratedByJHipster
class PriceFormulaDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PriceFormulaDTO.class);
        PriceFormulaDTO priceFormulaDTO1 = new PriceFormulaDTO();
        priceFormulaDTO1.setId(1L);
        PriceFormulaDTO priceFormulaDTO2 = new PriceFormulaDTO();
        assertThat(priceFormulaDTO1).isNotEqualTo(priceFormulaDTO2);
        priceFormulaDTO2.setId(priceFormulaDTO1.getId());
        assertThat(priceFormulaDTO1).isEqualTo(priceFormulaDTO2);
        priceFormulaDTO2.setId(2L);
        assertThat(priceFormulaDTO1).isNotEqualTo(priceFormulaDTO2);
        priceFormulaDTO1.setId(null);
        assertThat(priceFormulaDTO1).isNotEqualTo(priceFormulaDTO2);
    }
}
