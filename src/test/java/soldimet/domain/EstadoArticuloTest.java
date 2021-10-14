package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class EstadoArticuloTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstadoArticulo.class);
        EstadoArticulo estadoArticulo1 = new EstadoArticulo();
        estadoArticulo1.setId(1L);
        EstadoArticulo estadoArticulo2 = new EstadoArticulo();
        estadoArticulo2.setId(estadoArticulo1.getId());
        assertThat(estadoArticulo1).isEqualTo(estadoArticulo2);
        estadoArticulo2.setId(2L);
        assertThat(estadoArticulo1).isNotEqualTo(estadoArticulo2);
        estadoArticulo1.setId(null);
        assertThat(estadoArticulo1).isNotEqualTo(estadoArticulo2);
    }
}
