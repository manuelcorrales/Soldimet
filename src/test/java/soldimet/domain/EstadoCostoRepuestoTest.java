package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class EstadoCostoRepuestoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstadoCostoRepuesto.class);
        EstadoCostoRepuesto estadoCostoRepuesto1 = new EstadoCostoRepuesto();
        estadoCostoRepuesto1.setId(1L);
        EstadoCostoRepuesto estadoCostoRepuesto2 = new EstadoCostoRepuesto();
        estadoCostoRepuesto2.setId(estadoCostoRepuesto1.getId());
        assertThat(estadoCostoRepuesto1).isEqualTo(estadoCostoRepuesto2);
        estadoCostoRepuesto2.setId(2L);
        assertThat(estadoCostoRepuesto1).isNotEqualTo(estadoCostoRepuesto2);
        estadoCostoRepuesto1.setId(null);
        assertThat(estadoCostoRepuesto1).isNotEqualTo(estadoCostoRepuesto2);
    }
}
