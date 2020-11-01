package com.mycompany.myapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.GeneratedByJHipster;
import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

@GeneratedByJHipster
class WithIdStringDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WithIdStringDTO.class);
        WithIdStringDTO withIdStringDTO1 = new WithIdStringDTO();
        withIdStringDTO1.setId(1L);
        WithIdStringDTO withIdStringDTO2 = new WithIdStringDTO();
        assertThat(withIdStringDTO1).isNotEqualTo(withIdStringDTO2);
        withIdStringDTO2.setId(withIdStringDTO1.getId());
        assertThat(withIdStringDTO1).isEqualTo(withIdStringDTO2);
        withIdStringDTO2.setId(2L);
        assertThat(withIdStringDTO1).isNotEqualTo(withIdStringDTO2);
        withIdStringDTO1.setId(null);
        assertThat(withIdStringDTO1).isNotEqualTo(withIdStringDTO2);
    }
}
