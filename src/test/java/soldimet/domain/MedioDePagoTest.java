package soldimet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import soldimet.web.rest.TestUtil;

class MedioDePagoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedioDePago.class);
        MedioDePago medioDePago1 = new MedioDePago();
        medioDePago1.setId(1L);
        MedioDePago medioDePago2 = new MedioDePago();
        medioDePago2.setId(medioDePago1.getId());
        assertThat(medioDePago1).isEqualTo(medioDePago2);
        medioDePago2.setId(2L);
        assertThat(medioDePago1).isNotEqualTo(medioDePago2);
        medioDePago1.setId(null);
        assertThat(medioDePago1).isNotEqualTo(medioDePago2);
    }
}
