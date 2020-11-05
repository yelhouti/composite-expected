package com.mycompany.myapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.GeneratedByJHipster;
import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

@GeneratedByJHipster
class CertificateTypeDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CertificateTypeDTO.class);
        CertificateTypeDTO certificateTypeDTO1 = new CertificateTypeDTO();
        certificateTypeDTO1.setId(1L);
        CertificateTypeDTO certificateTypeDTO2 = new CertificateTypeDTO();
        assertThat(certificateTypeDTO1).isNotEqualTo(certificateTypeDTO2);
        certificateTypeDTO2.setId(certificateTypeDTO1.getId());
        assertThat(certificateTypeDTO1).isEqualTo(certificateTypeDTO2);
        certificateTypeDTO2.setId(2L);
        assertThat(certificateTypeDTO1).isNotEqualTo(certificateTypeDTO2);
        certificateTypeDTO1.setId(null);
        assertThat(certificateTypeDTO1).isNotEqualTo(certificateTypeDTO2);
    }
}
