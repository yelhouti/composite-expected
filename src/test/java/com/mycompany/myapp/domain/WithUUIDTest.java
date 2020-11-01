package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.UUID;
import org.junit.jupiter.api.Test;

class WithUUIDTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WithUUID.class);
        WithUUID withUUID1 = new WithUUID();
        withUUID1.setUuid(UUID.randomUUID());
        WithUUID withUUID2 = new WithUUID();
        withUUID2.setUuid(withUUID1.getUuid());
        assertThat(withUUID1).isEqualTo(withUUID2);
        withUUID2.setUuid(UUID.randomUUID());
        assertThat(withUUID1).isNotEqualTo(withUUID2);
        withUUID1.setUuid(null);
        assertThat(withUUID1).isNotEqualTo(withUUID2);
    }
}
