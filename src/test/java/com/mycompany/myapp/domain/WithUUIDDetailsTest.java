package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.UUID;
import org.junit.jupiter.api.Test;

class WithUUIDDetailsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WithUUIDDetails.class);
        WithUUIDDetails withUUIDDetails1 = new WithUUIDDetails();
        withUUIDDetails1.setUuid(UUID.randomUUID());
        WithUUIDDetails withUUIDDetails2 = new WithUUIDDetails();
        withUUIDDetails2.setUuid(withUUIDDetails1.getUuid());
        assertThat(withUUIDDetails1).isEqualTo(withUUIDDetails2);
        withUUIDDetails2.setUuid(UUID.randomUUID());
        assertThat(withUUIDDetails1).isNotEqualTo(withUUIDDetails2);
        withUUIDDetails1.setUuid(null);
        assertThat(withUUIDDetails1).isNotEqualTo(withUUIDDetails2);
    }
}
