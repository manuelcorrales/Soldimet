package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class TipoMovimientoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoMovimiento.class);
        TipoMovimiento tipoMovimiento1 = new TipoMovimiento();
        tipoMovimiento1.setId(1L);
        TipoMovimiento tipoMovimiento2 = new TipoMovimiento();
        tipoMovimiento2.setId(tipoMovimiento1.getId());
        assertThat(tipoMovimiento1).isEqualTo(tipoMovimiento2);
        tipoMovimiento2.setId(2L);
        assertThat(tipoMovimiento1).isNotEqualTo(tipoMovimiento2);
        tipoMovimiento1.setId(null);
        assertThat(tipoMovimiento1).isNotEqualTo(tipoMovimiento2);
    }
}
