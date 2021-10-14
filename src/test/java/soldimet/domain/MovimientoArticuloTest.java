package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class MovimientoArticuloTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MovimientoArticulo.class);
        MovimientoArticulo movimientoArticulo1 = new MovimientoArticulo();
        movimientoArticulo1.setId(1L);
        MovimientoArticulo movimientoArticulo2 = new MovimientoArticulo();
        movimientoArticulo2.setId(movimientoArticulo1.getId());
        assertThat(movimientoArticulo1).isEqualTo(movimientoArticulo2);
        movimientoArticulo2.setId(2L);
        assertThat(movimientoArticulo1).isNotEqualTo(movimientoArticulo2);
        movimientoArticulo1.setId(null);
        assertThat(movimientoArticulo1).isNotEqualTo(movimientoArticulo2);
    }
}
