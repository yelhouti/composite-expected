package com.mycompany.myapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class WithIdStringDetailsDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WithIdStringDetailsDTO.class);
        WithIdStringDetailsDTO withIdStringDetailsDTO1 = new WithIdStringDetailsDTO();
        withIdStringDetailsDTO1.setId("id1");
        WithIdStringDetailsDTO withIdStringDetailsDTO2 = new WithIdStringDetailsDTO();
        assertThat(withIdStringDetailsDTO1).isNotEqualTo(withIdStringDetailsDTO2);
        withIdStringDetailsDTO2.setId(withIdStringDetailsDTO1.getId());
        assertThat(withIdStringDetailsDTO1).isEqualTo(withIdStringDetailsDTO2);
        withIdStringDetailsDTO2.setId("id2");
        assertThat(withIdStringDetailsDTO1).isNotEqualTo(withIdStringDetailsDTO2);
        withIdStringDetailsDTO1.setId(null);
        assertThat(withIdStringDetailsDTO1).isNotEqualTo(withIdStringDetailsDTO2);
    }
}
