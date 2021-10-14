package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class FormaDePagoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FormaDePago.class);
        FormaDePago formaDePago1 = new FormaDePago();
        formaDePago1.setId(1L);
        FormaDePago formaDePago2 = new FormaDePago();
        formaDePago2.setId(formaDePago1.getId());
        assertThat(formaDePago1).isEqualTo(formaDePago2);
        formaDePago2.setId(2L);
        assertThat(formaDePago1).isNotEqualTo(formaDePago2);
        formaDePago1.setId(null);
        assertThat(formaDePago1).isNotEqualTo(formaDePago2);
    }
}
