package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class PrecioRepuestoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PrecioRepuesto.class);
        PrecioRepuesto precioRepuesto1 = new PrecioRepuesto();
        precioRepuesto1.setId(1L);
        PrecioRepuesto precioRepuesto2 = new PrecioRepuesto();
        precioRepuesto2.setId(precioRepuesto1.getId());
        assertThat(precioRepuesto1).isEqualTo(precioRepuesto2);
        precioRepuesto2.setId(2L);
        assertThat(precioRepuesto1).isNotEqualTo(precioRepuesto2);
        precioRepuesto1.setId(null);
        assertThat(precioRepuesto1).isNotEqualTo(precioRepuesto2);
    }
}
