package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class PagoEfectivoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PagoEfectivo.class);
        PagoEfectivo pagoEfectivo1 = new PagoEfectivo();
        pagoEfectivo1.setId(1L);
        PagoEfectivo pagoEfectivo2 = new PagoEfectivo();
        pagoEfectivo2.setId(pagoEfectivo1.getId());
        assertThat(pagoEfectivo1).isEqualTo(pagoEfectivo2);
        pagoEfectivo2.setId(2L);
        assertThat(pagoEfectivo1).isNotEqualTo(pagoEfectivo2);
        pagoEfectivo1.setId(null);
        assertThat(pagoEfectivo1).isNotEqualTo(pagoEfectivo2);
    }
}
