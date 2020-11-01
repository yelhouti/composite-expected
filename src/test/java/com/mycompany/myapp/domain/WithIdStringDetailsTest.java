package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class WithIdStringDetailsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WithIdStringDetails.class);
        WithIdStringDetails withIdStringDetails1 = new WithIdStringDetails();
        withIdStringDetails1.setId("id1");
        WithIdStringDetails withIdStringDetails2 = new WithIdStringDetails();
        withIdStringDetails2.setId(withIdStringDetails1.getId());
        assertThat(withIdStringDetails1).isEqualTo(withIdStringDetails2);
        withIdStringDetails2.setId("id2");
        assertThat(withIdStringDetails1).isNotEqualTo(withIdStringDetails2);
        withIdStringDetails1.setId(null);
        assertThat(withIdStringDetails1).isNotEqualTo(withIdStringDetails2);
    }
}
