package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class CategoriaPagoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CategoriaPago.class);
        CategoriaPago categoriaPago1 = new CategoriaPago();
        categoriaPago1.setId(1L);
        CategoriaPago categoriaPago2 = new CategoriaPago();
        categoriaPago2.setId(categoriaPago1.getId());
        assertThat(categoriaPago1).isEqualTo(categoriaPago2);
        categoriaPago2.setId(2L);
        assertThat(categoriaPago1).isNotEqualTo(categoriaPago2);
        categoriaPago1.setId(null);
        assertThat(categoriaPago1).isNotEqualTo(categoriaPago2);
    }
}
