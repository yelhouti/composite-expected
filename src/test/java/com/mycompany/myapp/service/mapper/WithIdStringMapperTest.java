package com.mycompany.myapp.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class WithIdStringMapperTest {
    private WithIdStringMapper withIdStringMapper;

    @BeforeEach
    public void setUp() {
        withIdStringMapper = new WithIdStringMapperImpl();
    }
}
