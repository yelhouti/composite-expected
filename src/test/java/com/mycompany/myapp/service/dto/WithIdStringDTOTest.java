package com.mycompany.myapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class WithIdStringDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WithIdStringDTO.class);
        WithIdStringDTO withIdStringDTO1 = new WithIdStringDTO();
        withIdStringDTO1.setId("id1");
        WithIdStringDTO withIdStringDTO2 = new WithIdStringDTO();
        assertThat(withIdStringDTO1).isNotEqualTo(withIdStringDTO2);
        withIdStringDTO2.setId(withIdStringDTO1.getId());
        assertThat(withIdStringDTO1).isEqualTo(withIdStringDTO2);
        WithIdStringDTO withIdStringDTO3 = new WithIdStringDTO();
        withIdStringDTO3.setId("id3");
        assertThat(withIdStringDTO1).isNotEqualTo(withIdStringDTO3);
        WithIdStringDTO withIdStringDTO4 = new WithIdStringDTO();
        withIdStringDTO4.setId(null);
        assertThat(withIdStringDTO1).isNotEqualTo(withIdStringDTO4);
    }
}
