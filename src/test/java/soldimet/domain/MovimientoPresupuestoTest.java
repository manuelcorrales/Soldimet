package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class MovimientoPresupuestoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MovimientoPresupuesto.class);
        MovimientoPresupuesto movimientoPresupuesto1 = new MovimientoPresupuesto();
        movimientoPresupuesto1.setId(1L);
        MovimientoPresupuesto movimientoPresupuesto2 = new MovimientoPresupuesto();
        movimientoPresupuesto2.setId(movimientoPresupuesto1.getId());
        assertThat(movimientoPresupuesto1).isEqualTo(movimientoPresupuesto2);
        movimientoPresupuesto2.setId(2L);
        assertThat(movimientoPresupuesto1).isNotEqualTo(movimientoPresupuesto2);
        movimientoPresupuesto1.setId(null);
        assertThat(movimientoPresupuesto1).isNotEqualTo(movimientoPresupuesto2);
    }
}
