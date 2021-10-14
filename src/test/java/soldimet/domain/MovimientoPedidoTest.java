package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class MovimientoPedidoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MovimientoPedido.class);
        MovimientoPedido movimientoPedido1 = new MovimientoPedido();
        movimientoPedido1.setId(1L);
        MovimientoPedido movimientoPedido2 = new MovimientoPedido();
        movimientoPedido2.setId(movimientoPedido1.getId());
        assertThat(movimientoPedido1).isEqualTo(movimientoPedido2);
        movimientoPedido2.setId(2L);
        assertThat(movimientoPedido1).isNotEqualTo(movimientoPedido2);
        movimientoPedido1.setId(null);
        assertThat(movimientoPedido1).isNotEqualTo(movimientoPedido2);
    }
}
