package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class CostoRepuestoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CostoRepuesto.class);
        CostoRepuesto costoRepuesto1 = new CostoRepuesto();
        costoRepuesto1.setId(1L);
        CostoRepuesto costoRepuesto2 = new CostoRepuesto();
        costoRepuesto2.setId(costoRepuesto1.getId());
        assertThat(costoRepuesto1).isEqualTo(costoRepuesto2);
        costoRepuesto2.setId(2L);
        assertThat(costoRepuesto1).isNotEqualTo(costoRepuesto2);
        costoRepuesto1.setId(null);
        assertThat(costoRepuesto1).isNotEqualTo(costoRepuesto2);
    }
}
