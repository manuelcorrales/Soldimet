package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class EstadoPresupuestoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstadoPresupuesto.class);
        EstadoPresupuesto estadoPresupuesto1 = new EstadoPresupuesto();
        estadoPresupuesto1.setId(1L);
        EstadoPresupuesto estadoPresupuesto2 = new EstadoPresupuesto();
        estadoPresupuesto2.setId(estadoPresupuesto1.getId());
        assertThat(estadoPresupuesto1).isEqualTo(estadoPresupuesto2);
        estadoPresupuesto2.setId(2L);
        assertThat(estadoPresupuesto1).isNotEqualTo(estadoPresupuesto2);
        estadoPresupuesto1.setId(null);
        assertThat(estadoPresupuesto1).isNotEqualTo(estadoPresupuesto2);
    }
}
