package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class EstadoOperacionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstadoOperacion.class);
        EstadoOperacion estadoOperacion1 = new EstadoOperacion();
        estadoOperacion1.setId(1L);
        EstadoOperacion estadoOperacion2 = new EstadoOperacion();
        estadoOperacion2.setId(estadoOperacion1.getId());
        assertThat(estadoOperacion1).isEqualTo(estadoOperacion2);
        estadoOperacion2.setId(2L);
        assertThat(estadoOperacion1).isNotEqualTo(estadoOperacion2);
        estadoOperacion1.setId(null);
        assertThat(estadoOperacion1).isNotEqualTo(estadoOperacion2);
    }
}
