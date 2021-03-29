package com.mycompany.myapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.UUID;
import org.junit.jupiter.api.Test;

class WithUUIDDetailsDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WithUUIDDetailsDTO.class);
        WithUUIDDetailsDTO withUUIDDetailsDTO1 = new WithUUIDDetailsDTO();
        withUUIDDetailsDTO1.setUuid(UUID.randomUUID());
        WithUUIDDetailsDTO withUUIDDetailsDTO2 = new WithUUIDDetailsDTO();
        assertThat(withUUIDDetailsDTO1).isNotEqualTo(withUUIDDetailsDTO2);
        withUUIDDetailsDTO2.setUuid(withUUIDDetailsDTO1.getUuid());
        assertThat(withUUIDDetailsDTO1).isEqualTo(withUUIDDetailsDTO2);
        WithUUIDDetailsDTO withUUIDDetailsDTO3 = new WithUUIDDetailsDTO();
        withUUIDDetailsDTO3.setUuid(UUID.randomUUID());
        assertThat(withUUIDDetailsDTO1).isNotEqualTo(withUUIDDetailsDTO3);
        WithUUIDDetailsDTO withUUIDDetailsDTO4 = new WithUUIDDetailsDTO();
        withUUIDDetailsDTO4.setUuid(null);
        assertThat(withUUIDDetailsDTO1).isNotEqualTo(withUUIDDetailsDTO4);
    }
}
