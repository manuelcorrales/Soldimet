package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class EstadoMovimientoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstadoMovimiento.class);
        EstadoMovimiento estadoMovimiento1 = new EstadoMovimiento();
        estadoMovimiento1.setId(1L);
        EstadoMovimiento estadoMovimiento2 = new EstadoMovimiento();
        estadoMovimiento2.setId(estadoMovimiento1.getId());
        assertThat(estadoMovimiento1).isEqualTo(estadoMovimiento2);
        estadoMovimiento2.setId(2L);
        assertThat(estadoMovimiento1).isNotEqualTo(estadoMovimiento2);
        estadoMovimiento1.setId(null);
        assertThat(estadoMovimiento1).isNotEqualTo(estadoMovimiento2);
    }
}
