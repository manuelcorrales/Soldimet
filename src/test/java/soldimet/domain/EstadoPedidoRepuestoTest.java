package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class EstadoPedidoRepuestoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstadoPedidoRepuesto.class);
        EstadoPedidoRepuesto estadoPedidoRepuesto1 = new EstadoPedidoRepuesto();
        estadoPedidoRepuesto1.setId(1L);
        EstadoPedidoRepuesto estadoPedidoRepuesto2 = new EstadoPedidoRepuesto();
        estadoPedidoRepuesto2.setId(estadoPedidoRepuesto1.getId());
        assertThat(estadoPedidoRepuesto1).isEqualTo(estadoPedidoRepuesto2);
        estadoPedidoRepuesto2.setId(2L);
        assertThat(estadoPedidoRepuesto1).isNotEqualTo(estadoPedidoRepuesto2);
        estadoPedidoRepuesto1.setId(null);
        assertThat(estadoPedidoRepuesto1).isNotEqualTo(estadoPedidoRepuesto2);
    }
}
