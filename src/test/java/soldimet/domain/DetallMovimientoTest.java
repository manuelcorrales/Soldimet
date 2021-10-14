package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class DetallMovimientoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DetallMovimiento.class);
        DetallMovimiento detallMovimiento1 = new DetallMovimiento();
        detallMovimiento1.setId(1L);
        DetallMovimiento detallMovimiento2 = new DetallMovimiento();
        detallMovimiento2.setId(detallMovimiento1.getId());
        assertThat(detallMovimiento1).isEqualTo(detallMovimiento2);
        detallMovimiento2.setId(2L);
        assertThat(detallMovimiento1).isNotEqualTo(detallMovimiento2);
        detallMovimiento1.setId(null);
        assertThat(detallMovimiento1).isNotEqualTo(detallMovimiento2);
    }
}
