package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class MedidaArticuloTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedidaArticulo.class);
        MedidaArticulo medidaArticulo1 = new MedidaArticulo();
        medidaArticulo1.setId(1L);
        MedidaArticulo medidaArticulo2 = new MedidaArticulo();
        medidaArticulo2.setId(medidaArticulo1.getId());
        assertThat(medidaArticulo1).isEqualTo(medidaArticulo2);
        medidaArticulo2.setId(2L);
        assertThat(medidaArticulo1).isNotEqualTo(medidaArticulo2);
        medidaArticulo1.setId(null);
        assertThat(medidaArticulo1).isNotEqualTo(medidaArticulo2);
    }
}
