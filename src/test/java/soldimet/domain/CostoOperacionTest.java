package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class CostoOperacionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CostoOperacion.class);
        CostoOperacion costoOperacion1 = new CostoOperacion();
        costoOperacion1.setId(1L);
        CostoOperacion costoOperacion2 = new CostoOperacion();
        costoOperacion2.setId(costoOperacion1.getId());
        assertThat(costoOperacion1).isEqualTo(costoOperacion2);
        costoOperacion2.setId(2L);
        assertThat(costoOperacion1).isNotEqualTo(costoOperacion2);
        costoOperacion1.setId(null);
        assertThat(costoOperacion1).isNotEqualTo(costoOperacion2);
    }
}
