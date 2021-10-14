package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class AplicacionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Aplicacion.class);
        Aplicacion aplicacion1 = new Aplicacion();
        aplicacion1.setId(1L);
        Aplicacion aplicacion2 = new Aplicacion();
        aplicacion2.setId(aplicacion1.getId());
        assertThat(aplicacion1).isEqualTo(aplicacion2);
        aplicacion2.setId(2L);
        assertThat(aplicacion1).isNotEqualTo(aplicacion2);
        aplicacion1.setId(null);
        assertThat(aplicacion1).isNotEqualTo(aplicacion2);
    }
}
