package com.mycompany.myapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.UUID;
import org.junit.jupiter.api.Test;

class WithUUIDDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WithUUIDDTO.class);
        WithUUIDDTO withUUIDDTO1 = new WithUUIDDTO();
        withUUIDDTO1.setUuid(UUID.randomUUID());
        WithUUIDDTO withUUIDDTO2 = new WithUUIDDTO();
        assertThat(withUUIDDTO1).isNotEqualTo(withUUIDDTO2);
        withUUIDDTO2.setUuid(withUUIDDTO1.getUuid());
        assertThat(withUUIDDTO1).isEqualTo(withUUIDDTO2);
        withUUIDDTO2.setUuid(UUID.randomUUID());
        assertThat(withUUIDDTO1).isNotEqualTo(withUUIDDTO2);
        withUUIDDTO1.setUuid(null);
        assertThat(withUUIDDTO1).isNotEqualTo(withUUIDDTO2);
    }
}
