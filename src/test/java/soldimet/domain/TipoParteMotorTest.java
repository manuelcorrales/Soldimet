package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class TipoParteMotorTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoParteMotor.class);
        TipoParteMotor tipoParteMotor1 = new TipoParteMotor();
        tipoParteMotor1.setId(1L);
        TipoParteMotor tipoParteMotor2 = new TipoParteMotor();
        tipoParteMotor2.setId(tipoParteMotor1.getId());
        assertThat(tipoParteMotor1).isEqualTo(tipoParteMotor2);
        tipoParteMotor2.setId(2L);
        assertThat(tipoParteMotor1).isNotEqualTo(tipoParteMotor2);
        tipoParteMotor1.setId(null);
        assertThat(tipoParteMotor1).isNotEqualTo(tipoParteMotor2);
    }
}
