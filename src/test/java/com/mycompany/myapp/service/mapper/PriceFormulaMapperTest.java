package com.mycompany.myapp.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PriceFormulaMapperTest {

    private PriceFormulaMapper priceFormulaMapper;

    @BeforeEach
    public void setUp() {
        priceFormulaMapper = new PriceFormulaMapperImpl();
    }
}
