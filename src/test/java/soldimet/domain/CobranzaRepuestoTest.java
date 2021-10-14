package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class CobranzaRepuestoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CobranzaRepuesto.class);
        CobranzaRepuesto cobranzaRepuesto1 = new CobranzaRepuesto();
        cobranzaRepuesto1.setId(1L);
        CobranzaRepuesto cobranzaRepuesto2 = new CobranzaRepuesto();
        cobranzaRepuesto2.setId(cobranzaRepuesto1.getId());
        assertThat(cobranzaRepuesto1).isEqualTo(cobranzaRepuesto2);
        cobranzaRepuesto2.setId(2L);
        assertThat(cobranzaRepuesto1).isNotEqualTo(cobranzaRepuesto2);
        cobranzaRepuesto1.setId(null);
        assertThat(cobranzaRepuesto1).isNotEqualTo(cobranzaRepuesto2);
    }
}
