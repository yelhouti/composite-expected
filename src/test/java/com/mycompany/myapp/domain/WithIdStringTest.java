package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class WithIdStringTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WithIdString.class);
        WithIdString withIdString1 = new WithIdString();
        withIdString1.setId("id1");
        WithIdString withIdString2 = new WithIdString();
        withIdString2.setId(withIdString1.getId());
        assertThat(withIdString1).isEqualTo(withIdString2);
        withIdString2.setId("id2");
        assertThat(withIdString1).isNotEqualTo(withIdString2);
        withIdString1.setId(null);
        assertThat(withIdString1).isNotEqualTo(withIdString2);
    }
}
