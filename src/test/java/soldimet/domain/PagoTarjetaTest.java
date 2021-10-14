package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class PagoTarjetaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PagoTarjeta.class);
        PagoTarjeta pagoTarjeta1 = new PagoTarjeta();
        pagoTarjeta1.setId(1L);
        PagoTarjeta pagoTarjeta2 = new PagoTarjeta();
        pagoTarjeta2.setId(pagoTarjeta1.getId());
        assertThat(pagoTarjeta1).isEqualTo(pagoTarjeta2);
        pagoTarjeta2.setId(2L);
        assertThat(pagoTarjeta1).isNotEqualTo(pagoTarjeta2);
        pagoTarjeta1.setId(null);
        assertThat(pagoTarjeta1).isNotEqualTo(pagoTarjeta2);
    }
}
