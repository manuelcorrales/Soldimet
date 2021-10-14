package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class PedidoRepuestoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PedidoRepuesto.class);
        PedidoRepuesto pedidoRepuesto1 = new PedidoRepuesto();
        pedidoRepuesto1.setId(1L);
        PedidoRepuesto pedidoRepuesto2 = new PedidoRepuesto();
        pedidoRepuesto2.setId(pedidoRepuesto1.getId());
        assertThat(pedidoRepuesto1).isEqualTo(pedidoRepuesto2);
        pedidoRepuesto2.setId(2L);
        assertThat(pedidoRepuesto1).isNotEqualTo(pedidoRepuesto2);
        pedidoRepuesto1.setId(null);
        assertThat(pedidoRepuesto1).isNotEqualTo(pedidoRepuesto2);
    }
}
