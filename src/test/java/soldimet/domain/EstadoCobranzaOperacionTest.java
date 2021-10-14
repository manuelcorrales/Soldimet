package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class EstadoCobranzaOperacionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstadoCobranzaOperacion.class);
        EstadoCobranzaOperacion estadoCobranzaOperacion1 = new EstadoCobranzaOperacion();
        estadoCobranzaOperacion1.setId(1L);
        EstadoCobranzaOperacion estadoCobranzaOperacion2 = new EstadoCobranzaOperacion();
        estadoCobranzaOperacion2.setId(estadoCobranzaOperacion1.getId());
        assertThat(estadoCobranzaOperacion1).isEqualTo(estadoCobranzaOperacion2);
        estadoCobranzaOperacion2.setId(2L);
        assertThat(estadoCobranzaOperacion1).isNotEqualTo(estadoCobranzaOperacion2);
        estadoCobranzaOperacion1.setId(null);
        assertThat(estadoCobranzaOperacion1).isNotEqualTo(estadoCobranzaOperacion2);
    }
}
