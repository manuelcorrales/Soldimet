package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class TipoRepuestoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoRepuesto.class);
        TipoRepuesto tipoRepuesto1 = new TipoRepuesto();
        tipoRepuesto1.setId(1L);
        TipoRepuesto tipoRepuesto2 = new TipoRepuesto();
        tipoRepuesto2.setId(tipoRepuesto1.getId());
        assertThat(tipoRepuesto1).isEqualTo(tipoRepuesto2);
        tipoRepuesto2.setId(2L);
        assertThat(tipoRepuesto1).isNotEqualTo(tipoRepuesto2);
        tipoRepuesto1.setId(null);
        assertThat(tipoRepuesto1).isNotEqualTo(tipoRepuesto2);
    }
}
