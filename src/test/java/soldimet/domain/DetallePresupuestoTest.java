package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class DetallePresupuestoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DetallePresupuesto.class);
        DetallePresupuesto detallePresupuesto1 = new DetallePresupuesto();
        detallePresupuesto1.setId(1L);
        DetallePresupuesto detallePresupuesto2 = new DetallePresupuesto();
        detallePresupuesto2.setId(detallePresupuesto1.getId());
        assertThat(detallePresupuesto1).isEqualTo(detallePresupuesto2);
        detallePresupuesto2.setId(2L);
        assertThat(detallePresupuesto1).isNotEqualTo(detallePresupuesto2);
        detallePresupuesto1.setId(null);
        assertThat(detallePresupuesto1).isNotEqualTo(detallePresupuesto2);
    }
}
