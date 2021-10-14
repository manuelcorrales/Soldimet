package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class TipoDetalleMovimientoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoDetalleMovimiento.class);
        TipoDetalleMovimiento tipoDetalleMovimiento1 = new TipoDetalleMovimiento();
        tipoDetalleMovimiento1.setId(1L);
        TipoDetalleMovimiento tipoDetalleMovimiento2 = new TipoDetalleMovimiento();
        tipoDetalleMovimiento2.setId(tipoDetalleMovimiento1.getId());
        assertThat(tipoDetalleMovimiento1).isEqualTo(tipoDetalleMovimiento2);
        tipoDetalleMovimiento2.setId(2L);
        assertThat(tipoDetalleMovimiento1).isNotEqualTo(tipoDetalleMovimiento2);
        tipoDetalleMovimiento1.setId(null);
        assertThat(tipoDetalleMovimiento1).isNotEqualTo(tipoDetalleMovimiento2);
    }
}
