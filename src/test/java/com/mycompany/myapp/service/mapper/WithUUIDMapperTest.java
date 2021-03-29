package com.mycompany.myapp.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class WithUUIDMapperTest {

    private WithUUIDMapper withUUIDMapper;

    @BeforeEach
    public void setUp() {
        withUUIDMapper = new WithUUIDMapperImpl();
    }
}
