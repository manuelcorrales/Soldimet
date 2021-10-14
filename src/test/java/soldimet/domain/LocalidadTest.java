package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class LocalidadTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Localidad.class);
        Localidad localidad1 = new Localidad();
        localidad1.setId(1L);
        Localidad localidad2 = new Localidad();
        localidad2.setId(localidad1.getId());
        assertThat(localidad1).isEqualTo(localidad2);
        localidad2.setId(2L);
        assertThat(localidad1).isNotEqualTo(localidad2);
        localidad1.setId(null);
        assertThat(localidad1).isNotEqualTo(localidad2);
    }
}
