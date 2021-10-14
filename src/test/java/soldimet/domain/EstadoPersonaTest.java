package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class EstadoPersonaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstadoPersona.class);
        EstadoPersona estadoPersona1 = new EstadoPersona();
        estadoPersona1.setId(1L);
        EstadoPersona estadoPersona2 = new EstadoPersona();
        estadoPersona2.setId(estadoPersona1.getId());
        assertThat(estadoPersona1).isEqualTo(estadoPersona2);
        estadoPersona2.setId(2L);
        assertThat(estadoPersona1).isNotEqualTo(estadoPersona2);
        estadoPersona1.setId(null);
        assertThat(estadoPersona1).isNotEqualTo(estadoPersona2);
    }
}
