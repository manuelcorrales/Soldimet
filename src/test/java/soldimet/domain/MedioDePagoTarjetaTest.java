package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class MedioDePagoTarjetaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedioDePagoTarjeta.class);
        MedioDePagoTarjeta medioDePagoTarjeta1 = new MedioDePagoTarjeta();
        medioDePagoTarjeta1.setId(1L);
        MedioDePagoTarjeta medioDePagoTarjeta2 = new MedioDePagoTarjeta();
        medioDePagoTarjeta2.setId(medioDePagoTarjeta1.getId());
        assertThat(medioDePagoTarjeta1).isEqualTo(medioDePagoTarjeta2);
        medioDePagoTarjeta2.setId(2L);
        assertThat(medioDePagoTarjeta1).isNotEqualTo(medioDePagoTarjeta2);
        medioDePagoTarjeta1.setId(null);
        assertThat(medioDePagoTarjeta1).isNotEqualTo(medioDePagoTarjeta2);
    }
}
