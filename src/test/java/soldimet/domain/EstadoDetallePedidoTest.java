package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class EstadoDetallePedidoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstadoDetallePedido.class);
        EstadoDetallePedido estadoDetallePedido1 = new EstadoDetallePedido();
        estadoDetallePedido1.setId(1L);
        EstadoDetallePedido estadoDetallePedido2 = new EstadoDetallePedido();
        estadoDetallePedido2.setId(estadoDetallePedido1.getId());
        assertThat(estadoDetallePedido1).isEqualTo(estadoDetallePedido2);
        estadoDetallePedido2.setId(2L);
        assertThat(estadoDetallePedido1).isNotEqualTo(estadoDetallePedido2);
        estadoDetallePedido1.setId(null);
        assertThat(estadoDetallePedido1).isNotEqualTo(estadoDetallePedido2);
    }
}
