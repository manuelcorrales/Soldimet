package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class CobranzaOperacionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CobranzaOperacion.class);
        CobranzaOperacion cobranzaOperacion1 = new CobranzaOperacion();
        cobranzaOperacion1.setId(1L);
        CobranzaOperacion cobranzaOperacion2 = new CobranzaOperacion();
        cobranzaOperacion2.setId(cobranzaOperacion1.getId());
        assertThat(cobranzaOperacion1).isEqualTo(cobranzaOperacion2);
        cobranzaOperacion2.setId(2L);
        assertThat(cobranzaOperacion1).isNotEqualTo(cobranzaOperacion2);
        cobranzaOperacion1.setId(null);
        assertThat(cobranzaOperacion1).isNotEqualTo(cobranzaOperacion2);
    }
}
