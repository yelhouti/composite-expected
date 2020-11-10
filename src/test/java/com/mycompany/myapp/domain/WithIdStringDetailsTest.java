package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import com.mycompany.myapp.web.rest.WithIdStringDetailsResourceIT;
import com.mycompany.myapp.web.rest.WithIdStringResourceIT;
import org.junit.jupiter.api.Test;

class WithIdStringDetailsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WithIdStringDetails.class);
        WithIdStringDetails withIdStringDetails1 = new WithIdStringDetails();
        withIdStringDetails1.setWithIdStringId(WithIdStringResourceIT.DEFAULT_ID);
        WithIdStringDetails withIdStringDetails2 = new WithIdStringDetails();
        withIdStringDetails2.setWithIdStringId(WithIdStringResourceIT.DEFAULT_ID);
        assertThat(withIdStringDetails1).isEqualTo(withIdStringDetails2);
        withIdStringDetails2.setWithIdStringId(WithIdStringResourceIT.UPDATED_ID);
        assertThat(withIdStringDetails1).isNotEqualTo(withIdStringDetails2);
        withIdStringDetails1.setWithIdStringId(null);
        assertThat(withIdStringDetails1).isNotEqualTo(withIdStringDetails2);
    }
}
