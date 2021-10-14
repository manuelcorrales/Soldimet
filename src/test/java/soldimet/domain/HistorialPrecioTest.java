package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class HistorialPrecioTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HistorialPrecio.class);
        HistorialPrecio historialPrecio1 = new HistorialPrecio();
        historialPrecio1.setId(1L);
        HistorialPrecio historialPrecio2 = new HistorialPrecio();
        historialPrecio2.setId(historialPrecio1.getId());
        assertThat(historialPrecio1).isEqualTo(historialPrecio2);
        historialPrecio2.setId(2L);
        assertThat(historialPrecio1).isNotEqualTo(historialPrecio2);
        historialPrecio1.setId(null);
        assertThat(historialPrecio1).isNotEqualTo(historialPrecio2);
    }
}
